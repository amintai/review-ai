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
                    <article className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl shadow-blue-900/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-900/20">
                        <div className="p-8 md:p-12">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs font-bold tracking-wider uppercase bg-white text-blue-600 px-3 py-1.5 rounded-full shadow-lg">
                                    Featured
                                </span>
                                <span className="text-xs font-bold tracking-wider uppercase bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
                                    {featuredPost.category}
                                </span>
                                <span className="text-xs text-white/90 font-medium ml-2">• {featuredPost.readTime}</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-white group-hover:text-blue-100 transition-colors">
                                {featuredPost.title}
                            </h2>

                            <p className="text-white/90 text-lg mb-6 max-w-3xl leading-relaxed">
                                {featuredPost.excerpt}
                            </p>

                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-sm font-bold text-white shadow-lg">
                                        {featuredPost.author[0]}
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium text-white">{featuredPost.author}</span>
                                        {featuredPost.role && (
                                            <>
                                                <span className="text-white/60 mx-2">•</span>
                                                <span className="text-white/80">{featuredPost.role}</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <span className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg group-hover:bg-white/20 transition-all">
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
                            <article className="h-full bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1 flex flex-col relative overflow-hidden">
                                {/* Post Image */}
                                {post.image && (
                                    <div className="relative h-48 overflow-hidden">
                                        <img 
                                            src={post.image} 
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className="text-xs font-bold tracking-wider text-white uppercase bg-blue-600 px-2.5 py-1 rounded-full shadow-lg">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
                                        <span className="font-medium">{post.readTime}</span>
                                        <span>•</span>
                                        <span>{post.date}</span>
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                                        {post.title}
                                    </h2>

                                    <p className="text-gray-500 mb-6 line-clamp-3 leading-relaxed text-sm flex-grow">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center gap-3 pt-4 border-t border-gray-50">
                                        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                                            {post.author[0]}
                                        </div>
                                        <div className="text-sm">
                                            <span className="font-medium text-gray-900">{post.author}</span>
                                        </div>
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
