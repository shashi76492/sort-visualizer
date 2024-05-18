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
  return (
    <>
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
    </>
  );
}

export default App;
