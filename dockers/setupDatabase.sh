if [ ! -d "./../auth-rest-python/migrations" ]; then
    docker exec apiauth python manage.py db init
fi

docker exec apiauth python manage.py db migrate
docker exec apiauth python manage.py db upgrade

docker exec apiauth apidoc -i /routes/doc/config.yml -o public/docs/index.html

docker exec mysql bash -c "mysql -u root -proot auth < ./users.sql"