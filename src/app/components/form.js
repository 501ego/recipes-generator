import Image from 'next/image'

export default function Form({
  input,
  handleInputChange,
  handleSubmit,
  setRecipeState,
  setFormattedRecipe,
}) {
  return (
    <section className="flex justify-start text-base md:text-sm flex-wrap mb-2 md:w-[744px]">
      <figure>
        <Image
          src="/chef-icon2.png"
          alt="Icon of a vegan chef"
          width={48}
          height={48}
          className="mt-3"
        />
      </figure>
      <form
        aria-label="Formulario de Ingredientes"
        onSubmit={values => {
          setFormattedRecipe(null)
          handleSubmit(values)
          setRecipeState({ state: 'unsaved', value: false })
        }}
        className="flex justify-center text-center mt-5 relative flex-grow"
      >
        <label className="flex text-[16px] flex-grow">
          <input
            aria-label="Ingresar ingredientes"
            name="ingredients"
            type="text"
            className=" px-4 border text-[16px]  border-zinc-600 text-sm text-slate-500 rounded-l-lg flex-grow focus:outline-none"
            placeholder='Ejemplo: "1 taza de harina de trigo"'
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <button
          aria-label="Enviar ingredientes"
          type="submit"
          className="bg-indigo-400 hover:bg-indigo-500 text-zinc-900 font-semibold py-2 px-4 rounded-r-lg focus:outline-none border border-zinc-600 truncate"
        >
          Crear
        </button>
      </form>
    </section>
  )
}
