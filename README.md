# ecf-arcadia-front

## Mise en place de l'environnement de demonstration du front-end

Cet environnement de démonstration ne prend pas en charge la mise en place du chiffrement TLS. Seul l'environnement de production dispose de cette fonctionalité.

Il nécessite également un serveur ou poste de travail ayant docker installé.

- cloner le repo github (front)

```
git clone https://github.com/etupdt/ecf-arcadia-front.git
```

- allez dans le répertoire du projet

```
cd ecf-arcadia-front
```

-  Sur la branche main lancer, à la racine du répertoire **ecf-arcadia-front**, la commande de création du container du front :

```
docker compose -f docker-compose-front-demo.yml up -d
```

La partie front-end est maintenant installée, elle communique avec le back-end sur le port 8083.
Il faut maintenant installer la partie back de l'application (voir le README du repo **ecf-arcadia-back**), vous pourrez alors accéder à l'application avec l'url :

```
http://localhost:4200
```

Si vous voulez supprimer les containers :
```
docker compose -f docker-compose-front-demo.yml down
```
