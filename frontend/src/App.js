import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileUploder from "./components/FileUploder";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<FileUploder />} />

                </Routes>
            </Router>
        </div>
    );
}

export default App;
