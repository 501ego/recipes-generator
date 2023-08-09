'use client'

import { useCompletion } from 'ai/react'
import Form from './form'
import SideMenu from './menu'
import { formatCompletion } from './formatter'
import { parseRecipe } from '../../../utils/textToJson'
import { formatRecipe } from '../../../utils/jsonToText'
import { formatFullRecipe } from '../../../utils/formatFromDB'
import {
  saveRecipeToDB,
  deleteRecipeFromDB,
  getRecipesFromDB,
} from '../../../utils/functions'
import { useState, useEffect } from 'react'

export function CreateRecipe() {
  const [recipeState, setRecipeState] = useState({
    state: 'unsaved',
    value: false,
  })
  const [parsedRecipe, setParsedRecipe] = useState(null)
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [formattedRecipe, setFormattedRecipe] = useState(null)
  const { completion, input, handleInputChange, handleSubmit, isLoading } =
    useCompletion({
      api: '/api/completion',
    })
  const formattedCompletion = formatCompletion(completion)
  const fetchRecipes = async () => {
    const recipes = await getRecipesFromDB()
    setRecipes(recipes)
    console.log('Recipes fetched:', recipes.length)
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  //*

  useEffect(() => {
    if (selectedRecipe !== null) {
      const jsonToText = formatRecipe(selectedRecipe)
      const fullText = formatFullRecipe(jsonToText)
      const formattedFulltext = formatCompletion(fullText)
      setFormattedRecipe(formattedFulltext)
      setRecipeState({ state: 'saved', value: true })
    }
  }, [selectedRecipe])

  //*

  useEffect(() => {
    if (!isLoading && completion.includes('Título')) {
      const newParsedRecipe = parseRecipe(completion)
      setParsedRecipe(newParsedRecipe)
      setRecipeState(prevState => ({ ...prevState, value: true }))
    }
  }, [isLoading, completion])

  const handleSaveClick = async () => {
    if (parsedRecipe) {
      try {
        await saveRecipeToDB(parsedRecipe)
        setRecipeState({ state: 'saved', value: true })
        fetchRecipes()
      } catch (error) {
        console.error('Error saving the recipe:', error)
      }
    }
  }

  const handleDeleteClick = async () => {
    if (recipes && recipes.length > 0) {
      const recipeToDelete = recipes[recipes.length - 1]
      if (recipeToDelete && recipeToDelete._id) {
        try {
          await deleteRecipeFromDB(recipeToDelete._id)
          setRecipeState({ state: 'unsaved', value: true })
          setFormattedRecipe(null)
          setSelectedRecipe(null)
          fetchRecipes()
          window.location.reload()
        } catch (error) {
          console.error('Error deleting the recipe:', error)
        }
      }
    }
  }

  const renderCompletion = () => {
    if (!completion || formattedRecipe !== null) return null

    return (
      <article
        className="text-sm text-start p-1"
        aria-label="Recipe completion"
      >
        {recipeState.value &&
          (recipeState.state === 'unsaved' ? (
            <div className="flex justify-end">
              <button onClick={handleSaveClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-indigo-400 hover:text-indigo-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex justify-end">
              <button onClick={handleDeleteClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-indigo-400 hover:text-indigo-500"
                >
                  <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93zM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 013.75 21z" />
                </svg>
              </button>
            </div>
          ))}
        <br />
        {formattedCompletion}
      </article>
    )
  }

  const renderRecipePrompt = () => {
    if (completion || formattedRecipe !== null) return null

    return (
      <article>
        <h1 className="font-semibold text-center p-1 text-zinc-600">
          Ingrese los Ingredientes que tenga Disponibles en su despensa.
        </h1>
        <p className="text-sm text-zinc-600">
          También puede especificar el tipo de comida. Ejempo: Arroz, Tomate,
          Palta, lentejas, tofu. Tipo de comida : cena
        </p>
      </article>
    )
  }

  const renderFormattedRecipe = () => {
    if (formattedRecipe === null) return null
    return (
      <article
        className="text-sm text-start p-1"
        aria-label="Recipe completion"
      >
        {recipeState.state === 'saved' ? (
          <div className="flex justify-end">
            <button onClick={handleDeleteClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-indigo-400 hover:text-indigo-500"
              >
                <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93zM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 013.75 21z" />
              </svg>
            </button>
          </div>
        ) : null}
        {formattedRecipe}
      </article>
    )
  }

  return (
    <main>
      <header>
        <SideMenu recipes={recipes} setSelectedRecipe={setSelectedRecipe} />
      </header>
      <div role="main" className="mx-auto flex flex-col px-2">
        <section className="p-2 no-scrollbar ml-11 border bg-zinc-50 border-zinc-200 mt-1 text-zinc-900 rounded-md shadow-md shadow-zinc-500 mr-1 overflow-y-auto over max-h-[75vh] xxxs:max-h-[90vh] md:w-[700px]">
          {renderCompletion()}
          {renderRecipePrompt()}
          {renderFormattedRecipe()}
        </section>
        <Form
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setRecipeState={setRecipeState}
          setFormattedRecipe={setFormattedRecipe}
        />
      </div>
    </main>
  )
}
