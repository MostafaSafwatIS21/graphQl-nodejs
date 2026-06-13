import User from "../../models/user.js";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
import bcrypt from "bcryptjs";

const userMutation = {
  register: async (_, { user }) => {
    return await User.create(user);
  },
  login: async (_, { email, password }, { res }) => {
    const user = await User.findOne({ email });
    if (!user)
      throw new GraphQLError("Invalid credentials", {
        extensions: { code: "INVALID_CREDENTIALS", http: { status: 401 } },
      });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new GraphQLError("Invalid credentials", {
        extensions: { code: "INVALID_CREDENTIALS", http: { status: 401 } },
      });

    const token = jwt.sign({ id: user._id }, "Secret");
    res.setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly; Path=/`);
    return token;
  },
};

export default userMutation;
