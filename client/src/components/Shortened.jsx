import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LoggedContext } from "../App.js";
import Nav from "./Nav";
import SimilarNews from "./SimilarNews.jsx";
import "./Shortened.css";
import axiosInstance from "../axios";

import { makeStyles } from "@material-ui/core/styles";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    Divider,
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: "100vh",
    },
    mainFeaturedPost: {
        position: "relative",
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        //   backgroundImage: 'url(https://source.unsplash.com/random)',
        //   backgroundSize: 'cover',
        //   backgroundRepeat: 'no-repeat',
        //   backgroundPosition: 'center',
    },
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,.3)",
    },
    mainFeaturedPostContent: {
        position: "relative",
        padding: theme.spacing(3),
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
    btn: {
        marginRight: 10,
    },
}));

function Shortened(props) {
    const classes = useStyles();
    const history = useHistory();
    const loggedContext = useContext(LoggedContext);

    const post = props?.location?.state;

    console.log(post);

    const [isSaved, setSaved] = useState(post.user);
    const [expanded, setExpanded] = useState(false);
    const [loadComments, setLoadComments] = useState([]);
    const [commentField, setCommentField] = useState();
    const [commentEditField, setCommentEditField] = useState();
    const [isSelected, setIsSelected] = useState();
    const [fetcher, toggleFetcher] = useState(1);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    /***** Managing sending comments into the database*****/
    const handleCommentChange = (e) => {
        console.log(commentField);
        setCommentField({
            ...commentField,
            [e.target.name]: e.target.value,
        });
    };

    const handleCommentEditChange = (e) => {
        setCommentEditField({
            ...commentEditField,
            [e.target.name]: e.target.value,
        });
    };

    const handleComment = (e) => {
        if (!commentField || commentField?.body?.trim() === "") {
            alert("Comment Empty");
            return;
        }
        e.preventDefault();
        axiosInstance
            .post(`comments-post/`, {
                body: commentField.body,
                summary: post?.id,
                user: loggedContext?.logState?.user_id,
            })
            .then((res) => {
                if (res.status === 201) {
                    toggleFetcher((fetcher) => fetcher + 1);
                    setCommentField("");
                    //! write some code for triggering accordion if it's not expanded
                }
            });
    };

    const deleteComment = (commentID) => {
        axiosInstance.delete(`comments/${commentID}`).then((res) => {
            if (res.status === 204) {
                window.location.reload();
            }
        });
    };

    const toggleEdit = (commentID) => {
        if (isSelected === commentID) {
            setIsSelected();
        } else {
            setIsSelected(commentID);
        }
    };

    const submitEdit = (commentID) => {
        axiosInstance
            .patch(`comments/${commentID}/`, {
                body: commentEditField.body,
            })
            .then((res) => {
                if (res.status === 200) {
                    toggleFetcher((fetcher) => fetcher + 1);
                    setIsSelected();
                }
            });
    };

    const commentSection = loadComments?.map((comment, index) => {
        if (isSelected === comment.id) {
            return (
                <>
                    <Grid item sm={12}>
                        <Card>
                            <Typography variant="subtitle1">
                                {comment.user.username}
                            </Typography>
                            <TextField
                                defaultValue={comment.body}
                                name="body"
                                onChange={handleCommentEditChange}
                            />
                            <Button onClick={() => submitEdit(comment.id)}>
                                Save
                            </Button>
                            <Button onClick={toggleEdit}>Cancel</Button>
                        </Card>
                    </Grid>
                </>
            );
        } else {
            return (
                <>
                    <Grid item sm={12}>
                        <Card>
                            <Typography>{comment.user.username}</Typography>
                            <Typography>{comment.body}</Typography>
                            {comment.user.id ===
                                loggedContext?.logState?.user_id && (
                                <>
                                    <Button
                                        onClick={() => toggleEdit(comment.id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            deleteComment(comment.id);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </>
                            )}
                        </Card>
                    </Grid>
                    <Divider />
                </>
            );
        }
    });

    const contentMapped = post.content.map((item, index) => {
        return <li key={index}>{item}</li>;
    });

    /***** Managing Saving/Deleting Summary For Vault Purposes *****/
    const handleSave = (e) => {
        e.preventDefault();
        if (!loggedContext.logState) {
            history.push("/login");
        }
        axiosInstance
            .patch(`summaries-save/${props.location.state.id}/`, {
                user: loggedContext.logState.user_id,
            })
            .then((res) => {
                setSaved(post.user);
                console.log(res);
            });
    };

    const handleRemove = (e) => {
        console.log("remove id");
        e.preventDefault();
        if (!loggedContext.logState) {
            history.push("/login");
        }
        axiosInstance
            .patch(`summaries-remove/${props.location.state.id}/`, {
                user: "",
            })
            .then((res) => {
                setSaved();
                console.log(res);
            });
    };
    console.log(loggedContext?.logState?.post);

    // CAN'T ATTACH BODY TO GET, USE PARAMS
    useEffect(() => {
        axiosInstance
            .get(`comments/`, {
                params: {
                    summary: post.id,
                },
            })
            .then((res) => {
                console.log(res.data);
                setLoadComments(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [fetcher]);

    return (
        <Nav className={classes.root}>
            <div className="SBody">
                <div className="sLeft">
                    <Paper className={classes.mainFeaturedPost}>
                        {
                            <img
                                style={{ display: "none" }}
                                src={post.image}
                                alt={post.imageText}
                            />
                        }
                        <div className={classes.overlay} />
                        <Grid container spacing={2}>
                            <Grid item md={10}>
                                <div
                                    className={classes.mainFeaturedPostContent}
                                >
                                    <Typography
                                        component="h1"
                                        variant="h5"
                                        color="inherit"
                                        gutterBottom
                                    >
                                        {post.title}
                                    </Typography>
                                    <br />
                                    <Typography
                                        variant="body"
                                        color="inherit"
                                        component="p"
                                        align="left"
                                    >
                                        {contentMapped}
                                    </Typography>
                                    <br />
                                    <Link
                                        variant="subtitle1"
                                        color="secondary"
                                        href={post.url}
                                    >
                                        Explore more...
                                    </Link>
                                    <Typography
                                        variant="body2"
                                        color="inherit"
                                        paragraph
                                        align="left"
                                    >
                                        tags: {post?.tags?.join(", ")}
                                    </Typography>
                                    {loggedContext.logState && (
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={9}>
                                                <TextField
                                                    // id="outlined-basic"
                                                    label="Enter Comment"
                                                    variant="filled"
                                                    name="body"
                                                    color="secondary"
                                                    placeholder="Pen your thoughts here"
                                                    onChange={
                                                        handleCommentChange
                                                    }
                                                    fullWidth
                                                    gutterBottom
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Button
                                                    variant="contained"
                                                    className="btn"
                                                    color="primary"
                                                    onClick={handleComment}
                                                    style={{ width: "110px" }}
                                                >
                                                    Comment
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    )}

                                    {!isSaved && (
                                        <Button
                                            variant="contained"
                                            className="btn"
                                            onClick={handleSave}
                                            style={{ width: "110px" }}
                                        >
                                            Save
                                        </Button>
                                    )}
                                    {isSaved && (
                                        <Button
                                            variant="contained"
                                            className="btn"
                                            onClick={handleRemove}
                                            style={{ width: "110px" }}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                        disabled={loadComments.length === 0}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography className={classes.heading}>
                                View Comments({loadComments.length})
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container>{commentSection}</Grid>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className="sRight">
                    <div className="SRtop">Primers</div>
                    <div className="SRbottom">
                        {post && <SimilarNews topic={post.tags[0]} />}
                    </div>
                </div>
            </div>
        </Nav>
    );
}

export default Shortened;
