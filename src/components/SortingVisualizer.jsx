import React, { useEffect, useState } from 'react'
import {Button} from 'react-bootstrap'
import BubbleSort from './BubbleSort'

function SortingVisualizer({array , comparedIdx , sortedIdx , minIdx , searchIdx , choosenIdx , swappedIdx }) {

  return (
    <>
    <BubbleSort array={array} comparedIdx={comparedIdx} sortedIdx={sortedIdx} minIdx={minIdx} searchIdx={searchIdx} choosenIdx={choosenIdx} swappedIdx={swappedIdx} />
    <div className='display'>
    {
      array.map((value , idx) => 
        <Element element={value} index={idx} identifier={(comparedIdx[0] === idx || comparedIdx[1] === idx ) ? `comparing` : `not-comparing`} isSorted = {(sortedIdx.includes(idx)) ? `sorted` : `notSorted`}  />
      )
    }
    </div>
    <Button onClick={resetArray} >Generate</Button>
    <Button onClick={() => bubbleSort(array)} >Bubble Sort</Button>
   </>
  )
}

export default SortingVisualizer