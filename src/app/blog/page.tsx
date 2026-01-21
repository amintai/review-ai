import { getAllPosts } from '@/lib/blog-posts';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata = {
    title: 'Review Management Blog | SEO & Reputation Tips - ReviewAI',
    description: 'Expert insights on review management, local SEO, reputation marketing, and response automation strategies.'
};

export default function BlogIndex() {
    const blogPosts = getAllPosts();

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 pb-2">
                        Review Management Insights
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Guides, tips, and strategies to master your online reputation and boost your local SEO.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {blogPosts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} className="group block h-full">
                            <article className="h-full bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1 flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="mb-4 flex items-center gap-3">
                                    <span className="text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full">
                                        {post.category}
                                    </span>
                                    <span className="text-xs text-gray-400 font-medium">• {post.readTime}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                                    {post.title}
                                </h2>
                                <p className="text-gray-500 mb-6 line-clamp-2 leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto flex items-center gap-3 pt-4 border-t border-gray-50">
                                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
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
            </div>
            <Footer />
        </main>
    );
}
