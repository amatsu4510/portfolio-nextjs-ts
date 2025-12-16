import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://shoat-portfolio.com';

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
    ];
}
