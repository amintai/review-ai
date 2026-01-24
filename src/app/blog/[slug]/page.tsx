import { getPostBySlug, getPostSlugs, BlogPost } from '@/lib/blog-posts';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = (await params).slug;
    try {
        const post = getPostBySlug(slug);

        return {
            title: `${post.title} | ReviewAI Blog`,
            description: post.excerpt,
            openGraph: {
                title: post.title,
                description: post.excerpt,
                type: 'article',
                publishedTime: post.date,
                authors: [post.author],
            },
        };
    } catch (e) {
        return {
            title: 'Post Not Found | ReviewAI',
        };
    }
}

export async function generateStaticParams() {
    const slugs = getPostSlugs();
    return slugs.map((slug) => ({
        slug: slug.replace(/\.mdx$/, ''),
    }));
}

export default async function BlogPostPage({ params }: Props) {
    const slug = (await params).slug;
    let post: BlogPost;

    try {
        post = getPostBySlug(slug);
    } catch (e) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <article className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
                <header className="mb-12 text-center max-w-3xl mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Link href="/blog" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
                            Blog
                        </Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                            {post.category}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-6 text-left border-y border-gray-100 py-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                                {post.author[0]}
                            </div>
                            <div>
                                <div className="font-bold text-gray-900 text-sm">{post.author}</div>
                                <div className="text-gray-500 text-xs">{post.role}</div>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Published</span>
                            <span className="text-sm text-gray-900">{post.date}</span>
                        </div>
                        <div className="hidden md:flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Read Time</span>
                            <span className="text-sm text-gray-900">{post.readTime}</span>
                        </div>
                    </div>
                </header>

                <div className="prose prose-blue prose-lg max-w-none mx-auto
                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                    prose-p:text-gray-600 prose-p:leading-relaxed
                    prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-gray-700
                    prose-li:text-gray-600
                    hover:prose-a:text-blue-700">
                    <MDXRemote source={post.content} components={{ Link }} />
                </div>

                <div className="mt-20 pt-10 border-t border-gray-200">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl shadow-blue-900/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">Start turning reviews into revenue</h3>
                            <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">
                                Stop struggling with writers block. Get professional, SEO-optimized responses in seconds with ReviewAI.
                            </p>
                            <Link href="/#demo" className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-full transition-all hover:shadow-lg transform hover:-translate-y-0.5">
                                Try Live Demo
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        headline: post.title,
                        description: post.excerpt,
                        image: [
                            `https://reviewai.pro/og-image.png` // Fallback or dynamic value
                        ],
                        datePublished: post.date, // Format like ISO 8601 if possible, but raw string might be accepted
                        author: {
                            '@type': 'Person',
                            name: post.author,
                        },
                        publisher: {
                            '@type': 'Organization',
                            name: 'ReviewAI',
                            logo: {
                                '@type': 'ImageObject',
                                url: 'https://reviewai.pro/logo.png'
                            }
                        }
                    })
                }}
            />
            <Footer />
        </main>
    );
}
