import React, { useState } from "react";

function Signup({ onSwitchToLogin }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost/dashboard-backend/signup.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, company, password })
            });
            const data = await response.json();
            setMessage(data.message);
            if (data.status === "success") {
                setTimeout(() => onSwitchToLogin(), 1500);
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

            <h2>Sign Up</h2>
            {message && <p style={{
                textAlign: "center",
                color: message.includes("success") ? "green" : "red"
            }}>{message}</p>}

            <form onSubmit={handleSignup} style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px"
            }}>

                <input type="text" placeholder="Full Name" value={name}
                    onChange={(e) => setName(e.target.value)}
                    required style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd"
                    }} />

                <input type="email" placeholder="Email Address" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd"
                    }} />

                <input type="text" placeholder="Company Name" value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required style={{
                        padding: "12px",
                        borderRadius: "8px",
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
                    }}>Sign Up</button>
            </form>

            <p style={{
                textAlign: "center", marginTop: "15px"
            }}>
                Already have an account? <span
                    onClick={onSwitchToLogin}
                    style={{
                        color: "#4f46e5",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}>Login</span>
            </p>
        </div>
    );
}

export default Signup;