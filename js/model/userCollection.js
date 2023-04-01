import { ERRORS } from "../components/consts.js";
import { User } from "./user.js";

export class UserCollection {
  constructor(users) {
    try {
      if (!Array.isArray(users)) {
        throw new Error(ERRORS.notArrError);
      }
      this._userCollection = users.map(
        (elem) => new User(elem.login, elem.password, elem.name)
      );
      console.log(this._userCollection);

      this.addAll(this._userCollection);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  get userCollection() {
    return this._userCollection;
  }

  set userCollection(value) {
    this._userCollection = value;
  }

  addAll(arr) {
    const notValidUsers = [];
    this._userCollection = arr.filter((user) => {
      if (User.validateUser(user)) {
        return true;
      } else {
        notValidUsers.push(user);
      }
    });
    return notValidUsers;
  }

  add(login, password, repeatPassword, name) {
    try {
      if (!arguments) {
        throw new Error(ERRORS.noArguments);
      }

      if (this.hasLogin(login)) {
        throw new Error(ERRORS.noUserError);
      }

      if (password !== repeatPassword) {
        throw new Error(ERRORS.passDontMatch);
      }

      const user = new User(login, password, name);

      this._userCollection.push(user);
      console.log(this._userCollection);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  hasLogin(loginNew) {
    return Boolean(
      this._userCollection.filter(({ login }) => login === loginNew).length
    );
  }
}
