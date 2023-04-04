import { ERRORS } from "../components/consts.js";

export class UserCollection {
  constructor(users) {
    try {
      if (!Array.isArray(users)) {
        throw new Error(ERRORS.notArrError);
      }

      this._userCollection = this.restore("users") || [];
    } catch (err) {
      console.error(err);
    }
  }

  get userCollection() {
    return this._userCollection;
  }

  set userCollection(value) {
    this._userCollection = value;
    this.save();
  }

  save() {
    localStorage.setItem("users", JSON.stringify(this._userCollection));
  }

  restore(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
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

      const user = { login, password, name };

      this._userCollection.push(user);
      this.save();

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
