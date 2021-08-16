import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Nav from "./Nav";
import "./Homepage.css";
import axiosInstance from "../axios"
import { Button, Grid, Link, Paper, Typography } from '@material-ui/core';

function Homepage() {
  const history = useHistory()
  const [url, setUrl] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    console.log(val);
    setUrl(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axiosInstance
    .post(`summaries-shorten/`, {
        "url": url
    })
    .then((res) => {
      console.log("res: ", res)
      history.push('/shortened', res.data)
    })
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
