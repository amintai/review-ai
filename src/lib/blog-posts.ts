import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/_posts');

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    role: string;
    readTime: string;
    category: string;
    content: string;
    keywords?: string[];
    [key: string]: any;
}

export function getPostSlugs() {
    return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): BlogPost {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        content,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        author: data.author,
        role: data.role,
        readTime: data.readTime,
        category: data.category,
        ...data,
    };
}

export function getAllPosts(): BlogPost[] {
    const slugs = getPostSlugs();
    const posts = slugs
        .filter((slug) => slug.endsWith('.mdx'))
        .map((slug) => getPostBySlug(slug))
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}

// Keep the array export for backward compatibility if needed, but usage should switch to getAllPosts
export const blogPosts = getAllPosts();
