import { getNotes } from '@/app/notes/utils'

export const baseUrl = 'https://www.tim-corley.dev'

export default async function sitemap() {
  const notes = (await getNotes()).map((note) => ({
    url: `${baseUrl}/notes/${note.slug}`,
    lastModified: note.metadata.updatedAt,
  }));

  let routes = ['', '/notes'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...notes]
}
