import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { pool } from "../db.js";
import { noteValidator } from "../validators/notesValidator.js";
import { validationResult } from "express-validator";

export const router = Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API для работы с заметками
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Получить все заметки
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Список заметок
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                   updated_at:
 *                     type: string
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await pool.query("SELECT * FROM notes ORDER BY is_pin DESC, updated_at DESC");
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Создать новую заметку
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Заметка создана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                 updated_at:
 *                   type: string
 */
router.post("/", noteValidator, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, content, is_pin } = req.body;
    const result = await pool.query(
      "INSERT INTO notes (title, content, is_pin) VALUES ($1, $2, $3) RETURNING *",
      [title, content, is_pin]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Обновить заметку
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID заметки
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Заметка обновлена
 */
router.put("/:id", noteValidator, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, content, is_pin } = req.body;
    const result = await pool.query(
      "UPDATE notes SET title=$1, content=$2, is_pin=$3, updated_at=NOW() WHERE id=$4 RETURNING *",
      [title, content, is_pin, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Удалить заметку
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID заметки
 *     responses:
 *       200:
 *         description: Заметка удалена
 */
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM notes WHERE id=$1", [id]);
    res.json({ message: "Note deleted" });
  } catch (err) {
    next(err);
  }
});
