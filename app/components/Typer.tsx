'use client'
import React, { useEffect, useState } from 'react';
import { randomWord } from './useWords';
import '@/app/styles/caret.css'


const Typer = () => {
    const [input, setInput] = useState('');
    const [correctWord, setCorrectWord] = useState<string>('');
    const [colors, setColors] = useState(Array(correctWord.length).fill('text-text-color'));
    let [i, setI] = useState(0);
    useEffect(() => {
        randomWord().then((d: string) => {
            setCorrectWord(d);
            setColors(Array(d.length).fill('text-text-color'));
            setI(0);
        });
    }, []);
    const handleChange2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let key = e.target.value;
        let updatedColors = [...colors]; // Create a copy of colors array

        if (!(key[i] === ' ' && correctWord[i - 1] === ' ')) {
            for (; i < key.length; i++) {
                // space condition
                if (correctWord[i] !== ' ' && key[i] === ' ') {
                    while (i < correctWord.length) {
                        if (correctWord[i] === ' ') {
                            break;
                        }
                        key += ' ';
                        i++;
                    }
                }
                else if (correctWord[i] === ' ' && key !== ' ') {
                    setCorrectWord(correctWord.substring(0, i) + key[i] + correctWord.substring(i));
                }

                updatedColors[i] = key[i] === correctWord[i] ? 'text-this-white' : 'text-error';
            }
            setInput(key);
            setColors(updatedColors);
            setI(i); // Update the state variable
        }

    };
    return (
        <>
            <div className="relative">
                <p className=" text-2xl">
                    {correctWord.split('').map((letter, index) => (
                        <div key={index} className={`inline z-10 ${colors[index]}`}>
                            {letter}
                        </div>
                    ))}
                </p>
                <textarea 
                    spellCheck='false'
                    autoFocus
                    value={input}
                    onChange={handleChange2}
                    className="
                        absolute
                        top-0
                        bg-transparent
                        w-full
                        h-full
                        text-2xl
                        outline-none
                        text-transparent
                        resize-none
                        custom-caret-color
                        caret-yellow-300
                        
            " />
            </div>
        </>
    )
};

export default Typer;

