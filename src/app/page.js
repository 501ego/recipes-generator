import { CreateRecipe } from './components/recipes'
export const runtime = 'edge'
export default function Home() {
  return (
    <main className="grid place-content-center h-screen">
      <CreateRecipe />
    </main>
  )
}
