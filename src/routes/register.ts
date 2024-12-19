import express, { Router, Request, Response } from "express";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    res.status(201).json({
      message: "Registration successful",
      user: {
        username,
        email,
      },
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
