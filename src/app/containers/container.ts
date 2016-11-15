export class Container {
  // Whether the service has an icon
  iconAssigned: boolean;
  // The url of the icon used by the service
  iconUrl: string;
  // The state of spinner
  spinner: boolean;

  Id: string;

  constructor() {
    this.iconAssigned = false;
  }
}
