import { NextFunction, Request, Response } from "express";
import { verify } from "argon2";

import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class AuthController {
  private userRepository = AppDataSource.getRepository(User);

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

    const existedUser = await this.userRepository.findOneBy({
      email,
    });
    if (!existedUser) {
      return "User does not exist. Create User first.";
    }

    const validateUser = await verify(existedUser.password as string, password);
    if (!validateUser) return "invalid password";

    return {
      email,
      message: "Successfully authenticated",
    };
  }
}
