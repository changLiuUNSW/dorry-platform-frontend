export class ConfigObject {
  build_version: string;
  daemon_addr: string;
  registry_addr: string;

  constructor(build_version: string, daemon_addr: string, registry_addr: string) {
    this.build_version = build_version;
    this.daemon_addr = daemon_addr;
    this.registry_addr = registry_addr;
  }
}
