import React, { useState } from "react";

function Login({ onLoginSuccess, onSwitchToSignup }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost/dashboard-backend/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (data.status === "success") {
                setMessage("Login successful!");
                setTimeout(() => onLoginSuccess(data.user), 1000);
            } else {
                setMessage(data.message);
            }
        } catch (err) {
            setMessage("Error connecting to server");
        }
    };

    return (
        <div className="auth-container"
            style={{
                maxWidth: "400px",
                margin: "50px auto",
                padding: "30px",
                background: "#fff",
                borderRadius: "14px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.06)"
            }}>

            <h2>Login</h2>
            {message && <p style={{
                textAlign: "center",
                color: message.includes("success") ? "green" : "red"
            }}>{message}</p>}

            <form onSubmit={handleLogin} style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px"
            }}>

                <input type="email" placeholder="Email Address" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required style={{
                        padding: "12px",
                        borderRadius: "9px",
                        border: "1px solid #ddd"
                    }} />

                <input type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd"
                    }} />

                <button type="submit"
                    style={{
                        padding: "12px",
                        background: "#4f46e5",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}>Login</button>
            </form>

            <p style={{
                textAlign: "center",
                marginTop: "15px"
            }}>
                Don't have an account? <span onClick={onSwitchToSignup}
                    style={{
                        color: "#4f46e5",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}>Sign Up</span>
            </p>
        </div>
    );
}

export default Login;