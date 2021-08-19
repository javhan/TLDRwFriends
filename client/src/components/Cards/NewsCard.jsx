import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    Link,
    Typography,
} from "@material-ui/core/";

const useStyles = makeStyles({
    root: {
        display: "flex",
        border: "1px solid black",
    },
    media: {
        height: "10vh",
        padding: "0.5em",
    },
    tldr: {
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "DarkSlateGray",
    },
});

export default function NewsCard({ article }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                {article.media && <CardMedia
                    className={classes.media}
                    image={article.media}
                    title={article.title}
                />}
                <CardContent>
                    <Typography gutterBottom variant="subtitle2">
                        {article.title}
                    </Typography>
                    {article.summary && <Typography
                        variant="caption"
                        color="textSecondary"
                        component="p"
                    >
                        {article?.summary?.slice(0, 100) + "..."}
                    </Typography>}
                </CardContent>
            </CardActionArea>
            <CardActions>
                {article.media && <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    className={classes.tldr}
                >
                    TLDR this
                </Button>}
                {article.link && <Link
                    variant="subtitle1"
                    color="secondary"
                    href={article.link || article.url}
                    target="_blank"
                    rel="noreferrer"
                >
                    Explore more
                </Link>}
            </CardActions>
            <Divider />
        </Card>
    );
}
