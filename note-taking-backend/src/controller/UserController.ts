import { NextFunction, Request, Response } from "express";

import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { hash } from "argon2";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  /**
   * @swagger
   * /users:
   *   post:
   *     tags:
   *        - User
   *     summary: Register new user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - email
   *               - password
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       201:
   *         description: User created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */
  async createUser(request: Request, response: Response, next: NextFunction) {
    const { name, email, password } = request.body;

    const existedUser = await this.userRepository.findOneBy({
      email,
    });
    if (existedUser) {
      return "The user exists in the DB";
    }

    const hashedPassword = await hash(password);

    const user = Object.assign(new User(), {
      name,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    return {
      name,
      email,
    };
  }

  /**
   * @swagger
   * /users:
   *   get:
   *     tags:
   *        - User
   *     summary: Retrieve all Users
   *     responses:
   *       200:
   *         description: A list of Users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   */
  async findAll(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }
}
