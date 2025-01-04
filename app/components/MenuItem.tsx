import Link from 'next/link'
import { TypeIcon as type, LucideIcon } from 'lucide-react'

interface MenuItemProps {
  icon: LucideIcon
  text: string
  link: string
  active?: boolean
}

export default function MenuItem({ icon: Icon, text, link, active }: MenuItemProps) {
  return (
    <Link href={link}>
      <div className={`flex items-center hover:bg-gray-100 p-3 rounded-lg ${active ? 'bg-gray-100' : ''}`}>
        <div className="flex items-center">
          <Icon 
            size={24} 
            color={active ? '#d6191e' : '#1a1819'} 
            className={active ? 'text-[#d6191e]' : 'text-[#1a1819]'}
          />
          <span className={`hidden md:block pl-[9px] mt-0.5 font-semibold text-[16px] ${
            active ? 'text-[#d6191e]' : 'text-[#1a1819]'
          }`}>
            {text}
          </span>
        </div>
      </div>
    </Link>
  )
}