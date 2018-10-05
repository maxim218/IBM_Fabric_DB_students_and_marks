# IBM Hyperledger Fabric

## Реализация базы данных: ученики и оценки

### Автор: Колотовкин Максим

### Полезная ссылка

Ссылка: https://hyperledger-fabric.readthedocs.io/en/release-1.2/write_first_app.html

### Инструкция

Останавливаем работу контейнеров: 

sudo docker stop $(sudo docker ps -aq)

Удаляем старые контейнеры: 

sudo docker rm $(sudo docker ps -aq)

Удаляем старые образы: 

sudo docker rmi $(sudo docker images dev-* -q)






