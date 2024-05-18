import React, { useState, useEffect } from "react";
import Element from "./Element";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import "../App.css";
import hljs from "highlight.js/lib/core";
import { FaCopy } from "react-icons/fa";
import javaLogo from "../assets/javaLogo.webp";
import pythonLogo from "../assets/pythonLogo.svg";
import javascriptLogo from "../assets/javascriptLogo.png";
import cppLogo from "../assets/cppLogo.png";
import cLogo from "../assets/cLogo.png";
import javascript from "highlight.js/lib/languages/javascript";
import java from "highlight.js/lib/languages/java";
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/github-dark-dimmed.css";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);


function QuickSort() {

  const [speed , setSpeed] = useState(1000);
  const [size , setSize] = useState(10);
  const [array, setArray] = useState([]);
  const [comparedIdx, setComparedIdx] = useState([]);
  const [wrongIdx, setWrongIdx] = useState([]);
  const [sortedIdx, setSortedIdx] = useState([]);
  const [minIdx, setMinIdx] = useState();
  const [searchIdx, setSearchIdx] = useState();
  const [choosenIdx, setChoosenIdx] = useState();
  const [swappedIdx, setSwappedIdx] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [program, setProgram] = useState(`
  // Quick sort function that recursively sorts the array
  public static void quickSort(int[] arr, int low, int high) {
      if (low < high) {
          // Partition the array and get the pivot index
          int pi = partition(arr, low, high);
          // Recursively sort the elements before and after partition
          quickSort(arr, low, pi - 1); // Sort the left sub-array
          quickSort(arr, pi + 1, high); // Sort the right sub-array
      }
  }

  // Partition function that rearranges the array elements
  private static int partition(int[] arr, int low, int high) {
      int pivot = arr[high]; // Select the pivot element (last element)
      int i = (low - 1); // Initialize the index of the smaller element
      for (int j = low; j < high; j++) {
          // If the current element is smaller than the pivot
          if (arr[j] < pivot) {
              i++; // Increment the index of the smaller element
              // Swap arr[i] and arr[j]
              int temp = arr[i];
              arr[i] = arr[j];
              arr[j] = temp;
          }
      }
      // Swap the pivot element with the element at i + 1 position
      int temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      // Return the partitioning index
      return i + 1;
  }
  `);

  function resetArray() {
    if(size == 0 || size > 30) {
      setSize(10);
      alert("Array size cannot be 0 and cannot exceed 30")
      return;
    }
    const temp = [];
    for (let i = 0; i < size; i++) {
      temp.push(randomGenerator(5, 50));
    }
    setArray(temp);
    setSortedIdx([]);
    const ele = document.querySelector('input')
    ele.value = "";
  }

  function randomGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function partition(array, low, high) {
    let pivot = high;
    let i = low - 1;
    for (let j = low; j < high; j++) {
      setSearchIdx(j);
      setComparedIdx([pivot]);
      await new Promise((resolve) => setTimeout(resolve, speed));
      if (array[j] < array[pivot]) {
        i++;
        setSwappedIdx([i, j]);
        await new Promise((resolve) => setTimeout(resolve, speed));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        setSwappedIdx([]);
      }
    }
    setSwappedIdx([i + 1, pivot]);
    await new Promise((resolve) => setTimeout(resolve, speed));
    i++;
    let temp = array[i];
    array[i] = array[pivot];
    array[pivot] = temp;
    setSwappedIdx([]);
    setComparedIdx([]);
    setSearchIdx(null);
    setSortedIdx((prevSortedIdx) => [...prevSortedIdx, i]);
    await new Promise((resolve) => setTimeout(resolve, speed));
    return i;
  }

  async function quickSort(array, low, high) {
    if (low < high) {
      let partIndex = await partition(array, low, high);
      console.log(partIndex);
      await quickSort(array, low, partIndex - 1);
      await quickSort(array, partIndex + 1, high);
    }
  }

  async function startQuickSort() {
    await quickSort(array, 0, array.length - 1);
    const isSorted = array.every((value, index) => {
      if (index === 0) return true;
      return value >= array[index - 1];
    });

    if (isSorted) {
      const sortedIndices = array.map((_, index) => index);
      setSortedIdx(sortedIndices);
      await new Promise((resolve) => setTimeout(resolve, 500));
    } else {
      setSortedIdx([]);
    }
  }

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(program);
    const ele = document.querySelector(".copy-to-clipboard");
    ele.style.color = "#a9a9a9";
  };

  const javascriptCode = `function quickSort(arr, low, high) {
    // Check if there are at least two elements in the array
    if (low < high) {
        // Partition the array and get the pivot index
        let pi = partition(arr, low, high);
        // Recursively sort the left sub-array
        quickSort(arr, low, pi - 1);
        // Recursively sort the right sub-array
        quickSort(arr, pi + 1, high);
    }
}

function partition(arr, low, high) {
    // Choose the pivot element (last element in the array)
    let pivot = arr[high];
    // Initialize the index of the smaller element
    let i = low - 1;
    // Iterate through the array from 'low' to 'high - 1'
    for (let j = low; j < high; j++) {
        // If current element is smaller than the pivot
        if (arr[j] < pivot) {
            // Increment the index of the smaller element
            i++;
            // Swap arr[i] and arr[j]
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    // Swap the pivot element with the element at index 'i + 1'
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    // Return the partition index
    return i + 1;
}

  `;

  const cCode = ` #include <stdio.h>
// Function to swap two integers
void swap(int* a, int* b) {
    int t = *a;  // Store the value at pointer 'a' in temporary variable 't'
    *a = *b;     // Copy the value at pointer 'b' to pointer 'a'
    *b = t;      // Copy the value in temporary variable 't' to pointer 'b'
}

// Function to partition the array
int partition(int arr[], int low, int high) {
    int pivot = arr[high];  // Choose the last element as the pivot
    int i = (low - 1);      // Initialize the index of the smaller element
    
    // Iterate through the array from 'low' to 'high - 1'
    for (int j = low; j < high; j++) {
        // If the current element is smaller than the pivot
        if (arr[j] < pivot) {
            i++;  // Increment the index of the smaller element
            // Swap the current element with the element at index 'i'
            swap(&arr[i], &arr[j]);
        }
    }
    
    // Swap the pivot element with the element at index 'i + 1'
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);  // Return the partition index
}

// Function to perform quick sort on the array
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        // Partition the array and get the pivot index
        int pi = partition(arr, low, high);
        
        // Recursively sort the elements before and after the partition index
        quickSort(arr, low, pi - 1);  // Sort the elements before the partition index
        quickSort(arr, pi + 1, high); // Sort the elements after the partition index
    }
}
  `;

  const cppCode = ` #include <iostream>
  using namespace std;
  
  // Function to swap two elements
  void swap(int* a, int* b) {
      int t = *a;
      *a = *b;
      *b = t;
  }
  
  // Function to partition the array and return the pivot index
  int partition(int arr[], int low, int high) {
      // Choose the pivot element (last element in the array)
      int pivot = arr[high];
      // Initialize the index of the smaller element
      int i = low - 1;
      
      // Iterate through the array from 'low' to 'high - 1'
      for (int j = low; j < high; j++) {
          // If current element is smaller than the pivot
          if (arr[j] < pivot) {
              // Increment the index of the smaller element
              i++;
              // Swap arr[i] and arr[j]
              swap(&arr[i], &arr[j]);
          }
      }
      // Swap the pivot element with the element at index 'i + 1'
      swap(&arr[i + 1], &arr[high]);
      // Return the partition index
      return i + 1;
  }
  
  // Function to perform QuickSort on the array
  void quickSort(int arr[], int low, int high) {
      // Check if there are at least two elements in the array
      if (low < high) {
          // Partition the array and get the pivot index
          int pi = partition(arr, low, high);
          // Recursively sort the left sub-array
          quickSort(arr, low, pi - 1);
          // Recursively sort the right sub-array
          quickSort(arr, pi + 1, high);
      }
  }
  `;

  const pythonCode = `
def quick_sort(arr, low, high):
  # Function to perform QuickSort on the array
  if low < high:
      # Partition the array and get the pivot index
      pi = partition(arr, low, high)
      # Recursively sort elements before the partition index
      quick_sort(arr, low, pi - 1)
      # Recursively sort elements after the partition index
      quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
  # Function to partition the array and return the pivot index
  pivot = arr[high]  # Choose the last element as the pivot
  i = low - 1  # Initialize the index of the smaller element
  for j in range(low, high):
      # If the current element is smaller than the pivot
      if arr[j] < pivot:
          i += 1  # Increment the index of the smaller element
          # Swap the current element with the element at index i
          arr[i], arr[j] = arr[j], arr[i]
  # Swap the pivot element with the element at index i+1
  arr[i + 1], arr[high] = arr[high], arr[i + 1]
  return i + 1  # Return the partition index
  `;

  const javaCode = `
  // Quick sort function that recursively sorts the array
  public static void quickSort(int[] arr, int low, int high) {
      if (low < high) {
          // Partition the array and get the pivot index
          int pi = partition(arr, low, high);
          // Recursively sort the elements before and after partition
          quickSort(arr, low, pi - 1); // Sort the left sub-array
          quickSort(arr, pi + 1, high); // Sort the right sub-array
      }
  }

  // Partition function that rearranges the array elements
  private static int partition(int[] arr, int low, int high) {
      int pivot = arr[high]; // Select the pivot element (last element)
      int i = (low - 1); // Initialize the index of the smaller element
      for (int j = low; j < high; j++) {
          // If the current element is smaller than the pivot
          if (arr[j] < pivot) {
              i++; // Increment the index of the smaller element
              // Swap arr[i] and arr[j]
              int temp = arr[i];
              arr[i] = arr[j];
              arr[j] = temp;
          }
      }
      // Swap the pivot element with the element at i + 1 position
      int temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      // Return the partitioning index
      return i + 1;
  }
  `;

  const handleSpeed = (value) => {
    setSpeed(1000 / value)
  }

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setProgram(getCodeForLanguage(language));

    const codeBlock = document.querySelector("code.javascript");

    if (codeBlock) {
      const isHighlighted = codeBlock.dataset.highlighted === "yes";

      if (isHighlighted) {
        codeBlock.removeAttribute("data-highlighted");
      }
    }
    const ele = document.querySelector(".copy-to-clipboard");
    ele.style.color = "#fff";
  };

  const getCodeForLanguage = (language) => {
    if (language === "javascript") {
      return javascriptCode;
    } else if (language === "java") {
      return javaCode;
    } else if (language === "python") {
      return pythonCode;
    } else if (language === "c") {
      return cCode;
    } else if (language === "cpp") {
      return cppCode;
    }
  };

  useEffect(() => {
    resetArray();
    const codeBlock = document.querySelector("code");
    if (codeBlock) {
      hljs.highlightElement(codeBlock);
    }
  }, [selectedLanguage, program]);

  return (
    <>
      <div className="bubble-sort-container">
        <div
          className="arrange-divs"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1
              style={{
                color: "white",
                marginTop: "60px",
                fontFamily: "Libre Baskerville",
                fontWeight: "400",
                fontStyle: "normal",
              }}
            >
              QUICK SORT
            </h1>
            <div className="buttons">
              <input type="text" onChange={(e) => setSize(e.target.value)} placeholder="Enter array size..." />
              <Button
                variant="primary"
                style={{ margin: "10px" }}
                onClick={resetArray}
              >
                Generate
              </Button>
              <Button variant="primary" onClick={() => startQuickSort(array)}>
                Sort
              </Button>
              <Dropdown style={{marginLeft:"10px" }} color="#0d6efd" >
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Adjust Speed
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleSpeed(1)} >
                    1x
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSpeed(2)} >
                    2x
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSpeed(3)} >
                    3x
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="display">
              {array.map((value, idx) => (
                <Element
                  element={value}
                  index={idx}
                  key={idx}
                  choosenIdx={choosenIdx === idx ? `choosen` : `not-choosen`}
                  minIdx={minIdx === idx ? `minIdx` : `not-min`}
                  searchIdx={searchIdx === idx ? `search` : `not`}
                  identifier={
                    comparedIdx[0] === idx || comparedIdx[1] === idx
                      ? `comparing`
                      : `not-comparing`
                  }
                  isSorted={sortedIdx.includes(idx) ? `sorted` : `notSorted`}
                  swappedIdx={
                    swappedIdx[0] === idx || swappedIdx[1] === idx
                      ? `swapped`
                      : `not-swapped`
                  }
                />
              ))}
            </div>
          </div>
          <div className="bubble-sort-info">
            <div
              style={{
                height: "",
                width: "100%",
                margin: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  height: "15px",
                  width: "15px",
                  backgroundColor: "#16ab8d",
                  marginTop: "10px",
                  marginRight: "30px",
                }}
              ></div>
              <div
                style={{
                  height: "50px",
                  width: "80%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p style={{ color: "white", margin: "0" }}>
                  represents that the elements are swapped.
                </p>
              </div>
            </div>
            <div
              style={{
                height: "40px",
                width: "100%",
                margin: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  height: "15px",
                  width: "15px",
                  backgroundColor: "#41B06E",
                  marginTop: "10px",
                  marginRight: "30px",
                }}
              ></div>
              <div
                style={{
                  height: "50px",
                  width: "80%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p style={{ color: "white", margin: "0" }}>
                  represents that the element is Sorted.
                </p>
              </div>
            </div>
            <div
              style={{
                height: "",
                width: "100%",
                margin: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  height: "15px",
                  width: "15px",
                  backgroundColor: "#98E4FF",
                  marginTop: "10px",
                  marginRight: "30px",
                }}
              ></div>
              <div
                style={{
                  height: "50px",
                  width: "80%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p style={{ color: "white", margin: "0" }}>
                  represents the Array Elements.
                </p>
              </div>
            </div>
            <div
              style={{
                height: "40px",
                width: "100%",
                margin: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  height: "15px",
                  width: "15px",
                  backgroundColor: "#1827fc",
                  marginTop: "10px",
                  marginRight: "30px",
                }}
              ></div>
              <div
                style={{
                  height: "50px",
                  width: "80%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p style={{ color: "white", margin: "0" }}>
                  represents the current element in the Iteration.
                </p>
              </div>
            </div>
            <div
              style={{
                height: "40px",
                width: "100%",
                margin: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  height: "15px",
                  width: "15px",
                  backgroundColor: "#ea9d55",
                  marginTop: "10px",
                  marginRight: "30px",
                }}
              ></div>
              <div
                style={{
                  height: "50px",
                  width: "80%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p style={{ color: "white", margin: "0" }}>
                  represents the pivot element.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bubble-sort-description">
        <div className="description">
          <h4>DESCRIPTION</h4>
          <p>
            Quick sort is a highly efficient and widely used sorting algorithm
            that employs a divide-and-conquer strategy. It works by selecting a
            'pivot' element from the array and partitioning the other elements
            into two sub-arrays: those less than the pivot and those greater
            than the pivot. Quick sort then recursively sorts the sub-arrays.
          </p>
          <p>
            In-place Sorting: Quick sort can be implemented in-place, meaning it
            requires only a small, constant amount of additional storage space.
            This is done by swapping elements within the array during the
            partitioning phase, ensuring that the overall space complexity
            remains low.
          </p>
          <p>
            1. Choose a Pivot: The algorithm selects an element as the pivot.
            Various methods can be used to choose the pivot, such as selecting
            the first element, the last element, a random element, or the
            median. <br />
            2. Partitioning: The array is partitioned into two sub-arrays.
            Elements less than the pivot are moved to the left of the pivot, and
            elements greater than the pivot are moved to the right. This
            partitioning step ensures that the pivot is in its final sorted
            position. <br />
            3. Recursion: The pivot divides the array into two smaller
            sub-arrays. The process is recursively applied to these sub-arrays:
            <li>
              The left sub-array, containing elements less than the pivot.
            </li>
            <li>
              {" "}
              The right sub-array, containing elements greater than the pivot.
            </li>{" "}
            <br />
            4. Base Case: The recursion ends when sub-arrays have zero or one
            element, which are by definition sorted.
          </p>
          <p>
            Efficiency: Quick sort is highly efficient on average, with a time
            complexity of 𝑂 ( 𝑛 log ⁡ 𝑛 ) O(nlogn) where 𝑛 n is the number of
            elements in the array. However, its performance can degrade to O(n²)
            in the worst case, particularly when the smallest or largest element
            is consistently chosen as the pivot. This scenario can be mitigated
            by using randomization or the median-of-three method to choose a
            more balanced pivot.
          </p>
        </div>
        <div className="complexity">
          <h4>COMPLEXITY</h4>
          <div className="table">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "3px solid #00A9FF",
                width: "75%",
                height: "50px",
                color: "white",
              }}
            >
              {" "}
              <div
                style={{
                  margin: "10px",
                  padding: "5px",
                  borderRight: "3px solid #00A9FF",
                  height: "100%",
                  width: "175px",
                }}
              >
                Average Complexity
              </div>{" "}
              <div>O(nlogn)</div>{" "}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "3px solid #00A9FF",
                width: "75%",
                height: "50px",
                color: "white",
              }}
            >
              {" "}
              <div
                style={{
                  margin: "10px",
                  padding: "05px",
                  borderRight: "3px solid #00A9FF",
                  height: "100%",
                  width: "175px",
                }}
              >
                Best Case Complexity
              </div>{" "}
              <div>O(nlogn)</div>{" "}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "3px solid #00A9FF",
                width: "75%",
                height: "50px",
                color: "white",
              }}
            >
              {" "}
              <div
                style={{
                  margin: "10px",
                  padding: "5px",
                  borderRight: "3px solid #00A9FF",
                  height: "100%",
                  width: "180px",
                  marginRight: "30px",
                }}
              >
                Worst Case Complexity
              </div>{" "}
              <div>O(n²)</div>{" "}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "70%",
                height: "50px",
                color: "white",
              }}
            >
              {" "}
              <div
                style={{
                  margin: "10px",
                  padding: "5px",
                  borderRight: "3px solid #00A9FF",
                  height: "100%",
                  width: "170px",
                  marginRight: "35px",
                }}
              >
                Space Complexity
              </div>{" "}
              <div>O(1)</div>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="code-section">
        <h2 id="source-code">
          <span>SOURCE</span>
          <span> CODE :</span>
        </h2>
        <div className="code-snippet">
          <div className="language-bar">
            <div
              className="language-option"
              onClick={() => handleLanguageSelect("javascript")}
            >
              <div>
                <img
                  src={javascriptLogo}
                  alt="java-logo"
                  style={{ height: "25px", width: "25px" }}
                />
              </div>
            </div>
            <div
              className="language-option"
              onClick={() => handleLanguageSelect("python")}
            >
              <img
                src={pythonLogo}
                alt="java-logo"
                style={{ height: "45px", width: "45px" }}
              />
            </div>
            <div
              className="language-option"
              onClick={() => handleLanguageSelect("java")}
            >
              <img
                src={javaLogo}
                alt="java-logo"
                style={{ height: "35px", width: "35px" }}
              />
            </div>
            <div
              className="language-option"
              onClick={() => handleLanguageSelect("cpp")}
            >
              <img
                src={cppLogo}
                alt="java-logo"
                style={{ height: "30px", width: "30px" }}
              />
            </div>
            <div
              className="language-option"
              onClick={() => handleLanguageSelect("c")}
            >
              <img
                src={cLogo}
                alt="java-logo"
                style={{ height: "30px", width: "30px" }}
              />
            </div>
            <div
              className="language-option"
              style={{
                width: "200px",
                height: "50px",
                paddingTop: "5px",
                fontSize: "medium",
                fontFamily: "PT Serif",
                fontWeight: "400",
                fontStyle: "normal",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
              }}
              onClick={copyToClipBoard}
            >
              <p className="copy-to-clipboard">
                {" "}
                <FaCopy /> copy to clipboard
              </p>
            </div>
          </div>
          <pre>
            <code className="javascript">{program}</code>
          </pre>
        </div>
      </div>
    </>
  );
}

export default QuickSort;
