import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import HomePage from "./HomePage";
import Page404 from "./Page404";
import Room from "./Room";
import RoomJoinPage from "./RoomJoinPage";
import RoomSettingsPage from "./RoomSettingsPage";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Page404 />} />

                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreateRoomPage />} />
                <Route path="/join" element={<RoomJoinPage />} />
                <Route path="/room/:roomCode" element={<Room />} />
                <Route
                    path="/room/:roomCode/settings"
                    element={<RoomSettingsPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
