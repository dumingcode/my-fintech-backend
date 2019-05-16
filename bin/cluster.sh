#!/bin/sh
rsync -r --delete-after --quiet /var/www/myfintech/my-fintech-backend root@172.17.24.253:/var/www/myfintech
ssh root@172.17.24.253 'source /etc/profile; pm2 restart www'