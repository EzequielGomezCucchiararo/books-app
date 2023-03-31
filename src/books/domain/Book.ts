interface BookParams {
  id: string;
  title: string;
}

export class Book {
  private _id: string;
  private _title: string;

  constructor(params: BookParams) {
    this._id = params.id;
    this._title = params.title;
  }
}
