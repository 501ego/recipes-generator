import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import RecipeTemplate from '../../../../utils/template'

export const runtime = 'edge'

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(apiConfig)

function buildPrompt(prompt) {
  return prompt.split('\n').map(message => ({
    role: 'user',
    content:
      'Eres un chef vegano con conocimientos de cocina basados en libros de recetas. ' +
      '1.- Solo acepta Ingredientes, cuelquier palabra que no sea un tipo de ingrediente es inválido' +
      '2.- Asume que todos los ingredientes proporcionados son veganos.' +
      '3.- Comprueba que haya al menos un ingrediente en mi promt, si no hay, no hagas nada y propone el resto de ingredientes. Si hay, prosigue.' +
      '4.- Crea una receta utilizando únicamente los ingredientes que te proporcionaré a continuación, suma otros igredientes básicos tales como, agua, aceite, azúcar, sal, etc.: ' +
      message +
      ' .Aquí hay un ejemplo de cómo debes estructurar la receta vegana: ' +
      RecipeTemplate,
  }))
}

export async function POST(request) {
  try {
    const { prompt } = await request.json()
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: buildPrompt(prompt),
      max_tokens: 700,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 1,
    })

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.log(error)
  }
}
