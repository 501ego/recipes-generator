import { CreateRecipe } from './components/recipes'
export const runtime = 'edge'
export default function Home() {
  return (
    <main className="relative w-full min-h-screen flex items-end justify-center">
      <CreateRecipe />
    </main>
  )
}
