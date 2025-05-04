docker-compose exec web python manage.py createsuperuser

docker-compose exec web python manage.py makemigrations app

docker-compose exec web python manage.py migrate

https://www.django-rest-framework.org/tutorial