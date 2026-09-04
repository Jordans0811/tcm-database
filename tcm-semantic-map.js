const TCM_SEMANTIC_MAP = {

//---The Formula: ⁠[Standard Symptom] + [Zang-Fu Organ] + [8-Principle/Pathogen]⁠ ---

   // --- The Energy & Fatigue Cluster ---
  "exhausted": "fatigue exhaustion weakness deficiency tired tiredness",
  "fatigued": "fatigue exhaustion weakness deficiency tired tiredness",
  "fatigue": "fatigue exhaustion weakness deficiency tired tiredness",
  "exhaustion": "fatigue exhaustion weakness deficiency tired tiredness",
  "weakness": "fatigue exhaustion weakness deficiency tired tiredness",
  "weak": "fatigue exhaustion weakness deficiency tired tiredness",
  "tired": "fatigue exhaustion weakness deficiency tired tiredness",
  "tiredness": "fatigue exhaustion weakness deficiency tired tiredness",
  "napping": "fatigue exhaustion weakness deficiency tired tiredness",
  "lack of energy": "fatigue exhaustion weakness deficiency tired tiredness",
  "low energy": "fatigue exhaustion weakness deficiency tired tiredness",
  "no energy": "fatigue exhaustion weakness deficiency tired tiredness",
  "run down": "fatigue exhaustion weakness deficiency tired tiredness",
  "lethargic": "fatigue exhaustion weakness deficiency tired tiredness",
  "sluggish": "fatigue exhaustion weakness deficiency tired tiredness dampness",




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

  // --- Moods & Emotional Pathogens (The Additive Clusters) ---
  "irritability": "irritability anger frustration liver fire",
  "irritated": "irritability anger frustration liver fire",
  "frustration": "irritability anger frustration liver fire",
  "frustrated": "irritability anger frustration liver fire",
  
  "mad": "anger irritability liver fire",
  "short temper": "anger irritability liver fire",
  "stressed": "anger irritability liver fire stagnation",
  
  "sad": "sadness grief lung",
  "depressed": "depression melancholy stagnation liver",


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
  "constipated": "constipation",
  "can't poop": "constipation",
  "craving sweets": "pensiveness", // Pensive/Worrying Spleen state seeking Sweet Earth flavor
  "bruises easily": "bruising",    // Spleen Qi failing to hold Blood in vessels
  
    // --- The Diarrhea Cluster ---
  "diarrhea": "diarrhea diarrhoea loose stool",
  "diarrhoea": "diarrhea diarrhoea loose stool",
  "loose stools": "diarrhea diarrhoea loose stool",
  "loose stool": "diarrhea diarrhoea loose stool",
  "the runs": "diarrhea diarrhoea loose stool",


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
  "thick coat": "greasy",

  // --- Pulse Topography to Zang-Fu ---
  "left cun": "heart",
  "right cun": "lung",
  "cun pulse": "heart lung",
  "cun position": "heart lung",
  "left guan": "liver",
  "right guan": "spleen",
  "guan pulse": "liver spleen",
  "guan position": "liver spleen",
  "chi pulse": "kidney",
  "chi position": "kidney",
  "chi": "kidney", 

  // --- Tongue Topography to Zang-Fu ---
  "tongue tip": "heart",
  "tip of tongue": "heart",
  "tongue sides": "liver gallbladder",
  "sides of tongue": "liver gallbladder",
  "center of tongue": "spleen stomach",
  "tongue root": "kidney",
  "back of tongue": "kidney",
  "front of tongue": "lung heart",
  
    // --- Pain Qualities to Pathogens (The 8 Principles) ---
  "dull pain": "pain deficiency",
  "lingering pain": "pain deficiency",
  "stabbing pain": "pain blood stasis",
  "sharp pain": "pain blood stasis",
  "wandering pain": "pain wind",
  "moving pain": "pain wind",
  "distending pain": "pain qi stagnation",
  "bloating pain": "pain qi stagnation",
  "severe pain": "pain cold excess",
  "cramping pain": "cramp cold",
  "burning pain": "pain heat",


  // --- Phlegm & Mucus ---
  "yellow phlegm": "phlegm heat",
  "green phlegm": "phlegm heat",
  "white phlegm": "phlegm cold",
  "clear phlegm": "phlegm cold",
  "watery phlegm": "phlegm dampness",
  "dry phlegm": "phlegm dryness",
  "sticky phlegm": "phlegm dampness",

  // --- Urine ---
  "dark urine": "urine heat",
  "yellow urine": "urine heat",
  "clear urine": "urine cold deficiency",
  "profuse urine": "urine cold deficiency",
  "scanty urine": "urine heat",
  "cloudy urine": "urine dampness",

  // --- Menstruation ---
  "dark blood": "blood heat",
  "pale blood": "blood deficiency",
  "purple clots": "blood stasis",
  "dark clots": "blood stasis",

  // --- Tongue Body & Coat Combinations ---
  "red tongue yellow coat": "heat excess",
  "red tongue no coat": "yin deficiency heat",
  "red and peeled": "yin deficiency",
  "pale tongue white coat": "qi blood deficiency cold",
  "pale and wet": "yang deficiency dampness",
  "purple spots": "blood stasis",
  "dark sublinguals": "blood stasis",
  "scalloped edges": "toothmarked spleen qi deficiency",
  "greasy yellow": "damp heat",
  "greasy white": "damp cold",
  "thick yellow coat": "damp heat",
  "thick white coat": "damp cold",

  // --- Classical Pulse Combinations ---
  "wiry and rapid": "wiry rapid liver heat",
  "wiry rapid": "wiry rapid liver heat",
  "floating and tight": "floating tight wind cold",
  "floating and rapid": "floating rapid wind heat",
  "deep and weak": "deep weak kidney yang deficiency",
  "deep and fine": "deep fine yin deficiency",
  "slippery and rapid": "slippery rapid damp heat phlegm",
  "thready and rapid": "fine rapid yin deficiency", // 'thready' translates to the standard keyword 'fine'

    // --- Classical Pulse Combinations ---
  "wiry and rapid": "wiry rapid liver heat",
  "wiry rapid": "wiry rapid liver heat",
  "floating and tight": "floating tight wind cold",
  "floating and rapid": "floating rapid wind heat",
  "deep and weak": "deep weak kidney yang deficiency",
  "deep and fine": "deep fine yin deficiency",
  "slippery and rapid": "slippery rapid damp heat phlegm",
  "thready and rapid": "fine rapid yin deficiency" 
};
