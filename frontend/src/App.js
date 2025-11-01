import React, { useEffect, useState } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "./firebaseConfig";
import axios from "axios";

function GoogleLogin() {
  const [user, setUser] = useState(null);

  // 🔹 Handle Google Sign-in
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken(); // Firebase token

      // Store token in localStorage
      localStorage.setItem("accessToken", token);

      setUser(result.user);
      console.log("User logged in:", result.user);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  // 🔹 Handle Logout
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  // 🔹 Keep user logged in (on refresh)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken(true);
        localStorage.setItem("accessToken", token);
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Example: call private API
  const callPrivateAPI = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get("http://localhost:5000/api/private", {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(res.data.message);
    } catch (err) {
      console.error("API Error:", err);
      alert("Unauthorized or Token Expired");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      {!user ? (
        <button
          onClick={handleLogin}
          style={{
            background: "#4285F4",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Sign In with Google
        </button>
      ) : (
        <div>
          <h3>Welcome, {user.displayName}</h3>
          <img
            src={user.photoURL}
            alt="profile"
            style={{ borderRadius: "50%", width: "100px", margin: "10px" }}
          />
          <p>{user.email}</p>
          <button
            onClick={callPrivateAPI}
            style={{
              background: "#34A853",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Call Private API
          </button>
          <button
            onClick={handleLogout}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default GoogleLogin;
