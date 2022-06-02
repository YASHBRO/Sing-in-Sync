import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { Grid, Typography, Button } from "@material-ui/core";
import CsrfToken from "./CsrfToken";
import { getCookie } from "../utilities/GetCookie";
import MusicPlayer from "./MusicPlayer";

function Room() {
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [roomCode, setRoomCode] = useState("");
    const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
    const [songData, setSongData] = useState(null);

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setRoomCode(params.roomCode);
        const interval = setInterval(getCurrentSong, 1000);
        return () => {
            clearInterval(interval);
        };
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
                if (data.is_host) {
                    authenticateSpotify();
                }
            });
    };

    const authenticateSpotify = () => {
        fetch("/spotify/is-authenticated")
            .then((response) => response.json())
            .then((data) => {
                setSpotifyAuthenticated(data.status);
                if (!data.status) {
                    fetch("/spotify/get-auth-url")
                        .then((response) => response.json())
                        .then((data) => {
                            window.location.replace(data.url);
                        });
                }
            });
    };

    const getCurrentSong = () => {
        fetch("/spotify/current-song")
            .then((response) => {
                if (!response.ok) {
                    return {};
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setSongData(data);
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
        <Grid container spacing={3} alignItems="center" justifyContent="center">
            <Grid item xs={12}>
                <Typography
                    variant="h4"
                    component="h4"
                    style={{ textAlign: "center" }}
                >
                    Room Code: <b>{roomCode}</b>
                </Typography>
            </Grid>
            <Grid item xs={10} sm={8} md={6} lg={4} align="center">
                <MusicPlayer {...songData} />
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
