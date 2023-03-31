interface BookParams {
  id: string;
  title: string;
}

export class Book {
  private readonly _id: string;
  private readonly _title: string;

  constructor(params: BookParams) {
    this._id = params.id;
    this._title = params.title;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }
}
