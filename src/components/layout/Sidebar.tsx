'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleSidebar, toggleCollapsed, setFeedbackModalOpen } from '@/store/slices/uiSlice';
import { LayoutDashboard, FileText, Settings, X, Zap, ChevronLeft, ChevronRight, Check, Menu, PanelLeftClose, PanelLeftOpen, MessageSquareHeart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'All Reports', href: '/dashboard/history', icon: FileText },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);
    const isSidebarCollapsed = useSelector((state: RootState) => state.ui.isSidebarCollapsed);

    return (
        <>
            {/* Mobile overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => dispatch(toggleSidebar())}
                />
            )}

            {/* Sidebar container */}
            <aside
                className={`fixed lg:sticky top-0 left-0 z-50 h-screen bg-card border-r border-border transform transition-all duration-300 ease-in-out lg:transform-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } ${isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'} w-64 flex flex-col font-sans overflow-hidden`}
            >
                {/* Mobile Header */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-border lg:hidden">
                    <span className="font-bold text-foreground font-syne tracking-tight">Menu</span>
                    <button onClick={() => dispatch(toggleSidebar())} className="p-2 -mr-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-black/5 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Brand Area */}
                <div className="h-16 flex items-center px-4 border-b border-border shrink-0">
                    <Link href="/" className={`flex items-center gap-2.5 group overflow-hidden ${isSidebarCollapsed ? 'lg:justify-center lg:w-full' : 'px-2'}`}>
                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-primary group-hover:bg-orange-100 transition-colors shrink-0">
                            <Zap size={18} fill="currentColor" />
                        </div>
                        {!isSidebarCollapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="font-syne font-bold text-[17px] text-foreground tracking-tight whitespace-nowrap"
                            >
                                Review<span className="text-primary">AI</span>
                            </motion.span>
                        )}
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-6 no-scrollbar transition-all duration-300">
                    {/* Main Navigation */}
                    <div className="flex flex-col gap-1">
                        {!isSidebarCollapsed && (
                            <div className="px-3 mb-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                                Menu
                            </div>
                        )}
                        <nav className="flex flex-col gap-0.5">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`relative flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200 rounded-xl ${isActive
                                            ? 'text-primary bg-[#FFF2ED]'
                                            : 'text-secondary hover:text-foreground hover:bg-black/[0.02]'
                                            } ${isSidebarCollapsed ? 'justify-center lg:px-0' : ''}`}
                                        title={isSidebarCollapsed ? item.name : ''}
                                    >
                                        <item.icon size={18} className={`${isActive ? 'text-primary' : 'text-muted-foreground'} shrink-0`} strokeWidth={isActive ? 2.5 : 2} />
                                        {!isSidebarCollapsed && (
                                            <span className="whitespace-nowrap">{item.name}</span>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {!isSidebarCollapsed && <div className="h-px bg-border mx-3" />}

                    {/* Extension Status Card */}
                    <div className="flex flex-col gap-1 px-3">
                        {!isSidebarCollapsed && (
                            <div className="mb-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                                Extension
                            </div>
                        )}
                        <div className={`rounded-xl border border-border bg-card shadow-[0_1px_3px_rgba(0,0,0,0.02)] ${isSidebarCollapsed ? 'p-2 flex justify-center' : 'p-3'}`}>
                            <div className={`flex items-center gap-2 ${isSidebarCollapsed ? 'justify-center' : 'mb-1.5'}`}>
                                <div className="w-5 h-5 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line></svg>
                                </div>
                                {!isSidebarCollapsed && <span className="text-sm font-medium text-foreground whitespace-nowrap">Chrome Extension</span>}
                            </div>
                            {!isSidebarCollapsed && (
                                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium transition-opacity duration-300">
                                    <Check size={14} /> Installed
                                </div>
                            )}
                        </div>
                    </div>

                    {!isSidebarCollapsed && <div className="h-px bg-border mx-3" />}

                    {/* Usage Meter */}
                    {!isSidebarCollapsed ? (
                        <div className="flex flex-col gap-3 px-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-muted-foreground">Usage</span>
                                <span className="text-xs font-mono text-foreground">4 / 10 analyses</span>
                            </div>
                            <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: '40%' }} />
                            </div>
                            <button className="cursor-pointer w-full py-2 px-3 text-sm font-medium text-primary-foreground bg-primary hover:bg-[#E85A25] rounded-lg transition-colors shadow-sm whitespace-nowrap">
                                Upgrade to Pro
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 px-1">
                            <div className="w-1.5 h-8 bg-black/5 rounded-full overflow-hidden relative">
                                <div className="absolute bottom-0 w-full bg-primary" style={{ height: '40%' }} />
                            </div>
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-[#E85A25] shadow-sm transition-colors">
                                <Zap size={14} />
                            </button>
                        </div>
                    )}

                    {!isSidebarCollapsed && <div className="h-px bg-border mx-3" />}

                    {/* Feedback Trigger */}
                    <div className="px-3">
                        <button
                            onClick={() => dispatch(setFeedbackModalOpen(true))}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 cursor-pointer text-sm font-medium transition-all duration-200 rounded-xl text-secondary hover:text-primary hover:bg-orange-50/50 group ${isSidebarCollapsed ? 'justify-center lg:px-0' : ''}`}
                            title={isSidebarCollapsed ? 'Give Feedback' : ''}
                        >
                            <MessageSquareHeart size={18} className="text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                            {!isSidebarCollapsed && (
                                <span className="whitespace-nowrap">Give Feedback</span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Bottom Section: Profile & Toggle */}
                <div className={`mt-auto border-t border-border bg-card/50 backdrop-blur-sm transition-all duration-300 ${isSidebarCollapsed ? 'p-2' : 'p-3'}`}>
                    <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-black/[0.02] transition-colors cursor-pointer border border-transparent hover:border-border ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}>
                        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-syne font-bold text-sm shadow-sm ring-2 ring-white shrink-0">
                            A
                        </div>
                        {!isSidebarCollapsed && (
                            <div className="flex flex-col overflow-hidden min-w-0">
                                <span className="text-sm font-semibold text-foreground truncate">Amin</span>
                                <span className="text-xs text-muted-foreground truncate">Free Tier</span>
                            </div>
                        )}
                    </div>

                    <div className={`mt-2 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-end'}`}>
                        <button
                            onClick={() => dispatch(toggleCollapsed())}
                            className={`p-2 text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-lg transition-all transform duration-300 ${isSidebarCollapsed ? 'bg-orange-50/50 text-primary' : ''}`}
                            title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                        >
                            {isSidebarCollapsed ? (
                                <PanelLeftOpen size={18} className="animate-in fade-in zoom-in duration-300" />
                            ) : (
                                <PanelLeftClose size={18} className="animate-in fade-in zoom-in duration-300" />
                            )}
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
