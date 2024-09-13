import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const [expandSidebar, setExpandSidebar] = useState(false);

  return (
    <>
      <Header
        expandSidebar={expandSidebar}
        setExpandSidebar={setExpandSidebar}
      />
    </>
  );
}

export default App;
