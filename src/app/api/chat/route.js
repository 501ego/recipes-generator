import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import RecipeTemplate from '../../components/template'

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
      'Crea una receta utilizando únicamente los ingredientes que te proporcionaré a continuación, nada más: ' +
      message +
      ' .Aquí hay un ejemplo de cómo debes estructurar la receta vegana: ' +
      RecipeTemplate,
  }))
}

export async function POST(request) {
  try {
    const { prompt } = await request.json()
    console.log('prompt', buildPrompt(prompt))
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: buildPrompt(prompt),
      max_tokens: 600,
      temperature: 0.5,
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
