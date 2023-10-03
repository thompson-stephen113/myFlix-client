import { createRoot } from "react-dom/client";

// Import index.scss to bundle
import "./index.scss";

// Main component
const MyFlixApplication = () => {
    return (
        <div className="my-flix">
            <div>Good morning</div>
        </div>
    );
};

// Finds root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render app in the root DOM element
root.render(<MyFlixApplication />);
