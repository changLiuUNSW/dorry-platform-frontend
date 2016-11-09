export const MAGIC_BOXES = {
  // alpine:latest
  "sha256:baa5d63471ead618ff91ddfacf1e2c81bf0612bfeb1daf00eb0843a41fbfade3": {
    "Tty": true,
    "Image": "alpine:latest",
    "Cmd": ["/bin/sh"]
  },

  // uifd/ui-for-docker:latest
  "sha256:965940f98fa591b5a98d0d7063de58f9fb04f79f0a6a1046c25f971416130d88": {
    "Tty": true,
    "Image": "uifd/ui-for-docker:latest",
    "HostConfig": {
      "Binds": ["/var/run/docker.sock:/var/run/docker.sock"],
      "PortBindings": { "9000/tcp": [{ "HostPort": "9000" }] },
      "Privileged": true,
    }
  },

  // DorryCloud:5000/rpi_samba_mini:1.0.0
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

  // DorryCloud:5000/rpi_data_manager:1.0.0
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
