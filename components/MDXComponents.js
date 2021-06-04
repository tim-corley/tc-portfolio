import Image from 'next/image'
import dynamic from 'next/dynamic'
import CustomLink from './Link'

const MDXComponents = {
  Image,
  a: CustomLink,
  TestComponent: dynamic(() => import('./TestComponent')),
}

export default MDXComponents
