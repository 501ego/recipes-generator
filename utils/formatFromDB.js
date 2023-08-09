export function formatFullRecipe(jsonToText) {
  const sections = jsonToText.split('\n\n')

  const processedSections = sections.map(section => {
    if (section.startsWith('Título')) {
      return section
    }
    if (section.startsWith('Ingredientes')) {
      const ingredientsList = section
        .split('\n')
        .slice(1)
        .map((item, index) => `${index + 1}.- ${item.split('. ')[1]}`)
      return `Ingredientes\n${ingredientsList.join('\n')}`
    }
    if (section.startsWith('Instrucciones')) {
      const instructionsList = section
        .split('\n')
        .slice(1)
        .map((item, index) => `${index + 1}.- ${item.split('. ')[1]}`)
      return `Instrucciones\n${instructionsList.join('\n')}`
    }

    return section
  })

  let formattedRecipe = processedSections.join('\n\n')
  formattedRecipe = formattedRecipe.replace(/\\n/g, '\n')

  if (formattedRecipe.startsWith('"')) {
    formattedRecipe = formattedRecipe.substring(1)
  }

  if (formattedRecipe.endsWith('"')) {
    formattedRecipe = formattedRecipe.substring(0, formattedRecipe.length - 1)
  }

  return formattedRecipe
}
