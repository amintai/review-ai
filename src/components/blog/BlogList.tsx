'use client';

import { BlogPost } from '@/lib/blog-posts';
import Link from 'next/link';
import { useState, useMemo } from 'react';

interface BlogListProps {
    posts: BlogPost[];
    categories: string[];
}

export default function BlogList({ posts, categories }: BlogListProps) {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredPosts = useMemo(() => {
        if (selectedCategory === 'All') return posts;
        return posts.filter(post => post.category === selectedCategory);
    }, [selectedCategory, posts]);

    const featuredPost = filteredPosts[0];
    const remainingPosts = filteredPosts.slice(1);

    return (
        <>
            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-blue-300'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Featured Post Hero */}
            {featuredPost && (
                <Link href={`/blog/${featuredPost.slug}`} className="group block mb-12">
                    <article className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-blue-900/20 overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-xs font-bold tracking-wider uppercase bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                    Featured
                                </span>
                                <span className="text-xs font-bold tracking-wider uppercase bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                    {featuredPost.category}
                                </span>
                                <span className="text-xs text-blue-100 font-medium">• {featuredPost.readTime}</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight group-hover:text-blue-100 transition-colors">
                                {featuredPost.title}
                            </h2>

                            <p className="text-blue-100 text-lg mb-8 max-w-3xl leading-relaxed">
                                {featuredPost.excerpt}
                            </p>

                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold backdrop-blur-sm">
                                        {featuredPost.author[0]}
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium text-white">{featuredPost.author}</span>
                                        <span className="text-blue-200 mx-2">•</span>
                                        <span className="text-blue-200">{featuredPost.date}</span>
                                    </div>
                                </div>

                                <span className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all">
                                    Read Article
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </article>
                </Link>
            )}

            {/* Remaining Posts Grid */}
            {remainingPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {remainingPosts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} className="group block h-full">
                            <article className="h-full bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1 flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="mb-4 flex items-center gap-2">
                                    <span className="text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-2.5 py-1 rounded-full">
                                        {post.category}
                                    </span>
                                    <span className="text-xs text-gray-400 font-medium">• {post.readTime}</span>
                                </div>

                                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                                    {post.title}
                                </h2>

                                <p className="text-gray-500 mb-6 line-clamp-2 leading-relaxed text-sm flex-grow">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto flex items-center gap-3 pt-4 border-t border-gray-50">
                                    <div className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                        {post.author[0]}
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium text-gray-900">{post.author}</span>
                                        <span className="text-gray-400 mx-2">•</span>
                                        <span className="text-gray-500">{post.date}</span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-gray-500 text-lg">No posts found in this category.</p>
                    <button
                        onClick={() => setSelectedCategory('All')}
                        className="mt-4 text-blue-600 font-medium hover:text-blue-700"
                    >
                        View all posts
                    </button>
                </div>
            )}
        </>
    );
}
