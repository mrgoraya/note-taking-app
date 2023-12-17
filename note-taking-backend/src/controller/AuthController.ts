import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { UserDto } from "../entity/dto/UserDto";
import { AuthService } from "../service/AuthService";

export class AuthController {
  private userRepository = AppDataSource.getRepository(User);
  private authService = new AuthService();

  /**
   * @swagger
   * /auth:
   *   post:
   *     tags:
   *        - Auth
   *     summary: Authenticate user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: User Authenticated
   *       404:
   *         description: Invalid
   */
  async authenticateUser(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { email, password } = request.body;

    const existedUser: UserDto | null = await this.userRepository.findOneBy({
      email,
    });
    if (!existedUser) {
      return response.send("User does not exist. Create User first.");
    }

    const validateUser = await bcrypt.compare(password, existedUser.password);
    if (!validateUser) return response.send("invalid password");

    const token = this.authService.generatreAuthToken(
      existedUser.id,
      existedUser.name,
      existedUser.email
    );

    return response.send({
      email,
      message: "Successfully authenticated",
      token,
    });
  }
}
