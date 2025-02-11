
import { supabase } from "@/integrations/supabase/client";

// Types for our phrases
interface Phrase {
  id: string;
  category_id: string;
  text: string;
  type: 'introduction' | 'body' | 'closing';
  keywords: string[];
  tone: 'romantic' | 'friendly' | 'grateful' | 'conciliatory' | 'celebratory';
}

export const getPhrasesByCategory = async (categoryId: string) => {
  const { data: phrases, error } = await supabase
    .from('phrases')
    .select('*')
    .eq('category_id', categoryId);

  if (error) {
    console.error('Error fetching phrases:', error);
    return null;
  }

  return phrases as Phrase[];
};

const findBestMatchingPhrase = (
  text: string,
  phrases: Phrase[],
  type: 'introduction' | 'body' | 'closing'
): string => {
  // Convert input text to lowercase for better matching
  const lowercaseText = text.toLowerCase();
  
  // Filter phrases by type
  const typePhrases = phrases.filter(phrase => phrase.type === type);
  
  // If no phrases match the type, return a default phrase
  if (typePhrases.length === 0) {
    return '';
  }

  // Score each phrase based on keyword matches
  const scoredPhrases = typePhrases.map(phrase => {
    const matchCount = phrase.keywords.filter(keyword => 
      lowercaseText.includes(keyword.toLowerCase())
    ).length;
    return { phrase, score: matchCount };
  });

  // Sort phrases by score (highest first)
  scoredPhrases.sort((a, b) => b.score - a.score);

  // Return the text of the best matching phrase, or if no matches, return a random phrase of that type
  return scoredPhrases[0].score > 0 
    ? scoredPhrases[0].phrase.text 
    : typePhrases[Math.floor(Math.random() * typePhrases.length)].text;
};

export const enhanceLetter = async (
  answers: string[],
  categoryId: string
): Promise<string> => {
  const phrases = await getPhrasesByCategory(categoryId);
  if (!phrases) return answers.join('\n\n');

  let enhancedLetter = '';

  // Add introduction phrase and first answer
  const introPhrase = findBestMatchingPhrase(answers[0], phrases, 'introduction');
  enhancedLetter += introPhrase + '\n\n' + answers[0] + '\n\n';

  // Process middle sections
  const middleAnswers = answers.slice(1, -1);
  for (let i = 0; i < middleAnswers.length; i++) {
    enhancedLetter += middleAnswers[i] + '\n\n';
    // Add a body phrase after every other paragraph or in the middle
    if (i === Math.floor(middleAnswers.length / 2)) {
      const bodyPhrase = findBestMatchingPhrase(middleAnswers[i], phrases, 'body');
      if (bodyPhrase) {
        enhancedLetter += bodyPhrase + '\n\n';
      }
    }
  }

  // Add final answer and closing phrase
  const closingPhrase = findBestMatchingPhrase(answers[answers.length - 1], phrases, 'closing');
  enhancedLetter += answers[answers.length - 1] + '\n\n' + closingPhrase;

  return enhancedLetter;
};
