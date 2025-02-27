import axios from 'axios';

const BACKEND_API_URL = 'http://localhost:3000';

export const summarizeNote = async (content) => {
  try {
    const response = await axios.post(`${BACKEND_API_URL}/summarize`, { content });
    return response.data.summary;
  } catch (error) {
    console.error('Summarization error:', error.response?.data || error.message);
    throw new Error('Failed to connect to the summarization service');
  }
};

export const generateQuestionsAndAnswers = async (content) => {
    try {
     
      const response = await axios.post(`${BACKEND_API_URL}/generate-qa`, { content });
      
      return response.data.qaPairs;
    } catch (error) {
      console.error('Q&A generation error:', error.response?.data || error.message);
      throw new Error('Failed to generate questions and answers');
    }
  };
  
const testAI = async () => {
const content = "The Industrial Revolution, which began in the late 18th century, marked a major turning point in history. Almost every aspect of daily life was influenced in some way. The introduction of new machines, such as the steam engine, revolutionized manufacturing and transportation. Factories emerged, leading to urbanization as people moved to cities in search of work. While the Industrial Revolution brought about significant economic growth and technological advancements, it also had negative consequences, including poor working conditions, child labor, and environmental degradation. Over time, labor laws and reforms were introduced to address these issues, but the impact of this era is still felt today.";
try {
    const summary = await summarizeNote(content);
    console.log('Summary:', summary);

    const qaPairs = await generateQuestionsAndAnswers(content);
    console.log('Questions and Answers:');
    qaPairs.forEach((pair, index) => {
    console.log(`\nQ${index+1}: ${pair.question}`);
    console.log(`A${index+1}: ${pair.answer}`);
    });
} catch (error) {
    console.error('Test failed:', error);
}
};

// Run the test
testAI();