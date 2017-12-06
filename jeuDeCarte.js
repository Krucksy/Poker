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
    JeuDeCarte
};