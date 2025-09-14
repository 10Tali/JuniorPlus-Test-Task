import { body } from "express-validator";

export const noteValidator = [
  body("title")
    .notEmpty().withMessage("Title is required")
    .isLength({ max: 255 }).withMessage("Title must be <= 255 chars"),
  body("content").optional().isString()
];
