import { createFileRoute } from '@tanstack/react-router'
import HomeUI from '@/components/HomeUI'

export const Route = createFileRoute('/')({ 
  component: Home 
})

function Home() {
  return <HomeUI />
}
