const BASE_URL = 'https://artyfacets.com'

export default async function sitemap() {
    const site = [
        {
            url: BASE_URL,
            lastModified: new Date()
        },
        {
            url: `${BASE_URL}/#about-us`,
            lastModified: new Date()
        },
        {
            url: `${BASE_URL}/#coursestitle`,
            lastModified: new Date()
        },
        {
            url: `${BASE_URL}/contact-us`,
            lastModified: new Date()
        },
        {
            url: `${BASE_URL}/gallery`,
            lastModified: new Date()
        },
    ]
    return site
}