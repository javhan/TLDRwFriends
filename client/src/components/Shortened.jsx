import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoggedContext } from "../App.js"
import Nav from "./Nav";
import "./Shortened.css";
import axiosInstance from "../axios"
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Link, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
      position: 'relative',
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
    //   backgroundImage: 'url(https://source.unsplash.com/random)',
    //   backgroundSize: 'cover',
    //   backgroundRepeat: 'no-repeat',
    //   backgroundPosition: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0,
      },
    },
  }));

function Shortened(props) {
    console.log(props)
    const classes = useStyles();
    const history = useHistory()

    const loggedContext = useContext(LoggedContext);

    const post = props?.location.state;

    const contentMapped = post.content.map((item) => {
    return <li>{item}</li>;
    });

    const handleSave = (e) => {
        e.preventDefault();
        if (!loggedContext.logState) {
            history.push("/login")
        }

        axiosInstance
        .patch(`shorten/${props.location.state}`)
        // props.location.state.user
        // use axios to go here 'api/summaries' and then trigger partial update()
    }

    return (
    <Nav>
        <div className="SBody">
        <div className="sLeft">
            <Paper className={classes.mainFeaturedPost}>
            {/* Increase the priority of the hero background image */}
            {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
            <div className={classes.overlay} />
            <Grid container>
                <Grid item md={10}>
                <div className={classes.mainFeaturedPostContent}>
                    <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                    {post.title}
                    </Typography>
                    <br/>
                    <Typography variant="h6" color="inherit" paragraph align="left">
                    {contentMapped}
                    </Typography>
                    <br />
                    <Link variant="subtitle1" color="secondary" href={post.url}>
                    Explore more...
                    </Link>
                    <Typography variant="h6" color="inherit" paragraph align="left">
                    tags: {post.tags.join(", ")}
                    </Typography>
                    <Button variant="contained" onClick={handleSave}>Save</Button>
                    <Button variant="contained" color="primary">Comment</Button>
                </div>
                </Grid>
            </Grid>
            </Paper>
        </div>
        <div className="sRight">
            <div className="SRtop">
                Primers
            </div>
            <div className="SRbottom">
                Similar News
            </div>
        </div>
        </div>
    </Nav>
    );
}

export default Shortened;
