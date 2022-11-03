import jwt from "jsonwebtoken";

import tokenModel from "../models/token-model";

class TokenService {
  // eslint-disable-next-line class-methods-use-this
  generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, "jwt_secret_key", {
      expiresIn: "30m",
    });

    const refreshToken = jwt.sign(payload, "jwt_refresh_key", {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  async saveToken(userId: any, refreshToken: any) {
    const tokenData = await tokenModel.findOne({ user: userId }); // find in DataBase user

    if (tokenData) {
      tokenData.refreshToken = refreshToken; // rewrite token

      return tokenData.save(); // run function save()
    }

    const token = await tokenModel.create({ user: userId, refreshToken }); // create token first time

    return token;
  }
}

export default new TokenService();
