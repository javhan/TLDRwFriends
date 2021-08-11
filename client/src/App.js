import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    console.log(val);
    setUrl(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(url)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>TLDRwithFriends</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter URL" onChange={handleChange} />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default App;
