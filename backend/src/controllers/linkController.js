import { pool } from "../db.js";
import { nanoid } from "nanoid";

export const createLink = async (req, res) => {
  try {
    let { url, code } = req.body;
    
    if (!url || !url.startsWith("http"))
      return res.status(400).json({ error: "Invalid URL" });

    // generate random code if not provided
    if (!code) code = nanoid(6);

    const exists = await pool.query(
      "SELECT 1 FROM links WHERE code=$1",
      [code]
    );
    if (exists.rowCount > 0)
      return res.status(409).json({ error: "Code already exists" });

    await pool.query(
      "INSERT INTO links (code, url) VALUES ($1, $2)",
      [code, url]
    );

    res.status(201).json({
      code,
    });

  } catch (err) {
     console.error("Insert error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const listLinks = async (req, res) => {
  const result = await pool.query("SELECT * FROM links ORDER BY code");
  res.json(result.rows);
};

export const getLinkStats = async (req, res) => {
  const { code } = req.params;
  const result = await pool.query(
    "SELECT * FROM links WHERE code=$1",
    [code]
  );

  if (result.rowCount === 0) return res.status(404).json({ error: "Not found" });

  res.json(result.rows[0]);
};

export const deleteLink = async (req, res) => {
  const { code } = req.params;

  await pool.query("DELETE FROM links WHERE code=$1", [code]);

  res.json({ success: true });
};

export const redirectLink = async (req, res) => {
  const { code } = req.params;

  const result = await pool.query(
    "SELECT * FROM links WHERE code=$1",
    [code]
  );

  if (result.rowCount === 0)
    return res.status(404).send("Not found");

  const link = result.rows[0];

  // update clicks
  await pool.query(
    "UPDATE links SET clicks = clicks + 1, last_clicked = NOW() WHERE code=$1",
    [code]
  );

  res.redirect(302, link.url);
};
