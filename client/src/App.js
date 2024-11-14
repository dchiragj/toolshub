import { useState } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Routing from "./components/Routing";
import BottomToTop from "./components/BottomToTop";
import Footer from "./components/Footer";

function App() {
  const [expandSidebar, setExpandSidebar] = useState(false);

  return (
    <>
      <Header
        expandSidebar={expandSidebar}
        setExpandSidebar={setExpandSidebar}
      />
      <Routes>
        {
          Routing.map((val, ind) => {
            return (
              <Route key={ind} path={val.path} element={val.element} />
            )
          })
        }
      </Routes>
      <BottomToTop />
      <Footer />
    </>
  );
}

export default App;
