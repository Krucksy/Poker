const { Joueur, Table, NIVEAU_TABLE } = require("./cartes");

const player1 = new Joueur("Tim",5)

const player2 = new Joueur("Léo",42000)
const player3 = new Joueur("Evan",1000)

const maTable = new Table(NIVEAU_TABLE.NOVICE)

maTable.ajouterJoueur(player1)
maTable.ajouterJoueur(player2)
maTable.ajouterJoueur(player3)

maTable.round()