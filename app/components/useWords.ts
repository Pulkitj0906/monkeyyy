export const randomWord = async (): Promise<string> => {
    try {
        const sentenceLength = 20;
        const newSentence = Array.from({ length: sentenceLength }, () => words[Math.floor(Math.random() * words.length)])
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