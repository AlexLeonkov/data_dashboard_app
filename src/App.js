import { Button } from "antd";
import "./App.css";
import { useState } from "react";

function App() {
  const [data, setData] = useState(null);

  const fetchTheData = () => {
    fetch("http://127.0.0.1:8080")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        console.log("Data received from server:", data);
        // Handle your data here

        setData(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };
  return (
    <div className="App">
      <h2>Heimdall App</h2>

      <Button onClick={fetchTheData} className="btn">
        Load new data
      </Button>

      {data ? <div className="result">{data}</div> : <></>}
    </div>
  );
}

export default App;
