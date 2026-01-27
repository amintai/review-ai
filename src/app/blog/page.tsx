import { getAllPosts, BlogPost } from '@/lib/blog-posts';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import BlogList from '@/components/blog/BlogList';

export const metadata = {
    title: 'Review Management Blog | SEO & Reputation Tips - ReviewAI',
    description: 'Expert insights on review management, local SEO, reputation marketing, and response automation strategies.'
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
                        Review Management Insights
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Guides, tips, and strategies to master your online reputation and boost your local SEO.
                    </p>
                </div>

                <BlogList posts={blogPosts} categories={categories} />
            </div>
            <Footer />
        </main>
    );
}
