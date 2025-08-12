import Image from 'next/image'
import Link from '@/components/Link'

const Card = ({ title, description, imgSrc, code, demo }) => (
  <div className="p-4 md:w-1/2 md" style={{ maxWidth: '544px' }}>
    <div className="h-full border-2 border-gray-200 border-opacity-60 dark:border-gray-700 rounded-md overflow-hidden">
      {code ? (
        <Link href={code} aria-label={`Link to ${title}`}>
          <Image
            alt={title}
            src={imgSrc}
            className="lg:h-48 md:h-36 object-cover object-center"
            width={544}
            height={306}
          />
        </Link>
      ) : (
        <Image
          alt={title}
          src={imgSrc}
          className="lg:h-48 md:h-36 object-cover object-center"
          width={544}
          height={306}
        />
      )}
      <div className="p-6">
        <h2 className="text-2xl font-title font-bold leading-8 tracking-tight mb-3">
          {code ? (
            <Link href={code} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="font-body font-thin prose text-gray-500 max-w-none dark:text-gray-400 mb-3">{description}</p>
        {code && (
          <Link
            href={code}
            className="text-base font-title font-medium leading-6 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label={`Link to ${title}`}
          >
            Code &rarr;
          </Link>
        )}
        {demo && (
          <Link
            href={demo}
            className="text-base font-title font-medium leading-6 ml-6 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label={`Link to ${title}`}
          >
            Demo &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
