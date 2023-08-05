'use client'

import { useCompletion } from 'ai/react'
import { formatCompletion } from './formatter'

export function CreateRecipe() {
  const { completion, input, handleInputChange, handleSubmit } = useCompletion({
    api: '/api/chat',
  })

  const formattedCompletion = formatCompletion(completion)

  return (
    <main className="mx-auto max-w-xl flex flex-col px-8">
      <div className="border-2 bg-zinc-100 border-zinc-700 py-5 px-5 rounded-md shadow-md shadow-zinc-600">
        {completion ? (
          <p className="text-sm text-justify p-1">{formattedCompletion}</p>
        ) : (
          <p className="text-sm text-center p-1">
            Ingrese los Ingredientes que tenga Disponibles en su despensa{' '}
          </p>
        )}
      </div>
      <h4 className="text-gray-700 text-center mt-7 ">
        Lista de Ingredientes:
      </h4>
      <form
        aria-label="ingredientes-form"
        onSubmit={handleSubmit}
        className="flex justify-center text-center mt-1 relative"
      >
        <label className="block">
          <input
            aria-label="ingredientes"
            type="text"
            className="py-2 px-4 border text-slate-500 border-black rounded-l-lg flex-grow shadow-sm shadow-black focus:outline-none focus:shadow-md focus:shadow-black"
            placeholder='Ejemplo: "1 taza de harina de trigo"'
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <button
          aria-label="enviar"
          type="submit"
          className="bg-blue-400 hover:bg-blue-500 text-black shadow-sm shadow-black font-semibold py-2 px-4 rounded-r-lg focus:outline-none border border-black focus:shadow-md focus:shadow-slate-300"
        >
          Send
        </button>
      </form>
    </main>
  )
}
