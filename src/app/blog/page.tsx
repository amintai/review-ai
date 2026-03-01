import { getAllPosts, BlogPost } from '@/lib/blog-posts';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import BlogList from '@/components/blog/BlogList';

export const metadata = {
    title: 'AI Shopping Insights & Amazon Product Verdicts | ReviewAI Blog',
    description: 'Expert guides on using AI for Amazon review analysis, product research, and smart shopping strategies.'
};

export default function BlogIndex() {
    const blogPosts = getAllPosts();
    const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Navbar />
            <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 pb-2">
                        Shop Smarter with AI - Writing Soon
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Deep dives into product sentiment, AI verdicts, and strategies to master your Amazon shopping experience.
                    </p>
                </div>

                <BlogList posts={blogPosts} categories={categories} />
            </div>
            <Footer />
        </main>
    );
}
