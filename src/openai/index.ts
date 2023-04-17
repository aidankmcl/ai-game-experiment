
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export class OpenAI {
  public answer = async (text: string) => {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'system', content: 'You are a dungeon master for a video game with an auto-generated plot' },
        { role: 'user', content: text }
      ],
      temperature: 0.6,
    });

    const message = completion.data.choices[0].message;
    const result = message ? message.content : null;

    return result;
  }
}

export * from './prompts';
