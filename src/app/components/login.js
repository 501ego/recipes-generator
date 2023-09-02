import Link from 'next/link'
import { useState } from 'react'
import { getUserFromDB, loginUser } from '../../../utils/functions'

export default function Login({ setUserLogged, userData, setUserData }) {
  const [userPassword, setUserPassword] = useState('')

  const [message, setMessage] = useState(null)

  const handleUserEmail = async event => {
    const email = event.target.value
    const user = await getUserFromDB(email)
    if (user && user.email === email) {
      setUserData(user)
    } else {
      setUserData(null)
    }
  }

  const handleUserPassword = event => {
    const password = event.target.value
    setUserPassword(password)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (userData && userPassword) {
      const email = userData.email
      const password = userPassword
      const { success, message } = await loginUser(email, password)
      if (success) {
        setUserLogged(true)
        setUserPassword('')
      } else {
        setMessage(message)
      }
    }
    if (userData == null) {
      setMessage('Usuario no registrado')
    }
  }

  return (
    <section className="flex flex-col justify-center text-start h-screen P-2">
      <article className="flex flex-col py-5 px-5 rounded-md shadow-md shadow-zinc-800">
        <h1 className="text-center font-bold text-2xl mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 items-end">
            <div className="flex flex-row gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="border border-zinc-800 w-full rounded-sm"
                onChange={handleUserEmail}
              />
            </div>
            <div className="flex flex-row gap-2">
              <label htmlFor="password">Password</label>
              <input
                onChange={handleUserPassword}
                type="password"
                name="password"
                id="password"
                className="border border-zinc-800 w-full rounded-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-indigo-400 hover:bg-indigo-500 text-neutral-50 font-semibold py-2 rounded-md focus:outline-none border border-zinc-600 shadow-sm shadow-zinc-600 hover:shadow-none"
          >
            {message ? (
              <p className="text-base text-center">{message}</p>
            ) : (
              '¡A Cocinar!'
            )}
          </button>
        </form>
        <Link
          className="text-center text-sm  text-indigo-400 mt-4"
          href="/register"
        >
          Registro
        </Link>
      </article>
    </section>
  )
}
