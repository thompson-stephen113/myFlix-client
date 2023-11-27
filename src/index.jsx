import { createRoot } from "react-dom/client";
import { FavoriteMoviesProvider } from "./favorite-movies-context";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";

// Import index.scss to bundle
import "./index.scss";

// Main component
const MyFlixApplication = () => {
    return (
        <Container fluid>
            <FavoriteMoviesProvider>
                <MainView />
            </FavoriteMoviesProvider>
        </Container>
    );
};

// Finds root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render app in the root DOM element
root.render(<MyFlixApplication />);
