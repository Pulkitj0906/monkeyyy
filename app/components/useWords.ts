export const randomWord = async (wordLimit:number): Promise<string> => {
    try {
        const newSentence = Array.from({ length: wordLimit }, () => words[Math.floor(Math.random() * words.length)])
            .join(' ') + " ";

        return newSentence;
    } catch (e) {
        console.error('Error generating random word:', e);
        throw e;
    }
};
  

const words: string[] = [
    'arise',
    'ball',
    'chad',
    'doggy',
    'elephant'
];