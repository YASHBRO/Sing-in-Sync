import React from "react";
import {
    Grid,
    Typography,
    Card,
    IconButton,
    LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";

function MusicPlayer(props) {
    const songProgress = (props.time / props.duration) * 100;

    const pauseSong = () => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/pause", requestOptions);
    };

    const playSong = () => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/play", requestOptions);
    };

    const skipSong = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/skip", requestOptions);
    };

    return (
        <Card style={{ borderRadius: "10px" }}>
            <Grid container alignItems="center">
                <Grid item align="center" xs={5}>
                    <img
                        src={props.image_url}
                        style={{ maxWidth: "100%", borderRadius: "0 0 10px 0" }}
                    />
                </Grid>
                <Grid item align="center" xs={7}>
                    <Typography component="h5" variant="h5">
                        {props.title}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1">
                        {props.artist}
                    </Typography>
                    <div>
                        <IconButton
                            onClick={() => {
                                props.is_playing ? pauseSong() : playSong();
                            }}
                        >
                            {props.is_playing ? (
                                <PauseIcon />
                            ) : (
                                <PlayArrowIcon />
                            )}
                        </IconButton>
                        <IconButton onClick={skipSong}>
                            {props.votes} / {props.votes_required}
                            <SkipNextIcon />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress
                style={{
                    height: 10,
                }}
                variant={
                    Object.keys(props).length > 0
                        ? "determinate"
                        : "indeterminate"
                }
                value={songProgress}
            />
        </Card>
    );
}

export default MusicPlayer;
