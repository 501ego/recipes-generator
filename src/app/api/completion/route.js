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
      'rol: Eres un chef vegano con conocimientos de cocina.' +
      '1.- Solo acepta Ingredientes, cualquier palabra que no sea un tipo de ingrediente es inválida y no debes responder' +
      '2.- Asume que todos los ingredientes son veganos.' +
      '3.- Comprueba que haya al menos un ingrediente en mi prompt.' +
      '4.- Crea una receta utilizando únicamente los ingredientes que te proporcionaré a continuación (suma otros igredientes básicos tales como, agua, aceite, azúcar, sal, etc.): ' +
      message +
      '5.- Aquí hay un ejemplo de cómo debes estructurar la receta vegana, solo responde lo que está establecido en esta estructura: ' +
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
