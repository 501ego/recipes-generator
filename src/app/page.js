import { CreateRecipe } from './components/recipes'
export const runtime = 'edge'
export default function Home() {
  return (
    <main className="fixed h-full flex items-end justify-center m-auto">
      <CreateRecipe />
    </main>
  )
}
