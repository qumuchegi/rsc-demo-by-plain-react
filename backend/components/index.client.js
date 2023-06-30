import React from "react";
import { unstable_createRoot } from "react-dom";
import App from './App.client'

const domNode = document.getElementById("root");
const root = unstable_createRoot(domNode);
root.render(<App />);
