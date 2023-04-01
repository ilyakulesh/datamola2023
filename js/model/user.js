import { ERRORS } from "../components/consts.js";

export class User {
  constructor(login, password, name) {
    this._login = login;
    this._password = password;
    this._name = name;
  }

  static validateUser(user) {
    try {
      if (!user) {
        throw new Error(ERRORS.assigneeError);
      }
      if (Array.isArray(user)) {
        throw new Error(ERRORS.notArrError);
      }

      return true;
    } catch (error) {
      console.error(error);
    }
  }

  get login() {
    return this._login;
  }

  set login(value) {
    this._login = value;
  }

  get password() {
    return this._password;
  }

  set password(value) {
    this._password = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }
}
