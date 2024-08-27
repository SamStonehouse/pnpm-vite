import React from "react";
import ReactDOM from "react-dom/client";
import App from "../source/app.tsx";


import "material-symbols";

import "normalize.css";
import "./root.css";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(<App />);
