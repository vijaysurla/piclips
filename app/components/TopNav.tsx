'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { BiSearch } from 'react-icons/bi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSession, signIn, signOut } from 'next-auth/react'
import UserAvatar from './UserAvatar'
import { users } from '../data/sampleData'

export default function TopNav() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<typeof users>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const { data: session, status } = useSession()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowSuggestions(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    if (value.trim()) {
      const filteredUsers = users.filter(user => 
        user.username.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5)
      setSuggestions(filteredUsers)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (username: string) => {
    router.push(`/profile/${username}`)
    setSearchQuery('')
    setShowSuggestions(false)
  }

  const handleAuth = () => {
    if (session) {
      signOut()
    } else {
      signIn('google')
    }
  }

  return (
    <div className="fixed z-30 flex items-center w-full border-b h-[60px] bg-white">
      <div className="flex items-center justify-between gap-4 w-full px-4 mx-auto max-w-[1200px]">
        <Link href="/" className="flex items-center w-[90px] md:w-[240px] justify-center lg:justify-start">
          <div className="flex items-center">
            <Image
              src="/piclips-logo-transparent.png"
              alt="PICLIPS Logo"
              width={140}
              height={45}
              className="object-contain"
              priority
            />
          </div>
        </Link>

        <div className="relative hidden md:block w-full max-w-[380px]" ref={searchRef}>
          <form onSubmit={handleSearch} className="relative flex items-center bg-[#F1F1F2] rounded-full">
            <Input 
              type="text"
              placeholder="Search users..."
              className="w-full pl-3 pr-10 py-2 bg-transparent placeholder-[#838383] text-[15px] focus:outline-none border-none rounded-full"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
            />
            <Button type="submit" size="sm" variant="ghost" className="absolute right-0 px-3 py-1">
              <BiSearch size="22" color="#838383"/>
            </Button>
          </form>
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10">
              {suggestions.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(user.username)}
                >
                  <UserAvatar src={user.image} name={user.name} size={32} />
                  <div className="ml-2">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.username}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 min-w-[180px] justify-end">
          <Button 
            variant="outline" 
            className="hover:bg-gray-100"
            onClick={() => router.push('/upload')}
          >
            Upload
          </Button>
          {status === 'loading' ? (
            <Button disabled>Loading...</Button>
          ) : session ? (
            <div className="flex items-center gap-2">
              <UserAvatar src={session.user?.image || undefined} name={session.user?.name || 'User'} size={32} />
              <Link
                href={`/profile/${session.user?.name?.replace(/\s+/g, '').toLowerCase()}`}
                className="text-sm hover:underline mr-4"
              >
                Profile
              </Link>
              <Button 
                variant="ghost"
                onClick={handleAuth}
                className="text-sm"
              >
                Sign out
              </Button>
            </div>
          ) : (
            <Button 
              className="bg-[#d6191e] hover:bg-[#b31419] text-white"
              onClick={handleAuth}
            >
              Log in
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}











