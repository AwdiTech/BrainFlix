import Header from './components/Header/Header.js';
import Home from './Pages/Home/Home.js';
import Upload from './Pages/Upload/Upload.js';
import NotFound from './Pages/NotFound/NotFound.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.scss';


/**
 * App Component
 * 
 * The main component of the application, serving as the root of the component tree.
 * This component  includes React Router setup to handle routing for different pages in the application.
 * 
 * The application's layout is structured as follows:
 * - Header: The top navigation header, consistent across all pages.
 * - Router: The routing mechanism that renders different components based on the URL path.
 *   - Home: Rendered at the root path ("/").
 *   - Upload: Rendered at the "/upload" path for video uploads.
 *   - NotFound: A catch-all component rendered for any undefined paths, providing a 404 Not Found page.
 * 
 * The styling for the application is managed via 'App.scss'.
 */

function App() {


    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/videos/:videoId" element={<Home />} />
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>


        </div>
    );
}

export default App;
