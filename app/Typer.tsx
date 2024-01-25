'use client'
import React, { useEffect, useState } from 'react';
import { randomWord } from './components/useWords';
import '@/app/styles/caret.css'
import { count } from 'console';
import Test from './hooks/useTest';
import useWordLimit from './hooks/useWordsLimit';

const Typer = () => {
    const TestCtrl = Test();
    const regex = new RegExp('[a-zA-Z\\b]')
    let [input, setInput] = useState('');
    let [correctWord, setCorrectWord] = useState<string>('');
    
    const [colors, setColors] = useState(Array(correctWord.length).fill('text-text-color'));
    let [i, setI] = useState(0);
    let [wrongWordLimit, setWrongWordLimit] = useState(0);
    const allowedInput = [8, 32]
    const WordLimit=useWordLimit()
    useEffect(() => {
        const Limit= WordLimit.words
        randomWord(Limit).then((d: string) => {
            setCorrectWord(d);
            setColors(Array(d.length).fill('text-text-color'));
            setI(0);
        });
    }, [WordLimit.words]);
    const handleChange = () => {
        if(!TestCtrl.hasStarted) {
            TestCtrl.onStart();
        }

    }
    // const handleChange2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     let key = e.target.value;
    //     console.log(key);
    //     let updatedColors = [...colors]; // Create a copy of colors array
        
    //     // if(backKey === 'Backspace') {
    //     //     console.log('hi')
    //     // }
    //     if (!(key[i] === ' ' && correctWord[i - 1] === ' ')) {
    //         for (; i < key.length; i++) {
    //             // space condition
    //             console.log(i);
    //             if (correctWord[i] !== ' ' && key[i] === ' ') {
    //                 while (i < correctWord.length) {
    //                     if (correctWord[i] === ' ') {
    //                         break;
    //                     }
    //                     key += ' ';
    //                     i++;
    //                 }
    //             }
    //             else if (correctWord[i] === ' ' && key[i] !== ' ') {
    //                 console.log('limil' + wrongWordLimit);
    //                 if(wrongWordLimit >= 5) {
    //                     setWrongWordLimit(5);
    //                     continue;
    //                 }
    //                 setCorrectWord(correctWord.substring(0, i) + key[i] + correctWord.substring(i));
    //                 updatedColors = [...updatedColors, 'text-text-color']
    //                 setWrongWordLimit(++wrongWordLimit);
    //             }

    //             updatedColors[i] = key[i] === correctWord[i] ? 'text-this-white' : 'text-error';
    //         }
    //             setInput(key);
    //             setColors(updatedColors);
    //             setI(i); // Update the state variable
    //     }
    // };
    const handleChange3 = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        let keyPressed = e.key;

        if(e.keyCode === 9) {
            location.reload();
        }
        
        if((!allowedInput.includes(e.keyCode) && e.keyCode < 65) || e.keyCode > 90) {
            return;
        }
        
        if(keyPressed === ' ' && correctWord[i-1] === ' ') {
            return;
        }
        else if(keyPressed === 'Backspace') {
            colors[i-1] = 'text-text-color'
            if(correctWord[i-1] === ' ') 
                return
            
            i-=2;
            input = input.substring(0, input.length-1);
            setInput(input)
        }
        else if(keyPressed === ' ' && correctWord[i] !== ' ') {
            while (i < correctWord.length) {
                if (correctWord[i] === ' ') {
                    break;
                }
                input += ' ';
                i++;
            }
        }
        else if(keyPressed !== ' ' && correctWord[i] === ' ') {
            setWrongWordLimit(wrongWordLimit+1);
            if(wrongWordLimit >= 5)
                return;
            setCorrectWord(correctWord.substring(0,i) + keyPressed + correctWord.substring(i));
            colors.push('text-text-color')
        }
        setI(i+1);
        setColors(colors);
        if(keyPressed !== 'Backspace') {
            setInput(input+keyPressed);
            colors[i] = keyPressed === correctWord[i] ? 'text-this-white' : 'text-error';
        }
    }
    return (
        <>
            <div className="relative">
                <div className=" text-2xl">
                    {correctWord.split('').map((letter, index) => (
                        <div key={index} className={`inline z-10 ${colors[index]}`}>
                            {letter}
                        </div>
                    ))}
                </div>
                <textarea 
                    spellCheck='false'
                    autoFocus
                    value={input}
                    onChange={handleChange}
                    onKeyDownCapture={handleChange3}
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

