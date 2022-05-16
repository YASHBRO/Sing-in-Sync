import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { Grid, Typography, Button } from "@material-ui/core";
import CsrfToken from "./CsrfToken";
import { getCookie } from "../utilities/GetCookie";

function Room() {
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [roomCode, setRoomCode] = useState("");

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setRoomCode(params.roomCode);
    }, []);

    useEffect(() => {
        if (roomCode.length > 0) {
            getRoomDetails();
        }
    }, [roomCode]);

    const getRoomDetails = () => {
        fetch(`/api/get-room?code=${roomCode}`)
            .then((res) => res.json())
            .then((data) => {
                setVotesToSkip(data.votes_to_skip);
                setGuestCanPause(data.guest_can_pause);
                setIsHost(data.is_host);
            });
    };

    const handleLeaveBtn = () => {
        const csrftoken = getCookie("csrftoken");
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
            },
        };
        fetch("/api/leave-room", requestOptions)
            .then((res) => res.json())
            .then(() => {
                navigate("/");
            });
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Votes: {votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Guest Can Pause: {guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Host: {isHost.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <form>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLeaveBtn}
                    >
                        <CsrfToken />
                        Leave Room
                    </Button>
                </form>
            </Grid>
            {isHost && (
                <Grid item xs={12} align="center">
                    <Link to={`${location.pathname}/settings`}>
                        <Button variant="contained" color="info">
                            Settings
                        </Button>
                    </Link>
                </Grid>
            )}
        </Grid>
    );
}

export default Room;
