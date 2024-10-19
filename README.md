# GFRSS - Gamefound Projects Scraper

## Auteur : Baptiste Fleury  
**Date : 19/10/2024**  
**Licence : Common License - Libre de droits**

## Introduction
**GFRSS** est un outil de scraping conçu pour automatiser la récupération d'informations sur les projets de jeux de société en cours et à venir sur **Gamefound**. L'objectif est de ne pas rater les nouveaux projets et les campagnes en cours en récupérant des informations telles que le titre, le résumé, l'image et le lien vers chaque projet. Ce projet permet d'automatiser l'envoi de notifications par email sur les nouveaux projets détectés.

### Fonctionnalités principales :
- Scraping des projets en **crowdfunding** et des **projets à venir** sur Gamefound.
- **Stockage des projets** dans des fichiers JSON.
- **Notifications par email** avec mise en page HTML.
- Planification automatique du scraping avec **`cron`** pour une exécution quotidienne.

## Table des matières
1. [Installation sur PC (Windows/Linux)](#installation-sur-pc)
2. [Installation sur un Serveur](#installation-sur-un-serveur)
3. [Installation sur un Raspberry Pi](#installation-sur-un-raspberry-pi)
4. [Structure du Projet](#structure-du-projet)
5. [Utilisation](#utilisation)
6. [Configuration de `pm2` pour l'exécution continue](#configuration-de-pm2-pour-lexécution-continue)
7. [Licence](#licence)

## Installation sur PC
### Prérequis
- **Node.js** et **npm** installés sur votre machine.
- **Git** installé pour cloner le dépôt.

### Étapes d'installation
1. **Cloner le dépôt** :
    ```bash
    git clone https://github.com/fleurybaptiste/GFRSS.git
    cd GFRSS
    ```
2. **Installer les dépendances** :
    ```bash
    npm install
    ```
3. **Créer un fichier `.env`** pour les informations de configuration sensibles :
    ```bash
    touch .env
    ```
    Exemple de contenu du fichier `.env` :
    ```env
    EMAIL_USER=ton_adresse_email@gmail.com
    EMAIL_PASS=ton_mot_de_passe_application
    EMAIL_RECIPIENTS=adresse1@gmail.com,adresse2@gmail.com
    ```

4. **Exécuter le script pour tester** :
    ```bash
    node src/index.js
    ```

## Installation sur un Serveur
### Prérequis
- **Accès SSH** au serveur.
- **Node.js**, **npm** et **Git** installés.

### Étapes d'installation
1. **Connexion au serveur** via SSH :
    ```bash
    ssh utilisateur@adresse_du_serveur
    ```
2. **Cloner le dépôt et installer les dépendances** :
    ```bash
    git clone https://github.com/fleurybaptiste/GFRSS.git
    cd GFRSS
    npm install
    ```
3. **Configurer l'environnement** :
    - Créer un fichier `.env` avec les informations de configuration nécessaires.
  
4. **Installer `pm2` pour l'exécution continue** :
    ```bash
    sudo npm install -g pm2
    pm2 start src/index.js --name GFRSS-Scraper
    pm2 save
    pm2 startup
    ```

## Installation sur un Raspberry Pi
### Prérequis
- Un **Raspberry Pi** avec **Raspberry Pi OS** installé.
- **Node.js** et **npm** installés.

### Étapes d'installation
1. **Installer Node.js et npm** :
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```
2. **Cloner le dépôt** et installer les dépendances :
    ```bash
    git clone https://github.com/fleurybaptiste/GFRSS.git
    cd GFRSS
    npm install
    ```
3. **Configurer le fichier `.env`** et utiliser `pm2` pour assurer l'exécution continue :
    ```bash
    sudo npm install -g pm2
    pm2 start src/index.js --name GFRSS-Scraper
    pm2 save
    pm2 startup
    ```

## Structure du Projet
```
GFRSS/
|
├── src/
│   ├── index.js                 # Fichier principal qui lance le scraping.
│   ├── scraper.js               # Script qui contient la logique de scraping.
│   ├── notify.js                # Logiciel de notifications (envoi d'email).
│   ├── utils/
│       └── helpers.js           # Fonctions utilitaires partagées.
├── data/
│   ├── crowdfunding_projects.json # Fichier pour stocker les projets en crowdfunding.
│   └── upcoming_projects.json    # Fichier pour stocker les projets à venir.
├── logs/
│   └── scraper.log              # Fichier pour stocker les logs des activités.
├── config/
│   └── config.json              # Fichier de configuration des URL et paramètres.
└── package.json                 # Fichier de configuration des dépendances Node.
```

## Utilisation
- **Lancer manuellement le scraping** :
  ```bash
  node src/index.js
  ```
- Le scraping est **planifié automatiquement chaque jour à minuit** grâce à **node-cron**. Les notifications par email sont envoyées si de nouveaux projets sont détectés.

## Configuration de `pm2` pour l'Exécution Continue
`pm2` est un gestionnaire de processus Node.js qui permet de garder votre script actif en permanence et de le redémarrer automatiquement après une panne ou un redémarrage de la machine.

1. **Installer `pm2`** globalement :
    ```bash
    sudo npm install -g pm2
    ```
2. **Démarrer le script** :
    ```bash
    pm2 start src/index.js --name GFRSS-Scraper
    ```
3. **Assurer la reprise après un redémarrage** :
    ```bash
    pm2 save
    pm2 startup
    ```

## Licence
Ce projet est sous licence **Common License - Libre de droits**.  
Vous êtes libre d'utiliser, modifier, et distribuer ce logiciel à condition de citer l'auteur, **Baptiste Fleury**, et de maintenir cette licence dans tout usage futur.
