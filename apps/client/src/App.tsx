import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/auth/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
