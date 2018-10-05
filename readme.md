# IBM Hyperledger Fabric (version 1.1)

## Реализация базы данных: ученики и оценки

### Автор: Колотовкин Максим

### Полезная ссылка

> Ссылка: 

https://hyperledger-fabric.readthedocs.io/en/release-1.2/write_first_app.html

### Инструкция

> Останавливаем работу контейнеров: 

sudo docker stop $(sudo docker ps -aq)

> Удаляем старые контейнеры: 

sudo docker rm $(sudo docker ps -aq)

> Удаляем старые образы: 

sudo docker rmi $(sudo docker images dev-* -q)

> Удаляем сети

sudo docker network prune

> Запускаем приложение

sudo ./startFabric.sh node

> Создаём администратора

node enrollAdmin.js

> Создаём обычного пользователя

node registerUser.js

> Запускаем скрипт для взаимодействия с приложением

python MyScript.py

### При обновлении чейнкода

> Запускаем скрипт

sudo ./upgrade.sh node














