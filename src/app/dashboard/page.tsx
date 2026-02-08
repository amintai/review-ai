'use client';

import { useEffect, useState, useRef, FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import {
    Plus, Send, Loader2, ShoppingCart,
    ExternalLink, ChevronLeft, Sparkles, User, LogOut, Settings
} from 'lucide-react';
import Link from 'next/link';

interface Message {
    id?: string;
    role: 'user' | 'assistant';
    content: string;
}

interface Conversation {
    id: string;
    product_title: string;
    amazon_asin?: string;
    created_at: string;
}

export default function DashboardPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Check auth and load conversations
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                const amazonUrl = searchParams.get('url');
                router.push(`/login?next=/dashboard${amazonUrl ? `?url=${encodeURIComponent(amazonUrl)}` : ''}`);
                return;
            }
            setUser(session.user);
            await loadConversations();
            setLoading(false);

            // Auto-analyze if URL provided
            const amazonUrl = searchParams.get('url');
            if (amazonUrl) {
                handleNewAnalysis(amazonUrl);
            }
        };
        checkAuth();
    }, []);

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const loadConversations = async () => {
        const { data } = await supabase
            .from('conversations')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20);
        setConversations(data || []);
    };

    const loadMessages = async (conversationId: string) => {
        const { data } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: true });
        setMessages(data || []);
        setActiveConversationId(conversationId);
    };

    const handleNewAnalysis = async (amazonUrl: string) => {
        setMessages([]);
        setActiveConversationId(null);
        const userMessage: Message = {
            role: 'user',
            content: `Analyze this Amazon product: ${amazonUrl}`
        };
        setMessages([userMessage]);
        await streamResponse([userMessage], amazonUrl);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isStreaming) return;

        const userMessage: Message = { role: 'user', content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        await streamResponse(newMessages);
    };

    const streamResponse = async (currentMessages: Message[], amazonUrl?: string) => {
        setIsStreaming(true);
        const assistantMessage: Message = { role: 'assistant', content: '' };
        setMessages([...currentMessages, assistantMessage]);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: currentMessages,
                    conversationId: activeConversationId,
                    amazonUrl: amazonUrl
                }),
            });

            if (!response.ok) throw new Error('Stream failed');

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let fullContent = '';
            let newConversationId = activeConversationId;

            while (reader) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n').filter(line => line.startsWith('data: '));

                for (const line of lines) {
                    const data = line.replace('data: ', '');
                    if (data === '[DONE]') continue;

                    try {
                        const parsed = JSON.parse(data);
                        fullContent += parsed.content;
                        if (parsed.conversationId) newConversationId = parsed.conversationId;

                        setMessages(prev => {
                            const updated = [...prev];
                            updated[updated.length - 1] = { role: 'assistant', content: fullContent };
                            return updated;
                        });
                    } catch { }
                }
            }

            if (newConversationId && newConversationId !== activeConversationId) {
                setActiveConversationId(newConversationId);
                await loadConversations();
            }

        } catch (error) {
            console.error('Streaming error', error);
            setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' };
                return updated;
            });
        }

        setIsStreaming(false);
    };

    const startNewChat = () => {
        setActiveConversationId(null);
        setMessages([]);
        setInput('');
        router.push('/dashboard');
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} bg-gray-900 text-white flex flex-col transition-all duration-300 overflow-hidden border-r border-gray-800`}>
                <div className="p-4 border-b border-gray-800">
                    <button
                        onClick={startNewChat}
                        className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors"
                    >
                        <Plus size={18} /> New Analysis
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {conversations.map((conv) => (
                        <button
                            key={conv.id}
                            onClick={() => loadMessages(conv.id)}
                            className={`w-full text-left p-3 rounded-lg flex items-start gap-3 transition-colors ${activeConversationId === conv.id
                                ? 'bg-gray-800 border border-gray-700'
                                : 'hover:bg-gray-800 border border-transparent'
                                }`}
                        >
                            <ShoppingCart size={16} className="mt-0.5 text-gray-400 shrink-0" />
                            <div className="overflow-hidden">
                                <div className="text-sm font-medium truncate">{conv.product_title || 'New Analysis'}</div>
                                <div className="text-xs text-gray-500">{conv.amazon_asin || 'Processing...'}</div>
                            </div>
                        </button>
                    ))}

                    {conversations.length === 0 && (
                        <div className="text-center p-4 text-gray-500 text-sm">
                            No recent analyses.
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-gray-800 bg-gray-900">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-9 w-9 rounded-full bg-orange-600/20 flex items-center justify-center text-orange-500 font-bold text-sm">
                            {(user?.email?.[0] || 'U').toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{user?.email}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <Link href="/dashboard/settings" className="flex items-center justify-center gap-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 transition-colors">
                            <Settings size={14} /> Settings
                        </Link>
                        <button onClick={handleSignOut} className="flex items-center justify-center gap-2 p-2 rounded-lg bg-gray-800 hover:bg-red-900/30 text-xs text-red-400 hover:text-red-300 transition-colors">
                            <LogOut size={14} /> Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col bg-white h-full relative">
                {/* Header */}
                <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white z-10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <ChevronLeft size={20} className={`transform transition-transform ${!sidebarOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-600 to-amber-500 flex items-center justify-center text-white font-black text-sm">
                                A
                            </div>
                            <span className="font-bold text-gray-900 tracking-tight">ReviewAI</span>
                        </div>
                    </div>
                    {/* <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full text-xs font-bold uppercase tracking-wider">
                        <Sparkles size={12} /> Pro
                    </div> */}
                </header>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-6">
                    <div className="max-w-3xl mx-auto space-y-6">
                        {messages.length === 0 && (
                            <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-100">
                                    <Sparkles size={40} className="text-orange-600" />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">How can I help you shop?</h2>
                                <p className="text-gray-500 max-w-md mx-auto text-lg">
                                    Paste an Amazon product link or use the browser extension to get started.
                                </p>
                            </div>
                        )}

                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                                <div className={`max-w-2xl px-6 py-4 rounded-2xl shadow-sm ${msg.role === 'user'
                                    ? 'bg-orange-600 text-white rounded-br-none'
                                    : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
                                    }`}>
                                    <div className="whitespace-pre-wrap text-sm leading-relaxed font-medium">{msg.content}</div>
                                </div>
                            </div>
                        ))}

                        {isStreaming && messages[messages.length - 1]?.content === '' && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 px-6 py-4 rounded-2xl rounded-bl-none shadow-sm">
                                    <Loader2 className="h-5 w-5 animate-spin text-orange-600" />
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input */}
                <div className="border-t border-gray-100 p-6 bg-white">
                    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white to-transparent -top-20 pointer-events-none"></div>
                        <div className="relative flex items-center gap-3 bg-gray-50 rounded-2xl px-2 py-2 border border-gray-200 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-50 transition-all shadow-sm">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Paste an Amazon link or ask a follow-up..."
                                className="flex-1 bg-transparent outline-none text-base text-gray-900 placeholder:text-gray-400 px-4 py-2"
                                disabled={isStreaming}
                            />
                            <button
                                type="submit"
                                disabled={isStreaming || !input.trim()}
                                className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white p-3 rounded-xl transition-all shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 active:scale-95"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                        <p className="text-center text-xs text-gray-400 mt-3 font-medium">
                            ReviewAI can make mistakes. Verify important product details.
                        </p>
                    </form>
                </div>
            </main>
        </div>
    );
}
