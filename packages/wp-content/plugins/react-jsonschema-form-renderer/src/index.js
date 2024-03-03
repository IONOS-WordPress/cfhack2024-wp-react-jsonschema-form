import { createRoot } from "react-dom";
import Settings from "./components/settings.js";

import "./index.scss";

const root = createRoot(document.getElementById("react-jsonschema-form-renderer"));
root.render(<Settings/>);
