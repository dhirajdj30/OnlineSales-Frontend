import React, { useState } from "react";
import FormPage from "./FormPage";
import ResponsePage from "./ResponsePage";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState(null);

  const handleSubmit = (data) => {
    setLoading(true);

    fetch("https://ethixlucifer.eastus2.cloudapp.azure.com:3000/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setImageData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setLoading(false);
      });
  };

  const handleReset = () => {
    setImageData(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <div className="loader"></div>
        </div>
      )}
      {!imageData ? (
        <FormPage onSubmit={handleSubmit} />
      ) : (
        <ResponsePage imageData={imageData} onReset={handleReset} />
      )}
    </div>
  );
};

export default App;
