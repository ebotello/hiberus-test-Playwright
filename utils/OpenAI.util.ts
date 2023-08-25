import OpenAI from "openai";
import dotenv from "dotenv";

import {
  ChatCompletion,
  ChatCompletionMessage,
} from "openai/resources/chat/completions";

dotenv.config();

export class OpenAIUtils {
  readonly openAI: OpenAI;

  constructor() {
    this.openAI = new OpenAI({
      apiKey: process.env.OPEN_AI_TOKEN,
    });
  }

  public sendQuestion(
    messages: ChatCompletionMessage[]
  ): Promise<ChatCompletion> {
    return this.openAI.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
    });
  }
}
