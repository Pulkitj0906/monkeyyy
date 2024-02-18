'use client'
import React from 'react'
import useFinishModal from '../_hooks/useFinishModal';
import Image from 'next/image';

const FinishModal = () => {
    const {isOpen, OnClose, loser} = useFinishModal();
    
    if(!isOpen) return null
    return (
        <div onClick={OnClose} className="absolute inset-0 z-50 bg-black/5  flex items-center ">
          <div className={`relative -rotate-6 w-full inset-0 overflow-hidden ${loser ? 'bg-this-yellow' : 'bg-sub-alt'} rounded-lg p-4`}>
            <p className={`${loser ? 'text-9xl' : 'text-5xl py-10'} text-pretty font-extrabold text-this-white text-center`}>{loser ? 'Winner' : 
            "You proved u're a Monkey"}</p>
            
            <Image className={`absolute -bottom-4 ${loser ? 'left-56' : 'left-20 bottom-3'} h-32 w-32`} src={loser ? '/winner.png' : '/sad.png'} alt='winner-img' width={999} height={999}/>
            
          </div>
        </div>
    )
}

export default FinishModal