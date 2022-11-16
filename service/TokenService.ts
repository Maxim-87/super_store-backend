import jwt from "jsonwebtoken";

import tokenModel from "../models/token-model";

class TokenService {
  // eslint-disable-next-line class-methods-use-this
  generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, "jwt_secret_key", {
      expiresIn: "30d",
    }); // generate token

    const refreshToken = jwt.sign(payload, "jwt_refresh_key", {
      expiresIn: "30d",
    }); // generate token

    return {
      accessToken,
      refreshToken,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, "jwt_secret_key"); // check token

      return userData;
    } catch (e) {
      return null;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, "jwt_refresh_key"); // check token

      return userData;
    } catch (e) {
      return null;
    }
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

  // eslint-disable-next-line class-methods-use-this
  async removeToken(refreshToken: string) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });

    return tokenData;
  }

  // eslint-disable-next-line class-methods-use-this
  async findToken(refreshToken: string) {
    const tokenData = await tokenModel.findOne({ refreshToken });

    return tokenData;
  }
}

export default new TokenService();
