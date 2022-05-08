import React from "react";
import { Link } from "react-router-dom";

function Page404() {
    return (
        <div>
            <h2>404 Page</h2>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
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

export default Page404;
