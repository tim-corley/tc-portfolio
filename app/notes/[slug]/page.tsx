import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getNotes } from '@/app/notes/utils'
import { baseUrl } from 'app/sitemap'

export async function generateStaticParams() {
  let notes = await getNotes()

  return notes.map((note) => ({
    slug: note.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let notes = await getNotes()
  let note = notes.find((note) => note.slug === slug)
  if (!note) {
    return
  }

  let {
    title,
    updatedAt: updatedAt,
    summary: description,
    image,
  } = note.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      updatedAt,
      url: `${baseUrl}/notes/${note.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function notes({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let notes = await getNotes()
  let note = notes.find((note) => note.slug === slug)

  if (!note) {
    notFound()
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'notesnoteing',
            headline: note.metadata.title,
            datePublished: note.metadata.updatedAt,
            dateModified: note.metadata.updatedAt,
            description: note.metadata.summary,
            image: note.metadata.image
              ? `${baseUrl}${note.metadata.image}`
              : `/og?title=${encodeURIComponent(note.metadata.title)}`,
            url: `${baseUrl}/notes/${note.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {note.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(note.metadata.updatedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={note.content} />
      </article>
    </section>
  )
}
