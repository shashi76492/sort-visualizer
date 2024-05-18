import React, { useEffect, useState } from "react";
import QuickSort from "./QuickSort";
import { BrowserRouter as Router , Route , Routes } from "react-router-dom"


function Home() {
  const [sampleString, setSampleString] = useState("VISUALIZER");
  const [originalString, setOriginalString] = useState("ZVUSRLIIEA");
  const [sampleString1, setSampleString1] = useState("SORT");
  const [originalString1, setOriginalString1] = useState("TSRO");
  const [animationStarted, setAnimationStarted] = useState(false);
  const [glowAnimation, setGlowAnimation] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const updateOriginalString = async () => {
      let i = 0;
      const temp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      while (i < sampleString1.length) {
        let j = 0;
        for (j = 0; j < temp.length; j++) {
          if (temp[j] === sampleString1[i]) {
            break;
          }
          setOriginalString1(
            (prev) => prev.substring(0, i) + temp[j] + prev.substring(i + 1)
          );
          await new Promise((resolve) => setTimeout(resolve, 30));
        }
        if (j < temp.length) {
          setOriginalString1(
            (prev) => prev.substring(0, i) + temp[j] + prev.substring(i + 1)
          );
          await new Promise((resolve) => setTimeout(resolve, 30));
        }
        i++;
      }
    };

    if (animationStarted) {
      updateOriginalString();
    }
  }, [sampleString1, animationStarted]);

  useEffect(() => {
    const updateOriginalString = async () => {
      let i = 0;
      const temp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      while (i < sampleString.length) {
        let j = 0;
        for (j = 0; j < temp.length; j++) {
          if (temp[j] === sampleString[i]) {
            break;
          }
          setOriginalString(
            (prev) => prev.substring(0, i) + temp[j] + prev.substring(i + 1)
          );
          await new Promise((resolve) => setTimeout(resolve, 30));
        }
        if (j < temp.length) {
          setOriginalString(
            (prev) => prev.substring(0, i) + temp[j] + prev.substring(i + 1)
          );
          await new Promise((resolve) => setTimeout(resolve, 30));
        }
        i++;
      }
      setGlowAnimation("glow");
    };

    if (animationStarted) {
      updateOriginalString();
    }
  }, [sampleString, animationStarted]);

  useEffect(async () => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    setAnimationStarted(true);
  }, []);

  const callSideBar = () => {
    setSideBar(!sideBar);
    console.log(!sideBar);
  };

  return (
    <>
      
      <div className="section-1">
        <div className="container">
          <div className="heading">
            <span className={`${glowAnimation}`}>{originalString1}</span>{" "}
            <span className={`${glowAnimation}`}>{originalString}</span>
          </div>
          <div className="line"></div>
        </div>
      </div>
      <div className="section-2">
        <h1>Sorting Algorithms</h1>
        <p>
          {" "}
          Sorting algorithms are a set of techniques used to arrange elements of
          a list or array in a specific order, typically in ascending or
          descending order.
        </p>
        <br />
        <p>
          Sorting algorithms are evaluated based on their time complexity (how
          long they take to execute) and space complexity (how much memory they
          use). Different algorithms have different trade-offs in terms of
          efficiency and resource usage.
        </p>
        <br />
        <p>
          {" "}
          Sorting algorithms can be classified based on various criteria,
          including their time complexity (e.g., O(n^2), O(n log n)), stability
          (whether they preserve the relative order of equal elements), and
          internal/external sorting (based on whether data fits entirely in
          memory or requires external storage).
        </p>
        <h2>Types of Sortring Algorithms :- </h2>
        <br />
        <p>
          <b>Comparison-based algorithms:</b>These algorithms compare elements
          of the list to determine their relative order. Examples include Bubble
          Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, and Heap
          Sort.
        </p>
      </div>
      <div>
      </div>

    </>
  );
}

export default Home;
