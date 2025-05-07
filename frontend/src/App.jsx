import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import DeliveryReport from "./pages/DeliveryReport"


function App() {
    return (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/delivery" element={<DeliveryReport />} />
        </Routes>
    </Router>
    )
}

export default App;
