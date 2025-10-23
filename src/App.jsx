import { useState } from "react";
import Events from "../pages/Events";
import Header from "../components/Header";

function App() {
  const [filteredData, setFilteredData] = useState("");
  return (
    <>
      <Header setFilteredData={setFilteredData} />
      <Events searchData={filteredData} />
    </>
  );
}

export default App;
