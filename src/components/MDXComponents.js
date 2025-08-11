import Image from 'next/image'
import dynamic from 'next/dynamic'
import CustomLink from './Link'

const MDXComponents = {
  Image,
  a: CustomLink,
  EmbedCodepen: dynamic(() => import('./EmbedCodepen')),
}

export default MDXComponents
