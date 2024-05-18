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
import cpp from "highlight.js/lib/languages/cpp"
import c from "highlight.js/lib/languages/c"
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/github-dark-dimmed.css";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);
hljs.registerLanguage("cpp" , cpp)
hljs.registerLanguage("c" , c)


function SelectionSort() {

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
  public class SelectionSort {
    // Function to perform selection sort
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;  // Find the minimum element in unsorted array
            for (int j = i + 1; j < n; j++)
                if (arr[j] < arr[minIdx])
                    minIdx = j;
            // Swap the found minimum element with the first element
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
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

  async function selectionSort(array) {
    const arrayCopy = [...array];

    for (let i = 0; i < arrayCopy.length - 1; i++) {
      let index = i;
      setChoosenIdx(i);
      await new Promise((resolve) => setTimeout(resolve, 100));
      for (let j = i + 1; j < arrayCopy.length; j++) {
        setSearchIdx(j);
        await new Promise((resolve) => setTimeout(resolve, speed));
        if (arrayCopy[j] < arrayCopy[index]) {
          index = j;
          setMinIdx(j);
          await new Promise((resolve) => setTimeout(resolve, speed));
        }
      }
      setSearchIdx(null);
      setMinIdx(null);

      if (index !== i) {
        const temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[index];
        arrayCopy[index] = temp;
        setArray([...arrayCopy]);
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
      setChoosenIdx(null);
    }
    const tempArray = [];
    for (let i = 0; i < array.length; i++) {
      tempArray.push(i);
    }
    setSortedIdx(tempArray);
    await new Promise((resolve) => setTimeout(resolve, speed));
    
  }

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(program);
    const ele = document.querySelector(".copy-to-clipboard");
    ele.style.color = "#a9a9a9";
  };

  const javascriptCode = `  // Function to perform selection sort
  function selectionSort(arr) {
      let n = arr.length;
      for (let i = 0; i < n - 1; i++) {
          let minIdx = i;  // Find the minimum element in unsorted array
          for (let j = i + 1; j < n; j++)
              if (arr[j] < arr[minIdx])
                  minIdx = j;
          // Swap the found minimum element with the first element
          [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      }
  }
  `;

  const cCode = ` #include <stdio.h>
  // Function to perform selection sort
  void selectionSort(int arr[], int n) {
      for (int i = 0; i < n - 1; i++) {
          int minIdx = i;  // Find the minimum element in unsorted array
          for (int j = i + 1; j < n; j++)
              if (arr[j] < arr[minIdx])
                  minIdx = j;
          // Swap the found minimum element with the first element
          int temp = arr[minIdx];
          arr[minIdx] = arr[i];
          arr[i] = temp;
      }
  }
  `;

  const cppCode = `  #include <iostream>
  using namespace std;
  // Function to perform selection sort
  void selectionSort(int arr[], int n) {
      for (int i = 0; i < n - 1; i++) {
          int minIdx = i;  // Find the minimum element in unsorted array
          for (int j = i + 1; j < n; j++)
              if (arr[j] < arr[minIdx])
                  minIdx = j;
          // Swap the found minimum element with the first element
          int temp = arr[minIdx];
          arr[minIdx] = arr[i];
          arr[i] = temp;
      }
  }
  `;

  const pythonCode = `
  def selection_sort(arr):
  n = len(arr)
  for i in range(n):
      min_idx = i  # Find the minimum element in unsorted array
      for j in range(i + 1, n):
          if arr[j] < arr[min_idx]:
              min_idx = j

      # Swap the found minimum element with the first element
      arr[i], arr[min_idx] = arr[min_idx], arr[i]
  `;

  const javaCode = `
  public class SelectionSort {
    // Function to perform selection sort
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;  // Find the minimum element in unsorted array
            for (int j = i + 1; j < n; j++)
                if (arr[j] < arr[minIdx])
                    minIdx = j;
            // Swap the found minimum element with the first element
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
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
              SELECTION SORT
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
              <Button variant="primary" onClick={() => selectionSort(array)}>
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
                  backgroundColor: "#416ed0",
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
                  represents current element.
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
                  represents that the elements is Sorted
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
                  backgroundColor: "#FBA834",
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
                  represents the element is smaller than the current element.
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
                  represents searching for the minimum index.
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
            Selection sort is a straightforward sorting algorithm that
            repeatedly selects the smallest (or largest, depending on sorting
            order) element from the unsorted portion of the list and moves it to
            its correct position in the sorted portion of the list. This process
            is continued until the entire list is sorted.
          </p>
          <p>
            Selection sort works by dividing the list into two parts: a sorted
            section at the beginning and an unsorted section for the remainder
            of the list. It repeatedly selects the minimum element (considering
            ascending order) from the unsorted section and swaps it with the
            first unsorted element. The algorithm then moves the boundary
            between the sorted and unsorted sections one element to the right.
          </p>
          <p>
            Iteration: In each iteration, the algorithm searches for the minimum
            element from the unsorted section and swaps it with the leftmost
            unsorted element, effectively growing the sorted section by one
            element. This process is repeated 𝑛 − 1 n−1 times, where 𝑛 n is the
            number of elements in the list. By the end of the process, the
            entire list is sorted.
          </p>
          <p>
            Efficiency: Selection sort is not very efficient for large lists, as
            it has a time complexity of 𝑂 ( 𝑛 2 ) O(n 2 ) in all cases (best,
            average, and worst). This quadratic time complexity means that the
            algorithm's performance decreases rapidly as the size of the list
            increases. Despite this inefficiency for large datasets, selection
            sort has the advantage of being simple to implement and understand.
            Additionally, it performs a minimal number of swaps, which can be
            advantageous in scenarios where write operations are costly.
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

export default SelectionSort;
