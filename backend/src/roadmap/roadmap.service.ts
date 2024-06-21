import openai from '../openai';

class RoadmapService {
  async *processStreamedText(stream: AsyncIterable<any>): AsyncGenerator<string, void, unknown> {
    for await (const part of stream) {
      const chunk = part.choices[0]?.delta?.content; // Extract content from the stream part
      if (chunk) {
        yield chunk; 
      }
    }
  }

  async create(userPrompt: string, callback: (data: any) => void) {
    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are Gemini(Google generative AI model)`,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      stream: true,
    });
    try {
      let completeMessage = '';
      for await (const textChunk of this.processStreamedText(stream)) {
        completeMessage += textChunk;
        callback(completeMessage);
      }
    } catch (error) {
      console.error('Error processing OpenAI stream', error);
      throw new Error('Failed to process OpenAI stream');
    }
  }
}

export default RoadmapService;
