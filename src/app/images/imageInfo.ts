export class ImageInfo {
  url: string;
  RepoTags: Object[];
  Id: string;
  createDate: string;

  starting: boolean;//whether the app is undering installing

  constructor(url: string, RepoTags: Object[], Id: string, createDate: string, starting: boolean) {
    this.url = url;
    this.RepoTags = RepoTags;
    this.Id = Id;
    this.createDate = createDate;

    this.starting = starting;
  }
}
