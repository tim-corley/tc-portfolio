import { Notes } from 'app/components/notes'
import { siteMetadata } from "@/data/siteMetadata";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold tracking-wide">
        Tim's Website
      </h1>
      {/* <p className="font-thin">IBM Plex Mono - Thin text. Does this look good?</p>
      <p className="font-bold">IBM Plex Mono - Bold text. yes / no</p>
      <p className="italic">IBM Plex Mono -  Italic text. pretty good?</p>
      <p className="font-semibold italic">IBM Plex Mono - Bold italic text. hows this one?</p>
      <p className="font-extrabold">IBM Plex Mono -  Extra bold text. foobar</p>
      <br className='my-4'/> */}
      <p className="mb-4">{siteMetadata.welcomemsg}</p>
      <div className="my-8">
        <p className="font-extrabold mb-4">Recent Notes...</p>
        <Notes />
      </div>
    </section>
  )
}
