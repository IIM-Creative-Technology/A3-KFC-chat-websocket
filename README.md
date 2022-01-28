# Team KFC (Kentucky French Chat)


## Contributors
* [Théo Laberrondo](https://github.com/Namacha0908) 
* [Alex Guillemin](https://github.com/AlexGuillemin91)
* [Antoine Savelli](https://github.com/Antoine75)
* [Martin De Boutray](https://github.com/MBoutray)
* [Dylan Stienne](https://github.com/Dylan-Stienne)


## Installation & lancement
### Back
1. Se rendre dans le dossier back `cd back/`
2. Installer les packages node `npm install`
3. Lancer lee server local `npm run start`
### Front
1. Se rendre dans le dossier front `cd front/`
2. Installer les packages node `npm install`
3. Lancer lee server local `npm run dev`


## Identfiants de test
### Compte A
* Email `dylan@gmail.com`
* Mot de passe `123`
### Compte B
* Email `martin@gmail.com`
* Mot de passe `123`
### Compte personnalsé
Rendez-vous sur la page /register pour vous créer un compte


## Technologies du projet
- Node.js
- Express
- Mongodb Atlas
- ORM Mongoose
- Nuxt.js
- Tailwind
- Github
- Socket.io
- JWT


## Fonctionnalités implémentés au projet
- Création d'une api REST en node:
    - GET / (pour tester que l'api est fonctionnelle)
    - POST /auth/login (se connecter)
    - POST /auth/register (s'inscrire)
    - GET /convs (recupérer toutes nos conversations)
    - POST /convs (créer une conversation)
    - GET /users (récupérer la liste des utilisateurs pour créer des conversations)

- Création d'une interface de test en nuxt.js:
    - Inscription (/register)
    - Connexion (/login)
    - Deconnexion (/logout)
    - Conversations (/)

- Messagerie instantanée avec socket.io:
    - Envois de messages
    - Recuperation de messages en instantané
    - Persistances des messages (envois sur la base de donnée)
    - Récupération de tous les messages de la conversation au chargement de celle ci

- Gestion des sessions sur le front (avec posibilité de "rester connecté")
- Implementation de middlewares sur les pages front
- Authentification des requêtes api grâce à des tokens JWT
- Gestion des rooms
- Gestion de conversations de plus de 2 personnes
- Génération des noms de conversations avec les prénoms des membres invités
- Front totalement dynamisé/relié à l'api et à la websocket
- Gestion d'environnements (.env)
