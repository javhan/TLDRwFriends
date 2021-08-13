import React, { useState } from "react";
import axios from "axios";

function Homepage() {
  const [url, setUrl] = useState("");
  const POST_ROUTE = "https://tldrwf.herokuapp.com/api/summary"

  const handleChange = (e) => {
    const val = e.target.value;
    console.log(val);
    setUrl(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'ADD JWT STUFF HERE'
    }

    axios
      .post(POST_ROUTE, data, {
        headers: headers
      })
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

export default Homepage;
