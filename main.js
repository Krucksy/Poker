/*
    Jeu de poker version 2.0
    Plumey Simon
    Projet débuté le 31.01.2018
*/

const aslo = require("aslo")

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

const table = (bigBlind) => ({bigBlind, smallBlind:parseInt(bigBlind/2), pot:0, board:[]})

function miser(joueur, nombre) {
    joueur.argent -= nombre
    joueur.blind += nombre
}

const fold = (joueur) => {joueur.main = []}

function carteToString(carte) {
    return Object.keys(type)[carte.type] + " DE " + Object.keys(couleur)[carte.couleur]
}

async function demandesMises() {
    // Demande a chaque joueur les mises
    await aslo.for(listeJoueurs.length - 1, i => i >= 0, i => --i, async (i, suivant) => {
        console.log (listeJoueurs[i].main.map(carteToString))
        console.log(listeJoueurs[i].nom, " doit jouer : ")

        let mise = 0

        await aslo.doWhile(() => mise > listeJoueurs[i].argent, async next => {
            process.stdin.once("data", data => {
                mise = parseInt(data.toString())
                if (mise > listeJoueurs[i].argent) {
                    console.log("la mise ne peut pas etre plus grand que l'argent possédé")
                } else {
                    if (mise === -1) {
                        // Se couche
                        listeJoueurs.splice(i, 1)
                    } else {
                        miser(listeJoueurs[i], mise)
                    }
                }
                next()
            })
        })

        suivant()
    })
}

async function round() {
    listeJoueurs.forEach( (joueur) => {
        joueur.main = tirerElements(pile1, 2)
    })

    await demandesMises()
    table1.board = table1.board.concat(tirerElements(pile1, 3))
    console.log(listeJoueurs.map(joueur => joueur.argent),  table1.board.map(carteToString))
    await demandesMises()
    table1.board = table1.board.concat(tirerElements(pile1, 1))
    console.log(listeJoueurs.map(joueur => joueur.argent),  table1.board.map(carteToString))
    await demandesMises()
    table1.board = table1.board.concat(tirerElements(pile1, 1))
    console.log(listeJoueurs.map(joueur => joueur.argent),  table1.board.map(carteToString))
    await demandesMises()
    console.log(listeJoueurs.map(joueur => joueur.main.map(carteToString)), table1.board.map(carteToString))
    process.exit()
}


/*********/
/* Start */
/*********/

// Setup
const pile1 = creerPile()
melangerListe(pile1)
const joueur1 = joueur("Djobyy", 100)
const joueur2 = joueur("Djobaa", 100)
const joueur3 = joueur("Tantouzard", 100)
const joueur4 = joueur("Paul", 100)

const listeJoueurs = [joueur1, joueur2, joueur3, joueur4]

const table1 = table(20)

round().catch(console.error)
