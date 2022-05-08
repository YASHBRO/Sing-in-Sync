import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Room() {
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [roomCode, setRoomCode] = useState("");

    const params = useParams();

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
                console.log("yd", data);
                setVotesToSkip(data.votes_to_skip);
                setGuestCanPause(data.guest_can_pause);
                setIsHost(data.is_host);
            });
    };

    return (
        <div>
            <h3>{roomCode}</h3>
            <p>Votes to skip : {votesToSkip}</p>
            <p>Guest can Pause : {guestCanPause.toString()}</p>
            <p>Is Host : {isHost.toString()}</p>
        </div>
    );
}

export default Room;
