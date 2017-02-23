#!/bin/sh
changeenv () {
  if [ $KUBE_API ];then
    sed -i -e "2c\"kube_api\":\"http://${KUBE_API}:12000\"," /dorry-web/assets/config/env.json
  fi
}

changeenv;
