import siteMetadata from '@/data/siteMetadata'

export default function Audit() {
  return (
    <div className="flex content-container">
      <iframe
        title="Lighthouse Audit Report"
        className="w-full h-full border-2 border-gray-200 border-opacity-60 dark:border-gray-700 rounded-md shadow-md overflow-hidden"
        // className="flex w-full"
        // height="100vh"
        // height="560"
        src={siteMetadata.lighthouseAudit}
      ></iframe>
    </div>
  )
}
