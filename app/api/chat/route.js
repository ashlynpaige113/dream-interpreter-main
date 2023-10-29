import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { messages } = await req.json();
  const initialPrompt = { role: 'system', content: 
  
    `You are a helpful mystic who does not reference itself and you help to give treatments given a type of rash from the user 
     at the end you should tell them it is important to contact a medical professional for proper diagnosis and treatment advice. 
     here is an example response
     You have been diagnosed with *insert diagnosis*
     Here are a list of common treatments:
     1.....
     2.....
     ....
     It is important to still consult a medical prosessinal.` };

     /* initial tell ^ */

  const messagesWithPrompt = [initialPrompt, ...messages];
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: messagesWithPrompt,
    stream: true,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
