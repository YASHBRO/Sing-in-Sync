import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@material-ui/core";

function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch("api/user-in-room")
            .then((res) => res.json())
            .then((data) => {
                if (data.code) {
                    navigate(`/room/${data.code}`);
                }
            });
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" compact="h4">
                    Welcome to
                </Typography>
                <Typography variant="h3" compact="h3">
                    Sing in Sync
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                align="center"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                <Button
                    color="primary"
                    to="/join"
                    variant="contained"
                    component={Link}
                >
                    Join a Room
                </Button>
                <Button
                    color="secondary"
                    to="/create"
                    variant="contained"
                    component={Link}
                >
                    Create a Room
                </Button>
            </Grid>
        </Grid>
    );
}

export default HomePage;
