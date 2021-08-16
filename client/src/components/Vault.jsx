import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import Nav from "./Nav";
import "./Vault.css";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Vault() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [vault, setVault] = useState();
  const [selectedTopic, setSelectedTopic] = useState("all");
  useEffect(() => {
    axiosInstance.get(`summaries/`).then((res) => {
      console.log(res);
      setVault(res);
    });
  }, []);

  const topicList = [];
  vault?.data.map((datum) => {
    for (let i = 0; i < datum?.tags?.length; i++) {
      if (!topicList.includes(datum?.tags[i])) {
        topicList.push(datum?.tags[i]);
      }
    }
  });

  const results = vault?.data?.map((post) => {
    if (selectedTopic === "all") {
      return (
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {post.title}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      );
    } else {
      if (post.tags.includes(selectedTopic)) {
        return (
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {post.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        );
      }
    }
  });

  const clickTopic = (topic) => {
    console.log(topic);
    setSelectedTopic(topic);
  };
  console.log(topicList);

  if (topicList.length === 0) {
    return (
      <Nav>
        <h1>Loading, please wait</h1>
      </Nav>
    );
  } else {
    return (
      <Nav>
        <div className="container">
          <div className="topHalf">
            <div className="topics">
              <h3>Searched Topics</h3>
              <ul>
                {topicList.map((topic, index) => {
                  return (
                    <li key={index} onClick={() => clickTopic(topic)}>
                      {topic}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="results">{results}</div>
          </div>
          <div className="bottomHalf">analytics?</div>
        </div>
      </Nav>
    );
  }
}

export default Vault;
