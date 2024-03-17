import { createRoot } from "react-dom";
import Settings from "./components/settings.js";

import "./index.scss";

const root = createRoot(document.getElementById("settings-page"));
root.render(<Settings />);
