import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY ?? "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const systemPrompt = `You are a language tutor for a beginner. 
Only engage in conversations focused on language learning. 
Your response should be less than 4 sentences.
Keep responses concise and focused on the language, user is learning(like Spanish, German, Italian, Chinese etc). 
Follow these rules strictly:
Respond in English except when giving the specific language word or sentence.
If a user gives an English word or sentence, translate it into asked language and explain only a bit.
If a user gives a language word, for exapmle Spanish word or sentence, translate it into English and provide a brief explanation in readable format, don't make it a mess.
Do not answer questions outside the topic of language learning.
Keep your tone friendly, clear, and supportive.
Close the specific word/sentence  asked in cotation marks.
When the response is long, better to break in bullet points.`;

export async function POST(req: NextRequest) {
  // Checking to ensure the API key is loaded
  if (!API_KEY) {
    console.error(
      "GEMINI_API_KEY is not set in environment variables. Please check your .env.local file."
    );
    return NextResponse.json(
      { error: "Server configuration error: AI API key missing." },
      { status: 500 }
    );
  }
  try {
    const body = await req.json();
    const userMessage = body.message;

    if (!userMessage || typeof userMessage !== "string") {
      return NextResponse.json(
        {
          error:
            "Invalid message format. Message is required and must be a string.",
        },
        { status: 400 }
      );
    }

    const prompt = `${systemPrompt}\nUser: ${userMessage}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const reply = response.text();

    return NextResponse.json({ reply });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error processing request in /api/chat:", error);

    if (error.response && error.response.status) {
      console.error(`Gemini API Error Status: ${error.response.status}`);
      if (error.response.statusText) {
        console.error(`Gemini API Status Text: ${error.response.statusText}`);
      }
      if (error.response.data) {
        console.error(
          "Gemini API Error Data:",
          JSON.stringify(error.response.data, null, 2)
        );
      }
    }

    return NextResponse.json(
      {
        error: "Failed to get response from AI tutor. Please try again later.",
      },
      { status: 500 }
    );
  }
}
