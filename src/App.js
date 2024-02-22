import { Button } from "antd";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  //fetch the data from the server
  const fetchTheData = () => {
    setLoading(true);
    setError('');
    fetch("http://127.0.0.1:8080/table-info")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(`Failed to load data: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //download database from the server
  const downloadDatabase = () => {
    fetch("http://127.0.0.1:8080/download-database", {
      method: "GET",
      responseType: "blob", // Set the response type to blob
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.blob();
      })
      .then((blob) => {
        // Create a URL for the blob data
        const url = window.URL.createObjectURL(blob);

        // Create a link element and trigger a click to download
        const a = document.createElement("a");
        a.href = url;
        a.download = "telemetry.db"; // Specify the filename
        a.click();
        window.URL.revokeObjectURL(url); // Release the object URL
      })
      .catch((error) => {
        setError(`Failed to download database: ${error.message}`);
      });
  };

  useEffect(() => {
    fetchTheData();
  }, []); // Fetch data on component mount

  return (
    <div className="App">
      <h2>Heimdall App</h2>
      <Button onClick={fetchTheData} className="btn" disabled={loading}>
        {loading ? 'Loading...' : 'Load new data'}
      </Button>

      <Button onClick={downloadDatabase} className="btn">
        Download Database
      </Button>

      {error && <div className="error">{error}</div>}
      <div className="data-container">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="data-box">
            <div className="data-title">{key.replace(/Count$/, '')}</div>
            <div className="data-value">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
