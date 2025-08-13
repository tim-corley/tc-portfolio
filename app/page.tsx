import { Notes } from 'app/components/notes'
import { siteMetadata } from "@/data/siteMetadata";

export default function HomePage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold tracking-wide">
        Tim's Website
      </h1>
      <p className="mb-4">{siteMetadata.welcomemsg}</p>
      <div className="my-8">
        <p className="font-extrabold mb-4">Recent Notes...</p>
        <Notes />
      </div>
    </section>
  )
}
