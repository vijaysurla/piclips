'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import MenuItem from './MenuItem'
import { Home, Users, TrendingUp } from 'lucide-react'

export default function SideNav() {
  const pathname = usePathname()

  const mainMenu = [
    {
      icon: Home,
      text: 'For You',
      link: '/',
    },
    {
      icon: Users,
      text: 'Following',
      link: '/following',
    },
    {
      icon: TrendingUp,
      text: 'Trending',
      link: '/trending',
    },
  ]

  return (
    <div className="fixed z-20 bg-white h-full lg:border-r-0 w-[90px] md:w-[240px] overflow-auto flex flex-col pt-[60px]">
      <div className="w-full flex-1 py-4">
        <div className="w-full mx-auto">
          <div className="flex flex-col items-center md:items-start w-full">
            {mainMenu.map((item, index) => (
              <MenuItem 
                key={index} 
                icon={item.icon} 
                text={item.text} 
                link={item.link}
                active={pathname === item.link}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}