import SocialIcon from '@/app/components/social/index'
import { siteMetadata } from "@/data/siteMetadata";

export const metadata = {
  title: 'Contact',
  description: 'Get in touch.',
}

export default function ContactPage() {
  return (
    <section className="py-12">
      <h1 className="font-semibold text-3xl mb-4">Contact</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Let’s connect — you can find me here:
      </p>
      <ul className="space-y-4">
          <li className="flex items-center gap-5 py-2">
            <SocialIcon kind="mail" href={siteMetadata.email} size={6} aria-label="Email" />
            <a href={`mailto:${siteMetadata.email}`} className="text-gray-700 dark:text-gray-300 hover:underline">
              Email
            </a>
          </li>
          <li className="flex items-center gap-5 py-2">
            <SocialIcon kind="github" href={siteMetadata.github} size={6} aria-label="GitHub" />
            <a href={siteMetadata.github} className="text-gray-700 dark:text-gray-300 hover:underline">
              GitHub
            </a>
          </li>
          <li className="flex items-center gap-5 py-2">
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} aria-label="LinkedIn" />
            <a href={siteMetadata.linkedin} className="text-gray-700 dark:text-gray-300 hover:underline">
              LinkedIn
            </a>
          </li>
          <li className="flex items-center gap-5 py-2">
            <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} aria-label="Twitter" />
            <a href={siteMetadata.twitter} className="text-gray-700 dark:text-gray-300 hover:underline">
              Twitter
            </a>
          </li>
        </ul>
    </section>
  )
}