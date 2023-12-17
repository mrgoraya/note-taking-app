import { sign } from "jsonwebtoken";

export class AuthService {
  generatreAuthToken(id: string, name: string, email: string) {
    const { ACCESS_TOKEN_SECRET } = process.env;
    return sign({ id, name, email }, ACCESS_TOKEN_SECRET as string);
  }
}
