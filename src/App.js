import { useEffect, useState } from "react";
import { fetchUsers } from "./api";
import UserList from "./components/UserList";
import SearchBar from "./components/SearchBar";
import PostChart from "./components/PostChart";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

function App() {

  const [currentView, setCurrentView] = useState("login");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentView === "dashboard") {
      loadUsersData();
    }
  }, [currentView]);

  async function loadUsersData() {
    try {
      setLoading(true);
      setError("");
      const usersData = await fetchUsers();
      const formattedUsers = usersData.map(user => ({
        ...user,
        postCount: parseInt(user.posts_count) || 0
      }));
      setUsers(formattedUsers);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch('http://localhost/dashboard-backend/delete_user.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
      });
      const data = await response.json();
      if (data.status === "success") {
        setUsers(users.filter(user => user.id !== id));
      } else {
        alert("Failed to delete user");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchText.toLowerCase().trim())
  );

  return (
    <div className="app">
      {/* 1. Login Page */}
      {currentView === "login" && (
        <Login
          onLoginSuccess={(user) => {
            setLoggedInUser(user);
            setCurrentView("dashboard");
          }}
          onSwitchToSignup={() => setCurrentView("signup")}
        />
      )}

      {/* 2. Signup Page */}
      {currentView === "signup" && (
        <Signup
          onSwitchToLogin={() => setCurrentView("login")}
        />
      )}

      {/* 3. Dashboard Page */}
      {currentView === "dashboard" && (
        <div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1100px",
            margin: "0 auto 20px"
          }}>

            <h2>Users Dashboard {loggedInUser ? `(Welcome, ${loggedInUser.name})` : ""}</h2>

            <button
              onClick={() => { setLoggedInUser(null); setCurrentView("login"); }}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >Logout</button>
          </div>

          <SearchBar value={searchText} onChange={(e) => setSearchText(e.target.value)} />

          {loading && <div className="loading-container"><p>Loading users...</p></div>}
          {error && <div className="error-container"><p>Error: {error}</p></div>}

          {!loading && !error && (
            <>
              <UserList users={filteredUsers} onDelete={handleDelete} />
              <PostChart users={filteredUsers} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;