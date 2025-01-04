import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
  src?: string
  name: string
  size?: number
}

export default function UserAvatar({ src, name, size = 32 }: UserAvatarProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()

  const styles = {
    width: size,
    height: size,
    minWidth: size // Add this to prevent shrinking
  }

  return (
    <Avatar style={styles}>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback delayMs={600}>{initials}</AvatarFallback>
    </Avatar>
  )
}









