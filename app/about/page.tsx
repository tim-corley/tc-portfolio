import { siteMetadata } from "@/data/siteMetadata";

export const metadata = {
  title: 'About',
  description: 'A bit about myself.',
}

export default function AboutPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">About Me</h1>
      <p>{siteMetadata.aboutme}</p>
    </div>
  )
}