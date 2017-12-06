const stdin = process.openStdin();

const COULEUR = {
    "COEUR": 0,
    "PIQUE": 1,
    "CARREAU": 2,
    "TREFLE": 3,
    "MAX": 4
}

const TYPE = {
    "TWO": 0,
    "THREE": 1,
    "FOUR": 2,
    "FIVE": 3,
    "SIX": 4,
    "SEVEN": 5,
    "EIGHT": 6,
    "NINE": 7,
    "TEN": 8,
    "J": 9,
    "Q": 10,
    "K": 11,
    "AS": 12,
    "MAX": 13
}

const NIVEAU_TABLE = {
    "NOVICE":  {"ARGENT_MAIN_MIN":1000, "ARGENT_MAIN_MAX": 5000,  "PARI_MIN":100},
    "MEDIUM":  {"ARGENT_MAIN_MIN":5000, "ARGENT_MAIN_MAX": 10000, "PARI_MIN":500},
    "HARD":    {"ARGENT_MAIN_MIN":10000, "ARGENT_MAIN_MAX": 100000, "PARI_MIN":1000},
    "LEGENDS": {"ARGENT_MAIN_MIN":100000, "ARGENT_MAIN_MAX": 1000000, "PARI_MIN":5000},
}


class Carte {
    /**
     * 
     * @param {COULEUR} couleur 
     * @param {TYPE} type 
     */
    constructor(couleur, type) {
        this.couleur = couleur
        this.type = type
    }
}

class Joueur {
    constructor(nom, argent) {
        this.nom = nom
        this.argent = argent // argent totale du joueur
        this.miseActuel = 0 // la mise que le joueur avance
        this.deck = []
        this.dealer = boolean
    }

    /**
     * 
     * @param {Carte[]} carte 
     */
    recevoirCartes(carte) {
        this.deck.concat(carte)
    }

    demanderMise(callback) {
        console.log("mise pour",this.nom,":" )
        stdin.addListener("data", d =>
        {
            stdin.removeAllListeners("data")

            const mise = parseInt(d.toString());
            
            this.miseActuel += mise

            callback(mise)
        })
    }

    suit() {
        this.argent -= this.miseActuel
    }

    seCouche() {
        return true;
    }

    augmenteMise(nombre) {
        this.miseActuel += nombre;
        this.argent -= this.miseActuel
    }

    check() {
        return true;
    }
}

class Table {
    /**
     * 
     * @param {NIVEAU_TABLE} niveauTable
     * @param {Joueur[]} joueurs
     */
    constructor(niveauTable, joueurs) {
        this.niveauTable = niveauTable
        this.joueurs = joueurs || []
        this.jeuDeCarte = new JeuDeCarte
        this.pot = 0
        this.deckTable = []

    }

    ajouterJoueur(nouveauJoueur) {
        this.joueurs.push(nouveauJoueur)
    }

    retirerJoueur(joueurARetirer) {
        const indexJoueurARetirer = this.joueurs.indexOf(joueurARetirer)
        if (indexJoueurARetirer === -1) // aucun joueur trouvé avec le paramètre
            return 
        this.joueurs.splice(indexJoueurARetirer, 1)
    }

    /*
        fonction round()

            Défini le dealer
            Donne 2 cartes à chaque joueur
            demandesLesMises()
            Pose 3 cartes sur la table
            demandesLesMises()
            Pose 1 carte sur la table
            demandesLesMises()
            Pose 1 carte sur la table
            demandesLesMises()
            Découvre le gagnant
            Donne pot au gagnant
        }
   
        fonction demandesLesMises() {
            IF nombres de joueur > 2
                Le premier joueur après le dealer mise la moitié du la mise min
                Le deuxième joueur après le dealer mise la mise min
            ELSE 
                Le premier joueur après le dealer mise la mise min

            le troisième joueur prend la main

            FOR i, i < nombre de participants, i++
                IF participant.miseActuel != miseActuelTable
                    IF participant suit
                        participant.miseActuel = miseActuelTable
                    ELSE IF participant augmente
                        participant.augmenteMise(se que le joueur augmente)
                        miseActuelTable = participant.miseActuel
                    ELSE participant se couche
                        remove participant de la liste
                 ELSE
                    IF participant augmente
                        participant.augmenteMise(se que le joueur augmente)
                        miseActuelTable = participant.miseActuel
                        i = 0;
                    ELSE participant se couche
                        remove participant de la liste
                        i = 0;
                    ELSE
                        participant.check()
                        break
            END FOR


            FOREACH participants
                pot += participant.miseActuel
                participant.miseActuel = 0
            END FOREACH
        }
        
    */

    round() {
        // Défini le nouveau dealer
        let aTrouverUnDealer = false
        for (let i; i < joueurs.length; i++) {
            if (this.joueurs[i].dealer) {
                this.joueurs[i].dealer = false
                this.joueurs[i+1].dealer = true
            }    
        }
        // Si il n'y a aucun dealer, en générer un aléatoirement
        if (!aTrouverUnDealer)
            this.joueurs[Math.floor(Math.random())].dealer = true

        
    }


    
}

class JeuDeCarte {
    constructor() {
        this.listeCarte = []
        this.remplirListeCarte()
    }

    remplirListeCarte() {
        this.viderListeCarte()
        for (let i = 0; i < COULEUR.MAX; i++) {
            for (let j = 0; j < TYPE.MAX; j++) {
                this.listeCarte.push(new Carte(i,j))
            }
        }
        this.mélangerListeCarte()
    }

    mélangerListeCarte() {
        shuffle(this.listeCarte)
    }

    viderListeCarte() {
        this.listeCarte = []
    }

    tirerCarteDessus() {
        return this.listeCarte.shift()
    }

    tirerCartes(nombre) {
        return this.listeCarte.splice(0,nombre)
    }

    
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}

module.exports = {
    Joueur,
    Table,
    NIVEAU_TABLE
};




/*

ANCIENNE FONCTION ROUND

    round() {
        const participants = [...this.joueurs] // décompose la liste (avec les ...) et la recompose (avec les [])
        let miseActuelTable = 0

        // Ajoute 2 carte à chaque joueur
        participants.forEach(participant => {
            participant.recevoirCartes(this.jeuDeCarte.tirerCartes(2))
        })

        // boucle "for" asyncrone qui demande la mise à tout les participants
        const demandeToutesLesMises = callback => {
            let i = 0;

            // une itération de la "s for"
            const demandeMise = () => {
                participants[i].demanderMise(mise =>
                {

                    this.pot += mise;

                    i++;
                    if(i < participants.length) {
                        // se rappel si la boulce n'est pas finie
                        demandeMise()
                    }
                    else
                    {
                        // appel callback quand tout est fini
                        callback()
                    }
                })
            }

            demandeMise();
        }

        demandeToutesLesMises(() =>
        {

        })







    }

    */