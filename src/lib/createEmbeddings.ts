import { Configuration, OpenAIApi } from "openai"

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

export async function createEmbedding(text: string): Promise<number[]> {
  const res = await openai.createEmbedding({
    model: "text-embedding-ada-002", // or whatever you're using
    input: text,
  })

  return res.data.data[0].embedding
}
