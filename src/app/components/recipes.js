'use client'

import { useCompletion } from 'ai/react'
import { formatCompletion } from './formatter'
import { useEffect } from 'react'

export function CreateRecipe() {
  const { completion, input, handleInputChange, handleSubmit } = useCompletion({
    api: '/api/completion',
  })

  const formattedCompletion = formatCompletion(completion)

  useEffect(() => {
    if (completion) {
      console.log('completion', completion)
      formatCompletion(completion)
    }
  }, [completion])

  return (
    <main className="mx-auto flex flex-col px-2">
      <div className="ml-11 border bg-zinc-50 border-zinc-200 mt-1 text-zinc-900 rounded-md shadow-md shadow-zinc-500 mr-1 overflow-y-auto max-h-[75vh] xxxs:max-h-[90vh] md:w-[700px]">
        {completion ? (
          <p className="text-sm text-start p-1">{formattedCompletion}</p>
        ) : (
          <p className="font-bold text-center p-1">
            Ingrese los Ingredientes que tenga Disponibles en su despensa.
          </p>
        )}
      </div>

      <div className="flex justify-start flex-wrap mb-2 md:w-[744px]">
        <img
          src="/chef-icon.png"
          alt="vegan chef"
          className="w-[48px] h-[48px] mt-3"
        />
        <form
          aria-label="ingredientes-form"
          onSubmit={handleSubmit}
          className="flex justify-center text-center mt-5 relative flex-grow"
        >
          <label className="flex flex-grow">
            <input
              aria-label="ingredientes"
              type="text"
              className=" px-4 border border-zinc-600 text-sm text-slate-500 rounded-l-lg flex-grow focus:outline-none"
              placeholder='Ejemplo: "1 taza de harina de trigo"'
              value={input}
              onChange={handleInputChange}
            />
          </label>
          <button
            aria-label="enviar"
            type="submit"
            className="bg-indigo-400 hover:bg-indigo-500 text-zinc-900 font-semibold py-2 px-4 rounded-r-lg focus:outline-none border border-zinc-600 truncate"
          >
            Crear
          </button>
        </form>
      </div>
    </main>
  )
}
