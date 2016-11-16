export class ImageInfo {
  url: string;
  RepoTags: Object[];
  Id: string;
  createDate: string;

  starting: boolean;//whether the app is undering installing
  removing: boolean;//whether the app is undering removing

  constructor(url: string, RepoTags: Object[], Id: string, createDate: string, starting: boolean, removing: boolean) {
    this.url = url;
    this.RepoTags = RepoTags;
    this.Id = Id;
    this.createDate = createDate;

    this.starting = starting;
    this.removing = removing;
  }
}
