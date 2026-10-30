// distractors.js
const rawDistractorJSON = {
  
  
  "lung_channel_quiz_distractors": [
    {
      "point": "LU-1",
      "name": "Zhongfu",
      "difficulty_levels": {
        "easy": ["ST-36", "SP-6", "BL-40", "GB-34", "LIV-3", "KID-1", "BL-60", "ST-44", "GB-41", "SP-4"],
        "medium": ["L.I.-11", "L.I.-4", "P-6", "HE-7", "SJ-5", "SI-3", "L.I.-10", "LU-9", "LU-7", "P-3"],
        "hard": ["SP-21", "P-1", "REN-17", "REN-14", "ST-18", "ST-19", "KID-23", "KID-24", "GB-22", "GB-23"],
        "insane": ["LU-2", "ST-13", "ST-14", "ST-15", "SP-20", "KID-26", "REN-20", "REN-21", "L.I.-16", "GB-21"]
      }
    },
    {
      "point": "LU-2",
      "name": "Yunmen",
      "difficulty_levels": {
        "easy": ["ST-36", "SP-6", "BL-40", "GB-34", "LIV-3", "KID-1", "BL-60", "ST-44", "GB-41", "SP-4"],
        "medium": ["L.I.-11", "L.I.-4", "P-6", "HE-7", "SJ-5", "SI-3", "LU-9", "LU-7", "L.I.-10", "P-3"],
        "hard": ["SP-21", "P-1", "REN-17", "REN-14", "ST-18", "ST-19", "KID-23", "KID-24", "GB-22", "GB-23"],
        "insane": ["LU-1", "ST-12", "ST-13", "KID-27", "REN-22", "SP-20", "ST-14", "L.I.-15", "L.I.-16", "GB-21"]
      }
    },
    {
      "point": "LU-3",
      "name": "Tianfu",
      "difficulty_levels": {
        "easy": ["ST-36", "SP-6", "BL-40", "GB-34", "LIV-3", "KID-1", "BL-60", "ST-44", "GB-41", "SP-4"],
        "medium": ["L.I.-4", "LU-9", "HE-7", "P-6", "SJ-5", "SI-3", "L.I.-11", "P-3", "HE-3", "SI-8"],
        "hard": ["LU-1", "LU-2", "LU-6", "L.I.-15", "SJ-14", "SI-9", "REN-17", "P-1", "ST-12", "GB-21"],
        "insane": ["LU-4", "L.I.-13", "L.I.-14", "P-2", "HE-2", "SJ-12", "SJ-13", "SI-10", "SI-11", "LU-5"]
      }
    },
    {
      "point": "LU-4",
      "name": "Xiabai",
      "difficulty_levels": {
        "easy": ["ST-36", "SP-6", "BL-40", "GB-34", "LIV-3", "KID-1", "BL-60", "ST-44", "GB-41", "SP-4"],
        "medium": ["L.I.-4", "LU-9", "HE-7", "P-6", "SJ-5", "SI-3", "L.I.-11", "P-3", "HE-3", "SI-8"],
        "hard": ["LU-1", "LU-2", "L.I.-15", "SJ-14", "SI-9", "REN-17", "P-1", "ST-12", "GB-21", "LU-7"],
        "insane": ["LU-3", "L.I.-13", "L.I.-14", "P-2", "HE-2", "SJ-12", "SJ-13", "SI-10", "LU-5", "L.I.-12"]
      }
    },
    {
      "point": "LU-5",
      "name": "Chize",
      "difficulty_levels": {
        "easy": ["ST-36", "SP-6", "BL-40", "GB-34", "LIV-3", "KID-1", "BL-60", "ST-44", "GB-41", "SP-4"],
        "medium": ["L.I.-4", "LU-9", "HE-7", "P-7", "SJ-4", "SI-3", "LU-1", "LU-2", "P-1", "HE-1"],
        "hard": ["LU-3", "LU-4", "LU-6", "L.I.-13", "P-2", "HE-2", "SJ-12", "SI-9", "L.I.-14", "SJ-13"],
        "insane": ["P-3", "HE-3", "L.I.-11", "SJ-10", "SI-8", "L.I.-12", "L.I.-10", "P-4", "HE-4", "LU-6"]
      }
    },
    {
      "point": "LU-6",
      "name": "Kongzui",
      "difficulty_levels": {
        "easy": ["ST-36", "SP-6", "BL-40", "GB-34", "LIV-3", "KID-1", "BL-60", "ST-44", "GB-41", "SP-4"],
        "medium": ["LU-1", "LU-2", "L.I.-15", "SJ-14", "L.I.-4", "HE-7", "P-7", "SI-3", "SJ-4", "LU-10"],
        "hard": ["LU-4", "LU-5", "LU-8", "LU-9", "P-3", "HE-3", "L.I.-11", "SJ-10", "SI-8", "L.I.-10"],
        "insane": ["LU-7", "L.I.-7", "L.I.-8", "L.I.-9", "P-4", "SJ-8", "SJ-9", "SI-7", "HE-4", "HE-5"]
      }
    },
    {
      "point": "LU-7",
      "name": "Lieque",
      "difficulty_levels": {
        "easy": ["ST-36", "SP-6", "BL-40", "GB-34", "LIV-3", "KID-1", "BL-60", "ST-44", "GB-41", "SP-4"],
        "medium": ["LU-1", "LU-2", "LU-5", "L.I.-11", "P-3", "HE-3", "SJ-10", "SI-8", "L.I.-15", "SJ-14"],
        "hard": ["LU-4", "LU-6", "L.I.-7", "P-4", "HE-4", "L.I.-10", "SJ-8", "SI-7", "L.I.-11", "P-3"],
        "insane": ["LU-8", "LU-9", "L.I.-5", "L.I.-6", "P-5", "P-6", "HE-5", "HE-6", "SJ-5", "SI-6"]
      }
    },
    {
      "point": "LU-8",
      "name": "Jingqu",
      "difficulty_levels": {
        "easy": ["ST-36", "SP-6", "BL-40", "GB-34", "LIV-3", "KID-1", "BL-60", "ST-44", "GB-41", "SP-4"],
        "medium": ["LU-1", "LU-2", "LU-5", "L.I.-11", "P-3", "HE-3", "SJ-10", "SI-8", "L.I.-15", "SJ-14"],
        "hard": ["LU-4", "LU-6", "L.I.-7", "P-4", "HE-4", "L.I.-10", "SJ-8", "SI-7", "L.I.-11", "P-3"],
        "insane": ["LU-9", "LU-7", "HE-5", "P-6", "L.I.-5", "SJ-5", "SI-5", "HE-6", "HE-7", "P-7"]
      }
    },
    {
      "point": "LU-9",
      "name": "Taiyuan",
      "difficulty_levels": {
        "easy": ["ST-36", "SP-6", "BL-40", "GB-34", "LIV-3", "KID-1", "BL-60", "ST-44", "GB-41", "SP-4"],
        "medium": ["LU-1", "LU-2", "LU-5", "L.I.-11", "P-3", "HE-3", "SJ-10", "SI-8", "L.I.-15", "SJ-14"],
        "hard": ["LU-6", "LU-7", "L.I.-6", "P-5", "HE-5", "L.I.-7", "SJ-6", "SI-6", "L.I.-8", "P-4"],
        "insane": ["P-7", "HE-7", "L.I.-5", "SJ-4", "SI-5", "LU-8", "LU-10", "P-6", "HE-6", "L.I.-4"]
      }
    },
    {
      "point": "LU-10",
      "name": "Yuji",
      "difficulty_levels": {
        "easy": ["ST-36", "SP-6", "BL-40", "GB-34", "LIV-3", "KID-1", "BL-60", "ST-44", "GB-41", "SP-4"],
        "medium": ["LU-1", "LU-2", "LU-5", "L.I.-11", "P-3", "HE-3", "SJ-10", "SI-8", "L.I.-15", "SJ-14"],
        "hard": ["LU-7", "LU-8", "L.I.-5", "P-6", "HE-6", "SJ-5", "SI-5", "L.I.-6", "P-5", "HE-5"],
        "insane": ["P-8", "HE-8", "L.I.-3", "L.I.-4", "SI-3", "SJ-3", "LU-11", "LU-9", "P-7", "HE-7"]
      }
    },
    {
      "point": "LU-11",
      "name": "Shaoshang",
      "difficulty_levels": {
        "easy": ["ST-36", "SP-6", "BL-40", "GB-34", "LIV-3", "KID-1", "BL-60", "ST-44", "GB-41", "SP-4"],
        "medium": ["LU-1", "LU-2", "LU-5", "L.I.-11", "P-3", "HE-3", "SJ-10", "SI-8", "L.I.-15", "SJ-14"],
        "hard": ["LU-7", "LU-8", "LU-9", "L.I.-5", "P-7", "HE-7", "SJ-4", "SI-5", "L.I.-6", "P-6"],
        "insane": ["L.I.-1", "P-9", "SJ-1", "HE-9", "SI-1", "LU-10", "L.I.-2", "P-8", "HE-8", "SJ-2"]
      }
    }
  ],

  
  
  "large_intestine_channel_quiz_distractors": [
    {
      "point": "L.I.-1",
      "name": "Shangyang",
      "difficulty_levels": {
        "easy": [
          "ST-36",
          "SP-6",
          "BL-40",
          "GB-34",
          "LIV-3",
          "KID-1",
          "BL-60",
          "ST-44",
          "GB-41",
          "SP-4"
        ],
        "medium": [
          "L.I.-11",
          "L.I.-10",
          "LU-5",
          "P-3",
          "HE-3",
          "SJ-10",
          "SI-8",
          "LU-3",
          "L.I.-14",
          "LU-4"
        ],
        "hard": [
          "L.I.-2",
          "L.I.-3",
          "L.I.-4",
          "LU-10",
          "LU-9",
          "SJ-3",
          "SJ-4",
          "SI-3",
          "P-8",
          "HE-8"
        ],
        "insane": [
          "LU-11",
          "SI-1",
          "SJ-1",
          "HE-9",
          "P-9",
          "ST-45",
          "SP-1",
          "BL-67",
          "GB-44",
          "LIV-1"
        ]
      }
    },
    {
      "point": "L.I.-2",
      "name": "Erjian",
      "difficulty_levels": {
        "easy": [
          "ST-36",
          "SP-6",
          "BL-40",
          "GB-34",
          "LIV-3",
          "KID-3",
          "ST-44",
          "SP-9",
          "GB-41",
          "BL-60"
        ],
        "medium": [
          "L.I.-5",
          "L.I.-6",
          "LU-9",
          "LU-7",
          "P-7",
          "HE-7",
          "SJ-4",
          "SI-5",
          "LU-8",
          "P-6"
        ],
        "hard": [
          "L.I.-4",
          "L.I.-5",
          "LU-9",
          "LU-10",
          "SJ-3",
          "SJ-4",
          "SI-3",
          "SI-4",
          "P-7",
          "HE-7"
        ],
        "insane": [
          "L.I.-3",
          "SJ-2",
          "SI-2",
          "LU-10",
          "P-8",
          "HE-8",
          "L.I.-1",
          "LU-11",
          "ST-44",
          "GB-43"
        ]
      }
    },
    {
      "point": "L.I.-3",
      "name": "Sanjian",
      "difficulty_levels": {
        "easy": [
          "ST-36",
          "SP-6",
          "BL-40",
          "GB-34",
          "LIV-3",
          "KID-3",
          "SP-9",
          "GB-41",
          "BL-60",
          "ST-41"
        ],
        "medium": [
          "L.I.-5",
          "L.I.-6",
          "LU-9",
          "LU-8",
          "P-7",
          "HE-7",
          "SJ-4",
          "SI-5",
          "P-6",
          "HE-6"
        ],
        "hard": [
          "L.I.-1",
          "L.I.-5",
          "LU-11",
          "LU-9",
          "SJ-2",
          "SJ-4",
          "SI-2",
          "SI-4",
          "P-9",
          "HE-9"
        ],
        "insane": [
          "L.I.-2",
          "SJ-3",
          "SI-3",
          "LU-10",
          "P-8",
          "HE-8",
          "L.I.-4",
          "ST-43",
          "GB-42",
          "BL-65"
        ]
      }
    },
    {
      "point": "L.I.-4",
      "name": "Hegu",
      "difficulty_levels": {
        "easy": [
          "ST-36",
          "SP-6",
          "BL-40",
          "GB-34",
          "LIV-3",
          "KID-3",
          "SP-9",
          "GB-41",
          "BL-60",
          "ST-41"
        ],
        "medium": [
          "L.I.-11",
          "L.I.-10",
          "LU-5",
          "P-3",
          "HE-3",
          "SJ-10",
          "SI-8",
          "LU-6",
          "P-4",
          "HE-4"
        ],
        "hard": [
          "L.I.-2",
          "L.I.-6",
          "LU-11",
          "LU-8",
          "SJ-2",
          "SJ-5",
          "SI-2",
          "SI-5",
          "P-9",
          "HE-6"
        ],
        "insane": [
          "Luozhen (M-UE-24)",
          "Baxie (M-UE-22)",
          "SJ-3",
          "SI-3",
          "L.I.-3",
          "LU-10",
          "P-8",
          "HE-8",
          "LIV-3",
          "ST-42"
        ]
      }
    },
    {
      "point": "L.I.-5",
      "name": "Yangxi",
      "difficulty_levels": {
        "easy": [
          "ST-36",
          "SP-6",
          "BL-40",
          "GB-34",
          "LIV-3",
          "KID-3",
          "SP-9",
          "GB-41",
          "BL-60",
          "ST-41"
        ],
        "medium": [
          "L.I.-11",
          "L.I.-10",
          "LU-5",
          "P-3",
          "HE-3",
          "SJ-10",
          "SI-8",
          "LU-6",
          "L.I.-9",
          "P-4"
        ],
        "hard": [
          "L.I.-3",
          "L.I.-7",
          "LU-10",
          "LU-6",
          "SJ-3",
          "SJ-6",
          "SI-3",
          "SI-6",
          "P-8",
          "HE-5"
        ],
        "insane": [
          "LU-9",
          "SJ-4",
          "SI-5",
          "P-7",
          "HE-7",
          "LU-8",
          "L.I.-4",
          "L.I.-6",
          "LU-7",
          "P-6"
        ]
      }
    },
    {
      "point": "L.I.-6",
      "name": "Pianli",
      "difficulty_levels": {
        "easy": [
          "ST-36",
          "SP-6",
          "BL-40",
          "GB-34",
          "LIV-3",
          "KID-3",
          "SP-9",
          "GB-41",
          "BL-60",
          "ST-41"
        ],
        "medium": [
          "L.I.-14",
          "L.I.-13",
          "LU-3",
          "P-2",
          "HE-2",
          "SJ-13",
          "SI-10",
          "LU-4",
          "P-1",
          "L.I.-15"
        ],
        "hard": [
          "L.I.-4",
          "L.I.-8",
          "LU-9",
          "LU-5",
          "SJ-4",
          "SJ-8",
          "SI-5",
          "SI-8",
          "P-7",
          "HE-4"
        ],
        "insane": [
          "SJ-7",
          "P-5",
          "SI-7",
          "HE-5",
          "LU-7",
          "L.I.-5",
          "L.I.-7",
          "SJ-5",
          "P-6",
          "HE-6"
        ]
      }
    },
    {
      "point": "L.I.-7",
      "name": "Wenliu",
      "difficulty_levels": {
        "easy": [
          "ST-36",
          "SP-6",
          "BL-40",
          "GB-34",
          "LIV-3",
          "KID-3",
          "SP-9",
          "GB-41",
          "BL-60",
          "ST-41"
        ],
        "medium": [
          "L.I.-14",
          "L.I.-13",
          "LU-3",
          "P-2",
          "HE-2",
          "SJ-13",
          "SI-10",
          "LU-4",
          "P-1",
          "L.I.-15"
        ],
        "hard": [
          "L.I.-5",
          "L.I.-9",
          "LU-8",
          "LU-5",
          "SJ-5",
          "SJ-9",
          "SI-6",
          "SI-8",
          "P-6",
          "HE-4"
        ],
        "insane": [
          "SI-7",
          "P-4",
          "HE-4",
          "SJ-9",
          "L.I.-6",
          "L.I.-8",
          "LU-6",
          "SJ-8",
          "P-5",
          "HE-5"
        ]
      }
    },
    {
      "point": "L.I.-8",
      "name": "Xialian",
      "difficulty_levels": {
        "easy": [
          "ST-36",
          "SP-6",
          "BL-40",
          "GB-34",
          "LIV-3",
          "KID-3",
          "SP-9",
          "GB-41",
          "BL-60",
          "ST-41"
        ],
        "medium": [
          "L.I.-5",
          "LU-9",
          "SJ-4",
          "SI-5",
          "P-7",
          "HE-7",
          "LU-8",
          "SJ-5",
          "P-6",
          "HE-6"
        ],
        "hard": [
          "L.I.-6",
          "L.I.-11",
          "LU-7",
          "LU-4",
          "SJ-6",
          "SJ-10",
          "SI-7",
          "SI-9",
          "P-5",
          "HE-3"
        ],
        "insane": [
          "ST-39",
          "SJ-8",
          "SI-6",
          "HE-4",
          "P-4",
          "L.I.-7",
          "L.I.-9",
          "L.I.-10",
          "LU-5",
          "SJ-9"
        ]
      }
    },
    {
      "point": "L.I.-9",
      "name": "Shanglian",
      "difficulty_levels": {
        "easy": [
          "ST-36",
          "SP-6",
          "BL-40",
          "GB-34",
          "LIV-3",
          "KID-3",
          "SP-9",
          "GB-41",
          "BL-60",
          "ST-41"
        ],
        "medium": [
          "L.I.-5",
          "LU-9",
          "SJ-4",
          "SI-5",
          "P-7",
          "HE-7",
          "LU-8",
          "SJ-5",
          "P-6",
          "HE-6"
        ],
        "hard": [
          "L.I.-7",
          "L.I.-11",
          "LU-6",
          "LU-4",
          "SJ-7",
          "SJ-10",
          "SI-8",
          "SI-9",
          "P-4",
          "HE-3"
        ],
        "insane": [
          "ST-37",
          "L.I.-10",
          "L.I.-8",
          "SJ-9",
          "SI-7",
          "LU-6",
          "P-5",
          "HE-5",
          "L.I.-11",
          "SJ-10"
        ]
      }
    },
    {
      "point": "L.I.-10",
      "name": "Shousanli",
      "difficulty_levels": {
        "easy": [
          "GB-34",
          "BL-40",
          "LIV-3",
          "KID-3",
          "SP-9",
          "GB-41",
          "BL-60",
          "ST-41",
          "BL-57",
          "GB-39"
        ],
        "medium": [
          "L.I.-5",
          "LU-9",
          "SJ-4",
          "SI-5",
          "P-7",
          "HE-7",
          "LU-8",
          "SJ-5",
          "P-6",
          "HE-6"
        ],
        "hard": [
          "L.I.-8",
          "L.I.-12",
          "LU-6",
          "LU-3",
          "SJ-8",
          "SJ-11",
          "SI-8",
          "SI-10",
          "P-4",
          "HE-2"
        ],
        "insane": [
          "ST-36",
          "L.I.-11",
          "L.I.-9",
          "LU-5",
          "SJ-10",
          "SI-8",
          "P-3",
          "HE-3",
          "L.I.-12",
          "LU-4"
        ]
      }
    },
    {
      "point": "L.I.-11",
      "name": "Quchi",
      "difficulty_levels": {
        "easy": [
          "ST-36",
          "SP-6",
          "BL-40",
          "GB-34",
          "LIV-3",
          "KID-3",
          "SP-9",
          "GB-41",
          "BL-60",
          "ST-41"
        ],
        "medium": [
          "L.I.-5",
          "LU-9",
          "SJ-4",
          "SI-5",
          "P-7",
          "HE-7",
          "LU-8",
          "SJ-5",
          "P-6",
          "HE-6"
        ],
        "hard": [
          "L.I.-9",
          "L.I.-13",
          "LU-6",
          "LU-3",
          "SJ-9",
          "SJ-11",
          "SI-7",
          "SI-9",
          "P-4",
          "HE-2"
        ],
        "insane": [
          "LU-5",
          "SJ-10",
          "SI-8",
          "HE-3",
          "P-3",
          "L.I.-10",
          "L.I.-12",
          "ST-35",
          "BL-40",
          "GB-34"
        ]
      }
    },
    {
      "point": "L.I.-12",
      "name": "Zhouliao",
      "difficulty_levels": {
        "easy": [
          "ST-36",
          "SP-6",
          "BL-40",
          "GB-34",
          "LIV-3",
          "KID-3",
          "SP-9",
          "GB-41",
          "BL-60",
          "ST-41"
        ],
        "medium": [
          "L.I.-5",
          "LU-9",
          "SJ-4",
          "SI-5",
          "P-7",
          "HE-7",
          "LU-8",
          "SJ-5",
          "P-6",
          "HE-6"
        ],
        "hard": [
          "L.I.-10",
          "L.I.-14",
          "LU-5",
          "LU-2",
          "SJ-9",
          "SJ-12",
          "SI-7",
          "SI-10",
          "P-4",
          "HE-1"
        ],
        "insane": [
          "L.I.-11",
          "SJ-11",
          "SJ-10",
          "LU-5",
          "SI-8",
          "L.I.-13",
          "LU-4",
          "HE-3",
          "P-3",
          "L.I.-10"
        ]
      }
    },
    {
      "point": "L.I.-13",
      "name": "Shouwuli",
      "difficulty_levels": {
        "easy": [
          "ST-36",
          "SP-6",
          "BL-40",
          "GB-34",
          "LIV-3",
          "KID-3",
          "SP-9",
          "GB-41",
          "BL-60",
          "ST-41"
        ],
        "medium": [
          "L.I.-5",
          "LU-9",
          "SJ-4",
          "SI-5",
          "P-7",
          "HE-7",
          "LU-8",
          "SJ-5",
          "P-6",
          "HE-6"
        ],
        "hard": [
          "L.I.-11",
          "L.I.-15",
          "LU-4",
          "LU-1",
          "SJ-10",
          "SJ-13",
          "SI-8",
          "SI-11",
          "P-3",
          "HE-1"
        ],
        "insane": [
          "LIV-10",
          "LU-4",
          "LU-3",
          "SJ-12",
          "SI-9",
          "L.I.-14",
          "L.I.-12",
          "P-2",
          "HE-2",
          "SJ-11"
        ]
      }
    },
    {
      "point": "L.I.-14",
      "name": "Binao",
      "difficulty_levels": {
        "easy": [
          "ST-36",
          "SP-6",
          "BL-40",
          "GB-34",
          "LIV-3",
          "KID-3",
          "SP-9",
          "GB-41",
          "BL-60",
          "ST-41"
        ],
        "medium": [
          "L.I.-10",
          "L.I.-9",
          "L.I.-8",
          "L.I.-7",
          "L.I.-6",
          "LU-6",
          "SJ-7",
          "SJ-8",
          "SI-7",
          "P-4"
        ],
        "hard": [
          "L.I.-12",
          "L.I.-16",
          "LU-3",
          "LU-1",
          "SJ-12",
          "SJ-15",
          "SI-9",
          "SI-12",
          "P-2",
          "HE-1"
        ],
        "insane": [
          "SJ-13",
          "LU-3",
          "SI-9",
          "SI-10",
          "L.I.-15",
          "L.I.-13",
          "GB-21",
          "SJ-14",
          "HE-1",
          "P-1"
        ]
      }
    },
    {
      "point": "L.I.-15",
      "name": "Jianyu",
      "difficulty_levels": {
        "easy": [
          "ST-36",
          "SP-6",
          "BL-40",
          "GB-34",
          "LIV-3",
          "KID-3",
          "SP-9",
          "GB-41",
          "BL-60",
          "ST-41"
        ],
        "medium": [
          "L.I.-10",
          "L.I.-9",
          "L.I.-8",
          "L.I.-7",
          "L.I.-6",
          "LU-6",
          "SJ-7",
          "SJ-8",
          "SI-7",
          "P-4"
        ],
        "hard": [
          "L.I.-13",
          "L.I.-17",
          "LU-2",
          "LU-1",
          "SJ-13",
          "SJ-16",
          "SI-10",
          "SI-13",
          "P-1",
          "HE-1"
        ],
        "insane": [
          "SJ-14",
          "Jianqian (M-UE-48)",
          "SI-9",
          "SI-10",
          "LU-2",
          "LU-1",
          "ST-38",
          "GB-21",
          "L.I.-16",
          "L.I.-14"
        ]
      }
    },
    {
      "point": "L.I.-16",
      "name": "Jugu",
      "difficulty_levels": {
        "easy": [
          "ST-36",
          "SP-6",
          "BL-40",
          "GB-34",
          "LIV-3",
          "KID-3",
          "SP-9",
          "GB-41",
          "BL-60",
          "ST-41"
        ],
        "medium": [
          "L.I.-10",
          "L.I.-9",
          "L.I.-8",
          "L.I.-7",
          "L.I.-6",
          "LU-6",
          "SJ-7",
          "SJ-8",
          "SI-7",
          "P-4"
        ],
        "hard": [
          "L.I.-14",
          "L.I.-18",
          "LU-1",
          "LU-2",
          "SJ-14",
          "SJ-17",
          "SI-11",
          "SI-14",
          "P-1",
          "HE-1"
        ],
        "insane": [
          "SJ-15",
          "SI-12",
          "ST-12",
          "GB-21",
          "SI-11",
          "L.I.-15",
          "L.I.-17",
          "DU-14",
          "BL-11",
          "SI-13"
        ]
      }
    },
    {
      "point": "L.I.-17",
      "name": "Tianding",
      "difficulty_levels": {
        "easy": [
          "ST-36",
          "SP-6",
          "BL-40",
          "GB-34",
          "LIV-3",
          "KID-3",
          "SP-9",
          "GB-41",
          "BL-60",
          "ST-41"
        ],
        "medium": [
          "L.I.-10",
          "L.I.-9",
          "L.I.-8",
          "L.I.-7",
          "L.I.-6",
          "LU-6",
          "SJ-7",
          "SJ-8",
          "SI-7",
          "P-4"
        ],
        "hard": [
          "L.I.-15",
          "L.I.-19",
          "ST-8",
          "ST-12",
          "SI-15",
          "SI-18",
          "SJ-15",
          "SJ-18",
          "GB-12",
          "GB-15"
        ],
        "insane": [
          "L.I.-18",
          "ST-9",
          "SI-16",
          "SJ-16",
          "ST-10",
          "REN-22",
          "ST-11",
          "SI-17",
          "GB-20",
          "L.I.-16"
        ]
      }
    },
    {
      "point": "L.I.-18",
      "name": "Futu",
      "difficulty_levels": {
        "easy": [
          "ST-36",
          "SP-6",
          "BL-40",
          "GB-34",
          "LIV-3",
          "KID-3",
          "SP-9",
          "GB-41",
          "BL-60",
          "ST-41"
        ],
        "medium": [
          "L.I.-10",
          "L.I.-9",
          "L.I.-8",
          "L.I.-7",
          "L.I.-6",
          "LU-6",
          "SJ-7",
          "SJ-8",
          "SI-7",
          "P-4"
        ],
        "hard": [
          "L.I.-16",
          "L.I.-20",
          "ST-8",
          "ST-12",
          "SI-15",
          "SI-18",
          "SJ-15",
          "SJ-18",
          "GB-12",
          "GB-15"
        ],
        "insane": [
          "ST-9",
          "SI-16",
          "L.I.-17",
          "SJ-16",
          "REN-22",
          "ST-10",
          "BL-10",
          "DU-16",
          "GB-20",
          "SI-17"
        ]
      }
    },
    {
      "point": "L.I.-19",
      "name": "Kouheliao",
      "difficulty_levels": {
        "easy": [
          "ST-36",
          "SP-6",
          "BL-40",
          "GB-34",
          "LIV-3",
          "KID-3",
          "SP-9",
          "GB-41",
          "BL-60",
          "ST-41"
        ],
        "medium": [
          "L.I.-10",
          "L.I.-9",
          "L.I.-8",
          "L.I.-7",
          "L.I.-6",
          "LU-6",
          "SJ-7",
          "SJ-8",
          "SI-7",
          "P-4"
        ],
        "hard": [
          "L.I.-17",
          "ST-5",
          "ST-7",
          "SI-17",
          "SI-19",
          "SJ-17",
          "SJ-20",
          "GB-2",
          "GB-5",
          "BL-2"
        ],
        "insane": [
          "DU-26",
          "L.I.-20",
          "ST-4",
          "ST-3",
          "Bitong (M-HN-14)",
          "REN-24",
          "DU-25",
          "DU-27",
          "SI-18",
          "GB-1"
        ]
      }
    },
    {
      "point": "L.I.-20",
      "name": "Yingxiang",
      "difficulty_levels": {
        "easy": [
          "ST-36",
          "SP-6",
          "BL-40",
          "GB-34",
          "LIV-3",
          "KID-3",
          "SP-9",
          "GB-41",
          "BL-60",
          "ST-41"
        ],
        "medium": [
          "L.I.-10",
          "L.I.-9",
          "L.I.-8",
          "L.I.-7",
          "L.I.-6",
          "LU-6",
          "SJ-7",
          "SJ-8",
          "SI-7",
          "P-4"
        ],
        "hard": [
          "L.I.-18",
          "ST-5",
          "ST-7",
          "SI-17",
          "SI-19",
          "SJ-17",
          "SJ-20",
          "GB-2",
          "GB-5",
          "BL-2"
        ],
        "insane": [
          "Bitong (M-HN-14)",
          "L.I.-19",
          "ST-3",
          "ST-4",
          "DU-26",
          "ST-2",
          "SI-18",
          "BL-1",
          "GB-1",
          "DU-25"
        ]
      }
    }
  ],
  "stomach_channel_quiz_distractors":[{"point":"ST-1","name":"Chengqi","difficulty_levels":{"easy":["LU-1","HT-9","PC-6","L.I.-4","SJ-5","SI-3","SP-6","KID-1","LIV-3","LU-7"],"medium":["GB-14","BL-2","SP-21","GB-20","BL-10","SP-9","GB-1","GB-15","BL-9","BL-1"],"hard":["ST-2","ST-3","ST-4","SI-18","GB-1","BL-1","BL-2","SJ-23","DU-26","REN-24"],"insane":["ST-2","BL-1","GB-1","ST-3","SI-18","M-HN-8","SJ-23","M-HN-6","BL-2","GB-14"]}},{"point":"ST-2","name":"Sibai","difficulty_levels":{"easy":["LU-5","PC-3","HT-7","L.I.-11","SI-8","SJ-10","SP-4","KID-3","LIV-8","LU-9"],"medium":["GB-2","BL-3","SP-10","GB-14","BL-11","SP-1","GB-21","GB-15","BL-12","BL-4"],"hard":["ST-1","ST-3","ST-4","SI-18","GB-1","BL-1","L.I.-20","GB-3","SJ-22","SJ-23"],"insane":["ST-1","ST-3","SI-18","L.I.-20","ST-4","BL-1","GB-1","BL-2","GB-14","DU-26"]}},{"point":"ST-3","name":"Juliao","difficulty_levels":{"easy":["LU-2","PC-5","HT-4","L.I.-15","SI-9","SJ-14","SP-5","KID-7","LIV-5","LU-10"],"medium":["GB-3","BL-4","SP-9","GB-15","BL-13","SP-2","GB-22","GB-16","BL-14","BL-5"],"hard":["ST-2","ST-4","L.I.-20","SI-18","GB-1","BL-1","BL-2","DU-26","REN-24","DU-27"],"insane":["ST-2","ST-4","L.I.-20","SI-18","L.I.-19","DU-26","REN-24","ST-1","GB-3","ST-7"]}},{"point":"ST-4","name":"Dicang","difficulty_levels":{"easy":["LU-3","PC-4","HT-3","L.I.-14","SI-10","SJ-13","SP-8","KID-10","LIV-6","LU-11"],"medium":["GB-4","BL-5","SP-15","GB-16","BL-15","SP-3","GB-23","GB-17","BL-16","BL-6"],"hard":["ST-3","ST-5","L.I.-20","DU-26","REN-24","ST-6","SI-18","DU-27","REN-23","SJ-21"],"insane":["L.I.-19","L.I.-20","ST-3","M-HN-18","REN-24","DU-26","SI-18","ST-5","ST-6","ST-7"]}},{"point":"ST-5","name":"Daying","difficulty_levels":{"easy":["LU-4","PC-2","HT-2","L.I.-13","SI-11","SJ-12","SP-12","KID-11","LIV-10","LU-6"],"medium":["GB-5","BL-6","SP-20","GB-17","BL-17","SP-11","GB-24","GB-18","BL-18","BL-7"],"hard":["ST-4","ST-6","ST-7","SI-17","L.I.-18","REN-23","REN-24","DU-26","L.I.-20","SJ-17"],"insane":["ST-6","ST-7","SI-17","SJ-17","GB-2","L.I.-18","ST-9","ST-4","SI-18","GB-3"]}},{"point":"ST-6","name":"Jiache","difficulty_levels":{"easy":["LU-6","PC-6","HT-5","L.I.-10","SI-6","SJ-7","SP-13","KID-12","LIV-11","LU-5"],"medium":["GB-6","BL-7","SP-21","GB-18","BL-19","SP-14","GB-25","GB-19","BL-20","BL-8"],"hard":["ST-5","ST-7","SJ-17","SI-17","L.I.-18","GB-2","SI-19","SJ-21","ST-8","L.I.-20"],"insane":["ST-5","ST-7","SI-17","SJ-17","GB-2","GB-3","SJ-21","SI-19","GB-12","ST-4"]}},{"point":"ST-7","name":"Xiaguan","difficulty_levels":{"easy":["LU-7","PC-7","HT-6","L.I.-11","SI-7","SJ-8","SP-14","KID-13","LIV-12","LU-4"],"medium":["GB-7","BL-8","SP-1","GB-19","BL-21","SP-15","GB-26","GB-20","BL-22","BL-9"],"hard":["ST-6","ST-8","GB-3","SI-19","SJ-21","GB-2","SJ-17","SI-18","L.I.-20","ST-5"],"insane":["GB-3","SI-19","SJ-21","GB-2","ST-6","ST-5","SJ-17","SI-18","ST-8","SJ-22"]}},{"point":"ST-8","name":"Touwei","difficulty_levels":{"easy":["LU-8","PC-8","HT-7","L.I.-4","SI-4","SJ-4","SP-15","KID-14","LIV-13","LU-3"],"medium":["GB-8","BL-9","SP-2","GB-20","BL-23","SP-16","GB-27","GB-21","BL-24","BL-10"],"hard":["GB-13","GB-14","GB-15","DU-24","BL-8","GB-4","GB-5","ST-7","SJ-22","SJ-20"],"insane":["GB-15","GB-13","GB-14","DU-24","BL-4","BL-3","GB-4","GB-5","GB-6","SJ-22"]}},{"point":"ST-9","name":"Renying","difficulty_levels":{"easy":["LU-9","PC-9","HT-8","L.I.-5","SI-5","SJ-5","SP-16","KID-15","LIV-14","LU-2"],"medium":["GB-9","BL-10","SP-3","GB-21","BL-25","SP-17","GB-28","GB-22","BL-26","BL-11"],"hard":["ST-10","L.I.-18","SI-16","SI-17","SJ-16","DU-15","BL-10","REN-23","REN-22","ST-11"],"insane":["L.I.-18","SI-16","SI-17","ST-10","ST-11","SJ-16","L.I.-17","REN-22","BL-10","GB-20"]}},{"point":"ST-10","name":"Shuitu","difficulty_levels":{"easy":["LU-10","PC-3","HT-9","L.I.-6","SI-6","SJ-6","SP-17","KID-16","LIV-1","LU-1"],"medium":["GB-10","BL-11","SP-4","GB-22","BL-27","SP-18","GB-29","GB-23","BL-28","BL-12"],"hard":["ST-9","ST-11","L.I.-17","SI-16","SJ-16","REN-22","REN-23","DU-14","BL-10","L.I.-18"],"insane":["ST-9","ST-11","L.I.-17","L.I.-18","SI-16","SJ-16","REN-22","REN-23","SI-17","L.I.-16"]}},{"point":"ST-11","name":"Qishe","difficulty_levels":{"easy":["LU-11","PC-4","HT-1","L.I.-7","SI-7","SJ-7","SP-18","KID-17","LIV-2","LU-5"],"medium":["GB-11","BL-12","SP-5","GB-23","BL-29","SP-19","GB-30","GB-24","BL-30","BL-13"],"hard":["ST-10","ST-12","REN-22","L.I.-17","SI-15","DU-14","BL-11","KID-27","ST-13","SP-21"],"insane":["ST-12","REN-22","KID-27","ST-10","L.I.-17","L.I.-16","SI-16","SJ-16","GB-21","BL-11"]}},{"point":"ST-12","name":"Quepen","difficulty_levels":{"easy":["LU-1","PC-5","HT-2","L.I.-8","SI-8","SJ-8","SP-19","KID-18","LIV-3","LU-6"],"medium":["GB-12","BL-13","SP-6","GB-24","BL-31","SP-20","GB-31","GB-25","BL-32","BL-14"],"hard":["ST-11","ST-13","LU-2","KID-27","L.I.-16","SI-12","SJ-15","GB-21","REN-22","BL-12"],"insane":["ST-11","ST-13","KID-27","LU-2","LU-1","L.I.-16","GB-21","SJ-15","SI-12","BL-12"]}},{"point":"ST-13","name":"Qihu","difficulty_levels":{"easy":["LU-2","PC-6","HT-3","L.I.-9","SI-9","SJ-9","SP-20","KID-19","LIV-4","LU-7"],"medium":["GB-13","BL-14","SP-7","GB-25","BL-33","SP-21","GB-32","GB-26","BL-34","BL-15"],"hard":["ST-12","ST-14","KID-26","REN-21","LU-1","LU-2","SP-20","BL-13","DU-12","KID-27"],"insane":["KID-26","REN-20","LU-1","ST-12","ST-14","ST-15","LU-2","SP-20","KID-27","SP-21"]}},{"point":"ST-14","name":"Kufang","difficulty_levels":{"easy":["LU-3","PC-7","HT-4","L.I.-10","SI-10","SJ-10","SP-21","KID-20","LIV-5","LU-8"],"medium":["GB-14","BL-15","SP-8","GB-26","BL-35","SP-1","GB-33","GB-27","BL-36","BL-16"],"hard":["ST-13","ST-15","KID-25","REN-20","LU-3","SP-19","BL-14","DU-11","KID-26","LU-2"],"insane":["KID-25","REN-19","SP-20","ST-13","ST-15","ST-16","KID-24","KID-26","LU-1","SP-21"]}},{"point":"ST-15","name":"Wuyi","difficulty_levels":{"easy":["LU-4","PC-8","HT-5","L.I.-11","SI-11","SJ-11","SP-1","KID-21","LIV-6","LU-9"],"medium":["GB-15","BL-16","SP-9","GB-27","BL-37","SP-2","GB-34","GB-28","BL-38","BL-17"],"hard":["ST-14","ST-16","KID-24","REN-19","SP-18","BL-15","DU-10","KID-25","LU-4","GB-22"],"insane":["KID-24","REN-18","SP-19","ST-14","ST-16","ST-17","KID-23","KID-25","SP-20","SP-18"]}},{"point":"ST-16","name":"Yingchuang","difficulty_levels":{"easy":["LU-5","PC-9","HT-6","L.I.-12","SI-12","SJ-12","SP-2","KID-22","LIV-7","LU-10"],"medium":["GB-16","BL-17","SP-10","GB-28","BL-39","SP-3","GB-35","GB-29","BL-40","BL-18"],"hard":["ST-15","ST-17","KID-23","REN-18","SP-17","BL-16","DU-9","KID-24","P-1","GB-23"],"insane":["KID-24","REN-18","SP-19","ST-15","ST-17","SP-18","SP-20","KID-23","KID-25","REN-17"]}},{"point":"ST-17","name":"Ruzhong","difficulty_levels":{"easy":["LU-6","PC-1","HT-7","L.I.-13","SI-13","SJ-13","SP-3","KID-23","LIV-8","LU-11"],"medium":["GB-17","BL-18","SP-11","GB-29","BL-41","SP-4","GB-36","GB-30","BL-42","BL-19"],"hard":["ST-16","ST-18","KID-22","REN-17","SP-16","BL-17","DU-8","KID-24","P-2","GB-24"],"insane":["KID-23","REN-17","SP-18","P-1","GB-22","GB-23","ST-16","ST-18","KID-22","KID-24"]}},{"point":"ST-18","name":"Rugen","difficulty_levels":{"easy":["LU-7","PC-2","HT-8","L.I.-14","SI-14","SJ-14","SP-4","KID-24","LIV-9","LU-1"],"medium":["GB-18","BL-19","SP-12","GB-30","BL-43","SP-5","GB-37","GB-31","BL-44","BL-20"],"hard":["ST-17","ST-19","KID-21","REN-16","SP-16","BL-18","DU-7","KID-22","P-3","GB-25"],"insane":["KID-22","REN-16","SP-17","GB-24","LIV-14","ST-17","ST-19","KID-21","KID-23","REN-15"]}},{"point":"ST-19","name":"Burong","difficulty_levels":{"easy":["LU-8","PC-3","HT-9","L.I.-15","SI-15","SJ-15","SP-5","KID-25","LIV-10","LU-2"],"medium":["GB-19","BL-20","SP-13","GB-31","BL-45","SP-6","GB-38","GB-32","BL-46","BL-21"],"hard":["ST-18","ST-20","KID-20","REN-14","SP-15","BL-19","DU-6","KID-21","LIV-14","GB-26"],"insane":["KID-21","REN-14","ST-20","ST-18","LIV-14","GB-24","REN-13","KID-20","KID-22","REN-15"]}},{"point":"ST-20","name":"Chengman","difficulty_levels":{"easy":["LU-9","PC-4","HT-1","L.I.-16","SI-16","SJ-16","SP-6","KID-26","LIV-11","LU-3"],"medium":["GB-20","BL-21","SP-14","GB-32","BL-47","SP-7","GB-39","GB-33","BL-48","BL-22"],"hard":["ST-19","ST-21","KID-19","REN-13","SP-15","BL-20","DU-5","KID-20","LIV-13","GB-27"],"insane":["REN-13","KID-20","ST-19","ST-21","KID-21","KID-19","REN-14","REN-12","ST-22","LIV-13"]}},{"point":"ST-21","name":"Liangmen","difficulty_levels":{"easy":["LU-10","PC-5","HT-2","L.I.-17","SI-17","SJ-17","SP-7","KID-27","LIV-12","LU-4"],"medium":["GB-21","BL-22","SP-15","GB-33","BL-49","SP-8","GB-40","GB-34","BL-50","BL-23"],"hard":["ST-20","ST-22","KID-18","REN-12","SP-16","BL-21","DU-4","KID-19","GB-28","SP-15"],"insane":["REN-12","KID-19","SP-15","SP-16","ST-20","ST-22","KID-18","KID-20","REN-13","REN-11"]}},{"point":"ST-22","name":"Guanmen","difficulty_levels":{"easy":["LU-11","PC-6","HT-3","L.I.-18","SI-18","SJ-18","SP-8","KID-1","LIV-13","LU-5"],"medium":["GB-22","BL-23","SP-16","GB-34","BL-51","SP-9","GB-41","GB-35","BL-52","BL-24"],"hard":["ST-21","ST-23","KID-17","REN-11","SP-15","BL-22","DU-3","KID-18","GB-29","SP-16"],"insane":["REN-11","KID-18","SP-16","ST-21","ST-23","KID-17","KID-19","REN-12","REN-10","LIV-13"]}},{"point":"ST-23","name":"Taiyi","difficulty_levels":{"easy":["LU-1","PC-7","HT-4","L.I.-19","SI-19","SJ-19","SP-9","KID-2","LIV-14","LU-6"],"medium":["GB-23","BL-24","SP-17","GB-35","BL-53","SP-10","GB-42","GB-36","BL-54","BL-25"],"hard":["ST-22","ST-24","KID-16","REN-10","SP-15","BL-23","DU-2","KID-17","GB-30","SP-16"],"insane":["KID-17","REN-10","ST-22","ST-24","REN-11","REN-9","KID-18","KID-16","SP-16","SP-15"]}},{"point":"ST-24","name":"Huaroumen","difficulty_levels":{"easy":["LU-2","PC-8","HT-5","L.I.-20","SI-1","SJ-20","SP-10","KID-3","LIV-1","LU-7"],"medium":["GB-24","BL-25","SP-18","GB-36","BL-55","SP-11","GB-43","GB-37","BL-56","BL-26"],"hard":["ST-23","ST-25","KID-15","REN-9","SP-15","BL-24","DU-1","KID-16","GB-31","SP-16"],"insane":["REN-9","ST-23","ST-25","REN-10","REN-8","KID-16","KID-17","SP-15","SP-16","ST-22"]}},{"point":"ST-25","name":"Tianshu","difficulty_levels":{"easy":["LU-3","PC-9","HT-6","L.I.-1","SI-2","SJ-21","SP-11","KID-4","LIV-2","LU-8"],"medium":["GB-25","BL-26","SP-19","GB-37","BL-57","SP-12","GB-44","GB-38","BL-58","BL-27"],"hard":["ST-24","ST-26","KID-16","REN-8","SP-15","BL-25","DU-4","KID-15","GB-26","SP-16"],"insane":["REN-8","KID-16","SP-15","GB-26","ST-24","ST-26","REN-7","REN-9","KID-15","KID-17"]}},{"point":"ST-26","name":"Wailing","difficulty_levels":{"easy":["LU-4","PC-1","HT-7","L.I.-2","SI-3","SJ-22","SP-12","KID-5","LIV-3","LU-9"],"medium":["GB-26","BL-27","SP-20","GB-38","BL-59","SP-13","GB-1","GB-39","BL-60","BL-28"],"hard":["ST-25","ST-27","KID-15","REN-7","SP-14","BL-26","DU-3","KID-14","GB-27","SP-15"],"insane":["REN-7","KID-15","ST-25","ST-27","SP-14","REN-8","REN-6","KID-16","KID-14","SP-15"]}},{"point":"ST-27","name":"Daju","difficulty_levels":{"easy":["LU-5","PC-2","HT-8","L.I.-3","SI-4","SJ-23","SP-13","KID-6","LIV-4","LU-10"],"medium":["GB-27","BL-28","SP-21","GB-39","BL-61","SP-14","GB-2","GB-40","BL-62","BL-29"],"hard":["ST-26","ST-28","KID-14","REN-5","SP-13","BL-27","DU-2","KID-13","GB-28","SP-14"],"insane":["REN-5","KID-14","ST-26","ST-28","REN-6","REN-4","KID-15","KID-13","SP-14","SP-13"]}},{"point":"ST-28","name":"Shuidao","difficulty_levels":{"easy":["LU-6","PC-3","HT-9","L.I.-4","SI-5","SJ-1","SP-14","KID-7","LIV-5","LU-11"],"medium":["GB-28","BL-29","SP-1","GB-40","BL-63","SP-15","GB-3","GB-41","BL-64","BL-30"],"hard":["ST-27","ST-29","KID-13","REN-4","SP-12","BL-28","DU-1","KID-12","GB-29","SP-13"],"insane":["REN-4","KID-13","SP-13","SP-12","ST-27","ST-29","REN-5","REN-3","KID-14","KID-12"]}},{"point":"ST-29","name":"Guilai","difficulty_levels":{"easy":["LU-7","PC-4","HT-1","L.I.-5","SI-6","SJ-2","SP-15","KID-8","LIV-6","LU-1"],"medium":["GB-29","BL-30","SP-2","GB-41","BL-65","SP-16","GB-4","GB-42","BL-66","BL-31"],"hard":["ST-28","ST-30","KID-12","REN-3","SP-11","BL-29","DU-1","KID-11","GB-30","SP-12"],"insane":["REN-3","KID-12","ST-28","ST-30","SP-12","REN-4","REN-2","KID-13","KID-11","M-CA-18"]}},{"point":"ST-30","name":"Qichong","difficulty_levels":{"easy":["LU-8","PC-5","HT-2","L.I.-6","SI-7","SJ-3","SP-16","KID-9","LIV-7","LU-2"],"medium":["GB-30","BL-31","SP-3","GB-42","BL-67","SP-17","GB-5","GB-43","BL-1","BL-32"],"hard":["ST-29","ST-31","KID-11","REN-2","SP-12","BL-30","DU-1","KID-12","GB-29","SP-11"],"insane":["REN-2","KID-11","SP-12","ST-29","REN-3","KID-12","LIV-12","LIV-11","ST-31","GB-27"]}},{"point":"ST-31","name":"Biguan","difficulty_levels":{"easy":["LU-9","PC-6","HT-3","L.I.-7","SI-8","SJ-4","SP-17","KID-10","LIV-8","LU-3"],"medium":["GB-31","BL-32","SP-4","GB-43","BL-2","SP-18","GB-6","GB-44","BL-3","BL-33"],"hard":["ST-30","ST-32","GB-31","BL-36","SP-11","GB-32","BL-37","KID-10","LIV-9","SP-10"],"insane":["GB-31","GB-32","ST-32","SP-11","LIV-10","LIV-11","ST-30","GB-29","BL-36","BL-54"]}},{"point":"ST-32","name":"Futu","difficulty_levels":{"easy":["LU-10","PC-7","HT-4","L.I.-8","SI-9","SJ-5","SP-18","KID-1","LIV-9","LU-4"],"medium":["GB-32","BL-33","SP-5","GB-44","BL-4","SP-19","GB-7","GB-1","BL-5","BL-34"],"hard":["ST-31","ST-33","GB-32","BL-37","SP-10","GB-33","BL-38","KID-10","LIV-8","SP-9"],"insane":["GB-31","SP-11","ST-31","ST-33","GB-32","LIV-9","SP-10","BL-37","ST-34","GB-33"]}},{"point":"ST-33","name":"Yinshi","difficulty_levels":{"easy":["LU-11","PC-8","HT-5","L.I.-9","SI-10","SJ-6","SP-19","KID-2","LIV-10","LU-5"],"medium":["GB-33","BL-34","SP-6","GB-1","BL-6","SP-20","GB-8","GB-2","BL-7","BL-35"],"hard":["ST-32","ST-34","GB-33","BL-38","SP-10","GB-34","BL-39","KID-10","LIV-8","SP-9"],"insane":["ST-34","SP-10","LIV-9","ST-32","GB-33","GB-32","BL-38","BL-39","ST-35","M-LE-16"]}},{"point":"ST-34","name":"Liangqiu","difficulty_levels":{"easy":["LU-1","PC-9","HT-6","L.I.-10","SI-11","SJ-7","SP-20","KID-3","LIV-11","LU-6"],"medium":["GB-34","BL-35","SP-7","GB-2","BL-8","SP-21","GB-9","GB-3","BL-9","BL-36"],"hard":["ST-33","ST-35","GB-33","BL-39","SP-10","GB-34","BL-40","KID-10","LIV-8","SP-9"],"insane":["SP-10","ST-33","ST-35","GB-33","LIV-9","SP-9","GB-34","ST-32","BL-39","M-LE-16"]}},{"point":"ST-35","name":"Dubi","difficulty_levels":{"easy":["LU-2","PC-1","HT-7","L.I.-11","SI-12","SJ-8","SP-21","KID-4","LIV-12","LU-7"],"medium":["GB-35","BL-36","SP-8","GB-3","BL-10","SP-1","GB-10","GB-4","BL-11","BL-37"],"hard":["ST-34","ST-36","GB-34","BL-40","SP-9","GB-35","BL-41","KID-10","LIV-7","SP-10"],"insane":["M-LE-16","GB-34","SP-9","LIV-8","KID-10","BL-40","BL-39","ST-34","ST-36","GB-33"]}},{"point":"ST-36","name":"Zusanli","difficulty_levels":{"easy":["LU-3","PC-2","HT-8","L.I.-12","SI-13","SJ-9","SP-1","KID-5","LIV-13","LU-8"],"medium":["GB-36","BL-37","SP-9","GB-4","BL-12","SP-2","GB-11","GB-5","BL-13","BL-38"],"hard":["ST-35","ST-37","GB-34","BL-41","SP-9","GB-35","BL-42","KID-10","LIV-7","SP-8"],"insane":["GB-34","SP-9","ST-37","ST-35","GB-35","BL-56","BL-57","ST-38","ST-39","M-LE-23"]}},{"point":"ST-37","name":"Shangjuxu","difficulty_levels":{"easy":["LU-4","PC-3","HT-9","L.I.-13","SI-14","SJ-10","SP-2","KID-6","LIV-14","LU-9"],"medium":["GB-37","BL-38","SP-10","GB-5","BL-14","SP-3","GB-12","GB-6","BL-15","BL-39"],"hard":["ST-36","ST-38","GB-36","BL-43","SP-8","GB-37","BL-44","KID-9","LIV-6","SP-7"],"insane":["ST-36","ST-38","ST-39","GB-36","GB-35","BL-57","SP-8","LIV-6","BL-56","M-LE-13"]}},{"point":"ST-38","name":"Tiaokou","difficulty_levels":{"easy":["LU-5","PC-4","HT-1","L.I.-14","SI-15","SJ-11","SP-3","KID-7","LIV-1","LU-10"],"medium":["GB-38","BL-39","SP-11","GB-6","BL-16","SP-4","GB-13","GB-7","BL-17","BL-40"],"hard":["ST-37","ST-39","ST-40","GB-37","BL-45","SP-7","GB-38","BL-46","KID-8","LIV-5"],"insane":["ST-40","ST-37","ST-39","GB-37","GB-38","BL-57","SP-7","LIV-5","KID-9","BL-58"]}},{"point":"ST-39","name":"Xiajuxu","difficulty_levels":{"easy":["LU-6","PC-5","HT-2","L.I.-15","SI-16","SJ-12","SP-4","KID-8","LIV-2","LU-11"],"medium":["GB-39","BL-40","SP-12","GB-7","BL-18","SP-5","GB-14","GB-8","BL-19","BL-41"],"hard":["ST-38","ST-40","GB-38","BL-47","SP-7","GB-39","BL-48","KID-8","LIV-5","SP-6"],"insane":["ST-38","ST-40","ST-37","GB-39","GB-38","BL-58","SP-6","LIV-5","KID-8","BL-59"]}},{"point":"ST-40","name":"Fenglong","difficulty_levels":{"easy":["LU-7","PC-6","HT-3","L.I.-16","SI-17","SJ-13","SP-5","KID-9","LIV-3","LU-1"],"medium":["GB-40","BL-41","SP-13","GB-8","BL-20","SP-6","GB-15","GB-9","BL-21","BL-42"],"hard":["ST-39","ST-41","ST-38","GB-38","BL-49","SP-7","GB-39","BL-50","KID-8","LIV-5"],"insane":["ST-38","ST-37","ST-39","GB-37","BL-57","BL-58","SP-7","LIV-5","KID-9","GB-36"]}},{"point":"ST-41","name":"Jiexi","difficulty_levels":{"easy":["LU-8","PC-7","HT-4","L.I.-17","SI-18","SJ-14","SP-6","KID-10","LIV-4","LU-2"],"medium":["GB-41","BL-42","SP-14","GB-9","BL-22","SP-7","GB-16","GB-10","BL-23","BL-43"],"hard":["ST-40","ST-42","GB-40","BL-60","SP-5","GB-41","BL-62","KID-3","LIV-4","SP-4"],"insane":["SP-5","GB-40","LIV-4","KID-3","BL-60","ST-42","ST-40","SP-4","GB-41","BL-62"]}},{"point":"ST-42","name":"Chongyang","difficulty_levels":{"easy":["LU-9","PC-8","HT-5","L.I.-18","SI-19","SJ-15","SP-7","KID-11","LIV-5","LU-3"],"medium":["GB-42","BL-43","SP-15","GB-10","BL-24","SP-8","GB-17","GB-11","BL-25","BL-44"],"hard":["ST-41","ST-43","GB-41","BL-63","SP-4","GB-42","BL-64","KID-2","LIV-3","SP-3"],"insane":["ST-43","ST-41","GB-41","GB-42","LIV-3","SP-4","SP-3","BL-64","BL-63","KID-2"]}},{"point":"ST-43","name":"Xiangu","difficulty_levels":{"easy":["LU-10","PC-9","HT-6","L.I.-19","SI-1","SJ-16","SP-8","KID-12","LIV-6","LU-4"],"medium":["GB-43","BL-44","SP-16","GB-11","BL-26","SP-9","GB-18","GB-12","BL-27","BL-45"],"hard":["ST-42","ST-44","GB-42","BL-65","SP-3","GB-43","BL-66","KID-2","LIV-2","SP-2"],"insane":["ST-44","ST-42","LIV-2","LIV-3","GB-43","GB-42","SP-3","BL-65","BL-66","KID-2"]}},{"point":"ST-44","name":"Neiting","difficulty_levels":{"easy":["LU-11","PC-1","HT-7","L.I.-20","SI-2","SJ-17","SP-9","KID-13","LIV-7","LU-5"],"medium":["GB-44","BL-45","SP-17","GB-12","BL-28","SP-10","GB-19","GB-13","BL-29","BL-46"],"hard":["ST-43","ST-45","GB-43","BL-66","SP-2","GB-44","BL-67","KID-2","LIV-2","SP-1"],"insane":["ST-43","ST-45","LIV-2","GB-43","BL-66","SP-2","M-LE-8","GB-44","LIV-1","ST-42"]}},{"point":"ST-45","name":"Lidui","difficulty_levels":{"easy":["LU-1","PC-2","HT-8","L.I.-1","SI-3","SJ-18","SP-10","KID-14","LIV-8","LU-6"],"medium":["GB-1","BL-46","SP-18","GB-13","BL-30","SP-11","GB-20","GB-14","BL-31","BL-47"],"hard":["ST-44","GB-44","BL-67","SP-1","LIV-1","KID-1","GB-43","BL-66","SP-2","LIV-2"],"insane":["ST-44","LIV-1","GB-44","SP-1","BL-67","KID-1","M-LE-8","ST-43","LIV-2","GB-43"]}}]


};

// Flatten the data so the main app can look up any point instantly
const hardcodedDistractors = {};
Object.keys(rawDistractorJSON).forEach(channelKey => {
  rawDistractorJSON[channelKey].forEach(item => {
    hardcodedDistractors[item.point] = item.difficulty_levels;
  });
});
