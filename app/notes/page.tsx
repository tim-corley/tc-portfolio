import { Notes } from 'app/components/notes'

export const metadata = {
  title: 'notes',
  description: 'Read my notes.',
}

export default function NotesPage() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Notes</h1>
      <Notes />
    </section>
  )
}
