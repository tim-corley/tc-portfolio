'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import Logo from 'app/components/logo/Logo'

const navItems = {
  '/': {
    name: 'home',
  },
  '/about': {
    name: 'about',
  },
  '/notes': {
    name: 'notes',
  },
  '/projects': {
    name: 'projects',
  },
  '/contact': {
    name: 'contact',
  },
}

export function Navbar() {
  const cx = (...classes) => classes.filter(Boolean).join(' ')
  const pathname = usePathname();
  return (
    <aside className="mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-center relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <Link href="/">
              <Logo />
          </Link>
          <div className="flex flex-row space-x-0 pr-10 ml-4">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                    className={cx(
                    "transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1",
                    pathname === path && "font-bold"
                  )}
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}
