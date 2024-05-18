import React from 'react'

function Element({element , index , key, choosenIdx, minIdx  , searchIdx ,identifier , isSorted, swappedIdx}) {
  return (
    <div className={`arrayElements ${swappedIdx} ${isSorted} ${choosenIdx} ${minIdx} ${searchIdx}  `} id={identifier}    style={{color:'black', height:`${element*7}px`,  }} >
    {element}  
    </div>
  )
}

export default Element