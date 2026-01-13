import { MessageSquarePlus, Sparkles, Zap, ShieldCheck, History } from 'lucide-react';
import ReviewForm from '@/components/review-form';

export default function DashboardPage() {
    return (
        <div className="space-y-8 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">AI Response Generator</h1>
                    <p className="text-gray-500 mt-1 max-w-lg">Transform any customer review into a professional, human-sounding response in seconds.</p>
                </div>
                <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-100 self-start">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">AI Powered</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Generator Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden ring-1 ring-gray-200/50">
                        <div className="p-8">
                            <ReviewForm />
                        </div>
                    </div>
                </div>

                {/* Sidebar Tips/Stats */}
                <div className="space-y-6">
                    <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-100/50">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <Zap className="h-5 w-5" />
                            </div>
                            <h2 className="font-bold text-lg">Pro Tip</h2>
                        </div>
                        <p className="text-blue-50 text-sm leading-relaxed mb-4">
                            Connect your Google Business account to fetch reviews automatically and reply directly. It saves 10+ hours a week!
                        </p>
                        <a
                            href="/dashboard/reviews"
                            className="inline-flex items-center text-xs font-bold bg-white/10 hover:bg-white/20 transition-colors px-3 py-2 rounded-lg backdrop-blur-sm"
                        >
                            Connect Business <ShieldCheck className="ml-2 h-3 w-3" />
                        </a>
                    </section>

                    <section className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                            <History className="h-4 w-4 mr-2 text-blue-600" />
                            Quick Actions
                        </h3>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium text-gray-700">
                                <span>Recent History</span>
                                <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded text-gray-500">Coming Soon</span>
                            </button>
                            <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium text-gray-700">
                                <span>Tone Templates</span>
                                <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded text-gray-500">Coming Soon</span>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
