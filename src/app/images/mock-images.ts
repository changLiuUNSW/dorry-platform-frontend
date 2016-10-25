export class ImageUrl {
  name: string;
  url: string;
  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}

export const DEFAULTURL: string = "assets/icons/default.svg";

export const IMAGELIST: ImageUrl[] = [
  { name: 'Gogs', url: 'assets/icons/gogs.svg' },
  { name: 'Mediawiki', url: 'assets/icons/mediawiki.svg' },
  { name: 'Gitlab', url: 'assets/icons/gitlab.svg' },
  { name: 'SAMBA', url: 'assets/icons/samba.svg' },
  { name: 'LDAP', url: 'assets/icons/ldap.svg' },
  { name: 'Jenkins', url: 'assets/icons/jenkins.svg' },
  { name: 'Mysql', url: 'assets/icons/mysql.svg' },
  { name: 'default', url: 'assets/icons/default.svg' },
];
