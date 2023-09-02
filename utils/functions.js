export async function saveRecipeToDB(parsedRecipe, user) {
  try {
    const response = await fetch('/api/dbHandler', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedRecipe, user),
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

export async function getRecipesFromDB(user) {
  try {
    const response = await fetch(`/api/dbHandler?user=${user}`, {
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

export async function getUserFromDB(email) {
  try {
    const response = await fetch(`/api/dbClientHandler?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Error getting user from database: ${text}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error.message)
  }
}

export async function updateUserFromDB(user) {
  try {
    const response = await fetch('/api/dbClientHandler', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Error updating user in database: ${text}`)
    }

    const data = await response.json()
    console.log('User updated:', data)
  } catch (error) {
    console.error(error.message)
  }
}

export async function saveUserToDB(user) {
  try {
    const response = await fetch('/api/dbClientHandler', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Error saving user to database: ${text}`)
    }

    const data = await response.json()
    console.log('User saved:', data)
  } catch (error) {
    console.error(error.message)
  }
}

export async function deleteUserFromDB(id) {
  try {
    const response = await fetch('/api/dbClientHandler', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Error deleting user from database: ${text}`)
    }

    const data = await response.json()
    console.log('User deleted:', data)
  } catch (error) {
    console.error(error.message)
  }
}

export async function loginUser(email, password) {
  const user = await getUserFromDB(email)
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user, email, password }),
  })

  const data = await response.json()

  if (response.ok) {
    return { success: true, message: 'Login exitoso' }
  } else {
    return { success: false, message: data.message }
  }
}
