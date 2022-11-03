/* eslint-disable */
import bcrypt from "bcrypt";
// import uuid from "uuid";
import {v4 as uuidv4} from 'uuid';

import UserModel from "../models/userModel";
import emailService from "../service/EmailService";
import tokenService from "../service/TokenService";
import UserDto from "../dtos/userDto";

class AuthService {
  // eslint-disable-next-line class-methods-use-this
  async registration(email: any, password: any) {
    const candidate = await UserModel.findOne({email}); // check user in dataBase

    if (candidate) {
      throw new Error(`Users already ${email}`);
    }

    // eslint-disable-next-line no-magic-numbers
    const hashPassword = await bcrypt.hash(password, 3); // hash password
    const activationLink = uuidv4(); // create random link
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    }); // create user and save in dataBase
    await emailService.sendActivationEmail(email, activationLink) // send email to user
    const userDto = new UserDto(user) // send data for token
    const tokens = tokenService.generateTokens({...userDto}); // save tokens in one object
    await tokenService.saveToken(userDto.id, tokens.refreshToken);  // save in dataBase token

    return {
      ...tokens,
      user: userDto,
    }
  }
}

export default new AuthService();
