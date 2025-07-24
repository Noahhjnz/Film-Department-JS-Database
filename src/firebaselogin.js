import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function FirebaseLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <style>{`
      .login-header {
        font-family: Inter, system-ui, sans-serif;
        font-weight: 600;
        font-size: 24px;
        color: #000000;
        margin-bottom: 20px;
      }
      .login-btn {
        font-family: Inter, system-ui, sans-serif;
        font-weight: 600;
        font-size: 16px;
        color: #222F3E;
        background: #fff;
        border: 1px solid #b5bec6;
        border-radius: 8px;
        padding: 8px 20px;
        cursor: pointer;
        transition: background 0.2s;
        width: 100%;
        margin-bottom: 8px;
      }
      .login-btn:last-child {
        margin-bottom: 0;
      }
      .login-btn:hover {
        background: #e3f0fb;
      }
      .login-input {
        font-family: Inter, system-ui, sans-serif;
        font-size: 16px;
        padding: 8px;
        width: 100%;
        margin-bottom: 10px;
        border-radius: 6px;
        border: 1px solid #b5bec6;
        box-sizing: border-box;
      }
    `}</style>
    <div style={{ maxWidth: 350, margin: "60px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2 className="login-header">Login / Register</h2>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="login-input"
        />
        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
        <button onClick={handleLogin} className="login-btn">Login</button>
        <button onClick={handleRegister} className="login-btn">Register</button>
      </form>
    </div>
    </>
  );
}

export default FirebaseLogin;
