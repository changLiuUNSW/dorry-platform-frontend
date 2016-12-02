export class Item {
  name: string;
  installing: boolean;
  tags: any;

  constructor(name: string, installing: boolean, tags:any) {
    this.name = name;
    this.installing = installing;
  }
}
