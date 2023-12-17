import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Note } from "../entity/Note";

export class NoteController {
  private noteRepository = AppDataSource.getRepository(Note);

  /**
   * @swagger
   * /notes:
   *   get:
   *     tags:
   *        - Note
   *     summary: Retrieve all notes
   *     responses:
   *       200:
   *         description: A list of notes
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Note'
   */
  async findAll(request: Request, response: Response, next: NextFunction) {
    const notes = await this.noteRepository.find();
    return notes;
  }

  /**
   * @swagger
   * /notes/{id}:
   *   get:
   *     tags:
   *        - Note
   *     summary: Get a note by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The note ID
   *     responses:
   *       200:
   *         description: Note object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Note'
   *       404:
   *         description: Note not found
   */
  async getById(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const note = await this.noteRepository.findOne({
      where: { id },
    });

    if (!note) {
      return response.send("Note not found");
    }
    return response.send(note);
  }

  /**
   * @swagger
   * /notes:
   *   post:
   *     tags:
   *        - Note
   *     summary: Create a new note
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title
   *               - description
   *             properties:
   *               title:
   *                 type: string
   *               description:
   *                 type: string
   *     responses:
   *       201:
   *         description: Note created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Note'
   */
  async createNote(request: Request, response: Response, next: NextFunction) {
    const { title, description } = request.body;

    const note = Object.assign(new Note(), {
      title,
      description,
    });

    const createdNote = await this.noteRepository.save(note);

    return response.send(createdNote);
  }

  /**
   * @swagger
   * /notes/{id}:
   *   delete:
   *     tags:
   *        - Note
   *     summary: Delete a note by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The note ID
   *     responses:
   *       200:
   *         description: Note deleted
   *       404:
   *         description: Note not found
   */
  async deleteNote(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let noteToRemove = await this.noteRepository.findOneBy({ id });

    if (!noteToRemove) {
      return response.send("The note does not exist.");
    }

    await this.noteRepository.remove(noteToRemove);

    return response.send({
      id,
      message: "The note is removed.",
    });
  }
}
