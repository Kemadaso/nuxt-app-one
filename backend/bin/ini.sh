#!/bin/bash



foo=$(sudo service apache2 status)
pm2=$(sudo pm2 status)





echo $foo
echo $pm2

if [[ $foo =~ "not running" ]]; then
  echo "el servicio apache2 no esta corriendo"
else
    echo  "el servicio esta corriendo"
fi
