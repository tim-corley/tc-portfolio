import Link from '@/components/Link'

export default function FourZeroFour() {
  return (
    <div className="flex flex-col items-start justify-start md:justify-center md:items-center md:flex-row md:space-x-6 md:mt-24">
      <div className="pt-6 pb-8 space-x-2 md:space-y-5">
        <h1 className="text-6xl font-quicksand font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:text-8xl md:leading-14 md:border-r-2 md:px-6">
          404
        </h1>
      </div>
      <div className="max-w-md">
        <p className="mb-4 text-xl font-quicksand font-bold leading-normal md:text-2xl">
          Sorry we couldn't find this page.
        </p>
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-400 text-white text-2xl font-quicksand tracking-normal disabled:opacity-50 py-2 px-4 rounded-lg">
            Back to Homepage
          </button>
        </Link>
      </div>
    </div>
  )
}
