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
    btn:{
        marginRight: 10
    }
  }));

function Shortened(props) {
    const post = props?.location.state;

    const [isSaved, setSaved] = useState(post.user)
    const classes = useStyles();
    const history = useHistory()

    const loggedContext = useContext(LoggedContext);


    const contentMapped = post.content.map((item) => {
    return <li>{item}</li>;
    });

    const handleSave = (e) => {
        e.preventDefault();
        if (!loggedContext.logState) {
            history.push("/login")
        }
        axiosInstance
        .patch(`summaries-save/${props.location.state.id}/`, {
            "user" : loggedContext.logState.user_id
        })
        .then((res) => {
            setSaved(post.user)
            console.log(res)
        })
    }

    const handleRemove = (e) => {
        console.log("remove id")
        e.preventDefault();
        if (!loggedContext.logState) {
            history.push("/login")
        }
        axiosInstance
        .patch(`summaries-remove/${props.location.state.id}/`, {
            "user" : ""
        })
        .then((res) => {
            setSaved()
            console.log(res)
        })
    }

    const handleComment = () => {
        console.log("WIP")
    }

    return (
    <Nav>
        <div className="SBody">
        <div className="sLeft">
            <Paper className={classes.mainFeaturedPost}>            
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
                    {!isSaved &&
                        <Button variant="contained" className="btn" onClick={handleSave} style={{width: '110px'}}>Save</Button>
                    }
                    {isSaved && 
                        <Button variant="contained" className="btn" onClick={handleRemove} style={{width: '110px'}}>Remove</Button>
                    }               
                    <Button variant="contained" className="btn" color="primary" onClick={handleComment} style={{width: '110px'}}>Comment</Button>
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
