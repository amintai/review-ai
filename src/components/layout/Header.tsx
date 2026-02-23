'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '@/store/slices/uiSlice';
import { Menu, LogOut, Plus, User, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export default function Header() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [greeting, setGreeting] = useState<string>('Welcome back');


    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setUserEmail(data.session?.user?.email || null);
        });

        // Calculate time-based greeting
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 18) setGreeting('Good afternoon');
        else setGreeting('Good evening');
    }, []);

    const displayName = userEmail ? userEmail.split('@')[0] : 'there';

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <header className="bg-background/80 border-b border-border sticky top-0 z-30 h-16 flex-none backdrop-blur">
            <div className="w-full h-full px-4 sm:px-6 flex items-center justify-between">

                {/* Mobile Left: Menu Toggle & Title */}
                <div className="flex items-center gap-4 lg:hidden">
                    <button
                        onClick={() => dispatch(toggleSidebar())}
                        className="p-2 -ml-2 text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-lg transition-colors"
                    >
                        <Menu size={20} />
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="font-syne font-bold text-foreground tracking-tight">ReviewAI</span>
                    </div>
                </div>

                {/* Desktop Left: Greeting */}
                <div className="hidden lg:flex items-center gap-2">
                    <span className="text-[15px] font-medium text-secondary">
                        {greeting}, <span className="text-foreground">{displayName}</span>
                    </span>
                </div>

                <div className="flex items-center gap-3 ml-auto">
                    <Button
                        className="cursor-pointer hidden sm:inline-flex relative overflow-hidden bg-primary text-primary-foreground shadow-[0_8px_30px_rgba(255,107,53,0.35)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.55),transparent_55%)] hover:bg-[#E85A25]"
                        onClick={() => router.push('/dashboard')}
                        size="sm"
                    >
                        <Plus size={16} strokeWidth={2.5} className="mr-1" />
                        New Analysis
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1 text-xs font-medium text-secondary hover:border-primary/40 hover:bg-card/90 transition-colors">
                                <Avatar fallback={displayName} className="h-7 w-7" />
                                <span className="hidden sm:inline max-w-[120px] truncate">{displayName}</span>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleSignOut}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Sign out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
