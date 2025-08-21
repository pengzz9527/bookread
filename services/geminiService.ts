import { Language } from '../context/LanguageContext';

export async function generateBookReview(title: string, author: string, language: Language): Promise<string> {
    try {
        // This now calls your secure backend function instead of the Gemini API directly.
        const response = await fetch('/api/generate-review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, author, language }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'API request failed');
        }

        const data = await response.json();
        return data.review;

    } catch (error) {
        console.error("Error calling backend function:", error);
        throw new Error("Failed to generate book review via backend service.");
    }
}
