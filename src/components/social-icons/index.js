import Mail from '@/components/social-icons/mail.svg'
import Github from '@/components/social-icons/github.svg'
import Linkedin from '@/components/social-icons/linkedin.svg'
import Twitter from '@/components/social-icons/twitter.svg'

// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
}

const SocialIcon = ({ kind, href, size = 8 }) => {
  if (!href) return null

  const SocialSvg = components[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 h-${size} w-${size}`}
      />
    </a>
  )
}

export default SocialIcon
