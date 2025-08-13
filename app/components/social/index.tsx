import Mail from './mail.svg'
import Github from './github.svg'
import Linkedin from './linkedin.svg'
import Twitter from './twitter.svg'
import { ComponentType, SVGProps } from 'react'

type SocialKind = 'mail' | 'github' | 'linkedin' | 'twitter'

interface SocialIconProps {
  kind: SocialKind
  href?: string
  size?: number // Tailwind size (e.g., 6 => h-6 w-6)
}

const components: Record<SocialKind, ComponentType<SVGProps<SVGSVGElement>>> = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
}

export default function SocialIcon({ kind, href, size = 8 }: SocialIconProps) {
  if (!href) return null
  const SocialSvg = components[kind]

  // Tailwind needs fixed size classes; for dynamic sizing, safelist or use inline style
  const sizeClasses = `h-${size} w-${size}`

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`transition-transform transform hover:scale-110 fill-current text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 ${sizeClasses}`}
      />
    </a>
  )
}