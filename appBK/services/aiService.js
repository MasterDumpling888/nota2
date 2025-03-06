import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI('AIzaSyDKoSfHEB0oWlEdXNH-BmeFsZQuDoT2Dqs');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const summarizeNote = async (content) => {
  try {
    const prompt = `Summarize the following text in 2-3 sentences:\n\n${content}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Failed to summarize text', error);
    throw new Error('Failed to summarize text');
  }
};

export const generateReviewQuestions = async (content) => {
  try {
    const prompt = `Generate 3 questions and answers based on the following text. Format the response as a JSON array where each object contains a "question" and "answer" field:\n\n${content}`;
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse the response as JSON
    let qaPairs;
    try {
      // Try to extract JSON array from the response
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        qaPairs = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Invalid JSON format in response');
      }
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      console.log('Raw response:', responseText);

      // Fallback: Try to format response manually
      // This is a basic fallback in case the model doesn't return proper JSON
      qaPairs = [];
      const sections = responseText.split(/\d+\.\s*Question:/i);
      sections.shift(); // Remove first empty section if any

      for (const section of sections) {
        const questionMatch = section.match(/^(.*?)(?:Answer:)/is);
        const answerMatch = section.match(/Answer:(.*?)(?:\d+\.\s*Question:|$)/is);

        if (questionMatch && answerMatch) {
          qaPairs.push({
            question: questionMatch[1].trim(),
            answer: answerMatch[1].trim()
          });
        }
      }
    }

    return qaPairs;
  } catch (error) {
    console.error('Failed to generate questions and answers', error);
    throw new Error('Failed to generate questions and answers');
  }
};
