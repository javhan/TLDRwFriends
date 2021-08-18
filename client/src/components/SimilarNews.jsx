import React, { useState, useEffect } from "react";
import axios from "axios";

const gNewsKey = process.env.REACT_APP_GNEWS_API_KEY;

const RAPIDAPI = process.env.REACT_APP_RAPIDAPI;

const SimilarNews = ({ topic }) => {
    const [data, setData] = useState([]);
    const [toggle, setToggle] = useState(false);

    // const guardianNews = `https://content.guardian.apis.com/search?q=${topic}&api-key=${gNewsKey}`;

    // const gNews = `https://gnews.io/api/v4/search?q=${topic}&token=${gNewsKey}&lang=en`;
    // console.log(gNews);

    const options = {
        method: "GET",
        url: "https://free-news.p.rapidapi.com/v1/search",
        params: { q: `${topic}`, lang: "en" },
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
                setToggle(!toggle);
            })
            .catch((err) => console.log(err));
    }, [toggle]);

    const mappedArticles = data.map((article, index) => {
        return (
            <>
                <a href={article.link} target="_blank" rel="noreferrer">
                    <p>{article.title}</p>
                    <img
                        src={article.media}
                        alt={article.summary}
                        style={{ height: "50px" }}
                    />
                </a>
            </>
        );
    });

    return (
        <>
            <h1>Similar News</h1>
            {data ? mappedArticles : <p>Sorry we didn't find anything!</p>}
        </>
    );
};

export default SimilarNews;
