const { JeuDeCarte } = require("./jeuDeCarte");
const stdin = process.openStdin();


const NIVEAU_TABLE = {
    "NOVICE":  {"ARGENT_MAIN_MIN":1000, "ARGENT_MAIN_MAX": 5000,  "PARI_MIN":100},
    "MEDIUM":  {"ARGENT_MAIN_MIN":5000, "ARGENT_MAIN_MAX": 10000, "PARI_MIN":500},
    "HARD":    {"ARGENT_MAIN_MIN":10000, "ARGENT_MAIN_MAX": 100000, "PARI_MIN":1000},
    "LEGENDS": {"ARGENT_MAIN_MIN":100000, "ARGENT_MAIN_MAX": Infinity, "PARI_MIN":5000},
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
     * @param {JeuDeCarte[]} carte 
     */
    recevoirCartes(carte) {
        this.deck.push(carte)
    }

    resetDeck() {
        this.deck = []
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
        this.carteSurTable = []

    }

    ajouterJoueur(nouveauJoueur) {
        this.joueurs.push(nouveauJoueur)
    }

    retirerJoueur(nomJoueur) {
        // Supprime le joueur donné en param de la liste de joueurs
        for(let i = 0; i < joueurs.length; i++) {
            if(nomJoueur == joueurs[i]) {
                joueurs.splice(i,1)
            }
        }
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
            /*
            TO DO
            */
        })

        // Ajoute 2 carte sur le board
        this.carteSurTable += this.jeuDeCarte.tirerCartes(3)

        // De nouveau les paris
        /*
        TO DO
        */

        // Ajoute 1 carte sur le board
        this.carteSurTable += this.jeuDeCarte.tirerCartes(1)

        // De nouveau les paris
        /*
        TO DO
        */

        // Ajoute 1 carte sur le board
        this.carteSurTable += this.jeuDeCarte.tirerCartes(1)

        

    }
    
}


module.exports = {
    Joueur,
    Table,
    NIVEAU_TABLE
};