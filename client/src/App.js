import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  const [expandSidebar, setExpandSidebar] = useState(false);

  return (
    <>
      <Header
        expandSidebar={expandSidebar}
        setExpandSidebar={setExpandSidebar}
      />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
