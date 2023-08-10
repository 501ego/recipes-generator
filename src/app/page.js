import { CreateRecipe } from './components/recipes'
export const runtime = 'edge'
export default function Home() {
  return (
    <main className="relative w-full flex items-end justify-center h-[calc(100dvh)]">
      <CreateRecipe />
    </main>
  )
}
