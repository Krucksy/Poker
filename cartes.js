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
    constructor(nom, sommes) {
        this.nom = nom
        this.sommes = sommes
        this.miseActuel = 0
        this.deck = []
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

    }

    ajouterJoueur(nouveauJoueur) {
        this.joueurs.push(nouveauJoueur)
    }

    retirerJoueur() {
        
    }

    round() {
        const participants = this.joueurs.slice()
        let miseActuelMax = 0

        // Ajoute 2 carte à chaque joueur
        participants.forEach(participant => {
            participant.recevoirCartes(this.jeuDeCarte.tirerCartes(2))
        })

        // boucle "for" asyncrone qui demande la mise à tout les participants
        const demandeToutesLesMises = callback => {
            let i = 0;

            // une itération de la "boucle for"
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