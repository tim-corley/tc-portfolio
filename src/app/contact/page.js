import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { PageSeo } from '@/components/SEO'
import ContactForm from '@/components/ContactForm'

export default function Contact() {
  return (
    <>
      <PageSeo
        title={`Contact | ${siteMetadata.author}`}
        description={`Get in touch | ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/contact`}
      />
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-title font-extrabold leading-9 tracking-wide text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Contact
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col pt-8 space-x-4">
            <h3 className="pt-4 pb-2 text-2xl font-title leading-8 tracking-normal">
              EMAIL
            </h3>
            <a
              href={`mailto:${siteMetadata.email}`}
              className="font-body text-gray-600 dark:text-gray-400"
            >
              {siteMetadata.email}
            </a>
            <h3 className="pt-4 pb-2 text-2xl font-title leading-8 tracking-normal">GITHUB</h3>
            <a href={siteMetadata.github} className="font-body text-gray-600 dark:text-gray-400">
              {siteMetadata.github}
            </a>
            <h3 className="pt-4 pb-2 text-2xl font-title leading-8 tracking-normal">
              LINKEDIN
            </h3>
            <a
              href={siteMetadata.linkedin}
              className="font-body text-gray-600 dark:text-gray-400"
            >
              {siteMetadata.linkedin}
            </a>
            <h3 className="pt-4 pb-2 text-2xl font-title leading-8 tracking-normal">TWITTER</h3>
            <a href={siteMetadata.twitter} className="font-body text-gray-600 dark:text-gray-400">
              {siteMetadata.twitter}
            </a>
            <div className="pt-4 xl:pt-8">
              <Link
                href={siteMetadata.resume}
                className="font-title text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                View Resume &rarr;
              </Link>
            </div>
          </div>
          <div className="pt-8 pb-8 ml-4 prose dark:prose-dark max-w-none xl:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  )
}
