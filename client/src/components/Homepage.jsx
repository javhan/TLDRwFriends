import React, { useState } from "react";
import Nav from "./Nav";
import "./Homepage.css";
import axios from "axios";

function Homepage() {
  const [url, setUrl] = useState("");
  const POST_ROUTE = "https://tldrwf.herokuapp.com/api/summary";

  const handleChange = (e) => {
    const val = e.target.value;
    console.log(val);
    setUrl(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("HI");
    // const headers = {
    //   'Content-Type': 'application/json',
    //   'Authorization': 'ADD JWT STUFF HERE'
    // }

    // axios
    //   .post(POST_ROUTE, data, {
    //     headers: headers
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <Nav>
      <div className="Homepage">
        <h1>TLDRwithFriends</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="url-field"
            type="text"
            placeholder="Enter URL"
            onChange={handleChange}
            size="50"
          />
          <input className="btn" type="submit" value="LET'S SAVE TIME" />
        </form>
        <span>Just drop you link and TLDR it</span>
        <div className="Description">
          <p>
            No time to read your favourite articles? Want a gist of what your
            friend just sent you so that you can tell them you read it? Then use
            TLDRwithFriends to get an easily digestible and comprehensible
            summary of those 15 minute articles you just can’t find the time to
            read!
          </p>
        </div>

        <span>What you get:</span>
        <ul>
          <li>Quick Summary of the article</li>
          <li>Primers</li>
          <li>Links discussing same topic</li>
          <li>TLDR Vault to store all your articles</li>
          <li>Saved Friendships</li>
        </ul>
      </div>
    </Nav>
  );
}

export default Homepage;
