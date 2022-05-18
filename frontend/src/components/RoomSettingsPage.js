import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
    Grid,
    Typography,
    TextField,
    FormHelperText,
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel,
} from "@material-ui/core";
import CsrfToken from "./CsrfToken";
import { getCookie } from "../utilities/GetCookie";

function RoomSettingsPage() {
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [roomCode, setRoomCode] = useState("");

    const navigate = useNavigate();
    const params = useParams();

    function handleVotesChange(e) {
        setVotesToSkip(e.target.value);
    }

    function handleGuestCanPauseChange(e) {
        setGuestCanPause(e.target.value);
    }

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

    function handleCreateRoomBtn() {
        const csrftoken = getCookie("csrftoken");
        const requestOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
                code: roomCode,
            }),
        };
        fetch("/api/update-room", requestOptions)
            .then((res) => res.json())
            .then(() => navigate(-1));
    }

    const handleBackButton = () => {
        navigate(-1);
    };

    return (
        <form>
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Update this Room
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <CsrfToken />
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">
                                Guest Control of Playback State
                            </div>
                        </FormHelperText>
                        <RadioGroup
                            row
                            value={Boolean(guestCanPause)}
                            onChange={handleGuestCanPauseChange}
                        >
                            <FormControlLabel
                                value={true}
                                control={<Radio color="primary" />}
                                label="Play/Pause"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                value={false}
                                control={<Radio color="secondary" />}
                                label="No Control"
                                labelPlacement="bottom"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField
                            required={true}
                            type="number"
                            variant="outlined"
                            onChange={handleVotesChange}
                            value={votesToSkip}
                            inputProps={{
                                style: { textAlign: "center" },
                            }}
                        />
                        <FormHelperText>
                            <div align="center">
                                Votes Required To Skip Song
                            </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleCreateRoomBtn}
                    >
                        Update
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={handleBackButton}
                    >
                        Back
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default RoomSettingsPage;
