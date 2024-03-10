import { createRoot } from "react-dom";
import Playground from "./components/playground.js";

import "./index.scss";

const root = createRoot(document.getElementById("react-jsonschema-form-renderer-playground"));
root.render(<Playground/>);
