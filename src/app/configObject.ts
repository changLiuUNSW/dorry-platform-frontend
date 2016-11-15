export class ConfigObject {
  build_version: string;
  daemon_addr: string;
  registry_host: string;
  registry_proto: string;

  constructor(build_version: string, daemon_addr: string, registry_host: string, registry_proto: string) {
    this.build_version = build_version;
    this.daemon_addr = daemon_addr;
    this.registry_host = registry_host;
    this.registry_proto = registry_proto;
  }
}
