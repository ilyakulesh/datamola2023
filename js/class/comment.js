class Comment {
  constructor(id, text) {
    this._id = id;
    this.text = text;
    this._createdAt = new Date();
    this._author = author;
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get author() {
    return this._author;
  }

  set author(author) {
    this._author = author;
  }

  static validate(com) {
    try {
      if (!checkIsObj(com)) {
        throw new Error(ERRORS.notObjError);
      }

      if (!com.id || !checkStr(com.id)) {
        throw new Error(ERRORS.idError);
      }
      if (
        !com.text ||
        !checkStr(com.text) ||
        com.text.length > TASK_MAX_LENGTH.comment
      ) {
        throw new Error(ERRORS.descriptionError);
      }
      if (!com.createdAt || !(com.createdAt instanceof Date)) {
        throw new Error(ERRORS.dateError);
      }
      if (!com.author || !checkStr(com.author)) {
        throw new Error(ERRORS.authorError);
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
