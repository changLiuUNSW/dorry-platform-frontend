export class ImageInfo {
  url: string;
  RepoTags: Object[];
  Id: string;
  createDate: string;

  spinner: boolean;

  constructor(url: string, RepoTags: Object[], Id: string, createDate: string) {
    this.url = url;
    this.RepoTags = RepoTags;
    this.Id = Id;
    this.createDate = createDate;
  }
}
