import SocialIcon from '@/components/social/index'

export const metadata = {
  title: 'About',
  description: 'A bit about me.',
}

export default function AboutPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">About Me</h1>
      <p>Hello! I’m building with Next.js 15 🚀</p>
      <div className="flex gap-4">
        <SocialIcon kind="mail" href="mailto:me@example.com" size={6} />
        <SocialIcon kind="github" href="https://github.com/myprofile" size={6} />
        <SocialIcon kind="linkedin" href="https://linkedin.com/in/myprofile" size={6} />
        <SocialIcon kind="twitter" href="https://twitter.com/myprofile" size={6} />
      </div>
    </div>
  )
}