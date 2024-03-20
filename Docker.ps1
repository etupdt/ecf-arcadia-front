
# ng build --configuration=preprod

docker stop ecf-arcadia-front-preprod
docker rm ecf-arcadia-front-preprod
docker image rm ecf-arcadia-front-preprod

docker build -t ecf-arcadia-front-preprod .

# docker run -d --name ecf-arcadia-back -p 8080:8080 ecf-arcadia-back

docker compose -f .\docker-compose-preprod.yml up -d
