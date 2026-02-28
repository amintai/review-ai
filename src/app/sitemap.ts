import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reviewai.pro';
    const currentDate = new Date();

    // Get all posts for sitemap
    const blogPosts = getAllPosts();

    const posts = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/login`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/#features`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/#demo`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/fakespot-alternative`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.95,
        },
        {
            url: `${baseUrl}/reviewmeta-alternative`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.95,
        },
        {
            url: `${baseUrl}/ratebud-alternative`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.95,
        },
        {
            url: `${baseUrl}/thereviewindex-alternative`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.95,
        },
        ...posts,
    ];
}
