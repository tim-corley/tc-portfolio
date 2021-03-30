import siteMetadata from '@/data/siteMetadata'
import { PageSeo } from '@/components/SEO'
import ContactForm from '@/components/ContactForm'

export default function Contact() {
  return (
    <>
      <PageSeo
        title={`About - ${siteMetadata.author}`}
        description={`About me - ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/contact`}
      />
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-quicksand font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Contact
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col pt-8 space-x-4">
            <h3 className="pt-4 pb-2 ml-4 text-2xl font-quicksand font-bold leading-8 tracking-tight">
              EMAIL
            </h3>
            <a href={`mailto:${siteMetadata.email}`} className="text-gray-500 dark:text-gray-400">
              {siteMetadata.email}
            </a>
            <h3 className="pt-4 pb-2 text-2xl font-quicksand font-bold leading-8 tracking-tight">
              GITHUB
            </h3>
            <a href={siteMetadata.github} className="text-gray-500 dark:text-gray-400">
              {siteMetadata.github}
            </a>
            <h3 className="pt-4 pb-2 text-2xl font-quicksand font-bold leading-8 tracking-tight">
              LINKEDIN
            </h3>
            <a href={siteMetadata.linkedin} className="text-gray-500 dark:text-gray-400">
              {siteMetadata.linkedin}
            </a>
            <h3 className="pt-4 pb-2 text-2xl font-quicksand font-bold leading-8 tracking-tight">
              TWITTER
            </h3>
            <a href={siteMetadata.twitter} className="text-gray-500 dark:text-gray-400">
              {siteMetadata.twitter}
            </a>
          </div>
          <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  )
}
