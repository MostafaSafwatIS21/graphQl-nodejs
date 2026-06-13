import cookie from "cookie";
import jwt from "jsonwebtoken";

export async function auth(req) {
  try {
    let { token } = cookie.parse(req.headers.cookie);
    if (!token) return null;
    else {
      let decoded = await jwt.verify(token, "Secret");
      return decoded;
    }
  } catch (error) {}
}
