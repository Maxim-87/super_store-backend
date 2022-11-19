/* eslint-disable */
import bcrypt from "bcrypt";
import {v4 as uuidv4} from 'uuid';

import UserModel from "../models/userModel";
import emailService from "../service/EmailService";
import tokenService from "../service/TokenService";
import UserDto from "../dtos/userDto";
import ApiError from "../exceptions/api-error";

class AuthService {
  // eslint-disable-next-line class-methods-use-this
  async registration(email: any, password: any) {
    const candidate = await UserModel.findOne({email}); // check user in dataBase

    if (candidate) {
      throw ApiError.BadRequest(`Users already ${email}`);
    }

    // eslint-disable-next-line no-magic-numbers
    const hashPassword = await bcrypt.hash(password, 3); // hash password
    const activationLink = uuidv4(); // create random link
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    }); // create user and save in dataBase
    await emailService.sendActivationEmail(email, `http://localhost:4000/api/activate/${activationLink}`) // send email to user
    const userDto = new UserDto(user) // send data for token
    const tokens = tokenService.generateTokens({...userDto}); // save tokens in one object
    await tokenService.saveToken(userDto.id, tokens.refreshToken);  // save in dataBase token

    return {
      ...tokens,
      user: userDto,
    }
  }

  async activate(activationLink: any) {
    const user = await UserModel.findOne({activationLink});
    if (!user) {
      // @ts-ignore
      throw new ApiError.BadRequest("Not correct link");
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email: string, password: string) {

    const user = await UserModel.findOne({email}) // find user for email

    if (!user) {
      throw ApiError.BadRequest(`User c email ${email} not found`) //error if user not found
    }

    const isPassEquals = await bcrypt.compare(password, user.password); // do rehash password, and compare passwords
    if (!isPassEquals) {
      throw ApiError.BadRequest('Invalid password');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto}); // save tokens in one object
    await tokenService.saveToken(userDto.id, tokens.refreshToken);  // save in dataBase token

    return {
      ...tokens,
      user: userDto,
    }
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if(!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = tokenService.findToken(refreshToken);
    if(!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    // @ts-ignore
    const user = await UserModel.findById(userData.id) // find user for email
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto}); // save tokens in one object
    await tokenService.saveToken(userDto.id, tokens.refreshToken);  // save in dataBase token

    return {
      ...tokens,
      user: userDto,
    }
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

}


export default new AuthService();
