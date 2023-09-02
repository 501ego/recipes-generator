import '../src/app/globals.css'
import { useRouter } from 'next/router'
import { saveUserToDB } from '../utils/functions'

export default function Register() {
  const router = useRouter()

  const handleSubmit = async event => {
    event.preventDefault()
    const email = event.target.email.value
    const pass = event.target.password.value
    const user = { email, pass }
    await saveUserToDB(user)
    router.push('/')
  }

  return (
    <main className="relative w-full flex items-end justify-center h-[calc(100dvh)]">
      <section className="flex flex-col justify-center text-start h-screen P-2">
        <article className="flex flex-col py-5 px-5 rounded-md shadow-md shadow-zinc-800">
          <h1 className="text-center font-bold text-2xl mb-4">
            Registro de Usuario
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 items-end">
              <div className="flex flex-row gap-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border border-zinc-800 w-full rounded-sm"
                />
              </div>
              <div className="flex flex-row gap-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="border border-zinc-800 w-full rounded-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-indigo-400 hover:bg-indigo-500 text-zinc-900 font-semibold py-2 rounded-md focus:outline-none border border-zinc-600 shadow-sm shadow-zinc-600 hover:shadow-none"
            >
              Registrar
            </button>
          </form>
        </article>
      </section>
    </main>
  )
}
