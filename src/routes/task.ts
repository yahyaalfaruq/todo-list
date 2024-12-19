import express from "express";
import { Pool } from "pg";
import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const router = Router();

// Mendapatkan semua task
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    res.json({
      status: "Success",
      data: {
        tasks: result.rows,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// Mendapatkan task berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks WHERE task_id = $1", [
      req.params.id,
    ]);
    res.json({
      status: "Success",
      data: {
        task: result.rows[0],
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching task" });
  }
});

// Menambahkan task baru
router.post("/", async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const result = await pool.query(
      "INSERT INTO tasks (title, description, deadline) VALUES ($1, $2, $3) RETURNING *",
      [title, description, deadline]
    );
    res.json({
      status: "Success",
      data: {
        task: result.rows[0],
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating task" });
  }
});

// Memperbarui task berdasarkan ID
router.put("/:id", async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const result = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, deadline = $3 WHERE task_id = $4 RETURNING *",
      [title, description, deadline, req.params.id]
    );
    res.json({
      status: "Success",
      data: {
        task: result.rows[0],
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating task" });
  }
});

// Menghapus task berdasarkan ID
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM tasks WHERE task_id = $1", [
      req.params.id,
    ]);
    res.json({ status: "Success", message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting task" });
  }
});

export default router;
