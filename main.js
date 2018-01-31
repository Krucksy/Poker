/*
    Jeu de poker version 2.0
    Plumey Simon
    Projet débuté le 31.01.2018
*/

const couleur = {
    "COEUR": 0,
    "PIQUE": 1,
    "CARREAU": 2,
    "TREFLE": 3,
    "MAX": 4
}

const type = {
    "DEUX": 0,
    "TROIS": 1,
    "QUATRE": 2,
    "CINQ": 3,
    "SIX": 4,
    "SEPT": 5,
    "HUIT": 6,
    "NEUF": 7,
    "DIX": 8,
    "J": 9,
    "Q": 10,
    "K": 11,
    "AS": 12,
    "MAX": 13
}

const carte = (type, couleur) => ({type, couleur})

function creerPile() {
    const pile = []
    for (let i = 0; i < couleur.MAX; i++) {
        for (let j = 0; j < type.MAX; j++) {
            pile.push(carte(j, i))
        }
    }
    return pile
}

function melangerListe(liste) {
    for (let i = liste.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [liste[i], liste[j]] = [liste[j], liste[i]];
    }
}

const tirerElements = (liste, nombre) => {return liste.splice(0, nombre)}

/**
 * Créer un joueur
 * @param {string} nom
 * @param {number} argent
 */
const joueur = (nom, argent) => ({nom, argent, blind:0, main:[]})

const table = (bigBlind) => ({bigBlind, smallBlind:bigBlind/2, pot:0, board:[]})

function miser(joueur, nombre) {
    joueur.argent -= nombre
    joueur.blind += nombre
}

const fold = (joueur) => {joueur.main = []}

// Tests
const pile1 = creerPile()
melangerListe(pile1)
const joueur1 = joueur("Tim", 100)
const joueur2 = joueur("Evan", 200)
const joueur3 = joueur("Léo", 50)
const joueur4 = joueur("Cattin", 250)

const table1 = table(20)

// Round

joueur1.main = tirerElements(pile1, 2)
joueur2.main = tirerElements(pile1, 2)
joueur3.main = tirerElements(pile1, 2)
joueur4.main = tirerElements(pile1, 2)

miser(joueur1, table1.smallBlind)
miser(joueur2, table1.bigBlind)
miser(joueur3, 20)
fold(joueur4)

console.log(joueur1,joueur2,joueur3,joueur4)

table.board = tirerElements(pile1, 3)

miser(joueur1, 0)
miser(joueur2, 10)
fold(joueur3)
miser(joueur1, 10)

table.board = tirerElements(pile1, 1)

miser(joueur1, 0)
miser(joueur2, 0)

table.board = tirerElements(pile1, 1)

miser(joueur1, 0)
miser(joueur2, 0)

