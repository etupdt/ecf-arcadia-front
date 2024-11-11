# ecf-arcadia-front

## Mise en place de l'environnement de demonstration

Cet environnement de démonstration ne prend pas en charge la mise en place du chiffrement ssl. Seul l'environnement de production dispose de cette fonctionalité.

Il nécessite également un serveur ou poste de travail ayant docker et docker compose installés.

- cloner le repo github (front)

```
git clone https://github.com/etupdt/ecf-arcadia-front.git
```

- Builder, puis créer le container du front en lançant à la racine du répertoire **ecf-arcadia-front** les commandes :

```
docker compose build --no-cache
docker compose up -d
```

Il faut maintenant installer la partie back de l'application (voir le README du repo **ecf-arcadia-back**), l'environnement sera alors près. Vous pourrez accéder à l'application avec l'url :

```
http://localhost:4200
```
