import React, { useState, useEffect } from "react";
import Element from "./Element";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
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

function InsertionSort() {

  const [speed , setSpeed] = useState(500);
  const [size, setSize] = useState(10);
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
  public class InsertionSort {
    // Function to perform insertion sort
    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];  // Current element to be inserted
            int j = i - 1;
            // Move elements of arr[0..i-1], that are greater than key,
            // to one position ahead of their current position
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;  // Insert the key at the correct position
        }
    }
  `);

  function resetArray() {
    if (size == 0 || size > 30) {
      setSize(10);
      alert("Arrays Size cannot be 0 and cannot exceed 40");
      return;
    }
    const temp = [];
    for (let i = 0; i < size; i++) {
      temp.push(randomGenerator(5, 50));
    }
    setArray(temp);
    setSortedIdx([]);
    const ele = document.querySelector("input");
    ele.value = "";
  }

  function randomGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function insertionSort(array) {
    const arrayCopy = [...array];

    for (let i = 1; i < arrayCopy.length; i++) {
      let j = i - 1;
      let key = arrayCopy[i];
      setChoosenIdx(i);
      await new Promise((resolve) => setTimeout(resolve, speed));

      while (j >= 0 && arrayCopy[j] > key) {
        setComparedIdx([j, j + 1]);
        await new Promise((resolve) => setTimeout(resolve, speed));
        arrayCopy[j + 1] = arrayCopy[j];
        j--;
        setArray([...arrayCopy]);
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
      setComparedIdx([]);
      arrayCopy[j + 1] = key;
      setSearchIdx(j + 1);
      setChoosenIdx(null);
      setArray([...arrayCopy]);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSearchIdx(null);
    }
    const temp = [];
    for (let i = 0; i < array.length; i++) {
      temp.push(i);
    }
    setSortedIdx(temp);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(program);
    const ele = document.querySelector(".copy-to-clipboard");
    ele.style.color = "#a9a9a9";
  };

  const javascriptCode = `  // Function to perform insertion sort
  function insertionSort(arr) {
      for (let i = 1; i < arr.length; i++) {
          let key = arr[i];  // Current element to be inserted
          let j = i - 1;
  
          // Move elements of arr[0..i-1], that are greater than key,
          // to one position ahead of their current position
          while (j >= 0 && arr[j] > key) {
              arr[j + 1] = arr[j];
              j = j - 1;
          }
          arr[j + 1] = key;  // Insert the key at the correct position
      }
  }
  `;

  const cCode = ` #include <stdio.h>
  // Function to perform insertion sort
  void insertionSort(int arr[], int n) {
      for (int i = 1; i < n; i++) {
          int key = arr[i];  // Current element to be inserted
          int j = i - 1;
          // Move elements of arr[0..i-1], that are greater than key,
          // to one position ahead of their current position
          while (j >= 0 && arr[j] > key) {
              arr[j + 1] = arr[j];
              j = j - 1;
          }
          arr[j + 1] = key;  // Insert the key at the correct position
      }
  }
  `;

  const cppCode = `  #include <iostream>
  using namespace std;
  // Function to perform insertion sort
  void insertionSort(int arr[], int n) {
      for (int i = 1; i < n; i++) {
          int key = arr[i];  // Current element to be inserted
          int j = i - 1;
          // Move elements of arr[0..i-1], that are greater than key,
          // to one position ahead of their current position
          while (j >= 0 && arr[j] > key) {
              arr[j + 1] = arr[j];
              j = j - 1;
          }
          arr[j + 1] = key;  // Insert the key at the correct position
      }
  }
  `;

  const pythonCode = `
  def insertion_sort(arr):
  for i in range(1, len(arr)):
      key = arr[i]  # Current element to be inserted
      j = i - 1
      # Move elements of arr[0..i-1], that are greater than key,
      # to one position ahead of their current position
      while j >= 0 and key < arr[j]:
          arr[j + 1] = arr[j]
          j -= 1
      arr[j + 1] = key  # Insert the key at the correct position

  `;

  const javaCode = `
  public class InsertionSort {
    // Function to perform insertion sort
    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];  // Current element to be inserted
            int j = i - 1;
            // Move elements of arr[0..i-1], that are greater than key,
            // to one position ahead of their current position
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;  // Insert the key at the correct position
        }
    }
  `;

  const handleSpeed = (value) => {
    setSpeed(500 / value);
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
              INSERTION SORT
            </h1>
            <div className="buttons">
              <input
                type="text"
                onChange={(e) => setSize(e.target.value)}
                placeholder="Enter array size..."
              />
              <Button
                variant="primary"
                style={{ margin: "10px" }}
                onClick={resetArray}
              >
                Generate
              </Button>
              <Button variant="primary" onClick={() => insertionSort(array)}>
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
          </div>
        </div>
      </div>
      <div className="bubble-sort-description">
        <div className="description">
          <h4>DESCRIPTION</h4>
          <p>
            Insertion sort iterates, consuming one input element each
            repetition, and grows a sorted output list. At each iteration,
            insertion sort removes one element from the input data, finds the
            location it belongs within the sorted list, and inserts it there. It
            repeats until no input elements remain.
          </p>
          <p>
            Sorting is typically done in-place, by iterating up the array,
            growing the sorted list behind it. At each array-position, it checks
            the value there against the largest value in the sorted list (which
            happens to be next to it, in the previous array-position checked).
            If larger, it leaves the element in place and moves to the next. If
            smaller, it finds the correct position within the sorted list,
            shifts all the larger values up to make a space, and inserts into
            that correct position.
          </p>
          <p>
            The resulting array after k iterations has the property where the
            first k + 1 entries are sorted ("+1" because the first entry is
            skipped). In each iteration the first remaining entry of the input
            is removed, and inserted into the result at the correct position.
          </p>
          <p>
            Efficiency: Insertion sort is not highly efficient for large lists,
            as it has a time complexity of 𝑂(𝑛2)O(n2) in both the average and
            worst cases, where 𝑛n is the number of elements in the list. This
            quadratic time complexity means that the algorithm's performance
            decreases significantly as the size of the list increases. However,
            insertion sort has a linear time complexity 𝑂(𝑛) O(n) in the best
            case, where the input list is already sorted, making it more
            efficient for nearly sorted or small datasets.
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

export default InsertionSort;
