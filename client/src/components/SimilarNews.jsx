import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import NewsCard from "./Cards/NewsCard";

import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: "50vh",
        overflowY: "scroll",
        marginLeft: "2em",
        marginTop: "1em",
    },
    articles: {
        height: "40vh",
        width: "30vw",
    },
}));

const RAPIDAPI = process.env.REACT_APP_RAPIDAPI;

const SimilarNews = ({ post, newsAPI }) => {
    const classes = useStyles();

    const [data, setData] = useState([]);
    const [toggle, setToggle] = useState(post.id);
    console.log(toggle)
    const options = {
        method: "GET",
        url: "https://free-news.p.rapidapi.com/v1/search",
        params: {
            q: `${post.title}`,
            lang: "en",
            page: "1",
        },
        headers: {
            "x-rapidapi-key": RAPIDAPI,
            "x-rapidapi-host": "free-news.p.rapidapi.com",
        },
    };

    useEffect(() => {
        axios
            .request(options)
            .then((res) => {
                console.log(res.data);
                setData(res.data.articles);
            })
            .catch((err) => console.log(err));
    }, [toggle]);

    const mappedArticles = data?.map((article, index) => {
        return <NewsCard index={index} article={article} />;
    });

    return (
        <>
            <div className={classes.root}>
                <Grid className={classes.articles}>
                    {data ? (
                        mappedArticles
                    ) : (
                        <p>Sorry we didn't find anything!</p>
                    )}
                </Grid>
            </div>
        </>
    );
};

export default SimilarNews;
