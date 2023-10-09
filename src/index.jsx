import { createRoot } from "react-dom/client";

import { MainView } from "./components/main-view/main-view";

// Import index.scss to bundle
import "./index.scss";

// Main component
const MyFlixApplication = () => {
    return (
        <MainView />
    );
};

// Finds root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render app in the root DOM element
root.render(<MyFlixApplication />);
