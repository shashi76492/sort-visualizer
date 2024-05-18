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

function BubbleSort() {

  const [speed , setSpeed] = useState(1000)
  const[size , setSize] = useState(10);
  const [array, setArray] = useState([]);
  const [comparedIdx, setComparedIdx] = useState([]);
  const [sortedIdx, setSortedIdx] = useState([]);
  const [swappedIdx, setSwappedIdx] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [program, setProgram] = useState(`
  public static int[] bubbleSort(int[] arr) {
    // Outer loop to traverse the entire array
    for(int i = 0; i < arr.length; i++) {
      // Inner loop to compare adjacent elements and perform swapping
      for(int j = 0; j < arr.length - 1; j++) {
        // If the current element is greater than the next element, swap them
        if(arr[j] > arr[j + 1]) {
          int temp = arr[j]; 
          arr[j] = arr[j + 1]; 
          arr[j + 1] = temp; 
        }
      }
    }
    return arr; 
  }
  `);

  function resetArray() {
    if(size == 0 || size > 30) {
      setSize(10);
      alert("Array Size cannot be 0 and cannot exceed 30")
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

  async function bubbleSort(array) {
    const sortedArray = [...array];
    for (let i = sortedArray.length - 1; i >= 0; i--) {
      for (let j = 0; j < i; j++) {
        setComparedIdx([j, j + 1]);
        await new Promise((resolve) => setTimeout(resolve, speed));
        if (sortedArray[j] > sortedArray[j + 1]) {
          let temp = sortedArray[j];
          sortedArray[j] = sortedArray[j + 1];
          sortedArray[j + 1] = temp;
          setArray([...sortedArray]);
          setSwappedIdx([j, j + 1]);
          await new Promise((resolve) => setTimeout(resolve, speed));
          setSwappedIdx([]);
        }
      }
      setSortedIdx((prevSortedIdx) => [...prevSortedIdx, i]);
      setComparedIdx([]);
    }
  }

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(program);
    const ele = document.querySelector(".copy-to-clipboard")
    ele.style.color = "#a9a9a9"
  }


  const javascriptCode = `  const bubbleSort = (arr) => {
    // Outer loop to traverse the entire array
    for (let i = 0; i < arr.length - 1; i++) {
      // Inner loop to compare adjacent elements and perform swapping
        for (let j = 0; j < arr.length - i - 1; j++) {
          // If the current element is greater than the next element, swap them
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j]; 
                arr[j] = arr[j + 1]; 
                arr[j + 1] = temp; 
            }
        }
    }
      return arr;
  };
  `;

  const cCode = `
  // Function to perform Bubble Sort
  void bubbleSort(int arr[], int n) {
      int i, j;
      for (i = 0; i < n-1; i++) {
          // Last i elements are already in place
          for (j = 0; j < n-i-1; j++) {
              // Swap if the element found is greater than the next element
              if (arr[j] > arr[j+1]) {
                  int temp = arr[j];
                  arr[j] = arr[j+1];
                  arr[j+1] = temp;
              }
          }
      }
  }
  `;

  const cppCode = `
  // Function to perform Bubble Sort
  void bubbleSort(int arr[], int n) {
      for (int i = 0; i < n-1; i++) {
          // Last i elements are already in place
          for (int j = 0; j < n-i-1; j++) {
              // Swap if the element found is greater than the next element
              if (arr[j] > arr[j+1]) {
                  int temp = arr[j];
                  arr[j] = arr[j+1];
                  arr[j+1] = temp;
              }
          }
      }
  }
  `;

  const pythonCode = `
  def bubbleSort(arr):
      n = len(arr) # Length of the array

      # Outer loop to traverse the entire array
      for i in range(n):
      # Inner loop to compare adjacent elements and perform swapping
          for j in range(n-i-1):
          # If the current element is greater than the next element, swap them
              if arr[j] > arr[j + 1]:
                  arr[j], arr[j + 1] = arr[j + 1], arr[j]

      return arr

  `;

  const javaCode = `
  public static int[] bubbleSort(int[] arr) {
    // Outer loop to traverse the entire array
    for(int i = 0; i < arr.length; i++) {
      // Inner loop to compare adjacent elements and perform swapping
      for(int j = 0; j < arr.length - 1; j++) {
        // If the current element is greater than the next element, swap them
        if(arr[j] > arr[j + 1]) {
          int temp = arr[j]; 
          arr[j] = arr[j + 1]; 
          arr[j + 1] = temp; 
        }
      }
    }
    return arr; 
  }
  `;

  const handleSpeed = (value) => {
    setSpeed(1000 / value);
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
    const ele = document.querySelector(".copy-to-clipboard")
    ele.style.color = "#fff"
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
              BUBBLE SORT
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
              <Button variant="primary" onClick={() => bubbleSort(array)}>
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
                  represents that the elements are compared.
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
                  represents that the element is Sorted
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
          </div>
        </div>
      </div>
      <div className="bubble-sort-description">
        <div className="description">
          <h4>DESCRIPTION</h4>
          <p>
            Bubble sort is a straightforward sorting algorithm that repeatedly
            steps through the list, compares adjacent elements, and swaps them
            if they are in the wrong order. It is named because smaller or
            larger elements "bubble" to the top of the list with each iteration.
          </p>
          <p>
            Comparison and Swap: Bubble sort compares each pair of adjacent
            items in the list and swaps them if they are in the wrong order. It
            starts with the first two elements, then moves to the next pair, and
            so on, until the end of the list is reached.
          </p>
          <p>
            Iteration: After completing one pass through the list, the largest
            (or smallest, depending on the sorting order) element will "bubble
            up" to its correct position at the end of the list. This means that
            after each iteration, the largest (or smallest) element is
            guaranteed to be in its final sorted position.
          </p>
          <p>
            Efficiency: Bubble sort is not very efficient for large lists, as it
            has a time complexity of O(n^2), where n is the number of elements
            in the list. This means its performance decreases rapidly as the
            size of the list increases. However, it is relatively simple to
            implement and understand, making it suitable for educational
            purposes or small datasets.
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
                  width: "175px",
                }}
              >
                Average Complexity
              </div>{" "}
              <div>O(n²)</div>{" "}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "3px solid #00A9FF",
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
                }}
              >
                Best Case Complexity
              </div>{" "}
              <div>O(n)</div>{" "}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "3px solid #00A9FF",
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
                fontSize:"medium",
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
              <p className="copy-to-clipboard" >
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

export default BubbleSort;
