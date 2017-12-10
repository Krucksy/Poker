const { JeuDeCarte } = require("./jeuDeCarte");
const stdin = process.openStdin();


const NIVEAU_TABLE = {
    "NOVICE":  {"ARGENT_MAIN_MIN":1000, "ARGENT_MAIN_MAX": 5000,  "PARI_MIN":100},
    "MEDIUM":  {"ARGENT_MAIN_MIN":5000, "ARGENT_MAIN_MAX": 10000, "PARI_MIN":500},
    "HARD":    {"ARGENT_MAIN_MIN":10000, "ARGENT_MAIN_MAX": 100000, "PARI_MIN":1000},
    "LEGENDS": {"ARGENT_MAIN_MIN":100000, "ARGENT_MAIN_MAX": Infinity, "PARI_MIN":5000},
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
        this.nombreJoueurs = this.joueurs.length

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
            IF nombres de joueur > 2
                Le premier joueur après le dealer mise la moitié du la mise min
                Le deuxième joueur après le dealer mise la mise min
            ELSE 
                Le premier joueur après le dealer mise la mise min

            le troisième joueur prend la main
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
        for (let i; i < nombreJoueurs; i++) {
            if (this.joueurs[i].dealer) {
                this.joueurs[i].dealer = false
                this.joueurs[i+1].dealer = true
            }    
        }
        // Si il n'y a aucun dealer, en désigne un aléatoirement
        if (!aTrouverUnDealer)
            this.joueurs[Math.floor(Math.random())].dealer = true

        // Distrubue 2 carte à chaque joueur
        participants.forEach(participant => {
            participant.recevoirCartes(this.jeuDeCarte.tirerCartes(2))
        })

        // Force les 2 premiers joueurs à miser
        if (nombreJoueurs > 2) {
            for (let i; i < nombreJoueurs; i++) {
                if (this.joueurs[i].dealer) {
                    this.joueurs[i+1].augmenteMise(niveauTable.PARI_MIN/2)
                    this.joueurs[i+2].augmenteMise(niveauTable.PARI_MIN)
                }    
            }
        } else {
            for (let i; i < nombreJoueurs; i++) {
                if (this.joueurs[i].dealer) {
                    this.joueurs[i+1].augmenteMise(niveauTable.PARI_MIN)
                }    
            }
        }


        
    }

    demanderLesMises() {
        
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