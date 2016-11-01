export const MAGIC_BOXES = {
  "alpine:latest": {
    "Tty": true,
    "Image": "alpine:latest",
    "Cmd": ["/bin/sh"]
  },

  "uifd/ui-for-docker:latest": {
    "Tty": true,
    "Image": "uifd/ui-for-docker:latest",
    "HostConfig": {
      "Binds": ["/var/run/docker.sock:/var/run/docker.sock"],
      "PortBindings": { "9000/tcp": [{ "HostPort": "9000" }] },
      "Privileged": true,
    }
  },

  "DorryCloud:5000/rpi_samba_mini:1.0.0": {
    "Tty": true,
    "Image": "DorryCloud:5000/rpi_samba_mini:1.0.0",
    "HostConfig": {
      "Binds": [
        "/dorry_data/samba/share/:/data/",
        "/dorry_data/samba/backup/:/home/backup/"
      ],
      "PortBindings": { "445/tcp": [{ "HostPort": "445" }] },
      // "RestartPolicy": { "Name": "always", "MaximumRetryCount": 0 },
    }
  },

  "DorryCloud:5000/rpi_data_manager:1.0.0": {
    "Tty": true,
    "Image": "DorryCloud:5000/rpi_data_manager:1.0.0",
    "HostConfig": {
      "Binds": [
        "/etc/localtime:/etc/localtime",
        "/dorry_data/samba/share/:/data/",
        "/dorry_data/samba/backup/:/home/backup/"
      ],
      // "RestartPolicy": { "Name": "always", "MaximumRetryCount": 0 },
    }
  },

}
