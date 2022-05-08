import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import CsrfToken from "./CsrfToken";
import { getCookie } from "../utilities/GetCookie";

function RoomJoinPage() {
    const [roomCode, setRoomCode] = useState("");
    const [hasError, setHasError] = useState("");

    const navigate = useNavigate();

    const handleRoomCodeChange = (e) => {
        if (hasError) {
            setHasError("");
        }
        setRoomCode(String(e.target.value).toUpperCase());
    };

    const handleJoinRoomBtn = () => {
        if (roomCode.length > 8 || roomCode.length < 6) {
            setHasError("Enter a valid room code");
            return;
        }

        const csrftoken = getCookie("csrftoken");
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({
                code: roomCode,
            }),
        };
        fetch("/api/join-room", requestOptions)
            .then((response) => {
                if (response.ok) {
                    navigate(`/room/${roomCode}`);
                } else {
                    setHasError("Room Not Found");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <form>
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Join A Room
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <CsrfToken />
                    <TextField
                        required={true}
                        variant="outlined"
                        label="Room Code"
                        placeholder="Enter a Room Code"
                        onChange={handleRoomCodeChange}
                        value={roomCode}
                        helperText={hasError}
                        error={hasError}
                        inputProps={{
                            style: { textAlign: "center" },
                        }}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleJoinRoomBtn}
                    >
                        Join Room
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color="secondary"
                        variant="contained"
                        to="/"
                        component={Link}
                    >
                        Back
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default RoomJoinPage;
