import { ConfigObject } from './configObject';

// Class store constant values
//
// KUBE_API: dorry platform backend api url
// FRONTEND_VERSION: dorry platform frontend version
// BACKEND_VERSION: dorry platform backend version
export class Constant {

  public static KUBE_API: string = "";
  public static FRONTEND_VERSION: string = "";
  public static BACKEND_VERSION: string = "";

  // init constant from config object
  public static initConfig(configObject: ConfigObject) {
    this.KUBE_API = configObject.kube_api;
    this.FRONTEND_VERSION = configObject.frontend_version;
    this.BACKEND_VERSION = configObject.backend_version;
  }
}
