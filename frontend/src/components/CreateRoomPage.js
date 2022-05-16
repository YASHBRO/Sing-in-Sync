import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Link } from "react-router-dom";
import CsrfToken from "./CsrfToken";
import { getCookie } from "../utilities/GetCookie";

function CreateRoomPage() {
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [votesToSkip, setVotesToSkip] = useState(2);

    const navigate = useNavigate();

    function handleVotesChange(e) {
        setVotesToSkip(e.target.value);
    }

    function handleGuestCanPauseChange(e) {
        setGuestCanPause(e.target.value);
    }

    function handleCreateRoomBtn() {
        const csrftoken = getCookie("csrftoken");
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
            }),
        };
        fetch("/api/create", requestOptions)
            .then((res) => res.json())
            .then((data) => navigate(`/room/${data.code}`));
    }

    return (
        <form>
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Create A Room
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
                            defaultValue="true"
                            onChange={handleGuestCanPauseChange}
                        >
                            <FormControlLabel
                                value="true"
                                control={<Radio color="primary" />}
                                label="Play/Pause"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                value="false"
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
                        Create A Room
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

export default CreateRoomPage;
