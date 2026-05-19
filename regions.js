const regions = {

    kanto: {
        name: "Kanto",

        stats: {
            inspiration: 1,
            technology: 2,
        },

        boosts: [

        {
        description: "The region of Kanto is rich in history and technology, always pushing the boundaries of what is possible",
        
        boost: "Draw inspiration from the drive for technology and innovation, gain +1 to inwpiration and +2 to technology",
        
        terrain: "When in forest or grass land wild areas or gyms, gain 1d4 to all damage rolls",
        },    
    ]
},

    johto: {
        name: "Johto",

        stats: {
            bonding: 1,
            pokemonlore: 2,
        },

        boosts: [

            {
                description: "The peolpe of Johto are know for there deep connection with the history and folklore of pokemon, and pride themselves on there bonds with their pokemon",
            
                boost: "Your bond and love for pokemon lore is unmatched, gain +1 to bonding and +2 to pokemonlore",

                terrain: "When in the mountains or forrest wild areas or gyms, roll with advantage on bonding checks",
            },
        ]
    },

    hoenn: {
        name: "Hoenn",

        stats: {
            survival: 1,
            empathy: 2,
        
        },

    boosts: [

        {
            description: "The people of the Hoenn region have a deep a profound connection with nature focusing on environmental harmony and balance",

            boost:"Your profound connection with nature drives you search for balance and harmony, gain +1 to survival and +2 to empathy",

            terrain: "When surrounded by water or rock terrain, gain 1d4 to all xp rolls",
        },
    ]
},

    sinnoh : {
        name: "Sinnoh",

        stats: {
            pokemonlore: +2,
            perception: +1,
        },

    boosts: [

        {
            description: "Those from Sinnoh explore the origins of the universe and the myths of creation, seekjng to understand space and time itself",

            boost: "Your profound understanding of the universe and the myths of creation gain you +2 to pokemonlore and +1 to perception",

            terrain: "When in the snow or ice terrain or gyms, you may reroll 1 failed attack toll per battle",
        },
    ] 
},

    unova: {
        name:"Unova",

        stats: {
            technology: +1,
            tracking: +2,
        },

    boosts: [
        
        {
            
        description: "The land of Unova is built on the old vs new, known for there advancements in technology and there connection to the land",

        boost: "Your connection to the land and Unovas advancements in technology gan you + 1 to technology and +2 to tracking",

        terrain: "Whether in the grasslands or urban areas and gyms, gain 1d4 to all item rolls",
        },
    ]
},

    kalos: {
        name: "Kalos",

        stats: {
            perception: +2,
            empathy: +1

        },

        boosts: [

            {

            description: "Kalos is a region centered around aesthetics and beauty, the cycle of life and destruction, and the beauty of the land",
                
            boost: "your connection to the land and your appreciation of beauty the cycle of life, gain you +2 to perception and +1 to empathy",

            terrain: "whether amongst the rocky mountains or the grasslands and gyms, gain 1d4 to potion rolls",
            },
        ]
    },

    alola: {
        name: "Alola",

        stats: {
            bonding: +2,
            catching: +1,
    
        },

        boosts: [

            {
            description: "Alola is a region emmersed in ecology and community, they highlight all living things interconnectedly within a closed ecosystem as they transistion to adulthood",

            boost: "your connection to all living things Bonds you to the pokemon you catch giving you +2 to bonding and +1 to catching",

            terrain: "whether you in the water or on the beach anf gyms, reroll 1 failed catching roll per encounter",
            },
        ]
    },

    galar: {
        name:"Galar",

        stats: {
            battletactics: +2,
            inspiration: +1,
        },

        boosts: [

            {
            description: " Galar is the hub for all things battle, they are known for the massive enjoyment in the spectater sport of battel",

            boost: "Your love for battlr and pure enjoyment of the sport gives you +2 to battletactics and +1 to inspiration",

            terrain: "Whether in a wild area or in the gym, roll with advantage on battletactics checks",
            },
        ]
    },

    paldea: {
        name: "Paldea",

        stats: {
            perception: +1,
            pokemonlore: +2,
        },

        boosts: [

            {
            description: "Paldea is all about docovery and legacy, encouraging personal growth and exploring how the past influences the present",

            boost: "Your love for discovery and legacy gives you +1 to perception and +2 to pokemonlore",

            terrain: "Whether in the mountains or the dessert and gyms, reroll 1 failed pokemonlore roll per encounter",
            },
        ]
    },
};