import { OpenAI } from 'openai';



export const summarizeNote = async (content) => {
  try {
    const openai = new OpenAI({
      apiKey: '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'
    });
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      prompt: `Summarize the following content:\n\n${content}\n\nSummary:`,
      max_tokens: 150,
      n: 1,
      stop: ['\n'],
      store: true
    });

    const summary = response.data.choices[0].text.trim();
    return summary;
  } catch (error) {
    console.error('Error summarizing note:', error);
    throw error;
  }
};
