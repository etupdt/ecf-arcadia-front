# ecf-arcadia-back

## Mise en place de l'environnement de demonstration

Cet environnement de démonstration ne prend pas en charge la mise en place du chiffrement ssl. Seul l'environnement de production dispose de cette fonctionalité.

Il nécessite également un serveur ou poste de travail ayant docker et docker compose installés.

- cloner les deux repo github (front et back)

```
git clone https://github.com/etupdt/ecf-arcadia-front.git
git clone https://github.com/etupdt/ecf-arcadia-back.git
```

- Editer le fichier **env.demo.properties** à la racine du répertoire du repo **ecf-arcadia-back**. Il faut y renseigner les variables suivantes (les autres variables ne doivent pas être modifiées):

| Variable | Description | Exemple |
| :--- | :--- | :--- |
| DB_DATABASE | Nom de la database Postgres de l'application | arcadia |
| DB_USER | Nom de l'utilisateur pour accès Postgres | arcadia |
| DB_PASSWORD | Mot de passe de l'utilisateur Postgres | libre |
| MONGO_INITDB_ROOT_USERNAME | Nom de l'utilisateur pour initialisation mongodb | libre |
| MONGO_INITDB_ROOT_PASSWORD | Mot de passe pour initialisation mongodb | libre |
| MONGO_DB | Nom de la database Postgres de l'application | arcadia |
| MONGO_USER | Nom de l'utilisateur pour accès Postgres | arcadia |
| MONGO_PASSWORD | Mot de passe de l'utilisateur Postgres | libre |
| JWT_KEY | Clé secrète du jeton JWT | libre |

- Builder, puis créer le container du front en lançant à la racine du répertoire **ecf-arcadia-front** les commandes :

```
docker compose build --no-cache
docker compose up -d
```
- Builder, puis créer le container du back en lançant à la racine du répertoire **ecf-arcadia-back** les commandes :

```
docker compose build --no-cache
docker compose --env-file env.demo.properties up -d
```

L'environnement est près. Accédez à l'application avec l'url :

```
http://localhost:4200
```
