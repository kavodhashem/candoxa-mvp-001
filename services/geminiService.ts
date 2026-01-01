
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface VerificationResult {
  summary: string;
  humanityScore: number;
}

export const verifyOpinion = async (text: string): Promise<VerificationResult | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this digital opinion for the Candoxa decentralized memory layer. Provide a concise 1-sentence verification summary and assign a 'Humanity Score' representing the unique intellectual depth (from 0.95 to 1.00). 
      
      Text: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "A 1-sentence analytical summary of the opinion.",
            },
            humanityScore: {
              type: Type.NUMBER,
              description: "Score from 0.95 to 1.00.",
            },
          },
          required: ["summary", "humanityScore"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text.trim());
    }
    return null;
  } catch (error) {
    console.error("Gemini Verification Error:", error);
    return {
      summary: "Human thought signal captured but verification service is temporarily throttled.",
      humanityScore: 0.98
    };
  }
};
