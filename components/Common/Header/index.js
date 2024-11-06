import React, { useEffect, useState } from "react";
import Button from "../Button";
import TemporaryDrawer from "./drawer";
import Switch from "@mui/material/Switch";

function Header() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setDark();
    } else {
      setLight();
    }
  }, []);

  const changeMode = () => {
    if (localStorage.getItem("theme") !== "dark") {
      setDark();
    } else {
      setLight();
    }
    setDarkMode(!darkMode);
  };

  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    backgroundColor: darkMode ? "#333" : "#fff",
    borderBottom: `1px solid ${darkMode ? "#444" : "#ddd"}`,
  };

  const logoStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textDecoration: "none",
    color: darkMode ? "#fff" : "#000",
  };

  const highlightStyle = {
    color: darkMode ? "#00f" : "#00f",
  };

  const navStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  };

  const navItemStyle = {
    textDecoration: "none",
    color: darkMode ? "#ddd" : "#000",
    fontWeight: "500",
    transition: "color 0.3s",
  };

  const navItemHoverStyle = {
    color: "#00f",
  };

  return (
    <header style={headerStyle}>
      <div>
        <a href="/" style={logoStyle}>
          CrypTIX<span style={highlightStyle}>.</span>
        </a>
      </div>
      <nav style={navStyle}>
      <Switch checked={darkMode} onClick={() => changeMode()} />
      <a href='https://cdn.botpress.cloud/webchat/v2/shareable.html?botId=14901d04-91d2-44fd-ab82-b83e982a324f' style={navItemStyle}>
          Chatbot
        </a>
        <a href="/news" style={navItemStyle}>
          News
        </a>
        <a href="/compare" style={navItemStyle}>
          Compare
        </a>
        <a href="/watchlist" style={navItemStyle}>
          Watchlist
        </a>
        <a href="/dashboard">
          <Button text={"Dashboard"} />
        </a>
      </nav>
    </header>
  );
}

export default Header;
