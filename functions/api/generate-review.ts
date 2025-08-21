import { GoogleGenAI } from "@google/genai";
import { Language } from '../../context/LanguageContext';

// Minimal type definitions for Cloudflare Pages Functions to avoid a dependency on @cloudflare/workers-types
interface EventContext<Env, P extends string, Data> {
    request: Request;
    env: Env;
    params: Record<P, string | string[]>;
    waitUntil(promise: Promise<any>): void;
    next(input?: Request | string, init?: RequestInit): Promise<Response>;
    data: Data;
}

type PagesFunction<
    Env = unknown,
    P extends string = any,
    Data extends Record<string, unknown> = Record<string, unknown>
> = (
    context: EventContext<Env, P, Data>
) => Response | Promise<Response>;


// Define the structure of the environment variables provided by Cloudflare
interface Env {
  API_KEY: string;
}

// Define the expected structure of the incoming request body
interface RequestBody {
    title: string;
    author: string;
    language: Language;
}

// This is the Cloudflare Pages function handler for POST requests to /api/generate-review
export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const { title, author, language } = await request.json() as RequestBody;
    
    // Securely access the API key from Cloudflare's environment variables
    // The key should be set in the Cloudflare Pages project settings, not here.
    const apiKey = env.API_KEY;

    if (!apiKey || apiKey === "XXX") {
      return new Response(JSON.stringify({ error: 'API_KEY is not configured on the server.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const languageInstruction = language === 'zh'
        ? 'Your response must be in Chinese.'
        : 'Your response must be in English.';

    const prompt = `
    You are a book reviewer for a high-quality blog that uses Amazon affiliate links. Your task is to write an engaging, original, and insightful book review in a specific language.

    **Book Title:** ${title}
    **Author:** ${author}

    **Instructions:**
    1.  **Language:** ${languageInstruction}
    2.  **Originality is Key:** Do NOT copy from any existing reviews, summaries, or promotional materials. Your review must be entirely original to comply with affiliate program rules.
    3.  **Provide Value:** The review should be between 150 and 200 words (or an equivalent character count in Chinese). It must offer real value to the reader, helping them decide if the book is right for them.
    4.  **Engaging Hook:** Start with a compelling opening that grabs the reader's attention.
    5.  **Content Focus:** Discuss themes, writing style, character depth, or the overall feeling of the book.
    6.  **No Spoilers:** Do NOT include any major spoilers. Hint at the plot without giving away key twists or the ending.
    7.  **Target Audience:** Conclude by suggesting what type of reader would enjoy this book (e.g., "Perfect for fans of fast-paced thrillers," or "A must-read for those who love introspective literary fiction.").
    8.  **Tone:** Professional, enthusiastic, and trustworthy.

    Generate the review text now.
    `;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: 0.7,
            topP: 0.95,
            topK: 64
        }
    });

    const reviewData = { review: response.text };

    return new Response(JSON.stringify(reviewData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in Cloudflare Function:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return new Response(JSON.stringify({ error: `Failed to generate review: ${errorMessage}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
