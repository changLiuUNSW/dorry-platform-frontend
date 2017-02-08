export class ImageInfo {
  pictureUrl: string;
  name: string;
  version: string;
  config: any;

  state: number;

  constructor(pictureUrl: string, name: string, version: string, config: any) {
    this.pictureUrl = pictureUrl;
    this.name = name;
    this.version = version;
    this.config = config;
  }
}
