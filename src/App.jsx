import { useState, useEffect } from "react";
import SortingVisualizer from "./components/SortingVisualizer";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./components/SortingVisualizer.css";
import "./components/BubbleSort.css"
import Element from "./components/Element";
import { Button } from "react-bootstrap";
import BubbleSort from "./components/BubbleSort";
import Home from "./components/Home";
import "./components/Home.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import 'highlight.js/styles/tokyo-night-dark.min.css';
import Footer from "./components/Footer";
import InsertionSort from "./components/InsertionSort";
import SelectionSort from "./components/SelectionSort"
import QuickSort from "./components/QuickSort";
import MergeSort from "./components/MergeSort";



function App() {
//   const [array, setArray] = useState([]);
//   const [comparedIdx, setComparedIdx] = useState([]);
//   const [wrongIdx, setWrongIdx] = useState([]);
//   const [sortedIdx, setSortedIdx] = useState([]);
//   const [minIdx, setMinIdx] = useState();
//   const [searchIdx, setSearchIdx] = useState();
//   const [choosenIdx, setChoosenIdx] = useState();
//   const [swappedIdx, setSwappedIdx] = useState([]);

//   function resetArray() {
//     const temp = [];
//     for (let i = 0; i < 10; i++) {
//       temp.push(randomGenerator(5, 50));
//       setArray(temp);
//     }
//     setSortedIdx([]);
//   }

//   function randomGenerator(min, max) {
//     return Math.floor(Math.random() * (max - min + 1) + min);
//   }

//   async function bubbleSort(array) {
//     const sortedArray = [...array];
//     for (let i = sortedArray.length - 1; i >= 0; i--) {
//       for (let j = 0; j < i; j++) {
//         setComparedIdx([j, j + 1]);
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         if (sortedArray[j] > sortedArray[j + 1]) {
//           setWrongIdx([j, j + 1]);
//           let temp = sortedArray[j];
//           sortedArray[j] = sortedArray[j + 1];
//           sortedArray[j + 1] = temp;
//           setArray([...sortedArray]);
//           await new Promise((resolve) => setTimeout(resolve, 1000));
//         }
//       }
//       setSortedIdx((prevSortedIdx) => [...prevSortedIdx, i]);
//       setComparedIdx([]);
//     }
//   }

//   async function insertionSort(array) {
//     const arrayCopy = [...array];

//     for (let i = 1; i < arrayCopy.length; i++) {
//       let j = i - 1;
//       let key = arrayCopy[i];
//       setChoosenIdx(i);
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       while (j >= 0 && arrayCopy[j] > key) {
//         setComparedIdx([j, j + 1]);
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         arrayCopy[j + 1] = arrayCopy[j];
//         j--;
//         setArray([...arrayCopy]);
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//       }
//       setComparedIdx([]);
//       arrayCopy[j + 1] = key;
//       setSearchIdx(j + 1);
//       setChoosenIdx(null);
//       setArray([...arrayCopy]);
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       setSearchIdx(null);
//     }
//     const temp = [];
//     for (let i = 0; i < array.length; i++) {
//       temp.push(i);
//     }
//     setSortedIdx(temp);
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//   }

//   async function selectionSort(array) {
//     const arrayCopy = [...array];

//     for (let i = 0; i < arrayCopy.length - 1; i++) {
//       let index = i;
//       setChoosenIdx(i);
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       for (let j = i + 1; j < arrayCopy.length; j++) {
//         setSearchIdx(j);
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         if (arrayCopy[j] < arrayCopy[index]) {
//           index = j;
//           setMinIdx(j);
//           await new Promise((resolve) => setTimeout(resolve, 1000));
//         }
//       }
//       setSearchIdx(null);
//       setMinIdx(null);

//       if (index !== i) {
//         const temp = arrayCopy[i];
//         arrayCopy[i] = arrayCopy[index];
//         arrayCopy[index] = temp;
//         setArray([...arrayCopy]);
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//       }
//       setChoosenIdx(null);
//     }
//     const tempArray = [];
//     for (let i = 0; i < array.length; i++) {
//       tempArray.push(i);
//     }
//     setSortedIdx(tempArray);
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     console.log("Sorted Array:", arrayCopy);
//     console.log("Array sorted by built-in sort:", array.sort());
//   }

//   async function partition(array, low, high) {
//     let pivot = high;
//     let i = low - 1;
//     for (let j = low; j < high; j++) {
//       setComparedIdx([j, pivot]);
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       if (array[j] < array[pivot]) {
//         i++;
//         setSwappedIdx([i, j]);
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         let temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//         setSwappedIdx([]);
//       }
//     }
//     setSwappedIdx([i + 1, pivot]);
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     i++;
//     let temp = array[i];
//     array[i] = array[pivot];
//     array[pivot] = temp;
//     setSwappedIdx([]);
//     setComparedIdx([]);
//     setSortedIdx((prevSortedIdx) => [...prevSortedIdx, i]);
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     return i;
//   }

//   async function quickSort(array, low, high) {
//     if (low < high) {
//       let partIndex = await partition(array, low, high);
//       console.log(partIndex);
//       await quickSort(array, low, partIndex - 1);
//       await quickSort(array, partIndex + 1, high);
//     }
//   }

//   async function startQuickSort() {
//     await quickSort(array, 0, array.length - 1);
//     const isSorted = array.every((value, index) => {
//       if (index === 0) return true;
//       return value >= array[index - 1];
//     });

//     if (isSorted) {
//       const sortedIndices = array.map((_, index) => index);
//       setSortedIdx(sortedIndices);
//       await new Promise((resolve) => setTimeout(resolve, 500));
//     } else {
//       setSortedIdx([]);
//     }
//   }

//   async function mergeSort(array, low, high) {
//     if (low < high) {
//       const mid = Math.floor((low + high) / 2);
//       await mergeSort(array, low, mid);
//       await mergeSort(array, mid + 1, high);
//       await merge(array, low, mid, high);
//     }
//   }

//   async function merge(array, low, mid, high) {
//     let p1 = low,
//       p2 = mid + 1;
//     let c = [];

//     while (p1 <= mid && p2 <= high) {
//       setComparedIdx([p1, p2]);
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       if (array[p1] < array[p2]) {
//         c.push(array[p1++]);
//       } else {
//         c.push(array[p2++]);
//       }
//     }
//     setComparedIdx([]);
//     await new Promise((resolve) => setTimeout(resolve, 500));

//     while (p1 <= mid) {
//       c.push(array[p1++]);
//     }

//     while (p2 <= high) {
//       c.push(array[p2++]);
//     }

//     for (let i = 0; i < c.length; i++) {
//       array[i + low] = c[i];
//       setArray([...array]);
//       await new Promise((resolve) => setTimeout(resolve, 500));
//     }
//   }

//   async function startMergeSort() {
//     await mergeSort(array, 0, array.length - 1);
//     setArray([...array]);
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     const isSorted = array.every((value, index) => {
//       if (index === 0) return true;
//       return value >= array[index - 1];
//     });

//     if (isSorted) {
//       const sortedIndices = array.map((_, index) => index);
//       setSortedIdx(sortedIndices);
//       await new Promise((resolve) => setTimeout(resolve, 500));
//     } else {
//       setSortedIdx([]);
//     }
//   }

//   useEffect(() => {
//     resetArray();
//     console.log(array);
//   }, []);

  return (
    <>
    {
      /* 
      <div className='display'>
      {
        array.map((value , idx) => 
        <Element element={value} index={idx} key={idx} choosenIdx={(choosenIdx === idx) ? `choosen` : `not-choosen`} minIdx={(minIdx === idx) ? `minIdx` : `not-min`} searchIdx={(searchIdx === idx) ? `search` : `not`}  identifier={(comparedIdx[0] === idx || comparedIdx[1] === idx ) ? `comparing` : `not-comparing`} isSorted = {(sortedIdx.includes(idx)) ? `sorted` : `notSorted`} swappedIdx={(swappedIdx[0] === idx || swappedIdx[1] === idx) ? `swapped` : `not-swapped`} />
      )
    }
    </div>
    */
  }
      <BrowserRouter>
      <NavBar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bubble-sort" element={<BubbleSort />} />
      <Route path="/insertion-sort" element={<InsertionSort />} />
      <Route path="/selection-sort" element={<SelectionSort />} />
      <Route path="/quick-sort" element={<QuickSort  />} />
      <Route path="/merge-sort" element={<MergeSort  />} />
      </Routes>
      <Footer />
      </BrowserRouter>
      {
        /* 
        <Button onClick={resetArray} >Generate</Button>
        <Button onClick={() => bubbleSort(array)} >Bubble Sort</Button>
        <Button onClick={() => insertionSort(array)} >Insertion Sort</Button>
        <Button onClick={() => selectionSort(array)} >Selection Sort</Button>
        <Button onClick={startQuickSort} >Quick Sort</Button>
        <Button onClick={startMergeSort} >Merge Sort</Button>
        */
      }
    </>
  );
}

export default App;
