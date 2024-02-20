import { createRoot } from "@wordpress/element";
import Settings from "./components/settings.js";

import "./index.scss";

const root = createRoot(document.getElementById("jsonschema-plugin-settings-page"));
root.render(<Settings/>);
