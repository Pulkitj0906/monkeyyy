import React from 'react'

interface InputProps{
    placeholder: string,
}

const Innput:React.FC<InputProps> = ({placeholder}) => {
  return (
    <input type="text" placeholder={placeholder} className='bg-sub-alt p-3 placeholder:text-text-color h-8 rounded-lg w-56 caret-this-yellow'/>
  )
}

export default Innput