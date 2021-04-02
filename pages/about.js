import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { PageSeo } from '@/components/SEO'

export default function About() {
  return (
    <>
      <PageSeo
        title={`About | ${siteMetadata.author}`}
        description={`About Me | ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/about`}
      />
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-quicksand font-extrabold leading-9 tracking-wide text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8 space-x-2">
            <img src={siteMetadata.image} alt="profile" className="w-48 h-48 rounded-full" />
            <h3 className="pt-4 pb-2 text-2xl font-quicksand font-bold leading-8 tracking-normal">
              {siteMetadata.author}
            </h3>
            <div className="font-quicksand text-gray-600 dark:text-gray-400">
              Test Automation Engineer
            </div>
            <div className="font-quicksand text-gray-600 dark:text-gray-400">Boston, MA</div>
            <div className="flex pt-6 space-x-3">
              <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
              <SocialIcon kind="github" href={siteMetadata.github} />
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
              <SocialIcon kind="twitter" href={siteMetadata.twitter} />
            </div>
          </div>
          <div className="pt-8 pb-8 prose font-roboto dark:prose-dark max-w-none xl:col-span-2">
            <p>
              Morbi sit amet erat magna. Quisque gravida tempor venenatis. Mauris sed lacinia mi,
              quis euismod nisi. Donec vulputate lacus sed eros varius eleifend. Suspendisse
              potenti. Suspendisse nibh arcu, dignissim non pulvinar id, dapibus eget lectus.
            </p>
            <p>
              Maecenas ultrices neque pulvinar imperdiet euismod. In accumsan fringilla purus, et
              rhoncus magna semper vitae. Vivamus tincidunt eget sapien vitae blandit. Nulla id urna
              lacinia, consectetur massa a, egestas felis.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique
              placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem
              nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
