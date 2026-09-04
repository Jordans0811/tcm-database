// tcm-lexicon.js
// LAYER 1: Lexical Normalization
// Maps raw human text to a standardized Concept ID (CID).

// Each phrase appears once; for conflicting duplicate phrases, the final effective mapping was retained.
const TCM_LEXICON = {
  "irritated easily": "C_IRRITABILITY",
  "irritated": "C_IRRITABILITY",
  "getting on my nerves": "C_IRRITABILITY",
  "mad": "C_ANGER",
  "angry": "C_ANGER",
  "anger": "C_ANGER",
  "chest feels tight": "C_CHEST_TIGHTNESS",
  "chest tightness": "C_CHEST_TIGHTNESS",
  "stressed": "C_STRESS",
  "stress": "C_STRESS",
  
  // Poor Appetite
  "poor appetite": "C_POOR_APPETITE",
  "no appetite": "C_POOR_APPETITE",
  "loss of appetite": "C_POOR_APPETITE",
  "disinterest in food": "C_POOR_APPETITE",

  // Abdominal Distension
  "slight abdominal distension after eating": "C_ABDOMINAL_DISTENSION",
  "abdominal distension": "C_ABDOMINAL_DISTENSION",
  "bloating after meals": "C_ABDOMINAL_DISTENSION",
  "postprandial bloating": "C_ABDOMINAL_DISTENSION",

  // Tiredness
  "tiredness": "C_TIREDNESS",
  "lassitude": "C_TIREDNESS",
  "desire to lie down": "C_TIREDNESS",
  "extreme fatigue": "C_TIREDNESS",

  // Weak Limbs
  "weakness of the limbs": "C_WEAK_LIMBS",
  "weak limbs": "C_WEAK_LIMBS",
  "weary limbs": "C_WEAK_LIMBS",
  "loss of strength in arms and legs": "C_WEAK_LIMBS",

  // Loose Stools
  "loose stools": "C_LOOSE_STOOLS",
  "watery stools": "C_LOOSE_STOOLS",
  "diarrhoea": "C_LOOSE_STOOLS",
  "soft bowel movements": "C_LOOSE_STOOLS",

  // Complexions
  "pale complexion": "C_PALE_COMPLEXION",
  "pale sallow complexion": "C_PALE_COMPLEXION",
  "dull-pale complexion": "C_PALE_COMPLEXION",
  "pale face": "C_PALE_COMPLEXION",

  // Cold Sensations
  "chilliness": "C_FEELING_COLD",
  "cold feeling in back": "C_FEELING_COLD",
  "sensitive to cold": "C_FEELING_COLD",
  "cold arms and legs": "C_COLD_LIMBS",
  // Oedema
  "oedema": "C_OEDEMA",
  "swelling of ankles": "C_OEDEMA",
  "water retention": "C_OEDEMA",
  "puffiness": "C_OEDEMA",

  // Bearing Down Sensation
  "bearing down": "C_BEARING_DOWN_SENSATION",
  "bearing-down sensation": "C_BEARING_DOWN_SENSATION",
  "bearing-down sensation in the abdomen": "C_BEARING_DOWN_SENSATION",
  "dragging feeling in abdomen": "C_BEARING_DOWN_SENSATION",

  // Organ Prolapse
  "prolapse of organs": "C_ORGAN_PROLAPSE",
  "prolapse": "C_ORGAN_PROLAPSE",
  "organ prolapse": "C_ORGAN_PROLAPSE",
  "prolapse of uterus": "C_ORGAN_PROLAPSE",
  "stomach prolapse": "C_ORGAN_PROLAPSE",

  // Depression
  "low spirits": "C_MENTAL_DEPRESSION",
  "feeling downcast": "C_MENTAL_DEPRESSION",

  // Urinary Symptoms
  "frequency and urgency of urination": "C_URINARY_FREQUENCY_URGENCY",
  "frequent clear urination": "C_URINARY_FREQUENCY_URGENCY",
  "urinary frequency": "C_URINARY_FREQUENCY_URGENCY",
  "nocturnal urination": "C_URINARY_FREQUENCY_URGENCY",

  // Blood Spots
  "blood spots under the skin": "C_BLOOD_SPOTS_UNDER_SKIN",
  "spots under skin": "C_BLOOD_SPOTS_UNDER_SKIN",
  "easy bruising": "C_BLOOD_SPOTS_UNDER_SKIN",

  // Bleeding Outlets
  "blood in the urine or stools": "C_BLOOD_IN_URINE_OR_STOOLS",
  "bleeding in urine": "C_BLOOD_IN_URINE_OR_STOOLS",
  "blood in stools": "C_BLOOD_IN_URINE_OR_STOOLS",
  "blood in feces": "C_BLOOD_IN_URINE_OR_STOOLS",

  "excessive uterine bleeding": "C_EXCESSIVE_UTERINE_BLEEDING",
  "excessive menstrual bleeding": "C_EXCESSIVE_UTERINE_BLEEDING",
  "heavy bleeding during period": "C_EXCESSIVE_UTERINE_BLEEDING",

  // Blood Deficiency Signs
  "thin body": "C_THIN_BODY",
  "emaciated body": "C_THIN_BODY",
  "slender build": "C_THIN_BODY",
  "weight loss": "C_THIN_BODY",

  "scanty periods or amenorrhoea": "C_SCANTY_PERIODS_AMENORRHOEA",
  "scanty periods": "C_SCANTY_PERIODS_AMENORRHOEA",
  "light periods": "C_SCANTY_PERIODS_AMENORRHOEA",
  "trouble sleeping": "C_INSOMNIA",
  "sleeplessness": "C_INSOMNIA",
  "poor sleep quality": "C_INSOMNIA",

  // Atomic Tongue Lexicon
  "light-red tongue": "C_PALE_TONGUE",
  "moist tongue": "C_WET_TONGUE",
"arid tongue": "C_DRY_TONGUE",

  // Atomic Pulse Lexicon
 "weak pulse": "C_WEAK_PULSE",
  "feeble pulse": "C_WEAK_PULSE",
"fullness": "C_EPIGASTRIC_ABDOMINAL_FULLNESS",
  "abdominal fullness": "C_EPIGASTRIC_ABDOMINAL_FULLNESS",
  "epigastric fullness": "C_EPIGASTRIC_ABDOMINAL_FULLNESS",
  "bloated belly": "C_EPIGASTRIC_ABDOMINAL_FULLNESS",

  "epigastric cold": "C_EPIGASTRIC_COLD_SENSATION",
  "stomach coldness": "C_EPIGASTRIC_COLD_SENSATION",
  "cold in epigastrium": "C_EPIGASTRIC_COLD_SENSATION",
  "chilled stomach": "C_EPIGASTRIC_COLD_SENSATION",

  "heaviness": "C_FEELING_OF_HEAVINESS",
  "heavy feeling": "C_FEELING_OF_HEAVINESS",
  "heaviness of head and body": "C_FEELING_OF_HEAVINESS",
  "body feels heavy": "C_FEELING_OF_HEAVINESS",

  "sweetish taste": "C_TASTE_ALTERATION_SPLEEN",
  "absence of taste": "C_TASTE_ALTERATION_SPLEEN",
  "no taste": "C_TASTE_ALTERATION_SPLEEN",
  "sweet taste": "C_TASTE_ALTERATION_SPLEEN",

  "no thirst": "C_NO_THIRST",
  "not thirsty": "C_NO_THIRST",
  "lack of thirst": "C_NO_THIRST",
  "never thirsty": "C_NO_THIRST",

  "nausea": "C_NAUSEA_VOMITING",
  "vomiting": "C_NAUSEA_VOMITING",
  "throwing up": "C_NAUSEA_VOMITING",
  "feeling sick": "C_NAUSEA_VOMITING",

  "vaginal discharge": "C_WHITE_VAGINAL_DISCHARGE",
  "white discharge": "C_WHITE_VAGINAL_DISCHARGE",
  "excessive white vaginal discharge": "C_WHITE_VAGINAL_DISCHARGE",
  "leucorrhoea": "C_WHITE_VAGINAL_DISCHARGE",

  "abdominal pain": "C_ABDOMINAL_PAIN",
  "stomach ache": "C_ABDOMINAL_PAIN",
  "belly pain": "C_ABDOMINAL_PAIN",
  "gut cramps": "C_ABDOMINAL_PAIN",

  "thirst without desire to drink": "C_THIRST_NO_DESIRE_TO_DRINK",
  "thirsty but cannot drink": "C_THIRST_NO_DESIRE_TO_DRINK",
  "thirsty but no urge to swallow": "C_THIRST_NO_DESIRE_TO_DRINK",
  "dry mouth but don't want water": "C_THIRST_NO_DESIRE_TO_DRINK",

  "smelly loose stools": "C_LOOSE_STOOLS_WITH_ODOUR",
  "loose stools with offensive odour": "C_LOOSE_STOOLS_WITH_ODOUR",
  "foul-smelling diarrhea": "C_LOOSE_STOOLS_WITH_ODOUR",
  "stinky loose stools": "C_LOOSE_STOOLS_WITH_ODOUR",

  "burning anus": "C_BURNING_ANUS",
  "burning sensation in anus": "C_BURNING_ANUS",
  "hot anus when passing stool": "C_BURNING_ANUS",
  "fiery back passage": "C_BURNING_ANUS",

  "feeling of heat": "C_FEELING_OF_HEAT",
  "running hot": "C_FEELING_OF_HEAT",
  "feeling warm": "C_FEELING_OF_HEAT",
  "heat sensation": "C_FEELING_OF_HEAT",

  "dark urine": "C_SCANTY_DARK_URINE",
  "scanty dark urine": "C_SCANTY_DARK_URINE",
  "concentrated pee": "C_SCANTY_DARK_URINE",
  "infrequent dark urination": "C_SCANTY_DARK_URINE",

  "low-grade fever": "C_LOW_GRADE_FEVER",
  "slight fever": "C_LOW_GRADE_FEVER",
  "mild constant temperature": "C_LOW_GRADE_FEVER",
  "low fever": "C_LOW_GRADE_FEVER",

  "yellow face": "C_DULL_YELLOW_COMPLEXION",
  "dull-yellow complexion": "C_DULL_YELLOW_COMPLEXION",
  "tangerine skin complexion": "C_DULL_YELLOW_COMPLEXION",
  "yellowish sallow face": "C_DULL_YELLOW_COMPLEXION",

  "yellow eyes": "C_YELLOW_SCLERA",
  "yellow sclera": "C_YELLOW_SCLERA",
  "yellowing of eye whites": "C_YELLOW_SCLERA",
  "jaundiced eyes": "C_YELLOW_SCLERA",

  "oily sweat": "C_OILY_SWEAT",
  "greasy perspiration": "C_OILY_SWEAT",
  "sticky sweat": "C_OILY_SWEAT",
  "greasy sweat": "C_OILY_SWEAT",

  "bitter taste": "C_BITTER_TASTE",
  "bitter mouth": "C_BITTER_TASTE",
  "taste of bile": "C_BITTER_TASTE",
  "bitterness in mouth": "C_BITTER_TASTE",

  "itchy skin": "C_SKIN_ERUPTIONS",
  "skin rash": "C_SKIN_ERUPTIONS",
  "papules": "C_SKIN_ERUPTIONS",
  "vesicles": "C_SKIN_ERUPTIONS",

  "palpitations": "C_PALPITATIONS",
  "heart racing": "C_PALPITATIONS",
  "fluttering chest": "C_PALPITATIONS",
  "heart pounding": "C_PALPITATIONS",
  "giddy": "C_DIZZINESS",
  "feeling dizzy": "C_DIZZINESS",

  "poor memory": "C_POOR_MEMORY",
  "forgetful": "C_POOR_MEMORY",
  "bad memory": "C_POOR_MEMORY",
  "forgetfulness": "C_POOR_MEMORY",
  "anxious": "C_ANXIETY",
  "nervousness": "C_ANXIETY",
  "startled easily": "C_PROPENSITY_TO_BE_STARTLED",
  "propensity to be startled": "C_PROPENSITY_TO_BE_STARTLED",
  "jumpy": "C_PROPENSITY_TO_BE_STARTLED",
  "startling at small noises": "C_PROPENSITY_TO_BE_STARTLED",

  "obesity": "C_OBESITY_TENDENCY",
  "tendency to obesity": "C_OBESITY_TENDENCY",
  "easy weight gain": "C_OBESITY_TENDENCY",
  "getting fat easily": "C_OBESITY_TENDENCY",

  "breathless": "C_BREATHLESSNESS",
  "short of breath": "C_BREATHLESSNESS",
  "shortness of breath": "C_BREATHLESSNESS",
  "winded easily": "C_BREATHLESSNESS",

  "cough": "C_COUGH",
  "slight cough": "C_COUGH",
  "coughing fits": "C_COUGH",
  "coughing up": "C_COUGH",

  "daytime sweating": "C_SPONTANEOUS_SWEATING",
  "spontaneous sweating": "C_SPONTANEOUS_SWEATING",
  "sweating for no reason": "C_SPONTANEOUS_SWEATING",
  "unprovoked sweating": "C_SPONTANEOUS_SWEATING",

  "catch colds easily": "C_PROPENSITY_TO_CATCH_COLDS",
  "frequent colds": "C_PROPENSITY_TO_CATCH_COLDS",
  "propensity to catch colds": "C_PROPENSITY_TO_CATCH_COLDS",
  "weak immune system": "C_PROPENSITY_TO_CATCH_COLDS",

  "numbness": "C_NUMBNESS_TINGLING_LIMBS",
  "tingling": "C_NUMBNESS_TINGLING_LIMBS",
  "pins and needles": "C_NUMBNESS_TINGLING_LIMBS",
  "numbness of limbs": "C_NUMBNESS_TINGLING_LIMBS",
  "blurry eyes": "C_BLURRED_VISION",
  "cannot see clearly": "C_BLURRED_VISION",
  "haziness of vision": "C_BLURRED_VISION",
  "floaters": "C_EYE_FLOATERS",
  "spots in vision": "C_EYE_FLOATERS",
 "poor vision in dark": "C_DIMINISHED_NIGHT_VISION",
  "cannot see well at night": "C_DIMINISHED_NIGHT_VISION",
  "spasms in muscles": "C_MUSCLE_CRAMPS",
  "cramping": "C_MUSCLE_CRAMPS",
  "fragile fingernails": "C_WITHERED_BRITTLE_NAILS",
  "ridged brittle nails": "C_WITHERED_BRITTLE_NAILS",
  "hair is dry and brittle": "C_DRY_HAIR_SKIN",
  "flaking skin": "C_DRY_HAIR_SKIN",

  "aimless": "C_AIMLESSNESS",
  "no sense of direction": "C_AIMLESSNESS",
  "lack of purpose": "C_AIMLESSNESS",

  "oppressed epigastrium": "C_OPPRESSION_OF_EPIGASTRIUM",
  "epigastric oppression": "C_OPPRESSION_OF_EPIGASTRIUM",
  "fullness in epigastrium": "C_OPPRESSION_OF_EPIGASTRIUM",
  "stomach oppression": "C_OPPRESSION_OF_EPIGASTRIUM",

  "dry mouth but no thirst": "C_DRY_MOUTH_NO_THIRST",
  "dry mouth without thirst": "C_DRY_MOUTH_NO_THIRST",
  "mouth dry but no thirst": "C_DRY_MOUTH_NO_THIRST",
  "dry throat with no thirst": "C_DRY_MOUTH_NO_THIRST",

  "rib pain": "C_HYPOCHONDRIAL_PAIN",
  "hypochondrial pain": "C_HYPOCHONDRIAL_PAIN",
  "pain under ribs": "C_HYPOCHONDRIAL_PAIN",
  "flank pain": "C_HYPOCHONDRIAL_PAIN",

  "distension under ribs": "C_EPIGASTRIC_HYPOCHONDRIAL_DISTENSION",
  "epigastric and hypochondrial distension": "C_EPIGASTRIC_HYPOCHONDRIAL_DISTENSION",
  "bloated upper belly": "C_EPIGASTRIC_HYPOCHONDRIAL_DISTENSION",
  "rib distension": "C_EPIGASTRIC_HYPOCHONDRIAL_DISTENSION",

  "sticky taste": "C_STICKY_TASTE",
  "clammy taste in mouth": "C_STICKY_TASTE",
  "greasy mouth taste": "C_STICKY_TASTE",
  "pasty taste": "C_STICKY_TASTE",

  "irritable": "C_IRRITABILITY",
  "irritability": "C_IRRITABILITY",
  "easily annoyed": "C_IRRITABILITY",
  "short-tempered": "C_IRRITABILITY",

  "sticky tongue": "C_STICKY_COATING",
  "sticky coating": "C_STICKY_COATING",
  "greasy coating": "C_STICKY_COATING",

  "white tongue": "C_WHITE_COATING",
  "whitish coating": "C_WHITE_COATING",

  "yellow tongue": "C_YELLOW_COATING",
  "yellow coating": "C_YELLOW_COATING",
  "yellowish coating": "C_YELLOW_COATING",
  "scarlet tongue": "C_RED_TONGUE",

  "orange sides": "C_ORANGE_SIDES_TONGUE",
  "orange tongue": "C_ORANGE_SIDES_TONGUE",
  "orange edges of tongue": "C_ORANGE_SIDES_TONGUE",

  "thick coating": "C_THICK_COATING",
  "thick tongue coating": "C_THICK_COATING",
  "heavy coating": "C_THICK_COATING",

  "slippery pulse": "C_SLIPPERY_PULSE",
  "rolling pulse": "C_SLIPPERY_PULSE",
  "slippery pulse quality": "C_SLIPPERY_PULSE",
  "quick pulse": "C_RAPID_PULSE",
  "string-taut pulse": "C_WIRY_PULSE",
  
  "uncomfortable feeling in the epigastrium": "C_EPIGASTRIC_DISCOMFORT",
  "epigastric discomfort": "C_EPIGASTRIC_DISCOMFORT",
  "stomach discomfort": "C_EPIGASTRIC_DISCOMFORT",
  "uneasiness in stomach": "C_EPIGASTRIC_DISCOMFORT",

  "lack of taste sensation": "C_LACK_OF_TASTE_SENSATION",
  "lack of taste": "C_LACK_OF_TASTE_SENSATION",
  "no taste sensation": "C_LACK_OF_TASTE_SENSATION",
  "loss of taste": "C_LACK_OF_TASTE_SENSATION", 
  
   // Sighing
  "sigh": "C_SIGHING",
  "sighing": "C_SIGHING",
  "frequent sighing": "C_SIGHING",
  "tendency to sigh": "C_SIGHING",

  // Lump in Throat
  "plum-stone": "C_LUMP_IN_THROAT",
  "lump in throat": "C_LUMP_IN_THROAT",
  "plum stone qi": "C_LUMP_IN_THROAT",
  "feeling of a lump in the throat": "C_LUMP_IN_THROAT",
  "globus hystericus": "C_LUMP_IN_THROAT",

  // Irregular Periods
  "irregular cycle": "C_IRREGULAR_PERIODS",
  "irregular periods": "C_IRREGULAR_PERIODS",
  "irregular menstruation": "C_IRREGULAR_PERIODS",
  "menstrual irregularity": "C_IRREGULAR_PERIODS",

  // Premenstrual Tension
  "premenstrual tension": "C_PREMENSTRUAL_TENSION",
  "premenstrual irritability": "C_PREMENSTRUAL_TENSION",
  "pmt": "C_PREMENSTRUAL_TENSION",
  "pms": "C_PREMENSTRUAL_TENSION",

  // Premenstrual Breast Distension
  "breast distension before periods": "C_PREMENSTRUAL_BREAST_DISTENSION",
  "premenstrual breast distension": "C_PREMENSTRUAL_BREAST_DISTENSION",
  "swollen breasts before period": "C_PREMENSTRUAL_BREAST_DISTENSION",
  "sore breasts before period": "C_PREMENSTRUAL_BREAST_DISTENSION",

  // Red Face
  "red face": "C_RED_FACE",
  "facial redness": "C_RED_FACE",
  "flushed face": "C_RED_FACE",
  "red complexion": "C_RED_FACE",

  // Thirst
  "thirst": "C_THIRST",
  "thirsty": "C_THIRST",
  "desire to drink": "C_THIRST",
  "craving cold drinks": "C_THIRST",

  // Outbursts of Anger
  "outbursts of anger": "C_OUTBURSTS_OF_ANGER",
  "outburst of anger": "C_OUTBURSTS_OF_ANGER",
  "flying off the handle": "C_OUTBURSTS_OF_ANGER",
  "fits of rage": "C_OUTBURSTS_OF_ANGER",

  // Hiccup
  "hiccup": "C_HICCUP",
  "hiccups": "C_HICCUP",
  "hiccuping": "C_HICCUP",
  "singultus": "C_HICCUP",

  // Belching
  "belch": "C_BELCHING",
  "belching": "C_BELCHING",
  "burping": "C_BELCHING",
  "eructation": "C_BELCHING",

  // Churning Stomach
  "churning stomach": "C_CHURNING_STOMACH",
  "stomach churning": "C_CHURNING_STOMACH",
  "churning feeling in the stomach": "C_CHURNING_STOMACH",
  "gurgling or turning in stomach": "C_CHURNING_STOMACH",

  // Breast Distension
  "breast distension": "C_BREAST_DISTENSION",
  "swollen breasts": "C_BREAST_DISTENSION",
  "painful breasts": "C_BREAST_DISTENSION",
  "breast swelling": "C_BREAST_DISTENSION",

  // Vomiting of Blood
  "vomiting of blood": "C_VOMITING_OF_BLOOD",
  "throwing up blood": "C_VOMITING_OF_BLOOD",
  "haematemesis": "C_VOMITING_OF_BLOOD",
  "bloody vomit": "C_VOMITING_OF_BLOOD",

  // Nosebleed
  "nosebleed": "C_NOSEBLEED",
  "nosebleeds": "C_NOSEBLEED",
  "epistaxis": "C_NOSEBLEED",
  "bleeding from nose": "C_NOSEBLEED",

  // Painful Periods
  "painful periods": "C_PAINFUL_PERIODS",
  "painful period": "C_PAINFUL_PERIODS",
  "dysmenorrhoea": "C_PAINFUL_PERIODS",
  "menstrual cramps": "C_PAINFUL_PERIODS",

  // Dark Clotted Menses
  "dark menstrual blood": "C_DARK_CLOTTED_MENSES",
  "dark and clotted menstrual blood": "C_DARK_CLOTTED_MENSES",
  "dark clots in period": "C_DARK_CLOTTED_MENSES",
  "clotted menstrual flow": "C_DARK_CLOTTED_MENSES",

  // Infertility
  "infertility": "C_INFERTILITY",
  "unable to conceive": "C_INFERTILITY",
  "sterile": "C_INFERTILITY",
  "trouble getting pregnant": "C_INFERTILITY",

  // Fixed Abdominal Masses
  "abdominal masses": "C_FIXED_ABDOMINAL_MASSES",
  "fixed masses in the abdomen": "C_FIXED_ABDOMINAL_MASSES",
  "abdominal lumps": "C_FIXED_ABDOMINAL_MASSES",
  "immobile abdominal mass": "C_FIXED_ABDOMINAL_MASSES",

  // Purple Nails
  "purple nails": "C_PURPLE_NAILS",
  "dark nails": "C_PURPLE_NAILS",
  "cyanotic nails": "C_PURPLE_NAILS",
  "purplish fingernails": "C_PURPLE_NAILS",

  // Purple Lips
  "purple lips": "C_PURPLE_LIPS",
  "dark lips": "C_PURPLE_LIPS",
  "cyanotic lips": "C_PURPLE_LIPS",
  "purplish lips": "C_PURPLE_LIPS",

  // Purple Dark Complexion
  "purple complexion": "C_PURPLE_DARK_COMPLEXION",
  "dark face": "C_PURPLE_DARK_COMPLEXION",
  "dusky complexion": "C_PURPLE_DARK_COMPLEXION",
  "purplish face": "C_PURPLE_DARK_COMPLEXION",

  // Purple Petechiae
  "purple petechiae": "C_PURPLE_PETECHIAE",
  "bleeding under the skin": "C_PURPLE_PETECHIAE",
  "petechiae": "C_PURPLE_PETECHIAE",
  "purple spots on skin": "C_PURPLE_PETECHIAE",

  // Tinnitus
  "tinnitus": "C_TINNITUS",
  "ringing in ears": "C_TINNITUS",
  "buzzing in ears": "C_TINNITUS",
  "sudden tinnitus": "C_TINNITUS",

  // Deafness
  "deafness": "C_DEAFNESS",
  "hearing loss": "C_DEAFNESS",
  "cannot hear": "C_DEAFNESS",
  "hardness of hearing": "C_DEAFNESS",

  // Temporal Headache
  "temporal headache": "C_TEMPORAL_HEADACHE",
  "headache on temples": "C_TEMPORAL_HEADACHE",
  "migraine on side of head": "C_TEMPORAL_HEADACHE",
  "throbbing headache on side of head": "C_TEMPORAL_HEADACHE",

  // Red Eyes
  "red eyes": "C_RED_EYES",
  "bloodshot eyes": "C_RED_EYES",
  "swollen red eyes": "C_RED_EYES",
  "redness of eyes": "C_RED_EYES",

  // Constipation with Dry Stools
  "constipation with dry stools": "C_CONSTIPATION_DRY_STOOLS",
  "dry stools": "C_CONSTIPATION_DRY_STOOLS",
  "hard dry stools": "C_CONSTIPATION_DRY_STOOLS",
  "constipation": "C_CONSTIPATION_DRY_STOOLS",

  // Coughing of Blood
  "coughing of blood": "C_COUGHING_OF_BLOOD",
  "coughing up blood": "C_COUGHING_OF_BLOOD",
  "haemoptysis": "C_COUGHING_OF_BLOOD",
  "blood-tinged sputum": "C_COUGHING_OF_BLOOD",

  // Hypochondrial Abdominal Fullness
  "hypochondrial fullness": "C_HYPOCHONDRIAL_ABDOMINAL_FULLNESS",
  "fullness of the hypochondrium and abdomen": "C_HYPOCHONDRIAL_ABDOMINAL_FULLNESS",
  "fullness of hypochondrium and abdomen": "C_HYPOCHONDRIAL_ABDOMINAL_FULLNESS",
  "abdominal hypochondrial fullness": "C_HYPOCHONDRIAL_ABDOMINAL_FULLNESS",

  // Yellow Vaginal Discharge
  "yellow vaginal discharge": "C_YELLOW_VAGINAL_DISCHARGE",
  "thick yellow discharge": "C_YELLOW_VAGINAL_DISCHARGE",
  "leucorrhoea yellow": "C_YELLOW_VAGINAL_DISCHARGE",
  "yellow discharge": "C_YELLOW_VAGINAL_DISCHARGE",

  // Vaginal Itching
  "vaginal itching": "C_VAGINAL_ITCHING",
  "itching in vagina": "C_VAGINAL_ITCHING",
  "pruritus vulvae": "C_VAGINAL_ITCHING",
  "genital itching in women": "C_VAGINAL_ITCHING",

  // Vulvar Sores Eczema
  "vulvar sores": "C_VULVAR_SORES_ECZEMA",
  "vulvar eczema": "C_VULVAR_SORES_ECZEMA",
  "sores on vulva": "C_VULVAR_SORES_ECZEMA",
  "vulvar eczema or sores": "C_VULVAR_SORES_ECZEMA",

  // Mid Cycle Bleeding/Pain
  "mid-cycle bleeding": "C_MID_CYCLE_BLEEDING_PAIN",
  "mid-cycle pain": "C_MID_CYCLE_BLEEDING_PAIN",
  "intermenstrual bleeding": "C_MID_CYCLE_BLEEDING_PAIN",
  "bleeding in between periods": "C_MID_CYCLE_BLEEDING_PAIN",

  // Scrotal Redness/Swelling
  "scrotal swelling": "C_SCROTAL_REDNESS_SWELLING",
  "scrotal redness": "C_SCROTAL_REDNESS_SWELLING",
  "swelling of scrotum": "C_SCROTAL_REDNESS_SWELLING",
  "redness and swelling of the scrotum": "C_SCROTAL_REDNESS_SWELLING",

  // Genital Itching/Rash
  "genital itching": "C_GENITAL_ITCHING_RASH",
  "genital rash": "C_GENITAL_ITCHING_RASH",
  "genital skin rashes and itching": "C_GENITAL_ITCHING_RASH",
  "eczema of genitals": "C_GENITAL_ITCHING_RASH",

  // Urinary Difficulty
  "urinary difficulty": "C_URINARY_DIFFICULTY",
  "difficulty in urinating": "C_URINARY_DIFFICULTY",
  "dysuria": "C_URINARY_DIFFICULTY",
  "hard to pee": "C_URINARY_DIFFICULTY",

  // Burning Urination
  "burning on urination": "C_BURNING_URINATION",
  "burning urination": "C_BURNING_URINATION",
  "painful burning when peeing": "C_BURNING_URINATION",
  "scalding urination": "C_BURNING_URINATION",

  // Atomic Tongue & Pulse Lexicon
  "red sides": "C_RED_SIDES_TONGUE",
  "red sides of the tongue": "C_RED_SIDES_TONGUE",
  "red tongue sides": "C_RED_SIDES_TONGUE",

  "purple tongue": "C_PURPLE_TONGUE",
  "purple tongue body": "C_PURPLE_TONGUE",
  "dark purple tongue": "C_PURPLE_TONGUE",

  "purple sides": "C_PURPLE_SIDES_TONGUE",
  "purple sides of the tongue": "C_PURPLE_SIDES_TONGUE",
  "purple tongue sides": "C_PURPLE_SIDES_TONGUE",

  "dry coating": "C_DRY_COATING",
  "dry tongue coating": "C_DRY_COATING",
  "arid coating": "C_DRY_COATING",

  "full pulse": "C_FULL_PULSE",
  "replete pulse": "C_FULL_PULSE",
  "full pulse quality": "C_FULL_PULSE",

  "firm pulse": "C_FIRM_PULSE",
  "confined pulse": "C_FIRM_PULSE",
  "hard deep pulse": "C_FIRM_PULSE",
  
      // Cold stagnation groin signs
  "hypogastric distension": "C_HYPOGASTRIC_DISTENSION_PAIN",
  "hypogastric pain": "C_HYPOGASTRIC_DISTENSION_PAIN",
  "lower belly distension": "C_HYPOGASTRIC_DISTENSION_PAIN",
  "distension of hypog": "C_HYPOGASTRIC_DISTENSION_PAIN",

  "scrotum pain": "C_PAIN_REFERRING_TO_SCROTUM_TESTIS",
  "pain in scrotum": "C_PAIN_REFERRING_TO_SCROTUM_TESTIS",
  "pain in testis": "C_PAIN_REFERRING_TO_SCROTUM_TESTIS",
  "testicular pain": "C_PAIN_REFERRING_TO_SCROTUM_TESTIS",

  "better with warmth": "C_PAIN_ALLEVIATED_BY_WARMTH",
  "alleviated by warmth": "C_PAIN_ALLEVIATED_BY_WARMTH",

  "scrotum contraction": "C_CONTRACTION_OF_SCROTUM",
  "straining of testis": "C_CONTRACTION_OF_SCROTUM",
  "testicular contraction": "C_CONTRACTION_OF_SCROTUM",

  // Head and throat channels
  "vertex headache": "C_VERTICAL_HEADACHE",
  "vomiting clear water": "C_VOMITING_CLEAR_WATERY_FLUID",
  "vomiting of clear fluid": "C_VOMITING_CLEAR_WATERY_FLUID",

  "shrinking of vagina": "C_SHRINKING_OF_VAGINA",
  "shrinking vagina": "C_SHRINKING_OF_VAGINA",

  // Blood signs
  "lips pale": "C_PALE_LIPS",
  "pallor of lips": "C_PALE_LIPS",

  // Yin fluid signs
  "eyes dry": "C_DRY_EYES",
  "grittiness in eyes": "C_DRY_EYES",
  "heat in evening": "C_HEAT_IN_EVENING",
  "evening heat": "C_HEAT_IN_EVENING",
  "evening feverishness": "C_HEAT_IN_EVENING",
  "sweating at night": "C_NIGHT_SWEATING",

  "five palm heat": "C_FIVE_PALM_HEAT",
 "drinking in sips": "C_THIRST_SIPPING",

  // Yang Rising indicators
  "throbbing headache": "C_THROBBING_HEADACHE",
  "beating headache": "C_THROBBING_HEADACHE",
  "pulsating headache": "C_THROBBING_HEADACHE",

  "dry mouth and throat": "C_DRY_MOUTH_AND_THROAT",
  "dry throat": "C_DRY_MOUTH_AND_THROAT",
  "mouth and throat dry": "C_DRY_MOUTH_AND_THROAT",

  "worked up": "C_FEELING_WORKED_UP",
  "feeling worked-up": "C_FEELING_WORKED_UP",
  "feeling wound-up": "C_FEELING_WORKED_UP",

  // Anatomical Tongue
  "normal colored tongue": "C_NORMAL_COLOR_TONGUE",
  "normal tongue body": "C_NORMAL_COLOR_TONGUE",
  "normal tongue color": "C_NORMAL_COLOR_TONGUE",

  "no coating": "C_NO_COATING",
  "without coating": "C_NO_COATING",
  "coating without root": "C_ROOTLESS_COATING",

  "deep red tongue": "C_DEEP_RED_TONGUE",
  "deep-red tongue body": "C_DEEP_RED_TONGUE",

  "stiff tongue": "C_STIFF_TONGUE",
  "rigid tongue": "C_STIFF_TONGUE",
  "stiff tongue body": "C_STIFF_TONGUE",
  "fullness and distension of the hypogastrium": "C_HYPOGASTRIC_FULLNESS_DISTENSION",
    "lower abdominal fullness and bloating": "C_HYPOGASTRIC_FULLNESS_DISTENSION",
    "distended lower abdomen": "C_HYPOGASTRIC_FULLNESS_DISTENSION",
    "hypogastric fullness": "C_HYPOGASTRIC_FULLNESS_DISTENSION",
    "hypogastric pain referring downwards to the scrotum and testis": "C_HYPOGASTRIC_PAIN_DOWN_GENITALS",
    "pain in lower abdomen radiating to genitals": "C_HYPOGASTRIC_PAIN_DOWN_GENITALS",
    "pain from lower belly to testicles": "C_HYPOGASTRIC_PAIN_DOWN_GENITALS",
    "genital-radiating lower abdominal pain": "C_HYPOGASTRIC_PAIN_DOWN_GENITALS",
    "pain referring upwards to the hypochondrium": "C_PAIN_UP_HYPOCHONDRIUM",
    "pain radiating up to the rib-side": "C_PAIN_UP_HYPOCHONDRIUM",
    "abdominal pain shooting up to ribs": "C_PAIN_UP_HYPOCHONDRIUM",
    "rib-ward radiating abdominal pain": "C_PAIN_UP_HYPOCHONDRIUM",
    "pain alleviated by warmth": "C_PAIN_ALLEV_WARMTH",
    "pain relieved by heat": "C_PAIN_ALLEV_WARMTH",
    "cramps improved with heat application": "C_PAIN_ALLEV_WARMTH",
    "heat-alleviated pain": "C_PAIN_ALLEV_WARMTH",
    "straining of the testis or contraction of the scrotum": "C_TESTIS_STRAINING_SCROTUM_CONTRACTION",
    "scrotal shrinkage and pulling of testicles": "C_TESTIS_STRAINING_SCROTUM_CONTRACTION",
    "shrunk scrotum and straining testicles": "C_TESTIS_STRAINING_SCROTUM_CONTRACTION",
    "testicular strain": "C_TESTIS_STRAINING_SCROTUM_CONTRACTION",
    "vertical headache": "C_VERTICAL_HEADACHE",
    "pain on the vertex of the head": "C_VERTICAL_HEADACHE",
    "headache at the top of the crown": "C_VERTICAL_HEADACHE",
    "crown headache": "C_VERTICAL_HEADACHE",
    "feeling of cold": "C_FEELING_COLD",
    "intolerance to cold": "C_FEELING_COLD",
    "chilly sensation": "C_FEELING_COLD",
    "feeling cold": "C_FEELING_COLD",
    "cold hands and feet": "C_COLD_LIMBS",
    "cold limbs": "C_COLD_LIMBS",
    "cold extremities": "C_COLD_LIMBS",
    "hands and feet feeling icy": "C_COLD_LIMBS",
    "vomiting of clear watery fluid or dry vomiting": "C_VOMITING_CLEAR_FLUID_OR_DRY",
    "vomiting of clear watery fluid": "C_VOMITING_CLEAR_FLUID_OR_DRY",
    "dry vomiting": "C_VOMITING_CLEAR_FLUID_OR_DRY",
    "throwing up clear water": "C_VOMITING_CLEAR_FLUID_OR_DRY",
    "shrinking of the vagina": "C_VAGINAL_SHRINKING",
    "vaginal shrinking": "C_VAGINAL_SHRINKING",
    "contraction of vagina": "C_VAGINAL_SHRINKING",
    "vaginal contraction": "C_VAGINAL_SHRINKING",
    "dizziness": "C_DIZZINESS",
    "giddiness": "C_DIZZINESS",
    "vertigo": "C_DIZZINESS",
    "lightheadedness": "C_DIZZINESS",
    "numbness or tingling of limbs": "C_NUMBNESS_TINGLING_LIMBS",
    "numb limbs": "C_NUMBNESS_TINGLING_LIMBS",
    "pins and needles in arms and legs": "C_NUMBNESS_TINGLING_LIMBS",
    "limb numbness": "C_NUMBNESS_TINGLING_LIMBS",
    "insomnia": "C_INSOMNIA",
    "poor sleep": "C_INSOMNIA",
    "difficulty falling asleep": "C_INSOMNIA",
    "sleep disturbances": "C_INSOMNIA",
    "blurred vision": "C_BLURRED_VISION",
    "hazy vision": "C_BLURRED_VISION",
    "diminished vision": "C_BLURRED_VISION",
    "blurry eyesight": "C_BLURRED_VISION",
    "floaters in eyes": "C_EYE_FLOATERS",
    "eye floaters": "C_EYE_FLOATERS",
    "spots in front of eyes": "C_EYE_FLOATERS",
    "visual floaters": "C_EYE_FLOATERS",
    "diminished night vision": "C_DIMINISHED_NIGHT_VISION",
    "poor night vision": "C_DIMINISHED_NIGHT_VISION",
    "night blindness": "C_DIMINISHED_NIGHT_VISION",
    "difficulty seeing in the dark": "C_DIMINISHED_NIGHT_VISION",
    "scanty menstruation or amenorrhoea": "C_SCANTY_MENSTRUATION_AMENORRHOEA",
    "scanty menstruation": "C_SCANTY_MENSTRUATION_AMENORRHOEA",
    "amenorrhoea": "C_SCANTY_MENSTRUATION_AMENORRHOEA",
    "scanty or absent periods": "C_SCANTY_MENSTRUATION_AMENORRHOEA",
    "dull-pale complexion without lustre": "C_DULL_PALE_COMPLEXION_NO_LUSTRE",
    "dull pale face": "C_DULL_PALE_COMPLEXION_NO_LUSTRE",
    "pale face lacking shine": "C_DULL_PALE_COMPLEXION_NO_LUSTRE",
    "sallow complexion": "C_DULL_PALE_COMPLEXION_NO_LUSTRE",
    "pale lips": "C_PALE_LIPS",
    "lips losing color": "C_PALE_LIPS",
    "pale lip colour": "C_PALE_LIPS",
    "whitish lips": "C_PALE_LIPS",
    "muscular weakness": "C_MUSCULAR_WEAKNESS",
    "weak muscles": "C_MUSCULAR_WEAKNESS",
    "weak limbs with lack of strength": "C_MUSCULAR_WEAKNESS",
    "muscle flaccidity": "C_MUSCULAR_WEAKNESS",
    "cramps": "C_CRAMPS",
    "muscle cramps": "C_CRAMPS",
    "spasms of tendons": "C_CRAMPS",
    "muscle spasms": "C_CRAMPS",
    "withered and brittle nails": "C_WITHERED_BRITTLE_NAILS",
    "brittle nails": "C_WITHERED_BRITTLE_NAILS",
    "ridged and dry nails": "C_WITHERED_BRITTLE_NAILS",
    "withered nails": "C_WITHERED_BRITTLE_NAILS",
    "dry hair and skin": "C_DRY_HAIR_SKIN",
    "dry hair": "C_DRY_HAIR_SKIN",
    "dry skin": "C_DRY_HAIR_SKIN",
    "dry skin and hair": "C_DRY_HAIR_SKIN",
    "depression": "C_DEPRESSION",
    "low mood": "C_DEPRESSION",
    "feeling depressed": "C_DEPRESSION",
    "mental depression": "C_DEPRESSION",
    "feeling of aimlessness": "C_AIMLESSNESS",
    "aimlessness": "C_AIMLESSNESS",
    "lack of direction in life": "C_AIMLESSNESS",
    "aimless feeling": "C_AIMLESSNESS",
    "dry eyes": "C_DRY_EYES",
    "dry and gritty eyes": "C_DRY_EYES",
    "gritty eyes": "C_DRY_EYES",
    "lack of moisture in eyes": "C_DRY_EYES",
    "red cheekbones": "C_RED_CHEEKBONES",
    "malar flush": "C_RED_CHEEKBONES",
    "flushed cheekbones": "C_RED_CHEEKBONES",
    "flushed cheeks": "C_RED_CHEEKBONES",
    "anxiety": "C_ANXIETY",
    "mental restlessness": "C_ANXIETY",
    "feeling anxious": "C_ANXIETY",
    "restlessness": "C_ANXIETY",
    "feeling of heat in the evening": "C_EVENING_HEAT",
    "afternoon fever": "C_EVENING_HEAT",
    "afternoon feeling of heat": "C_EVENING_HEAT",
    "evening hot flushes": "C_EVENING_HEAT",
    "night sweating": "C_NIGHT_SWEATING",
    "night sweats": "C_NIGHT_SWEATING",
    "sweating while asleep": "C_NIGHT_SWEATING",
    "nocturnal sweating": "C_NIGHT_SWEATING",
    "five-palm heat": "C_FIVE_PALM_HEAT",
    "hot palms and soles": "C_FIVE_PALM_HEAT",
    "heat in chest palms and soles": "C_FIVE_PALM_HEAT",
    "heat in hands and feet": "C_FIVE_PALM_HEAT",
    "thirst with desire to drink in small sips": "C_THIRST_SIPS",
    "thirst with desire to sip liquids": "C_THIRST_SIPS",
    "sipping drinks": "C_THIRST_SIPS",
    "thirst for small sips": "C_THIRST_SIPS",
    "heavy menstrual bleeding": "C_HEAVY_MENSTRUAL_BLEEDING",
    "heavy periods": "C_HEAVY_MENSTRUAL_BLEEDING",
    "menorrhagia": "C_HEAVY_MENSTRUAL_BLEEDING",
    "excessive menstrual flow": "C_HEAVY_MENSTRUAL_BLEEDING",
    "pale tongue": "C_PALE_TONGUE",
    "pale tongue body": "C_PALE_TONGUE",
    "whitish tongue": "C_PALE_TONGUE",
    "pale wet tongue": "C_PALE_TONGUE",
    "wet tongue": "C_WET_TONGUE",
    "slightly too wet tongue": "C_WET_TONGUE",
    "tongue is wet": "C_WET_TONGUE",
    "watery tongue": "C_WET_TONGUE",
    "white tongue coating": "C_WHITE_TONGUE_COATING",
    "thin white coating": "C_WHITE_TONGUE_COATING",
    "white coating": "C_WHITE_TONGUE_COATING",
    "white tongue coat": "C_WHITE_TONGUE_COATING",
    "thin tongue": "C_THIN_TONGUE",
    "thin tongue body": "C_THIN_TONGUE",
    "shrunken tongue": "C_THIN_TONGUE",
    "narrow tongue": "C_THIN_TONGUE",
    "dry tongue": "C_DRY_TONGUE",
    "dry tongue body": "C_DRY_TONGUE",
    "tongue is dry": "C_DRY_TONGUE",
    "lack of moisture on tongue": "C_DRY_TONGUE",
    "normal-coloured tongue": "C_NORMAL_TONGUE_COLOUR",
    "normal tongue colour": "C_NORMAL_TONGUE_COLOUR",
    "tongue of normal color": "C_NORMAL_TONGUE_COLOUR",
    "normal-colored tongue": "C_NORMAL_TONGUE_COLOUR",
    "tongue without coating": "C_NO_TONGUE_COATING",
    "no tongue coating": "C_NO_TONGUE_COATING",
    "peeled tongue": "C_NO_TONGUE_COATING",
    "peeled tongue body": "C_NO_TONGUE_COATING",
    "rootless tongue coating": "C_ROOTLESS_TONGUE_COATING",
    "rootless coating": "C_ROOTLESS_TONGUE_COATING",
    "patchy tongue coating": "C_ROOTLESS_TONGUE_COATING",
    "rootless coat": "C_ROOTLESS_TONGUE_COATING",
    "red tongue": "C_RED_TONGUE",
    "red tongue body": "C_RED_TONGUE",
    "too red tongue": "C_RED_TONGUE",
    "dark red tongue": "C_RED_TONGUE",
    "pale sides of the tongue": "C_PALE_TONGUE_SIDES",
    "pale tongue sides": "C_PALE_TONGUE_SIDES",
    "sides of the tongue are pale": "C_PALE_TONGUE_SIDES",
    "pale edges of tongue": "C_PALE_TONGUE_SIDES",
    "orangey sides of the tongue": "C_ORANGEY_TONGUE_SIDES",
    "orangey tongue sides": "C_ORANGEY_TONGUE_SIDES",
    "orange tongue sides": "C_ORANGEY_TONGUE_SIDES",
    "sides of the tongue are orange": "C_ORANGEY_TONGUE_SIDES",
    "deep pulse": "C_DEEP_PULSE",
    "pulse felt only at deep level": "C_DEEP_PULSE",
    "deeply felt pulse": "C_DEEP_PULSE",
    "deep pulse quality": "C_DEEP_PULSE",
    "wiry pulse": "C_WIRY_PULSE",
    "pulse taut like a guitar string": "C_WIRY_PULSE",
    "wiry pulse quality": "C_WIRY_PULSE",
    "taut pulse": "C_WIRY_PULSE",
    "slow pulse": "C_SLOW_PULSE",
    "slow rate pulse": "C_SLOW_PULSE",
    "pulse slow in rate": "C_SLOW_PULSE",
    "slow pulse quality": "C_SLOW_PULSE",
    "choppy pulse": "C_CHOPPY_PULSE",
    "pulse feels rough under the finger": "C_CHOPPY_PULSE",
    "rough pulse": "C_CHOPPY_PULSE",
    "jagged edge pulse": "C_CHOPPY_PULSE",
    "fine pulse": "C_FINE_PULSE",
    "thready pulse": "C_FINE_PULSE",
    "thin pulse": "C_FINE_PULSE",
    "fine pulse quality": "C_FINE_PULSE",
    "floating pulse": "C_FLOATING_PULSE",
    "superficial pulse": "C_FLOATING_PULSE",
    "floating pulse quality": "C_FLOATING_PULSE",
    "pulse felt superficially": "C_FLOATING_PULSE",
    "empty pulse": "C_EMPTY_PULSE",
    "empty pulse quality": "C_EMPTY_PULSE",
    "hollow pulse": "C_EMPTY_PULSE",
    "pulse empty under pressure": "C_EMPTY_PULSE",
    "rapid pulse": "C_RAPID_PULSE",
    "fast pulse": "C_RAPID_PULSE",
    "rapid pulse quality": "C_RAPID_PULSE",
    "slightly rapid pulse": "C_RAPID_PULSE",
    
    // --- NEW HEART LEXICON ---
  "mouth ulcers": "C_MOUTH_TONGUE_ULCERS",
  "tongue ulcers": "C_MOUTH_TONGUE_ULCERS",
  "canker sores": "C_MOUTH_TONGUE_ULCERS",
  "sores in mouth": "C_MOUTH_TONGUE_ULCERS",
  "ulcers on tongue": "C_MOUTH_TONGUE_ULCERS",

  "severe agitation": "C_SEVERE_AGITATION",
  "highly restless": "C_SEVERE_AGITATION",
  "manic": "C_SEVERE_AGITATION",
  "cannot sit still": "C_SEVERE_AGITATION",

  "red tip": "C_RED_TIP_TONGUE",
  "tongue tip is red": "C_RED_TIP_TONGUE",
  "red tip of tongue": "C_RED_TIP_TONGUE",

  "red spots on tip": "C_RED_TIP_SPOTS",
  "swollen red tip": "C_RED_TIP_SPOTS",
  "strawberry tip": "C_RED_TIP_SPOTS",
  
  // --- NEW LUNG LEXICON ---
  "clear sputum": "C_CLEAR_WATERY_SPUTUM",
  "watery sputum": "C_CLEAR_WATERY_SPUTUM",
  "white phlegm": "C_CLEAR_WATERY_SPUTUM",
  "clear phlegm": "C_CLEAR_WATERY_SPUTUM",

  "dry cough": "C_DRY_COUGH",
  "unproductive cough": "C_DRY_COUGH",
  "tickly cough": "C_DRY_COUGH",
  "hacking cough": "C_DRY_COUGH",

  "scanty sputum": "C_SCANTY_SPUTUM",
  "little phlegm": "C_SCANTY_SPUTUM",
  "hard to expectorate": "C_SCANTY_SPUTUM",

  "hoarse voice": "C_HOARSE_VOICE",
  "hoarseness": "C_HOARSE_VOICE",
  "lost voice": "C_HOARSE_VOICE",
  "scratchy voice": "C_HOARSE_VOICE",

  "yellow sputum": "C_YELLOW_SPUTUM",
  "green sputum": "C_YELLOW_SPUTUM",
  "yellow phlegm": "C_YELLOW_SPUTUM",
  "thick yellow phlegm": "C_YELLOW_SPUTUM",
  "purulent sputum": "C_YELLOW_SPUTUM",

  "chest pain": "C_CHEST_PAIN",
  "pain in chest": "C_CHEST_PAIN",
  "hurts to breathe": "C_CHEST_PAIN",

  "flaring of nostrils": "C_FLARING_OF_NOSTRILS",
  "flaring nostrils": "C_FLARING_OF_NOSTRILS",
  "nostrils flaring": "C_FLARING_OF_NOSTRILS",
  
  // --- NEW KIDNEY LEXICON ---
  "weak knees": "C_WEAK_KNEES",
  "sore knees": "C_WEAK_KNEES",
  "knee pain": "C_WEAK_KNEES",
  "knees give out": "C_WEAK_KNEES",

  "nocturia": "C_NIGHT_URINATION",
  "peeing at night": "C_NIGHT_URINATION",
  "waking up to pee": "C_NIGHT_URINATION",
  "frequent night urination": "C_NIGHT_URINATION",

  "incontinence": "C_INCONTINENCE",
  "leak urine": "C_INCONTINENCE",
  "cannot hold urine": "C_INCONTINENCE",
  "bedwetting": "C_INCONTINENCE",
  "wetting the bed": "C_INCONTINENCE",

  "low libido": "C_DECREASED_LIBIDO",
  "no sex drive": "C_DECREASED_LIBIDO",
  "low sex drive": "C_DECREASED_LIBIDO",
  "loss of libido": "C_DECREASED_LIBIDO",

  "premature ejaculation": "C_PREMATURE_EJACULATION",
  "early ejaculation": "C_PREMATURE_EJACULATION",

  "nocturnal emissions": "C_NOCTURNAL_EMISSIONS",
  "wet dreams": "C_NOCTURNAL_EMISSIONS",
  "seminal emission": "C_NOCTURNAL_EMISSIONS",

  "hair loss": "C_HAIR_LOSS",
  "losing hair": "C_HAIR_LOSS",
  "thinning hair": "C_HAIR_LOSS",
  "alopecia": "C_HAIR_LOSS",

  "premature grey hair": "C_PREMATURE_GREY_HAIR",
  "grey hair early": "C_PREMATURE_GREY_HAIR",
  "hair turning grey": "C_PREMATURE_GREY_HAIR",

  "weak bones": "C_BONE_PROBLEMS",
  "brittle bones": "C_BONE_PROBLEMS",
  "osteoporosis": "C_BONE_PROBLEMS",
  "poor bone development": "C_BONE_PROBLEMS",
  
  // --- NEW FU ORGAN LEXICON ---
  "bad breath": "C_FOUL_BREATH",
  "foul breath": "C_FOUL_BREATH",
  "halitosis": "C_FOUL_BREATH",
  "stinky breath": "C_FOUL_BREATH",

  "swollen gums": "C_SWOLLEN_GUMS",
  "bleeding gums": "C_SWOLLEN_GUMS",
  "sore gums": "C_SWOLLEN_GUMS",
  "painful gums": "C_SWOLLEN_GUMS",

  "always hungry": "C_CONSTANT_HUNGER",
  "ravenous": "C_CONSTANT_HUNGER",
  "constant hunger": "C_CONSTANT_HUNGER",
  "excessive hunger": "C_CONSTANT_HUNGER",

  "mucus in stool": "C_MUCUS_IN_STOOLS",
  "mucus in stools": "C_MUCUS_IN_STOOLS",
  "slimy stools": "C_MUCUS_IN_STOOLS",
  "pus in stool": "C_MUCUS_IN_STOOLS",

  "tenesmus": "C_TENESMUS",
  "incomplete bowel movement": "C_TENESMUS",
  "urge to go but cant": "C_TENESMUS",
  "feeling of incomplete evacuation": "C_TENESMUS",

  "gravel in urine": "C_GRAVEL_IN_URINE",
  "stones in urine": "C_GRAVEL_IN_URINE",
  "sand in urine": "C_GRAVEL_IN_URINE",
  "kidney stones": "C_GRAVEL_IN_URINE",
  
  // --- GALLBLADDER QI DEFICIENCY LEXICON ---
  "timid": "C_TIMIDITY",
  "timidity": "C_TIMIDITY",
  "lack of courage": "C_TIMIDITY",
  "easily frightened": "C_TIMIDITY",
  "scared easily": "C_TIMIDITY",

  "indecision": "C_INDECISION",
  "indecisive": "C_INDECISION",
  "hard time with decisions": "C_INDECISION",
  "hard time making decisions": "C_INDECISION",
  "difficulty making decisions": "C_INDECISION",
  "can't make up my mind": "C_INDECISION",
  
  // --- OVERACTING / INVADING TERMINOLOGY ---
  "liver overacting on spleen": "C_LIVER_INVADING_SPLEEN",
  "liver overacting spleen": "C_LIVER_INVADING_SPLEEN",
  "liver invading spleen": "C_LIVER_INVADING_SPLEEN",
  "wood overacting on earth": "C_LIVER_INVADING_SPLEEN",

  "liver overacting on stomach": "C_LIVER_INVADING_STOMACH",
  "liver overacting stomach": "C_LIVER_INVADING_STOMACH",
  "liver invading stomach": "C_LIVER_INVADING_STOMACH"
};