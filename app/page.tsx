import { Notes } from 'app/components/notes'
import { siteMetadata } from "@/data/siteMetadata";

export default function HomePage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-title font-semibold tracking-wider">
        Tim's Website
      </h1>
      <p className="mb-4">{siteMetadata.welcomemsg}</p>
      <div className="my-8">
        <p className="text-xl font-title font-semibold mb-4">Recent Notes...</p>
        <Notes />
      </div>
    </section>
  )
}
