import { createRoot } from "react-dom";
import Settings from "./components/settings.js";

import "./settings-page.scss";

const root = createRoot(document.getElementById("react-jsonschema-form-renderer"));
root.render(<Settings/>);
