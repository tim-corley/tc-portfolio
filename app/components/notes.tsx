import Link from 'next/link'
import { formatDate, getNotes } from '@/app/notes/utils'

export async function Notes() {
  let allNotes = await getNotes()

  return (
    <div>
      {allNotes
        .sort((a, b) => {
          if (
            new Date(a.metadata.updatedAt) > new Date(b.metadata.updatedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((note) => (
          <Link
            key={note.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/notes/${note.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row my-2 space-x-0 md:space-x-2">
              <p className="font-body text-xs text-neutral-600 dark:text-neutral-400 w-18 tabular-nums">
                {formatDate(note.metadata.updatedAt, false)}
              </p>
              <p className="font-title text-neutral-900 dark:text-neutral-100">
                {note.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
