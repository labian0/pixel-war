# Pixel war

## Choix techniques

J'ai choisi d'afficher le canvas sous forme de matrice de pixels colorés, dont le style backgroundColor correspond à l'élément (string) dans la matrice de pixels renvoyée par l'API.
L'organisation du JS est la suivante: 
- api.js, fichier utilisé pour communiquer avec l'API distant;
- dom.js, fichier utilisé pour mettre en lien l'API avec le HTML du site.

## Améliorations par rapport au projet de base

- Rajout d'une sécurité pour empêcher l'uid d'être divulgué
