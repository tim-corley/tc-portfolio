import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { PageSeo } from '@/components/SEO'

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

            {/* <div className="flex pt-6 space-x-3">
              <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
              <SocialIcon kind="github" href={siteMetadata.github} />
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
              <SocialIcon kind="twitter" href={siteMetadata.twitter} />
            </div> */}
          </div>
          <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">
            <h1 className="text-4xl font-quicksand font-bold leading-8 tracking-tight">
              Get in touch...
            </h1>
            <form className="w-full max-w-lg">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label htmlFor="name" className="text-2xl font-quicksand font-bold">
                    Name
                  </label>
                  <input
                    aria-label="Name Input"
                    type="text"
                    placeholder="Your Name"
                    className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label htmlFor="name" className="text-2xl font-quicksand font-bold">
                    Email
                  </label>
                  <input
                    aria-label="Email Input"
                    type="mail"
                    placeholder="Your Email Address"
                    className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label htmlFor="name" className="text-2xl font-quicksand font-bold">
                    Message
                  </label>
                  <textarea
                    aria-label="Message Input"
                    placeholder="Your Message"
                    className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>

              <div className="flex">
                <button
                  className="bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-400 text-white text-2xl font-quicksand font-bold py-2 px-4 rounded-lg"
                  type="button"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
