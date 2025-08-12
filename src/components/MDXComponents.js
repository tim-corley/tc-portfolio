import Image from 'next/image'
import CustomLink from './Link'

const MDXComponents = {
  Image,
  a: CustomLink,
  // Customization for lists
  ul: ({ children }) => <ul className="list-disc list-inside">{children}</ul>,
  li: ({ children }) => <li>{children}</li>,
}

export default MDXComponents
