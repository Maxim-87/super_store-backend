export default class UserDto {
  email: string;

  id: any;

  isActivated: boolean;

  constructor(model: any) {
    this.email = model.email;
    // eslint-disable-next-line no-underscore-dangle
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
}
