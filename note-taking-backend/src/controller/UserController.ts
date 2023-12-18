import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";

import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { UserDto } from "../entity/dto/UserDto";
import { AuthService } from "../service/AuthService";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);
  private authService = new AuthService();

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
   *               isAdmin:
   *                 type: boolean
   *     responses:
   *       201:
   *         description: User created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */
  async createUser(request: Request, response: Response, next: NextFunction) {
    const { name, email, password, isAdmin } = request.body;

    const existedUser = await this.userRepository.findOneBy({
      email,
    });
    if (existedUser) {
      return response.send("The user exists in the DB");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = Object.assign(new User(), {
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });

    const createdUser: UserDto = await this.userRepository.save(user);

    const token = this.authService.generatreAuthToken(
      createdUser.id,
      createdUser.name,
      createdUser.email,
      createdUser.isAdmin
    );

    return response.header("x-auth-token", token).send({
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
    });
  }

  /**
   * @swagger
   * /users/me:
   *   get:
   *     tags:
   *        - User
   *     summary: Get user
   *     parameters:
   *       - in: header
   *         name: x-auth-token
   *         required: true
   *         schema:
   *           type: string
   *         description: [token]
   *     responses:
   *       200:
   *         description: User object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserWithOutPassword'
   *       404:
   *         description: User not found
   */
  async getOne(request: Request, response: Response, next: NextFunction) {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .select(["user.id", "user.name", "user.email"])
      .where("user.id = :id", { id: request.user.id })
      .getOne();

    response.send(user);
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
    const users = await this.userRepository.find();
    return response.send(users);
  }
}
