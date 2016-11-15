import { ConfigObject } from './configObject';

export class Constant {
  //public static DAEMONADDR = "http://192.168.10.84:10000";
  //public static DAEMONADDR = 'http://localhost:10000';

  //public static REGISTRYADDR = 'https://dorryServer:5001';
  //public static BUILDVERSION = "v0.1.6-alpha";

  public static DAEMONADDR: string = "";
  public static REGISTRYADDR: string = "";
  public static BUILDVERSION: string = "";
  public static REGISTRYHOST: string = "";

  public static initConfig(configObject: ConfigObject) {
    this.DAEMONADDR = configObject.daemon_addr;
    this.REGISTRYADDR = configObject.registry_proto + "://" + configObject.registry_host;
    this.BUILDVERSION = configObject.build_version;
    this.REGISTRYHOST = configObject.registry_host;
  }
}
