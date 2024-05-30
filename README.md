# Plateforme de données de la Métropole Européenne de Lille (MEL)

Ce dépôt contient le code source de l'interface utilisateur de la plateforme de données de la MEL, accessible à https://data.lillemetropole.fr.

Ce projet est construit avec Angular et NX, et se base en grande partie sur les composants et fonctionnalités offertes par [GeoNetwork-UI](https://github.com/geonetwork/geonetwork-ui) pour la recherche, l'accès aux données et la prévisualisation de celles-ci.

Ce code source est distribué sous licence GPL v3.

## Démarrer l'application

Pour démarrer le serveur de développement, exécuter `npm start` ou `nx serve datahub`. Ouvrir le navigateur et naviguer vers http://localhost:4200/.

## Tests d'ensemble "end-to-end"

Les tests d'ensemble peuvent être exécutés en utilisant le répertoire `support-services` de GeoNetwork-UI afin de simuler les services backend.

Copier le répertoire https://github.com/geonetwork/geonetwork-ui/tree/main/support-services en local et exécuter `docker compose up -d` dans celui-ci. L'intégration continue de ce dépôt utiliser le même système et les mêmes données pour exécuter les tests.

Ensuite, exécuter `npm run e2e:datahub` ou `npm run e2e:datahub-dev` (pour les exécuter et les voir passer dans un navigateur).

## Générateurs du code

Il est possible de tirer parti des générateurs de code qui accompagnent les plugins Nx.

Pour générer un composant à partir du répertoire racine par exemple, exécuter la commande suivante :

```
npx nx g @nx/angular:component [mon-composant] --module=app.module --directory=apps/datahub/src/app/[emplacement-de-mon-composant]
```

Exécuter `nx list` pour obtenir une liste des plugins disponibles et s'ils ont des générateurs. Ensuite, exécuter `nx list <nom-du-plugin>` pour voir quels générateurs sont disponibles.

En savoir plus sur [les générateurs Nx](https://nx.dev/plugin-features/use-code-generators).
