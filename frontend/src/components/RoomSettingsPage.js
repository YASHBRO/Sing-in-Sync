import {
    Button,
    FormControl,
    FormHelperText,
    FormControlLabel,
    Grid,
    TextField,
    RadioGroup,
    Radio,
} from "@mui/material";
import CsrfToken from "./CsrfToken";
import { getCookie } from "../utilities/GetCookie";

function RoomSettingsPage() {
    const csrftoken = getCookie("csrftoken");

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
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
                            // onChange={handleGuestCanPauseChange}
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
                            // onChange={handleVotesChange}
                            // value={votesToSkip}
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
            </Grid>
            <Grid item xs={12}>
                <Button>Update</Button>
            </Grid>
        </Grid>
    );
}

export default RoomSettingsPage;
