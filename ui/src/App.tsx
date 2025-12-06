import {useEffect} from "react";
import "./assets/app.css";

function decodeJWT(token: string) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
    return JSON.parse(jsonPayload);
}

interface GoogleCredentialResponse {
    credential: string;
}

function handleCredentialResponse(response: GoogleCredentialResponse) {
    console.log("Encoded JWT ID token: " + response.credential);
    const responsePayload = decodeJWT(response.credential);
    console.log("Decoded JWT ID token fields:");
    console.log("  Full Name: " + responsePayload.name);
    console.log("  Given Name: " + responsePayload.given_name);
    console.log("  Family Name: " + responsePayload.family_name);
    console.log("  Unique ID: " + responsePayload.sub);
    console.log("  Profile image URL: " + responsePayload.picture);
    console.log("  Email: " + responsePayload.email);
}

function App() {
    useEffect(() => {
        // Load Google Identity Services script
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            // @ts-expect-error Google Identity Services types are not available
            if (window.google && window.google.accounts && window.google.accounts.id) {
                // @ts-expect-error Google Identity Services types are not available
                window.google.accounts.id.initialize({
                    client_id: "474116642810-9hjbq9eh52ndhptumf7f1tli5nsj8574.apps.googleusercontent.com",
                    callback: handleCredentialResponse,
                });
                // @ts-expect-error Google Identity Services types are not available
                window.google.accounts.id.renderButton(
                    document.getElementById("g_id_signin"),
                    {theme: "outline", size: "large"}
                );
            }
        };
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="app-container">
            <div id="g_id_signin"></div>
        </div>
    );
}

export default App;
