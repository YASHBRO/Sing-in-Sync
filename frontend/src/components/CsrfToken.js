import React, { useState } from "react";
import { getCookie } from "../utilities/GetCookie";

function CsrfToken() {
    const [csrfToken] = useState(getCookie("csrftoken"));
    return <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />;
}

export default CsrfToken;
