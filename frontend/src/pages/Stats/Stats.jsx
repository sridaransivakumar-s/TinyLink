import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStats } from "../../services/api";
import { useNavigate } from "react-router-dom";

import "./Stats.css";
const API_BASE = import.meta.env.VITE_BACKEND_URL;

export default function Stats() {
  const { code } = useParams();
  const [data, setData] = useState(null);
   const navigate = useNavigate();
  useEffect(() => {
    getStats(code).then(setData);
  }, [code]);

  if (!data) return <p>Loading...</p>;
  const handleClick = async () => {
      try {
    await fetch(`${API_BASE}/redirect/${data.code}`, {
      method: "GET",
      redirect: "manual" 
    });
    window.open(`${data.url}`, "_blank");
    navigate("/");
  } catch (err) {
    console.error(err);
  }

};

  return (
    <div className="stats">
      <h2>Stats for {code}</h2>

      <div className="stat-box">
        <p>
    <strong>Code:</strong>{" "}
    <span 
      onClick={handleClick}
      style={{ 
        color: "blue", 
        textDecoration: "underline", 
        cursor: "pointer" 
      }}
    >
      {data.code}
    </span>
  </p>
        <p><strong>URL:</strong> {data.url}</p>
        <p><strong>Total Clicks:</strong> {data.clicks}</p>
        <p><strong>Last Clicked:</strong> {data.last_clicked || "—"}</p>
      </div>
    </div>
  );
}
