import { MetadataRoute } from 'next';
import { getSortedPostsData } from './lib/blog/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://shoat-portfolio.com';

    /* ブログ記事のメタデータ取得 */
    const posts = await getSortedPostsData();

    /* 動的ページのURL配列を作成 */
    const postUrls = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: post.update,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
        },
        ...postUrls,
    ];
}
