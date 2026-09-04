const TCM_SEMANTIC_MAP = {
  // --- Pathological Qualities (Adjectives to TCM Pathogens) ---
  "heavy": "dampness",
  "sluggish": "dampness",
  "sticky": "dampness",
  "sharp": "stasis",
  "stabbing": "stasis",
  "fixed": "stasis",
  "burning": "heat",
  "dry mouth": "dryness",
  "thirsty": "dryness",
  "exhausted": "deficiency",
  "fatigued": "deficiency",
  "weak": "deficiency",
  "tired": "deficiency",

  // --- Sleep & Shen (Heart / Mind Orifice) ---
  "trouble sleeping": "insomnia",
  "can't sleep": "insomnia",
  "waking up": "insomnia",
  "tossing and turning": "insomnia",
  "vivid dreams": "dream-disturbed",
  "nightmares": "dream-disturbed",
  "racing heart": "palpitations",
  "fluttering in chest": "palpitations",
  "pounding chest": "palpitations",
  "forgets things": "memory",
  "poor memory": "memory",
  "easily startled": "startled",
  "restless": "fidgetiness",
  "anxious": "uneasiness",
  "talking to oneself": "muttering",

  // --- Moods & Emotional Pathogens ---
  "mad": "anger",
  "frustrated": "anger",
  "irritability": "anger",
  "short temper": "anger",
  "stressed": "anger",
  "sad": "sadness",
  "grieving": "grief",
  "depressed": "depression",
  "mood swings": "swings",
  "worrying": "worry",
  "overthinking": "pensiveness",
  "scared": "fear",
  "frightened": "shock",

  // --- Respiratory & Qi Descent (Lung / Gathering Qi) ---
  "coughing": "cough",
  "hacking": "cough",
  "short of breath": "breathlessness",
  "can't catch breath": "breathlessness",
  "gasping": "breathlessness",
  "wheezing": "wheezing",
  "congested": "phlegm",
  "runny nose": "runny",
  "stuffy nose": "nose",
  "post-nasal drip": "nose",
  "sore throat": "throat",

  // --- Digestion & Fluid Transformation (Spleen / Stomach / Middle Jiao) ---
  "no appetite": "appetite",
  "not hungry": "appetite",
  "bloated": "bloating",
  "belly fullness": "bloating",
  "gas": "gas",
  "farting": "gas",
  "burping": "belching",
  "acid reflux": "reflux",
  "heartburn": "reflux",
  "nauseous": "nausea",
  "throwing up": "vomiting",
  "loose stools": "diarrhoea",
  "diarrhea": "diarrhoea",
  "constipated": "constipation",
  "can't poop": "constipation",
  "craving sweets": "pensiveness", // Pensive/Worrying Spleen state seeking Sweet Earth flavor
  "bruises easily": "bruising",    // Spleen Qi failing to hold Blood in vessels

  // --- Urinary & Kidney Essence (Kidney / Bladder / Lower Jiao) ---
  "waking up to pee": "nocturia",
  "night peeing": "nocturia",
  "leaking pee": "dribbling",
  "can't hold it": "incontinence",
  "bedwetting": "enuresis",
  "puffy ankles": "edema",
  "swelling": "edema",
  "low sex drive": "libido",
  "impotent": "impotence",

  // --- Pain & Musculoskeletal (Sinews / Bones / Channels) ---
  "head hurts": "headache",
  "migraine": "headache",
  "lower back hurts": "backache",
  "sore back": "backache",
  "weak knees": "knees",
  "sore knees": "knees",
  "stiff joints": "sinews",
  "muscle cramps": "cramps",
  "muscle spasms": "spasms",
  "twitching": "tremor",
  "hip pain": "pain",

  // --- Temperature & Sweat (Yin/Yang Homeostasis) ---
  "chills": "chills",
  "feeling cold": "chills",
  "running hot": "fever",
  "feverish": "fever",
  "night sweats": "sweat",        // Maps to empty-heat sweating patterns
  "sweating at night": "sweat",
  "hot flashes": "heat",
  "red cheeks": "malar",         // Represents "malar flush" seen in Yin Deficient Empty-Heat

  // --- Senses & Openings (Zang Fu Sensory Outlets) ---
  "ringing in ears": "tinnitus",
  "buzzing in ears": "tinnitus",
  "dry eyes": "eyes",
  "watery eyes": "tears",
  "dizzy": "vertigo",
  "lightheaded": "vertigo",
  "hearing loss": "deafness",
  
  // --- Normalize Pathogens to Root Words ---
  "phlegmy": "phlegm",
  "deficient": "deficiency",
  "stagnant": "stagnation",

  // --- Western Medical Terms to TCM Pathology ---
  "fatty lump": "lipoma phlegm nodule",
  "fatty tumor": "lipoma phlegm nodule",
  "fatty cyst": "lipoma phlegm nodule",
  "ganglion cyst": "nodule phlegm",
  "lipoma": "lipoma phlegm nodule",           
  "varicose vein": "blood stasis vessels",    
  "varicose": "stasis",
  
    // --- Modern Gynecology & Women's Health ---
  "pcos": "phlegm dampness",
  "endometriosis": "blood stasis",
  "fibroids": "stasis nodule",
  "pms": "stagnation swings irritability",
  "pmdd": "stagnation swings irritability depression",
  "hot flashes": "heat sweat deficiency", 
  "night sweats": "sweat deficiency",
  "yeast infection": "damp heat discharges",
  "uti": "damp heat burning urination", // Translates Urinary Tract Infection

  // --- Modern Gastrointestinal ---
  "gerd": "reflux rebellious",
  "acid reflux": "reflux rebellious",
  "ibs": "diarrhoea constipation cramps", 
  "leaky gut": "deficiency diarrhoea fatigue",
  "crohns": "damp heat diarrhoea blood",
  "ulcerative colitis": "damp heat diarrhoea blood",
  "hemorrhoids": "prolapse blood stasis",

  // --- Neuro, Mood & Fatigue ---
  "brain fog": "phlegm misting memory",
  "panic attack": "palpitations fear breathlessness",
  "chronic fatigue": "deficiency exhausted",
  "fibromyalgia": "pain stasis stagnation",
  "neuropathy": "stasis deficiency tingling", // You may want to add "tingling" or "numbness" to your keywords
  "adhd": "fidgetiness memory restlessness",
  "insomnia": "insomnia", // Just to catch it if they say "I have insomnia"

  // --- Modern Slang & Colloquialisms ---
  "hangry": "anger hunger", 
  "meat sweats": "sweat heat",
  "butterflies in stomach": "palpitations uneasiness",
  "run down": "deficiency exhausted",
  "tossed and turned": "insomnia restlessness",
  "scalloped tongue": "toothmarked",
  "fast pulse": "rapid",
  "thick coat": "greasy"

  
  
  
};
