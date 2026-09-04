const TCM_KEYWORDS = new Set([
  // --- Fundamental Substances & Pathogens ---
  "qi", "blood", "yin", "yang", "essence", "jing", "fluid", "jin", "ye", 
  "shen", "spirit", "hun", "po", "yi", "zhi", "yuan", "gu", "zong", "zhen", 
  "wei", "ying", "zheng", "deficiency", "excess", "wood", "fire", "earth", 
  "metal", "water", "wind", "cold", "heat", "damp", "dampness", "dryness", 
  "summerheat", "stagnation", "stasis", "phlegm",

  // --- Zang-Fu Organs ---
  "heart", "liver", "spleen", "lung", "kidney", "pericardium", "stomach", 
  "intestine", "gallbladder", "bladder", "san jiao", "uterus", "brain", 
  "marrow", "bone", "sinew", "muscle", "skin", "vessel", 

  // --- Symptoms & Pathology ---
  "sweat", "sweating", "fever", "chills", "aversion", "cough", "anger", "joy", 
  "sadness", "worry", "pensiveness", "fear", "shock", "grief", "ulcer", "insomnia", 
  "headache", "tinnitus", "palpitation", "constriction", "oppression", "tightness", 
  "stuffiness", "discomfort", "chest", "delirium", "aphasia", "stuttering", "speech", 
  "coma", "macule", "memory", "startled", "fidgetiness", "uneasiness", "laughter", 
  "muttering", "asthma", "breathlessness", "wheezing", "sputum", "mucus", "sneezing", 
  "runny", "nose", "throat", "sore", "itchy", "epistaxis",   "constipation", "diarrhoea", "diarrhea", "loose stool", "tenesmus", "anus", "burning", "appetite", "bloating", "gas", "reflux", "belching", 
  "nausea", "vomiting", "hiccup", "prolapse", "bruising", "complexion", "sallow", 
  "sclera", "jaundice", "regurgitation", "hunger", "gum", "hypochondrial", "epigastric", 
  "swing", "melancholy", "depression", "vertigo", "deafness", "whistle", "bloodshot", 
  "tear", "scrotum", "genital", "itching", "sore", "testicle", "hernia", "cramp", 
  "spasm", "tic", "tremor", "menstruation", "amenorrhoea", "premenstrual", "clot", 
  "scanty", "heavy", "backache", "knee", "soreness", "tooth", "nocturia", "dribbling", 
  "incontinence", "enuresis", "edema", "ankle", "libido", "impotence", "ejaculation", 
  "nocturnal", "emission", "spermatorrhoea", "miscarriage", "flush", "apathy", 
  "discharge", "lipoma", "nodule",

  // --- Pulse & Tongue Qualities (Kept as specific concepts) ---
  "wiry", "slippery", "choppy", "tight", "soggy", "weak", "fine", "minute", 
  "hidden", "hollow", "knotted", "hasty", "intermittent", "hurried", "firm", 
  "overflowing", "soft", "floating", "rapid", "toothmarked", "quivering", 
  "deviated", "flaccid", "rootless", "greasy", "crack", "purple",

    // --- Stages / Levels / Syndromes ---
  "chong", "ren", "du", "dai", "taiyang", "yangming", "shaoyang", "taiyin", 
  "shaoyin", "jueyin", "misting", "harassing", "obstructed", "invading", 
  "overacting", "insulting", "generating",
  
  "pain", "urine", "deep", "slow", "collapse",
  "fatigue", "exhaustion", "weakness", "lethargy", "tired", "tiredness", "sluggish",


]);
