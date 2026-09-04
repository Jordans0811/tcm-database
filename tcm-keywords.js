const TCM_KEYWORDS = new Set([
  // --- Original Template Keywords ---
  "qi", "blood", "yin", "yang", "essence", "jing", "fluid", "fluids", "jin", "ye", 
  "mind", "shen", "spirit", "hun", "po", "yi", "zhi", "yuan", "gu", "zong", "zhen", 
  "wei", "ying", "zheng", "def", "xu", "xs", "dry", "sweat", "fever", "chills", "aversion", 
  "white", "red", "thin", "sticky", "peeled", "hot", "heart", "liver", "spleen", 
  "lung", "lungs", "kidney", "kidneys", "pericardium", "stomach", "intestine", 
  "gallbladder", "bladder", "triple", "burner", "san", "jiao", "uterus", "brain", 
  "marrow", "bone", "bones", "sinews", "muscles", "skin", "vessels", "wood", "fire", 
  "earth", "metal", "water", "wind", "cold", "heat", "damp", "dampness", "dryness", 
  "summerheat", "deficiency", "empty", "excess", "full", "stagnation", "stasis", 
  "rebellious", "sinking", "tonify", "sedate", "pacify", "invigorate", "resolve", 
  "expel", "nourish", "clear", "subdue", "extinguish", "ascending", "descending", 
  "entering", "exiting", "cough", "anger", "joy", "sadness", "worry", "pensiveness", 
  "fear", "shock", "grief",  "body", "tip", "scattered", 
  "leather", "front", "rear", "yellow", "ulcers", "insomnia", "headache", "tinnitus", "phlegm",

  // --- Added Zang Fu Organ Symptoms & Pathology ---
  "palpitations", "constriction", "oppression", "tightness", "stuffiness", 
  "discomfort", "chest", "delirium", "aphasia", "stuttering", "speech", "coma", 
  "macules", "dream-disturbed", "memory", "startled", "fidgetiness", "uneasiness", 
  "laughter", "muttering", "asthma", "breathlessness", "wheezing", "sputum", "mucus", 
  "watery", "clear", "sneezing", "runny", "nose", "throat", "sore", "itchy", 
  "epistaxis", "constipation", "diarrhoea","diarrhea", "stools", "tenesmus", "anus", "burning", 
  "appetite", "bloating", "gas", "reflux", "belching", "nausea", "vomiting", "hiccup", 
  "hiccups", "prolapse", "bearing-down", "bruising", "complexion", "sallow", "sclera", 
  "jaundice", "sweetish", "regurgitation", "sour", "hunger", "gums", "hypochondrial", 
  "epigastric", "swings", "melancholy", "depression", "vertigo", "deafness", "whistle", 
  "bloodshot", "tears", "scrotum", "scrotal", "genital", "itching", "sores", "testicles", 
  "hernia", "cramps", "spasms", "tics", "tremor", "tremors", "brittle", "ridged", 
  "menses", "menstruation", "amenorrhoea", "premenstrual", "clots", "scanty", "heavy", 
  "backache", "knees", "soreness", "teeth", "loose", "falling", "graying", "nocturia", 
  "dribbling", "incontinence", "enuresis", "edema", "ankles", "libido", "impotence", 
  "ejaculation", "nocturnal", "emissions", "spermatorrhoea", "miscarriage", "sweating", 
  "malar", "flush", "apathy", "cloudy", "turbid", "discharges", "limpomas",

  // --- Added Classical 28 Pulses & Palpation Terminology ---
  "wiry", "slippery", "choppy", "tight", "soggy", "weak", "fine", "minute", 
  "hidden", "hollow", "knotted", "hasty", "intermittent", "moving", "hurried", 
  "firm", "big", "overflowing", "soft", "deep", "floating", "slow", "rapid", 
  "cun", "guan", "chi", "apical", "xiphoid",

  // --- Added Tongue Topography & Pathological Appearances ---
  "sides", "root", "centre", "deep red", "reddish purple", "bluish-purple", "blue", 
  "swollen", "toothmarked", "quivering", "deviated", "stiff", "flaccid", "rootless", 
  "greasy", "grey", "black", "points", "spots", "cracks", "crack", "purple",

  // --- Added Meridian, Extraordinary Vessel & Stage Levels ---
  "xue", "tiangui", "upright", "pathogenic", "chong", "ren", "du", "dai", "taiyang", 
  "yangming", "shaoyang", "taiyin", "shaoyin", "jueyin", "collapse", "failure", 
  "misting", "harassing", "obstructed", "invading", "overacting", "insulting", "generating",
  
  
    // Add this to your TCM_KEYWORDS Set
  "lipoma", "nodule", "nodules", "phlegm", "lipomas"

]);
