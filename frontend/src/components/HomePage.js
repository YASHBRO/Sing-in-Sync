import React from "react";
import { Link, Outlet } from "react-router-dom";

function HomePage() {
    return (
        <div>
            <h3>Home page</h3>
            <ul>
                <li>
                    <Link to="/join">Join</Link>
                </li>
                <li>
                    <Link to="/create">Create</Link>
                </li>
            </ul>
        </div>
    );
}

export default HomePage;
