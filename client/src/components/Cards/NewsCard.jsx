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
                <CardMedia
                    className={classes.media}
                    image={article.media}
                    title={article.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="subtitle2">
                        {article.title}
                    </Typography>
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        component="p"
                    >
                        {article?.summary?.slice(0, 100) + "..."}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    className={classes.tldr}
                >
                    TLDR this
                </Button>
            </CardActions>
            <Divider />
        </Card>
    );
}
