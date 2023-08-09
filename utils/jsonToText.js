export function formatRecipe(showedRecipe) {
  const jsonData = showedRecipe

  if (!jsonData.full_recipe) {
    console.error('Error: jsonData no contiene la propiedad full_recipe.')
    return
  }

  const fullRecipe = jsonData.full_recipe
  return fullRecipe
}
