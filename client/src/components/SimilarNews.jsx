import React, { useState, useEffect } from "react";

const gNewsKey = process.env.REACT_APP_GNEWS_API_KEY;

const SimilarNews = ({ topic }) => {
    const [data, setData] = useState("");

    // const guardianNews = `https://content.guardian.apis.com/search?q=${topic}&api-key=${gNewsKey}`;

    const gNews = `https://gnews.io/api/v4/search?q=${topic}&token=${gNewsKey}&lang=en`;
    console.log(gNews);

    useEffect(() => {
        fetch(gNews)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setData(data.articles[0]);
            });
    }, [gNews]);

    return (
        <>
            <h1>Similar News</h1>
            {data && (
                <>
                    {" "}
                    <h3>{data.title}</h3>
                    <img
                        src={data.image}
                        alt={data.description}
                        style={{ height: "100px" }}
                    />
                    <p>{data.description}</p>{" "}
                </>
            )}
        </>
    );
};

export default SimilarNews;
