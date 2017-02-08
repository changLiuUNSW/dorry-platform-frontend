export class ConfigObject {
  build_version: string;
  daemon_addr: string;
  registry_host: string;
  registry_proto: string;
  dorry_api: string;
  kube_api: string;

  constructor(build_version: string, daemon_addr: string, registry_host: string, registry_proto: string, dorry_api: string, kube_api: string) {
    this.build_version = build_version;
    this.daemon_addr = daemon_addr;
    this.registry_host = registry_host;
    this.registry_proto = registry_proto;
    this.dorry_api = dorry_api;
    this.kube_api = kube_api;
  }
}
