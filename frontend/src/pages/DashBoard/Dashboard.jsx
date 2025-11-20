import { useEffect, useState } from "react";
import { getLinks, createLink, deleteLink } from "../../services/api";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [form, setForm] = useState({ url: "", code: "" });
  const [loading, setLoading] = useState(false);

  const loadLinks = async () => {
    const data = await getLinks();
    setLinks(data);
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await createLink(form);

    if (res.status === 409) {
      alert("Code already exists!");
    }

    setLoading(false);
    setForm({ url: "", code: "" });
    loadLinks();
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <form className="add-form" onSubmit={handleSubmit}>
        <input
          placeholder="Enter URL"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          required
        />

        <input
          placeholder="Custom code (optional)"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />

        <button disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      <table className="links-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>URL</th>
            <th>Clicks</th>
            <th>Last Clicked</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {links.map((l) => (
            <tr key={l.code}>
              <td>
                <Link to={`/code/${l.code}`}>{l.code}</Link>
              </td>
              <td className="truncate">{l.url}</td>
              <td>{l.clicks}</td>
              <td>{l.last_clicked || "—"}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteLink(l.code).then(loadLinks)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
