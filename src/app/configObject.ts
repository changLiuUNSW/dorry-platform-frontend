// Object store the config values
//
// * kube_api: dorry platform backend api url
// * frontend_version: dorry platform frontend build version
// * backend_version: dorry platform backend build version
export class ConfigObject {
  kube_api: string;
  frontend_version: string;
  backend_version: string;

  constructor(kube_api: string, frontend_version: string, backend_version) {
    this.kube_api = kube_api;
    this.frontend_version = frontend_version;
    this.backend_version = backend_version;
  }
}
