import { useEffect, useState } from "react";
import { getHealth } from "../../services/api";
import "./Health.css";

export default function Health() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getHealth().then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="health">
      <h2>System Health</h2>

      <div className="health-box">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
