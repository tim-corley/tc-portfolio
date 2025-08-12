'use client';

import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { PageSeo } from '@/components/SEO'
import Image from 'next/image'

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
          <h1 className="text-3xl font-title font-extrabold leading-9 tracking-wide text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About Me
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8 space-x-2">
            <Image src={siteMetadata.image} alt="profile" width={192} height={192} className="w-48 h-48 rounded-full" />
            <h3 className="pt-4 pb-2 text-2xl font-title font-bold leading-8 tracking-normal">
              {siteMetadata.author}
            </h3>
            <div className="font-title text-gray-600 dark:text-gray-400">
              Test Automation Engineer
            </div>
            <div className="font-title text-gray-600 dark:text-gray-400">Boston, MA</div>
            <div className="flex pt-6 space-x-3">
              <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
              <SocialIcon kind="github" href={siteMetadata.github} />
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
              <SocialIcon kind="twitter" href={siteMetadata.twitter} />
            </div>
            <div className="pt-4 xl:pt-8">
              <Link
                href={siteMetadata.resume}
                className="font-title text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                View Resume &rarr;
              </Link>
            </div>
          </div>
          <div className="pt-8 pb-8 prose font-body font-thin dark:prose-dark max-w-none xl:col-span-2">
            <p>
              I am primarily intertested in using technology to build things. Crafting delightful,
              smart, beautiful web products offers endless opportunities to learn, to plan, to piece
              puzzles together, to troubleshoot, and to strengthen skills - this is what drives me.
            </p>
            <p>
              Outside of QA & Web Development, I am into cooking, snowboarding, golfing, and going
              to see live music.
            </p>
            <p>
              I am primarily intertested in using technology to build things. Crafting delightful,
              smart, beautiful web products offers endless opportunities to learn, to plan, to piece
              puzzles together, to troubleshoot, and to strengthen skills - this is what drives me.
            </p>
            <p>
              Outside of QA & Web Development, I am into cooking, snowboarding, golfing, and going
              to see live music.
            </p>
            <p>Core Skills</p>
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>TypeScript</li>
              <li>React</li>
              <li>Node.js</li>
              <li>Postgres</li>
              <li>MongoDB</li>
              <li>Git</li>
              <li>Docker</li>
              <li>GCP</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
