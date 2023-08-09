export function parseRecipe(completion) {
  if (!completion) {
    throw new Error('No completion data provided.')
  }
  const lines = completion.split('\n').map(line => line.trim())

  const line = lines[0]
  const match = line.match(/Título:\s*(.*)/)
  const name = match ? match[1].trim() : 'Unknown Name'

  const type = getValueFromTitle(lines, 'Tipo de comida:') || 'Unknown Type'
  const servingSize =
    getValueFromTitle(lines, 'Tamaño de la porción por persona:') ||
    'Unknown Size'

  const estimatedServingsString =
    getValueFromTitle(lines, 'Número estimado de porciones:') || '1 porción'
  const estimatedServings = parseInt(estimatedServingsString.split(' ')[0]) || 1

  const preparationTime =
    getValueFromTitle(lines, 'Tiempo de preparación:') || 'Unknown Time'

  const ingredientStart = lines.indexOf('Ingredientes:') + 1
  const ingredientEnd = lines.indexOf('Tamaño de la porción por persona:') - 1

  const ingredients = lines
    .slice(ingredientStart, ingredientEnd)
    .map(line => {
      const parts = line.split(': ')
      if (!parts[1]) return null
      const quantity = parts[1].trim()
      const item = parts[0].substring(parts[0].indexOf('.') + 1).trim()
      return { item, quantity }
    })
    .filter(ingredient => ingredient)

  const instructionStart = lines.indexOf('Instrucciones:') + 1
  const instructions = lines
    .slice(instructionStart)
    .filter(line => line.length)
    .map(line => line.substring(line.indexOf('.') + 1).trim())

  const full_recipe = JSON.stringify(completion, null, 2)

  return JSON.stringify(
    {
      name,
      type,
      ingredients,
      servingSize,
      estimatedServings,
      preparationTime,
      instructions,
      full_recipe,
    },
    null,
    2
  )
}

function getValueFromTitle(lines, title) {
  for (const line of lines) {
    if (line.startsWith(title)) {
      return line.split(': ')[1]
    }
  }
  return null
}
