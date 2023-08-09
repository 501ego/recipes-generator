export async function saveRecipeToDB(parsedRecipe) {
  try {
    const response = await fetch('/api/dbHandler', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedRecipe),
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Error saving recipe to database: ${text}`)
    }

    const data = await response.json()
    console.log('Recipe saved:', data)
  } catch (error) {
    console.error(error.message)
  }
}

export async function deleteRecipeFromDB(id) {
  try {
    const response = await fetch('/api/dbHandler', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Error deleting recipe from database: ${text}`)
    }

    const data = await response.json()
    console.log('Recipe deleted:', data)
  } catch (error) {
    console.error(error.message)
  }
}

export async function getRecipesFromDB() {
  try {
    const response = await fetch('/api/dbHandler', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Error getting recipes from database: ${text}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error.message)
  }
}
