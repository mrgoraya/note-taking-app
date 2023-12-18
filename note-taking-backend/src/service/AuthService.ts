import { sign } from "jsonwebtoken";

export class AuthService {
  generatreAuthToken(
    id: string,
    name: string,
    email: string,
    isAdmin: boolean
  ) {
    const { ACCESS_TOKEN_SECRET } = process.env;
    const payload = { id, name, email, isAdmin };

    return sign(payload, ACCESS_TOKEN_SECRET as string);
  }
}
