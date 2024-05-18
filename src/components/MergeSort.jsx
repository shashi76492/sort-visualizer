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

function MergeSort() {

  const [speed , setSpeed] = useState(500);
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
  // Function to merge two sub-arrays of arr[]
  public void merge(int arr[], int l, int m, int r) {
      // Find sizes of two sub-arrays to be merged
      int n1 = m - l + 1;
      int n2 = r - m;
      // Create temporary arrays
      int L[] = new int[n1];
      int R[] = new int[n2];
      // Copy data to temporary arrays L[] and R[]
      for (int i = 0; i < n1; ++i)
          L[i] = arr[l + i];
      for (int j = 0; j < n2; ++j)
          R[j] = arr[m + 1 + j];
      // Merge the temporary arrays
      // Initial indexes of first and second sub-arrays
      int i = 0, j = 0;
      // Initial index of merged sub-array
      int k = l;
      while (i < n1 && j < n2) {
          if (L[i] <= R[j]) {
              arr[k] = L[i];
              i++;
          } else {
              arr[k] = R[j];
              j++;
          }
          k++;
      }
      // Copy remaining elements of L[] if any
      while (i < n1) {
          arr[k] = L[i];
          i++;
          k++;
      }
      // Copy remaining elements of R[] if any
      while (j < n2) {
          arr[k] = R[j];
          j++;
          k++;
      }
  }
  // Main function that sorts arr[l..r] using merge()
  public void mergeSort(int arr[], int l, int r) {
      if (l < r) {
          // Find the middle point
          int m = (l + r) / 2;

          // Sort first and second halves
          sort(arr, l, m);
          sort(arr, m + 1, r);

          // Merge the sorted halves
          merge(arr, l, m, r);
      }
  }
  `);

  function resetArray() {
    if(size == 0 || size > 30) {
      setSize(10);
      alert("Array size cannot be 0 and cannot exceed 30");
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

  async function mergeSort(array, low, high) {
    if (low < high) {
      const mid = Math.floor((low + high) / 2);
      await mergeSort(array, low, mid);
      await mergeSort(array, mid + 1, high);
      await merge(array, low, mid, high);
    }
  }

  async function merge(array, low, mid, high) {
    let p1 = low,
      p2 = mid + 1;
    let c = [];

    while (p1 <= mid && p2 <= high) {
      setComparedIdx([p1, p2]);
      await new Promise((resolve) => setTimeout(resolve, speed));
      if (array[p1] < array[p2]) {
        c.push(array[p1++]);
      } else {
        c.push(array[p2++]);
      }
    }
    setComparedIdx([]);
    await new Promise((resolve) => setTimeout(resolve, 500));

    while (p1 <= mid) {
      c.push(array[p1++]);
    }

    while (p2 <= high) {
      c.push(array[p2++]);
    }

    for (let i = 0; i < c.length; i++) {
      array[i + low] = c[i];
      setArray([...array]);
      await new Promise((resolve) => setTimeout(resolve, speed));
    }
  }

  async function startMergeSort() {
    await mergeSort(array, 0, array.length - 1);
    setArray([...array]);
    await new Promise((resolve) => setTimeout(resolve, speed));
    const isSorted = array.every((value, index) => {
      if (index === 0) return true;
      return value >= array[index - 1];
    });

    if (isSorted) {
      const sortedIndices = array.map((_, index) => index);
      setSortedIdx(sortedIndices);
      await new Promise((resolve) => setTimeout(resolve, speed));
    } else {
      setSortedIdx([]);
    }
  }

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(program);
    const ele = document.querySelector(".copy-to-clipboard");
    ele.style.color = "#a9a9a9";
  };

  const javascriptCode = `function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    // Split the array in half
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    // Recursively merge the sorted halves
    return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Merge the two arrays
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    // Concatenate any remaining elements
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
  `;

  const cCode = ` #include <stdio.h>
  // Function to merge two sub-arrays of arr[]
  void merge(int arr[], int l, int m, int r) {
      // Find sizes of two sub-arrays to be merged
      int n1 = m - l + 1;
      int n2 = r - m;
      // Create temporary arrays
      int L[n1], R[n2];
      // Copy data to temporary arrays L[] and R[]
      for (int i = 0; i < n1; ++i)
          L[i] = arr[l + i];
      for (int j = 0; j < n2; ++j)
          R[j] = arr[m + 1 + j];
      // Merge the temporary arrays
      // Initial indexes of first and second sub-arrays
      int i = 0, j = 0;
      // Initial index of merged sub-array
      int k = l;
      while (i < n1 && j < n2) {
          if (L[i] <= R[j]) {
              arr[k] = L[i];
              i++;
          } else {
              arr[k] = R[j];
              j++;
          }
          k++;
      }
      // Copy remaining elements of L[] if any
      while (i < n1) {
          arr[k] = L[i];
          i++;
          k++;
      }
      // Copy remaining elements of R[] if any
      while (j < n2) {
          arr[k] = R[j];
          j++;
          k++;
      }
  }
  // Main function that sorts arr[l..r] using merge()
  void merge_sort(int arr[], int l, int r) {
      if (l < r) {
          // Find the middle point
          int m = l + (r - l) / 2;
  
          // Sort first and second halves
          merge_sort(arr, l, m);
          merge_sort(arr, m + 1, r);
  
          // Merge the sorted halves
          merge(arr, l, m, r);
      }
  }
  `;

  const cppCode = ` #include <iostream>
  #include <vector>
  using namespace std;
  // Function to merge two sub-arrays of arr[]  
  void merge(vector<int>& arr, int l, int m, int r) {
      // Create temporary vectors to store the left and right sub-arrays
      vector<int> left(arr.begin() + l, arr.begin() + m + 1);
      vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);
      // Merge the two sub-arrays into the original array
      int i = 0, j = 0, k = l;
      while (i < left.size() && j < right.size()) {
          if (left[i] <= right[j]) {
              arr[k] = left[i];
              i++;
          } else {
              arr[k] = right[j];
              j++;
          }
          k++;
      }
      // Copy the remaining elements of left[] if any
      while (i < left.size()) {
          arr[k] = left[i];
          i++;
          k++;
      }
      // Copy the remaining elements of right[] if any
      while (j < right.size()) {
          arr[k] = right[j];
          j++;
          k++;
      }
  }
  // Main function that sorts arr[l..r] using merge()
  void mergeSort(vector<int>& arr, int l, int r) {
      if (l < r) {
          // Find the middle point
          int m = l + (r - l) / 2;
  
          // Sort first and second halves
          mergeSort(arr, l, m);
          mergeSort(arr, m + 1, r);
  
          // Merge the sorted halves
          merge(arr, l, m, r);
      }
  }
  `;

  const pythonCode = `
def merge_sort(arr):
  if len(arr) <= 1:
      return arr

  # Split the array in half
  middle = len(arr) // 2
  left = arr[:middle]
  right = arr[middle:]

  # Recursively merge the sorted halves
  return merge(merge_sort(left), merge_sort(right))

def merge(left, right):
  result = []
  left_index = 0
  right_index = 0

  # Merge the two arrays
  while left_index < len(left) and right_index < len(right):
      if left[left_index] < right[right_index]:
          result.append(left[left_index])
          left_index += 1
      else:
          result.append(right[right_index])
          right_index += 1

  # Concatenate any remaining elements
  return result + left[left_index:] + right[right_index:]
  `;

  const javaCode = `
  // Function to merge two sub-arrays of arr[]
  public void merge(int arr[], int l, int m, int r) {
      // Find sizes of two sub-arrays to be merged
      int n1 = m - l + 1;
      int n2 = r - m;
      // Create temporary arrays
      int L[] = new int[n1];
      int R[] = new int[n2];
      // Copy data to temporary arrays L[] and R[]
      for (int i = 0; i < n1; ++i)
          L[i] = arr[l + i];
      for (int j = 0; j < n2; ++j)
          R[j] = arr[m + 1 + j];
      // Merge the temporary arrays
      // Initial indexes of first and second sub-arrays
      int i = 0, j = 0;
      // Initial index of merged sub-array
      int k = l;
      while (i < n1 && j < n2) {
          if (L[i] <= R[j]) {
              arr[k] = L[i];
              i++;
          } else {
              arr[k] = R[j];
              j++;
          }
          k++;
      }
      // Copy remaining elements of L[] if any
      while (i < n1) {
          arr[k] = L[i];
          i++;
          k++;
      }
      // Copy remaining elements of R[] if any
      while (j < n2) {
          arr[k] = R[j];
          j++;
          k++;
      }
  }
  // Main function that sorts arr[l..r] using merge()
  public void mergeSort(int arr[], int l, int r) {
      if (l < r) {
          // Find the middle point
          int m = (l + r) / 2;

          // Sort first and second halves
          sort(arr, l, m);
          sort(arr, m + 1, r);

          // Merge the sorted halves
          merge(arr, l, m, r);
      }
  }
  `;

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

  const handleSpeed = (value) => {
    setSpeed(500 / value)
  }

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
              MERGE SORT
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
              <Button variant="primary" onClick={() => startMergeSort(array)}>
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
          </div>
        </div>
      </div>
      <div className="bubble-sort-description">
        <div className="description">
          <h4>DESCRIPTION</h4>
          <p>
            Merge sort is another highly efficient sorting algorithm that
            follows the divide-and-conquer strategy. It works by recursively
            dividing the array into smaller sub-arrays, sorting them, and then
            merging them back together. Merge sort ensures that the array is
            divided into individual elements before merging them in a sorted
            manner.
          </p>
          <p>
            Stable Sorting: Merge sort is a stable sorting algorithm, meaning
            that it preserves the relative order of equal elements in the sorted
            output. This property makes merge sort particularly useful when
            sorting objects with multiple keys or properties.
          </p>
          <p>
            1. Divide: The algorithm divides the array into two halves
            recursively until each sub-array contains only one element. This
            process continues until the base case is reached, where each
            sub-array is considered sorted.
            <br /><br />
            2. Conquer: Once the base case is reached, the algorithm starts
            merging the sub-arrays in a sorted manner. It compares elements from
            both halves and merges them into a single sorted array.
            <br /><br />
            3. Merge: During the merge step, elements from the two sub-arrays
            are compared and placed in the correct order in a temporary array.
            The process continues until all elements from both sub-arrays are
            merged into a single sorted array.
            <br /><br />
            4. Base Case: The recursion ends when each sub-array contains only
            one element, as single-element arrays are considered sorted by
            definition.
          </p>
          <p>
            Efficiency: Merge sort has a consistent time complexity of 𝑂 ( 𝑛 log
            ⁡ 𝑛 ) O(nlogn), making it efficient for sorting large arrays. Its
            divide-and-conquer approach ensures that it performs well in both
            average and worst-case scenarios. Additionally, merge sort's stable
            nature makes it suitable for applications where maintaining the
            relative order of equal elements is important. However, merge sort
            does require additional space for the temporary array used during
            the merging phase, leading to a space complexity of 𝑂(n).
            Despite this, merge sort remains a popular choice for sorting large
            datasets efficiently.
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
                  width: "200px",
                  marginRight: "12px",
                }}
              >
                Worst Case Complexity
              </div>{" "}
              <div>O(nlogn)</div>{" "}
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
              <div>O(n)</div>{" "}
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

export default MergeSort;
