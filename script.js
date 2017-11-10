const COULEUR = {
    "COEUR": 0,
    "PIQUE": 1,
    "CARREAU": 2,
    "TREFLE": 3    
}

const TYPE = {
    "ONE": 0,
    "TWO": 1,
    "THREE": 2,
    "FOUR": 3,
    "FIVE": 4,
    "SIX": 5,
    "SEVEN": 6,
    "EIGHT": 7,
    "NINE": 8,
    "TEN": 9,
    "J": 10,
    "Q": 11,
    "K": 12,
    "AS": 13
}

class Carte {
    /**
     * 
     * @param {COULEUR} couleur 
     * @param {TYPE} type 
     */
    constructor(couleur, type) {
        this.uhsuz = 0
        this.couleur = couleur
        this.type = type
    }
}


const Co1 = new Carte(COULEUR.COEUR,TYPE.ONE)
const Co2 = new Carte(COULEUR.COEUR,TYPE.TWO)
const Co3 = new Carte(COULEUR.COEUR,TYPE.THREE)
const Co4 = new Carte(COULEUR.COEUR,TYPE.FOUR)
const Co5 = new Carte(COULEUR.COEUR,TYPE.FIVE)
const Co6 = new Carte(COULEUR.COEUR,TYPE.SIX)
const Co7 = new Carte(COULEUR.COEUR,TYPE.SEVEN)
const Co8 = new Carte(COULEUR.COEUR,TYPE.EIGHT)
const Co9 = new Carte(COULEUR.COEUR,TYPE.NINE)
const Co10 = new Carte(COULEUR.COEUR,TYPE.TEN)
const CoJ = new Carte(COULEUR.COEUR,TYPE.J)
const CoQ = new Carte(COULEUR.COEUR,TYPE.Q)
const CoK = new Carte(COULEUR.COEUR,TYPE.K)
const CoAS = new Carte(COULEUR.COEUR,TYPE.AS)

const P1 = new Carte(COULEUR.PIQUE,TYPE.ONE)
const P2 = new Carte(COULEUR.PIQUE,TYPE.TWO)
const P3 = new Carte(COULEUR.PIQUE,TYPE.THREE)
const P4 = new Carte(COULEUR.PIQUE,TYPE.FOUR)
const P5 = new Carte(COULEUR.PIQUE,TYPE.FIVE)
const P6 = new Carte(COULEUR.PIQUE,TYPE.SIX)
const P7 = new Carte(COULEUR.PIQUE,TYPE.SEVEN)
const P8 = new Carte(COULEUR.PIQUE,TYPE.EIGHT)
const P9 = new Carte(COULEUR.PIQUE,TYPE.NINE)
const P10 = new Carte(COULEUR.PIQUE,TYPE.TEN)
const PJ = new Carte(COULEUR.PIQUE,TYPE.J)
const PQ = new Carte(COULEUR.PIQUE,TYPE.Q)
const PK = new Carte(COULEUR.PIQUE,TYPE.K)
const PAS = new Carte(COULEUR.PIQUE,TYPE.AS)

const Ca1 = new Carte(COULEUR.CARREAU,TYPE.ONE)
const Ca2 = new Carte(COULEUR.CARREAU,TYPE.TWO)
const Ca3 = new Carte(COULEUR.CARREAU,TYPE.THREE)
const Ca4 = new Carte(COULEUR.CARREAU,TYPE.FOUR)
const Ca5 = new Carte(COULEUR.CARREAU,TYPE.FIVE)
const Ca6 = new Carte(COULEUR.CARREAU,TYPE.SIX)
const Ca7 = new Carte(COULEUR.CARREAU,TYPE.SEVEN)
const Ca8 = new Carte(COULEUR.CARREAU,TYPE.EIGHT)
const Ca9 = new Carte(COULEUR.CARREAU,TYPE.NINE)
const Ca10 = new Carte(COULEUR.CARREAU,TYPE.TEN)
const CaJ = new Carte(COULEUR.CARREAU,TYPE.J)
const CaQ = new Carte(COULEUR.CARREAU,TYPE.Q)
const CaK = new Carte(COULEUR.CARREAU,TYPE.K)
const CaAS = new Carte(COULEUR.CARREAU,TYPE.AS)

const T1 = new Carte(COULEUR.TREFLE,TYPE.ONE)
const T2 = new Carte(COULEUR.TREFLE,TYPE.TWO)
const T3 = new Carte(COULEUR.TREFLE,TYPE.THREE)
const T4 = new Carte(COULEUR.TREFLE,TYPE.FOUR)
const T5 = new Carte(COULEUR.TREFLE,TYPE.FIVE)
const T6 = new Carte(COULEUR.TREFLE,TYPE.SIX)
const T7 = new Carte(COULEUR.TREFLE,TYPE.SEVEN)
const T8 = new Carte(COULEUR.TREFLE,TYPE.EIGHT)
const T9 = new Carte(COULEUR.TREFLE,TYPE.NINE)
const T10 = new Carte(COULEUR.TREFLE,TYPE.TEN)
const TJ = new Carte(COULEUR.TREFLE,TYPE.J)
const TQ = new Carte(COULEUR.TREFLE,TYPE.Q)
const TK = new Carte(COULEUR.TREFLE,TYPE.K)
const TAS = new Carte(COULEUR.TREFLE,TYPE.AS)
