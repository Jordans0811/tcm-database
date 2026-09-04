// tcm-graph.js
// LAYER 2 & 3: The Knowledge Graph and Inference Schema 

// Concept IDs are unique. Where duplicate source batches existed, the final effective definition was retained.
const TCM_CONCEPTS = {
  "C_ANGER": { name: "Anger", category: "SYMPTOM" },
  "C_FRUSTRATION": { name: "Frustration", category: "SYMPTOM" },
  "C_CHEST_TIGHTNESS": { name: "Chest Tightness", category: "SYMPTOM" },
  "C_STRESS": { name: "Stress", category: "ETIOLOGY" },
  "C_COLD_PATTERN": { name: "Cold Pattern", category: "PATTERN" },
  "C_CHILLS": { name: "Chills", category: "SYMPTOM" },
  
// --- SPLEEN DEFICIENCY PATTERNS ---
  "C_SPLEEN_QI_DEFICIENCY": { name: "Spleen Qi Deficiency", category: "PATTERN" },
  "C_SPLEEN_YANG_DEFICIENCY": { name: "Spleen Yang Deficiency", category: "PATTERN" },
  "C_SPLEEN_QI_SINKING": { name: "Spleen Qi Sinking", category: "PATTERN" },
  "C_SPLEEN_NOT_CONTROLLING_BLOOD": { name: "Spleen Not Controlling Blood", category: "PATTERN" },
  "C_SPLEEN_BLOOD_DEFICIENCY": { name: "Spleen Blood Deficiency", category: "PATTERN" },

  // --- GENERAL & SHARED DIGESTIVE SYMPTOMS ---
  "C_POOR_APPETITE": { name: "Poor Appetite", category: "SYMPTOM" },
  "C_ABDOMINAL_DISTENSION": { name: "Slight Abdominal Distension After Eating", category: "SYMPTOM" },
  "C_TIREDNESS": { name: "Tiredness and Lassitude", category: "SYMPTOM" },
  "C_WEAK_LIMBS": { name: "Weakness of the Limbs", category: "SYMPTOM" },
  "C_WEAK_VOICE": { name: "Weak Voice", category: "SYMPTOM" },
  "C_LOOSE_STOOLS": { name: "Loose Stools", category: "SYMPTOM" },
  "C_PALE_COMPLEXION": { name: "Pale or Sallow Complexion", category: "SYMPTOM" },

  // --- COLD & YANG DEFICIENCY SYMPTOMS ---
  "C_OEDEMA": { name: "Oedema", category: "SYMPTOM" },

  // --- QI SINKING SPECIFIC SYMPTOMS ---
  "C_BEARING_DOWN_SENSATION": { name: "Bearing-down Sensation", category: "SYMPTOM" },
  "C_ORGAN_PROLAPSE": { name: "Prolapse of Organs", category: "SYMPTOM" },
  "C_MENTAL_DEPRESSION": { name: "Mental Depression", category: "SYMPTOM" },
  "C_URINARY_FREQUENCY_URGENCY": { name: "Frequency and Urgency of Urination", category: "SYMPTOM" },

  // --- BLOOD CONTROL PATHO-SYMPTOMS ---
  "C_BLOOD_SPOTS_UNDER_SKIN": { name: "Blood Spots Under the Skin", category: "SYMPTOM" },
  "C_BLOOD_IN_URINE_OR_STOOLS": { name: "Blood in the Urine or Stools", category: "SYMPTOM" },
  "C_EXCESSIVE_UTERINE_BLEEDING": { name: "Excessive Uterine Bleeding", category: "SYMPTOM" },

  // --- BLOOD DEFICIENCY SPECIFIC SYMPTOMS ---
  "C_THIN_BODY": { name: "Thin Body", category: "SYMPTOM" },
  "C_SCANTY_PERIODS_AMENORRHOEA": { name: "Scanty Periods or Amenorrhoea", category: "SYMPTOM" },
  // --- ATOMIC TONGUE CONCEPTS ---
  // --- ATOMIC PULSE CONCEPTS ---
  "C_WEAK_PULSE": { name: "Weak Pulse", category: "PULSE" },
  // --- NEW SPLEEN PATTERNS (BATCH 2) ---
  "C_COLD_DAMPNESS_INVADING_SPLEEN": { name: "Cold-Dampness Invading the Spleen", category: "PATTERN" },
  "C_DAMP_HEAT_INVADING_SPLEEN": { name: "Damp-Heat Invading the Spleen", category: "PATTERN" },
  "C_SPLEEN_AND_HEART_BLOOD_DEFICIENCY": { name: "Spleen- and Heart-Blood Deficiency", category: "PATTERN" },
  "C_SPLEEN_AND_LUNG_QI_DEFICIENCY": { name: "Spleen- and Lung-Qi Deficiency", category: "PATTERN" },
  "C_SPLEEN_AND_LIVER_BLOOD_DEFICIENCY": { name: "Spleen- and Liver-Blood Deficiency", category: "PATTERN" },
  "C_OBSTRUCTION_OF_SPLEEN_BY_DAMPNESS_WITH_LIVER_QI_STAG": { name: "Obstruction of Spleen by Dampness with Stagnation of Liver-Qi", category: "PATTERN" },

  // --- NEW SYMPTOMS (BATCH 2) ---
  "C_EPIGASTRIC_ABDOMINAL_FULLNESS": { name: "Fullness of Epigastrium and Abdomen", category: "SYMPTOM" },
  "C_EPIGASTRIC_COLD_SENSATION": { name: "Cold Sensation in Epigastrium", category: "SYMPTOM" },
  "C_FEELING_OF_HEAVINESS": { name: "Feeling of Heaviness of Head and Body", category: "SYMPTOM" },
  "C_TASTE_ALTERATION_SPLEEN": { name: "Alteration of Taste (Sweetish or Absent)", category: "SYMPTOM" },
  "C_NO_THIRST": { name: "No Thirst", category: "SYMPTOM" },
  "C_NAUSEA_VOMITING": { name: "Nausea and Vomiting", category: "SYMPTOM" },
  "C_WHITE_VAGINAL_DISCHARGE": { name: "Excessive White Vaginal Discharge", category: "SYMPTOM" },
  "C_ABDOMINAL_PAIN": { name: "Abdominal Pain", category: "SYMPTOM" },
  "C_THIRST_NO_DESIRE_TO_DRINK": { name: "Thirst Without Desire to Drink", category: "SYMPTOM" },
  "C_LOOSE_STOOLS_WITH_ODOUR": { name: "Loose Stools with Offensive Odour", category: "SYMPTOM" },
  "C_BURNING_ANUS": { name: "Burning Sensation in Anus", category: "SYMPTOM" },
  "C_FEELING_OF_HEAT": { name: "Feeling of Heat", category: "SYMPTOM" },
  "C_SCANTY_DARK_URINE": { name: "Scanty Dark Urine", category: "SYMPTOM" },
  "C_LOW_GRADE_FEVER": { name: "Low-grade Fever", category: "SYMPTOM" },
  "C_DULL_YELLOW_COMPLEXION": { name: "Dull-yellow Complexion", category: "SYMPTOM" },
  "C_YELLOW_SCLERA": { name: "Yellow Sclera of Eyes", category: "SYMPTOM" },
  "C_OILY_SWEAT": { name: "Oily Sweat", category: "SYMPTOM" },
  "C_BITTER_TASTE": { name: "Bitter Taste", category: "SYMPTOM" },
  "C_SKIN_ERUPTIONS": { name: "Skin Eruptions and Itching", category: "SYMPTOM" },
  "C_PALPITATIONS": { name: "Palpitations", category: "SYMPTOM" },
  "C_POOR_MEMORY": { name: "Poor Memory", category: "SYMPTOM" },
  "C_PROPENSITY_TO_BE_STARTLED": { name: "Propensity to be Startled", category: "SYMPTOM" },
  "C_OBESITY_TENDENCY": { name: "Tendency to Obesity", category: "SYMPTOM" },
  "C_BREATHLESSNESS": { name: "Shortness of Breath", category: "SYMPTOM" },
  "C_COUGH": { name: "Cough", category: "SYMPTOM" },
  "C_SPONTANEOUS_SWEATING": { name: "Spontaneous Daytime Sweating", category: "SYMPTOM" },
  "C_PROPENSITY_TO_CATCH_COLDS": { name: "Propensity to Catch Colds", category: "SYMPTOM" },
  "C_MUSCLE_CRAMPS": { name: "Muscle Cramps", category: "SYMPTOM" },
  "C_OPPRESSION_OF_EPIGASTRIUM": { name: "Oppression and Fullness of Epigastrium", category: "SYMPTOM" },
  "C_DRY_MOUTH_NO_THIRST": { name: "Dry Mouth Without Desire to Drink", category: "SYMPTOM" },
  "C_HYPOCHONDRIAL_PAIN": { name: "Hypochondrial Pain", category: "SYMPTOM" },
  "C_EPIGASTRIC_HYPOCHONDRIAL_DISTENSION": { name: "Epigastric and Hypochondrial Distension", category: "SYMPTOM" },
  "C_STICKY_TASTE": { name: "Sticky Taste", category: "SYMPTOM" },
  "C_IRRITABILITY": { name: "Irritability", category: "SYMPTOM" },

  // --- NEW ATOMIC TONGUE & PULSE PROPERTIES ---
  "C_STICKY_COATING": { name: "Sticky Tongue Coating", category: "TONGUE" },
  "C_WHITE_COATING": { name: "White Tongue Coating", category: "TONGUE" },
  "C_YELLOW_COATING": { name: "Yellow Tongue Coating", category: "TONGUE" },
  "C_ORANGE_SIDES_TONGUE": { name: "Orange Sides of the Tongue", category: "TONGUE" },
  "C_THICK_COATING": { name: "Thick Tongue Coating", category: "TONGUE" },
  "C_SLIPPERY_PULSE": { name: "Slippery Pulse", category: "PULSE" },
  "C_STOMACH_AND_SPLEEN_QI_DEFICIENCY": { name: "Stomach- and Spleen-Qi Deficiency", category: "PATTERN" },
  "C_EPIGASTRIC_DISCOMFORT": { name: "Uncomfortable Feeling in the Epigastrium", category: "SYMPTOM" },
  "C_LACK_OF_TASTE_SENSATION": { name: "Lack of Taste Sensation", category: "SYMPTOM" },
  
  // --- NEW LIVER PATTERNS (BATCH 3) ---
  "C_LIVER_QI_STAGNATION": { name: "Liver Qi Stagnation", category: "PATTERN" },
  "C_STAGNANT_LIVER_QI_TURNING_INTO_HEAT": { name: "Stagnant Liver Qi Turning into Heat", category: "PATTERN" },
  "C_REBELLIOUS_LIVER_QI": { name: "Rebellious Liver Qi", category: "PATTERN" },
  "C_LIVER_BLOOD_STASIS": { name: "Liver Blood Stasis", category: "PATTERN" },
  "C_LIVER_FIRE_BLAZING": { name: "Liver Fire Blazing", category: "PATTERN" },
  "C_DAMP_HEAT_IN_LIVER": { name: "Damp-Heat in the Liver", category: "PATTERN" },

  // --- NEW SYMPTOMS (BATCH 3) ---
  "C_SIGHING": { name: "Sighing", category: "SYMPTOM" },
  "C_LUMP_IN_THROAT": { name: "Feeling of a Lump in the Throat", category: "SYMPTOM" },
  "C_IRREGULAR_PERIODS": { name: "Irregular Periods", category: "SYMPTOM" },
  "C_PREMENSTRUAL_TENSION": { name: "Premenstrual Tension and Irritability", category: "SYMPTOM" },
  "C_PREMENSTRUAL_BREAST_DISTENSION": { name: "Premenstrual Breast Distension", category: "SYMPTOM" },
  "C_RED_FACE": { name: "Red Face", category: "SYMPTOM" },
  "C_THIRST": { name: "Thirst", category: "SYMPTOM" },
  "C_OUTBURSTS_OF_ANGER": { name: "Propensity to Outbursts of Anger", category: "SYMPTOM" },
  "C_HICCUP": { name: "Hiccup", category: "SYMPTOM" },
  "C_BELCHING": { name: "Belching", category: "SYMPTOM" },
  "C_CHURNING_STOMACH": { name: "Churning Feeling in the Stomach", category: "SYMPTOM" },
  "C_BREAST_DISTENSION": { name: "Breast Distension", category: "SYMPTOM" },
  "C_VOMITING_OF_BLOOD": { name: "Vomiting of Blood", category: "SYMPTOM" },
  "C_NOSEBLEED": { name: "Nosebleed", category: "SYMPTOM" },
  "C_PAINFUL_PERIODS": { name: "Painful Periods", category: "SYMPTOM" },
  "C_DARK_CLOTTED_MENSES": { name: "Dark and Clotted Menstrual Blood", category: "SYMPTOM" },
  "C_INFERTILITY": { name: "Infertility", category: "SYMPTOM" },
  "C_FIXED_ABDOMINAL_MASSES": { name: "Fixed Masses in the Abdomen", category: "SYMPTOM" },
  "C_PURPLE_NAILS": { name: "Purple Nails", category: "SYMPTOM" },
  "C_PURPLE_LIPS": { name: "Purple Lips", category: "SYMPTOM" },
  "C_PURPLE_DARK_COMPLEXION": { name: "Purple or Dark Complexion", category: "SYMPTOM" },
  "C_PURPLE_PETECHIAE": { name: "Purple Petechiae", category: "SYMPTOM" },
  "C_TINNITUS": { name: "Tinnitus", category: "SYMPTOM" },
  "C_DEAFNESS": { name: "Deafness", category: "SYMPTOM" },
  "C_TEMPORAL_HEADACHE": { name: "Temporal Headache", category: "SYMPTOM" },
  "C_RED_EYES": { name: "Red Eyes", category: "SYMPTOM" },
  "C_CONSTIPATION_DRY_STOOLS": { name: "Constipation with Dry Stools", category: "SYMPTOM" },
  "C_COUGHING_OF_BLOOD": { name: "Coughing of Blood", category: "SYMPTOM" },
  "C_HYPOCHONDRIAL_ABDOMINAL_FULLNESS": { name: "Fullness of the Hypochondrium and Abdomen", category: "SYMPTOM" },
  "C_YELLOW_VAGINAL_DISCHARGE": { name: "Yellow Vaginal Discharge", category: "SYMPTOM" },
  "C_VAGINAL_ITCHING": { name: "Vaginal Itching", category: "SYMPTOM" },
  "C_VULVAR_SORES_ECZEMA": { name: "Vulvar Eczema or Sores", category: "SYMPTOM" },
  "C_MID_CYCLE_BLEEDING_PAIN": { name: "Mid-cycle Bleeding and/or Pain", category: "SYMPTOM" },
  "C_SCROTAL_REDNESS_SWELLING": { name: "Redness and Swelling of the Scrotum", category: "SYMPTOM" },
  "C_GENITAL_ITCHING_RASH": { name: "Genital Skin Rashes and Itching", category: "SYMPTOM" },
  "C_URINARY_DIFFICULTY": { name: "Urinary Difficulty", category: "SYMPTOM" },
  "C_BURNING_URINATION": { name: "Burning on Urination", category: "SYMPTOM" },

  // --- NEW ATOMIC TONGUE & PULSE PROPERTIES ---
  "C_RED_SIDES_TONGUE": { name: "Red Sides of the Tongue", category: "TONGUE" },
  "C_PURPLE_TONGUE": { name: "Purple Tongue Body", category: "TONGUE" },
  "C_PURPLE_SIDES_TONGUE": { name: "Purple Sides of the Tongue", category: "TONGUE" },
  "C_DRY_COATING": { name: "Dry Tongue Coating", category: "TONGUE" },
  "C_FULL_PULSE": { name: "Full Pulse", category: "PULSE" },
  "C_FIRM_PULSE": { name: "Firm Pulse", category: "PULSE" },
  
    // --- NEW LIVER PATTERNS (BATCH 4) ---
  "C_LIVER_YANG_RISING": { name: "Liver-Yang Rising", category: "PATTERN" },
  "C_EXTREME_HEAT_GENERATING_WIND": { name: "Extreme Heat Generating Wind", category: "PATTERN" },
  "C_LIVER_YANG_RISING_GENERATING_WIND": { name: "Liver-Yang Rising Generating Wind", category: "PATTERN" },

  // --- NEW SYMPTOMS (BATCH 4) ---
  "C_CONTRACTION_OF_SCROTUM_TESTIS": { name: "Contraction of Scrotum or Straining of Testis", category: "SYMPTOM" },
  "C_VOMITING_CLEAR_WATERY_FLUID_OR_DRY_VOMITING": { name: "Vomiting of Clear Watery Fluid or Dry Vomiting", category: "SYMPTOM" },
  "C_FEELING_OF_HEAT_IN_EVENING": { name: "Feeling of Heat in the Evening", category: "SYMPTOM" },
  "C_STIFF_NECK": { name: "Stiff Neck", category: "SYMPTOM" },
  "C_HIGH_FEVER": { name: "High Fever", category: "SYMPTOM" },
  "C_CONVULSIONS": { name: "Convulsions", category: "SYMPTOM" },
  "C_TREMOR_OF_LIMBS": { name: "Tremor of Limbs", category: "SYMPTOM" },
  "C_OPISTHOTONOS": { name: "Opisthotonos", category: "SYMPTOM" },
  "C_COMA": { name: "Coma", category: "SYMPTOM" },
  "C_FACIAL_TIC": { name: "Facial Tic", category: "SYMPTOM" },
  "C_HYPERTENSION": { name: "Hypertension", category: "SYMPTOM" },
  "C_BACKACHE": { name: "Lower Backache", category: "SYMPTOM" },
  "C_SCANTY_URINATION": { name: "Scanty Urination", category: "SYMPTOM" },

  // --- NEW ATOMIC TONGUE & PULSE PROPERTIES (BATCH 4) ---
  // New Liver Patterns
  "C_STAG_COLD_LIVER_CHANNEL": { name: "Stagnation of Cold in the Liver Channel", category: "PATTERN" },
  "C_LIVER_YIN_DEFICIENCY": { name: "Liver-Yin Deficiency", category: "PATTERN" },

  // New Clinical Symptoms
  "C_HYPOGASTRIC_DISTENSION_PAIN": { name: "Fullness, Distension and Pain in the Hypogastrium", category: "SYMPTOM" },
  "C_PAIN_REFERRING_TO_SCROTUM_TESTIS": { name: "Genital Pain Pulling Downwards", category: "SYMPTOM" },
  "C_PAIN_ALLEVIATED_BY_WARMTH": { name: "Pain Alleviated by Warmth", category: "SYMPTOM" },
  "C_CONTRACTION_OF_SCROTUM": { name: "Contraction of Genitals and Scrotum", category: "SYMPTOM" },
  "C_VOMITING_CLEAR_WATERY_FLUID": { name: "Vomiting of Clear Watery Fluid or Dry Retching", category: "SYMPTOM" },
  "C_SHRINKING_OF_VAGINA": { name: "Shrinking of the Vagina", category: "SYMPTOM" },
  "C_MALAR_FLUSH": { name: "Malar Flush", category: "SYMPTOM" },
  "C_HEAT_IN_EVENING": { name: "Feeling of Heat in the Evening", category: "SYMPTOM" },
  "C_THIRST_SIPPING": { name: "Thirst with Desire to Drink in Small Sips", category: "SYMPTOM" },
  "C_THROBBING_HEADACHE": { name: "Throbbing Headache", category: "SYMPTOM" },
  "C_DRY_MOUTH_AND_THROAT": { name: "Dry Mouth and Throat", category: "SYMPTOM" },
  "C_FEELING_WORKED_UP": { name: "Feeling Worked-up", category: "SYMPTOM" },

  // Atomic Tongue & Pulse Indicators
  "C_NORMAL_COLOR_TONGUE": { name: "Normal-coloured Tongue Body", category: "TONGUE" },
  "C_NO_COATING": { name: "No Tongue Coating", category: "TONGUE" },
  "C_ROOTLESS_COATING": { name: "Rootless Tongue Coating", category: "TONGUE" },
  "C_DEEP_RED_TONGUE": { name: "Deep-Red Tongue Body", category: "TONGUE" },
  "C_STIFF_TONGUE": { name: "Stiff Tongue Body", category: "TONGUE" },
    "C_HYPOGASTRIC_FULLNESS_DISTENSION": {
      "name": "Fullness and distension of the hypogastrium",
      "category": "SYMPTOM"
    },
    "C_HYPOGASTRIC_PAIN_DOWN_GENITALS": {
      "name": "Hypogastric pain referring downwards to the scrotum and testis",
      "category": "SYMPTOM"
    },
    "C_PAIN_UP_HYPOCHONDRIUM": {
      "name": "Pain referring upwards to the hypochondrium",
      "category": "SYMPTOM"
    },
    "C_PAIN_ALLEV_WARMTH": {
      "name": "Pain alleviated by warmth",
      "category": "SYMPTOM"
    },
    "C_TESTIS_STRAINING_SCROTUM_CONTRACTION": {
      "name": "Straining of the testis or contraction of the scrotum",
      "category": "SYMPTOM"
    },
    "C_VERTICAL_HEADACHE": {
      "name": "Vertical headache",
      "category": "SYMPTOM"
    },
    "C_FEELING_COLD": {
      "name": "Feeling of cold",
      "category": "SYMPTOM"
    },
    "C_COLD_LIMBS": {
      "name": "Cold hands and feet",
      "category": "SYMPTOM"
    },
    "C_VOMITING_CLEAR_FLUID_OR_DRY": {
      "name": "Vomiting of clear watery fluid or dry vomiting",
      "category": "SYMPTOM"
    },
    "C_VAGINAL_SHRINKING": {
      "name": "Shrinking of the vagina",
      "category": "SYMPTOM"
    },
    "C_DIZZINESS": {
      "name": "Dizziness",
      "category": "SYMPTOM"
    },
    "C_NUMBNESS_TINGLING_LIMBS": {
      "name": "Numbness or tingling of limbs",
      "category": "SYMPTOM"
    },
    "C_INSOMNIA": {
      "name": "Insomnia",
      "category": "SYMPTOM"
    },
    "C_BLURRED_VISION": {
      "name": "Blurred vision",
      "category": "SYMPTOM"
    },
    "C_EYE_FLOATERS": {
      "name": "Floaters in eyes",
      "category": "SYMPTOM"
    },
    "C_DIMINISHED_NIGHT_VISION": {
      "name": "Diminished night vision",
      "category": "SYMPTOM"
    },
    "C_SCANTY_MENSTRUATION_AMENORRHOEA": {
      "name": "Scanty menstruation or amenorrhoea",
      "category": "SYMPTOM"
    },
    "C_DULL_PALE_COMPLEXION_NO_LUSTRE": {
      "name": "Dull-pale complexion without lustre",
      "category": "SYMPTOM"
    },
    "C_PALE_LIPS": {
      "name": "Pale lips",
      "category": "SYMPTOM"
    },
    "C_MUSCULAR_WEAKNESS": {
      "name": "Muscular weakness",
      "category": "SYMPTOM"
    },
    "C_CRAMPS": {
      "name": "Cramps",
      "category": "SYMPTOM"
    },
    "C_WITHERED_BRITTLE_NAILS": {
      "name": "Withered and brittle nails",
      "category": "SYMPTOM"
    },
    "C_DRY_HAIR_SKIN": {
      "name": "Dry hair and skin",
      "category": "SYMPTOM"
    },
    "C_DEPRESSION": {
      "name": "Depression",
      "category": "SYMPTOM"
    },
    "C_AIMLESSNESS": {
      "name": "Feeling of aimlessness",
      "category": "SYMPTOM"
    },
    "C_DRY_EYES": {
      "name": "Dry eyes",
      "category": "SYMPTOM"
    },
    "C_RED_CHEEKBONES": {
      "name": "Red cheekbones / malar flush",
      "category": "SYMPTOM"
    },
    "C_ANXIETY": {
      "name": "Anxiety / mental restlessness",
      "category": "SYMPTOM"
    },
    "C_EVENING_HEAT": {
      "name": "Feeling of heat in the evening or afternoon",
      "category": "SYMPTOM"
    },
    "C_NIGHT_SWEATING": {
      "name": "Night sweating",
      "category": "SYMPTOM"
    },
    "C_FIVE_PALM_HEAT": {
      "name": "Five-palm heat",
      "category": "SYMPTOM"
    },
    "C_THIRST_SIPS": {
      "name": "Thirst with desire to drink in small sips",
      "category": "SYMPTOM"
    },
    "C_HEAVY_MENSTRUAL_BLEEDING": {
      "name": "Heavy menstrual bleeding",
      "category": "SYMPTOM"
    },
    "C_PALE_TONGUE": {
      "name": "Pale tongue",
      "category": "TONGUE_SIGN"
    },
    "C_WET_TONGUE": {
      "name": "Wet tongue",
      "category": "TONGUE_SIGN"
    },
    "C_WHITE_TONGUE_COATING": {
      "name": "White tongue coating",
      "category": "TONGUE_SIGN"
    },
    "C_THIN_TONGUE": {
      "name": "Thin tongue",
      "category": "TONGUE_SIGN"
    },
    "C_DRY_TONGUE": {
      "name": "Dry tongue",
      "category": "TONGUE_SIGN"
    },
    "C_NORMAL_TONGUE_COLOUR": {
      "name": "Normal-coloured tongue",
      "category": "TONGUE_SIGN"
    },
    "C_NO_TONGUE_COATING": {
      "name": "Tongue without coating",
      "category": "TONGUE_SIGN"
    },
    "C_ROOTLESS_TONGUE_COATING": {
      "name": "Rootless tongue coating",
      "category": "TONGUE_SIGN"
    },
    "C_RED_TONGUE": {
      "name": "Red tongue",
      "category": "TONGUE_SIGN"
    },
    "C_PALE_TONGUE_SIDES": {
      "name": "Pale sides of the tongue",
      "category": "TONGUE_SIGN"
    },
    "C_ORANGEY_TONGUE_SIDES": {
      "name": "Orangey sides of the tongue",
      "category": "TONGUE_SIGN"
    },
    "C_DEEP_PULSE": {
      "name": "Deep pulse",
      "category": "PULSE_SIGN"
    },
    "C_WIRY_PULSE": {
      "name": "Wiry pulse",
      "category": "PULSE_SIGN"
    },
    "C_SLOW_PULSE": {
      "name": "Slow pulse",
      "category": "PULSE_SIGN"
    },
    "C_CHOPPY_PULSE": {
      "name": "Choppy pulse",
      "category": "PULSE_SIGN"
    },
    "C_FINE_PULSE": {
      "name": "Fine pulse",
      "category": "PULSE_SIGN"
    },
    "C_FLOATING_PULSE": {
      "name": "Floating pulse",
      "category": "PULSE_SIGN"
    },
    "C_EMPTY_PULSE": {
      "name": "Empty pulse",
      "category": "PULSE_SIGN"
    },
    "C_RAPID_PULSE": {
      "name": "Rapid pulse",
      "category": "PULSE_SIGN"
    },
    "C_STAGNATION_OF_COLD_IN_LIVER_CHANNEL": {
      "name": "Stagnation of Cold in the Liver Channel",
      "category": "PATTERN"
    },
    "C_LIVER_BLOOD_DEFICIENCY": {
      "name": "Liver-Blood Deficiency",
      "category": "PATTERN"
    },
    "C_LIVER_YIN_DEFICIENCY": {
      "name": "Liver-Yin Deficiency",
      "category": "PATTERN"
    },
    
    // --- CORE HEART PATTERNS ---
  "C_HEART_QI_DEFICIENCY": { name: "Heart Qi Deficiency", category: "PATTERN" },
  "C_HEART_BLOOD_DEFICIENCY": { name: "Heart Blood Deficiency", category: "PATTERN" },
  "C_HEART_YIN_DEFICIENCY": { name: "Heart Yin Deficiency", category: "PATTERN" },
  "C_HEART_FIRE_BLAZING": { name: "Heart Fire Blazing", category: "PATTERN" },

  // --- NEW HEART-SPECIFIC SYMPTOMS & TONGUE SIGNS ---
  "C_MOUTH_TONGUE_ULCERS": { name: "Mouth and Tongue Ulcers", category: "SYMPTOM" },
  "C_SEVERE_AGITATION": { name: "Severe Agitation and Restlessness", category: "SYMPTOM" },
  "C_RED_TIP_TONGUE": { name: "Red Tip of Tongue", category: "TONGUE" },
  "C_RED_TIP_SPOTS": { name: "Red Tip with Spots/Swelling", category: "TONGUE" },
  
  // --- CORE LUNG PATTERNS ---
  "C_LUNG_QI_DEFICIENCY": { name: "Lung Qi Deficiency", category: "PATTERN" },
  "C_LUNG_YIN_DEFICIENCY": { name: "Lung Yin Deficiency", category: "PATTERN" },
  "C_PHLEGM_HEAT_IN_LUNGS": { name: "Phlegm-Heat in the Lungs", category: "PATTERN" },

  // --- NEW LUNG-SPECIFIC SYMPTOMS ---
  "C_CLEAR_WATERY_SPUTUM": { name: "Clear Watery Sputum", category: "SYMPTOM" },
  "C_DRY_COUGH": { name: "Dry Cough", category: "SYMPTOM" },
  "C_SCANTY_SPUTUM": { name: "Scanty Sputum", category: "SYMPTOM" },
  "C_HOARSE_VOICE": { name: "Hoarse Voice", category: "SYMPTOM" },
  "C_YELLOW_SPUTUM": { name: "Profuse Yellow or Green Sputum", category: "SYMPTOM" },
  "C_CHEST_PAIN": { name: "Chest Pain", category: "SYMPTOM" },
  "C_FLARING_OF_NOSTRILS": { name: "Flaring of Nostrils", category: "SYMPTOM" },
  
  // --- CORE KIDNEY PATTERNS ---
  "C_KIDNEY_YIN_DEFICIENCY": { name: "Kidney Yin Deficiency", category: "PATTERN" },
  "C_KIDNEY_YANG_DEFICIENCY": { name: "Kidney Yang Deficiency", category: "PATTERN" },
  "C_KIDNEY_JING_DEFICIENCY": { name: "Kidney Essence (Jing) Deficiency", category: "PATTERN" },
  "C_KIDNEY_QI_NOT_FIRM": { name: "Kidney Qi Not Firm", category: "PATTERN" },

  // --- NEW KIDNEY-SPECIFIC SYMPTOMS ---
  "C_WEAK_KNEES": { name: "Sore and Weak Knees", category: "SYMPTOM" },
  "C_NIGHT_URINATION": { name: "Nocturia (Night Urination)", category: "SYMPTOM" },
  "C_INCONTINENCE": { name: "Urinary Incontinence", category: "SYMPTOM" },
  "C_DECREASED_LIBIDO": { name: "Decreased Libido", category: "SYMPTOM" },
  "C_PREMATURE_EJACULATION": { name: "Premature Ejaculation", category: "SYMPTOM" },
  "C_NOCTURNAL_EMISSIONS": { name: "Nocturnal Emissions", category: "SYMPTOM" },
  "C_HAIR_LOSS": { name: "Hair Loss", category: "SYMPTOM" },
  "C_PREMATURE_GREY_HAIR": { name: "Premature Greying of Hair", category: "SYMPTOM" },
  "C_BONE_PROBLEMS": { name: "Bone Problems or Brittle Bones", category: "SYMPTOM" },
  // --- CORE FU (HOLLOW) ORGAN PATTERNS ---
  "C_STOMACH_FIRE": { name: "Stomach Fire (Heat)", category: "PATTERN" },
  "C_STOMACH_YIN_DEFICIENCY": { name: "Stomach Yin Deficiency", category: "PATTERN" },
  "C_STOMACH_QI_REBELLION": { name: "Stomach Qi Rebellion", category: "PATTERN" },
  "C_COLD_INVADING_STOMACH": { name: "Cold Invading the Stomach", category: "PATTERN" },
  "C_LI_DAMP_HEAT": { name: "Damp-Heat in the Large Intestine", category: "PATTERN" },
  "C_LI_DRYNESS": { name: "Dryness in the Large Intestine", category: "PATTERN" },
  "C_SI_FULL_HEAT": { name: "Full Heat in the Small Intestine", category: "PATTERN" },
  "C_BLADDER_DAMP_HEAT": { name: "Damp-Heat in the Bladder", category: "PATTERN" },
  "C_GB_DAMP_HEAT": { name: "Damp-Heat in the Gallbladder", category: "PATTERN" },

  // --- NEW FU-SPECIFIC SYMPTOMS ---
  "C_FOUL_BREATH": { name: "Foul Breath (Halitosis)", category: "SYMPTOM" },
  "C_SWOLLEN_GUMS": { name: "Swollen or Bleeding Gums", category: "SYMPTOM" },
  "C_CONSTANT_HUNGER": { name: "Constant Hunger", category: "SYMPTOM" },
  "C_MUCUS_IN_STOOLS": { name: "Mucus or Blood in Stools", category: "SYMPTOM" },
  "C_TENESMUS": { name: "Tenesmus", category: "SYMPTOM" },
  "C_GRAVEL_IN_URINE": { name: "Gravel or Stones in Urine", category: "SYMPTOM" },
  
  // --- GALLBLADDER QI DEFICIENCY ---
  "C_GB_QI_DEFICIENCY": { name: "Gallbladder Qi Deficiency", category: "PATTERN" },
  "C_TIMIDITY": { name: "Timidity and Lack of Courage", category: "SYMPTOM" },
  "C_INDECISION": { name: "Indecision", category: "SYMPTOM" },
  
    // --- FIVE ELEMENT COMPOUND PATTERNS (WOOD OVERACTING ON EARTH) ---
  "C_LIVER_INVADING_SPLEEN": { name: "Liver Invading the Spleen", category: "PATTERN" },
  "C_LIVER_INVADING_STOMACH": { name: "Liver Invading the Stomach", category: "PATTERN" }

  
};

// Purely Semantic Relationships (For deduplication and expansion, NOT clinical diagnosis)
const TCM_RELATIONSHIPS = [
  { source: "C_IRRITABILITY", target: "C_FRUSTRATION", type: "SIMILAR_TO", strength: 0.8 },
  { source: "C_IRRITABILITY", target: "C_ANGER", type: "SIMILAR_TO", strength: 0.8 }
];

// Clinical Inference Rules (The Engine logic)
const TCM_INFERENCE_RULES = [
  {
    rule_id: "R_LIV_QI_STAG_1",
    conclusion: "C_LIVER_QI_STAGNATION",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6,
    conditions: [{ concept: "C_IRRITABILITY", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_QI_STAG_2",
    conclusion: "C_LIVER_QI_STAGNATION",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.5,
    conditions: [{ concept: "C_CHEST_TIGHTNESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_QI_STAG_3",
    conclusion: "C_LIVER_QI_STAGNATION",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.4,
    conditions: [{ concept: "C_STRESS", state: "PRESENT" }]
  },
  {
    // Note: Negated thirst alone doesn't trigger this; it acts as a placeholder for complex rules later.
    rule_id: "R_COLD_PATTERN_1",
    conclusion: "C_COLD_PATTERN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7,
    conditions: [
      { concept: "C_THIRST", state: "NEGATED" },
      { concept: "C_CHILLS", state: "PRESENT" } // Will not fire in our test phrase
    ]
  },
  
  
  // -------------------------------------------------------------
  // PATTERN 1: Spleen Qi Deficiency [6, 7]
  // -------------------------------------------------------------
  {
    rule_id: "R_SP_QI_DEF_STOOLS",
    conclusion: "C_SPLEEN_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Cardinal diagnostic tip [6]
    conditions: [{ concept: "C_LOOSE_STOOLS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_QI_DEF_TIRED",
    conclusion: "C_SPLEEN_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Cardinal diagnostic tip [6]
    conditions: [{ concept: "C_TIREDNESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_QI_DEF_APPETITE",
    conclusion: "C_SPLEEN_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Classic failed transformation symptom [12]
    conditions: [{ concept: "C_POOR_APPETITE", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_QI_DEF_DISTENSION",
    conclusion: "C_SPLEEN_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7,
    conditions: [{ concept: "C_ABDOMINAL_DISTENSION", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_QI_DEF_LIMBS",
    conclusion: "C_SPLEEN_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6, // Muscles lack nourishment [12]
    conditions: [{ concept: "C_WEAK_LIMBS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_QI_DEF_COMPLEXION",
    conclusion: "C_SPLEEN_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.5,
    conditions: [{ concept: "C_PALE_COMPLEXION", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_QI_DEF_TONGUE",
    conclusion: "C_SPLEEN_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6, // Classical Pale Tongue body [6]
    conditions: [{ concept: "C_PALE_TONGUE", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_QI_DEF_PULSE",
    conclusion: "C_SPLEEN_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6, // Classical Empty pulse [6]
    conditions: [{ concept: "C_EMPTY_PULSE", state: "PRESENT" }]
  },

  // -------------------------------------------------------------
  // PATTERN 2: Spleen Yang Deficiency [3, 7]
  // Requires Pale + Wet Tongue and Deep + Weak Pulse concurrently.
  // -------------------------------------------------------------
  {
    rule_id: "R_SP_YANG_DEF_COLD",
    conclusion: "C_SPLEEN_YANG_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Cardinal diagnostic tip [3]
    conditions: [{ concept: "C_FEELING_COLD", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_YANG_DEF_STOOLS",
    conclusion: "C_SPLEEN_YANG_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Cardinal diagnostic tip [3]
    conditions: [{ concept: "C_LOOSE_STOOLS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_YANG_DEF_TIRED",
    conclusion: "C_SPLEEN_YANG_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Cardinal diagnostic tip [3]
    conditions: [{ concept: "C_TIREDNESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_YANG_DEF_COLDLIMBS",
    conclusion: "C_SPLEEN_YANG_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Lack of Yang warming limbs [3]
    conditions: [{ concept: "C_COLD_LIMBS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_YANG_DEF_OEDEMA",
    conclusion: "C_SPLEEN_YANG_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Failed fluid transformation [13]
    conditions: [{ concept: "C_OEDEMA", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_YANG_DEF_TONGUE",
    conclusion: "C_SPLEEN_YANG_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Requires BOTH atomic tongue properties [7]
    conditions: [
      { concept: "C_PALE_TONGUE", state: "PRESENT" },
      { concept: "C_WET_TONGUE", state: "PRESENT" }
    ]
  },
  {
    rule_id: "R_SP_YANG_DEF_PULSE",
    conclusion: "C_SPLEEN_YANG_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Requires BOTH atomic pulse properties [7]
    conditions: [
      { concept: "C_DEEP_PULSE", state: "PRESENT" },
      { concept: "C_WEAK_PULSE", state: "PRESENT" }
    ]
  },

  // -------------------------------------------------------------
  // PATTERN 3: Spleen Qi Sinking [8, 14]
  // -------------------------------------------------------------
  {
    rule_id: "R_SP_SINK_BEARING",
    conclusion: "C_SPLEEN_QI_SINKING",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Cardinal diagnostic tip [14]
    conditions: [{ concept: "C_BEARING_DOWN_SENSATION", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_SINK_PROLAPSE",
    conclusion: "C_SPLEEN_QI_SINKING",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Direct structural manifestation of sinking [8]
    conditions: [{ concept: "C_ORGAN_PROLAPSE", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_SINK_URINARY",
    conclusion: "C_SPLEEN_QI_SINKING",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Sinking Qi unable to hold urine [15]
    conditions: [{ concept: "C_URINARY_FREQUENCY_URGENCY", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_SINK_DEPRESSION",
    conclusion: "C_SPLEEN_QI_SINKING",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6, // Mental depression due to Clear Yang not rising [8]
    conditions: [{ concept: "C_MENTAL_DEPRESSION", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_SINK_TONGUE",
    conclusion: "C_SPLEEN_QI_SINKING",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.5,
    conditions: [{ concept: "C_PALE_TONGUE", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_SINK_PULSE",
    conclusion: "C_SPLEEN_QI_SINKING",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Diagnostic tip requirement [14]
    conditions: [{ concept: "C_WEAK_PULSE", state: "PRESENT" }]
  },

  // -------------------------------------------------------------
  // PATTERN 4: Spleen Not Controlling Blood [9, 16]
  // -------------------------------------------------------------
  {
    rule_id: "R_SP_NOT_CTRL_BLEEDING_UT",
    conclusion: "C_SPLEEN_NOT_CONTROLLING_BLOOD",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Crucial clinical tip: Bleeding + Pale tongue + Fine pulse [16]
    conditions: [{ concept: "C_EXCESSIVE_UTERINE_BLEEDING", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_NOT_CTRL_SPOTS",
    conclusion: "C_SPLEEN_NOT_CONTROLLING_BLOOD",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // extravasation under the skin [9]
    conditions: [{ concept: "C_BLOOD_SPOTS_UNDER_SKIN", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_NOT_CTRL_ORIFICE",
    conclusion: "C_SPLEEN_NOT_CONTROLLING_BLOOD",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8,
    conditions: [{ concept: "C_BLOOD_IN_URINE_OR_STOOLS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_NOT_CTRL_COMPLEXION",
    conclusion: "C_SPLEEN_NOT_CONTROLLING_BLOOD",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6,
    conditions: [{ concept: "C_PALE_COMPLEXION", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_NOT_CTRL_TONGUE",
    conclusion: "C_SPLEEN_NOT_CONTROLLING_BLOOD",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.5,
    conditions: [{ concept: "C_PALE_TONGUE", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_NOT_CTRL_PULSE_WEAK",
    conclusion: "C_SPLEEN_NOT_CONTROLLING_BLOOD",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Fine or Weak pulse confirms deficient nature [16]
    conditions: [{ concept: "C_WEAK_PULSE", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_NOT_CTRL_PULSE_FINE",
    conclusion: "C_SPLEEN_NOT_CONTROLLING_BLOOD",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Fine or Weak pulse confirms deficient nature [16]
    conditions: [{ concept: "C_FINE_PULSE", state: "PRESENT" }]
  },

  // -------------------------------------------------------------
  // PATTERN 5: Spleen-Blood Deficiency [10, 11]
  // Requires Pale + Thin + Dry Tongue concurrently to reflect Blood lack.
  // -------------------------------------------------------------
  {
    rule_id: "R_SP_BLD_DEF_PERIODS",
    conclusion: "C_SPLEEN_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Diagnostic tip: Tiredness, distension, scanty periods [11]
    conditions: [{ concept: "C_SCANTY_PERIODS_AMENORRHOEA", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_BLD_DEF_BODY",
    conclusion: "C_SPLEEN_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Spleen-Blood fails to nourish body tissues, thin build [10, 17]
    conditions: [{ concept: "C_THIN_BODY", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_BLD_DEF_COMPLEXION",
    conclusion: "C_SPLEEN_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7,
    conditions: [{ concept: "C_PALE_COMPLEXION", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_BLD_DEF_INSOMNIA",
    conclusion: "C_SPLEEN_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6, // Heart-Blood is affected, causing Mind to wander [17]
    conditions: [{ concept: "C_INSOMNIA", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_BLD_DEF_TONGUE",
    conclusion: "C_SPLEEN_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Requires Pale, Thin, and Dry atomic conditions [10]
    conditions: [
      { concept: "C_PALE_TONGUE", state: "PRESENT" },
      { concept: "C_THIN_TONGUE", state: "PRESENT" },
      { concept: "C_DRY_TONGUE", state: "PRESENT" }
    ]
  },
  {
    rule_id: "R_SP_BLD_DEF_PULSE_CHOPPY",
    conclusion: "C_SPLEEN_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Choppy or Fine pulse [11]
    conditions: [{ concept: "C_CHOPPY_PULSE", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_BLD_DEF_PULSE_FINE",
    conclusion: "C_SPLEEN_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Choppy or Fine pulse [11]
    conditions: [{ concept: "C_FINE_PULSE", state: "PRESENT" }]
  },
  // -------------------------------------------------------------
  // PATTERN 1: Cold-Dampness Invading the Spleen
  // -------------------------------------------------------------
  {
    rule_id: "R_CD_INV_SP_FULLNESS",
    conclusion: "C_COLD_DAMPNESS_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Cardinal diagnostic tip component
    conditions: [{ concept: "C_EPIGASTRIC_ABDOMINAL_FULLNESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_CD_INV_SP_HEAVINESS",
    conclusion: "C_COLD_DAMPNESS_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Traditional Dampness signature
    conditions: [{ concept: "C_FEELING_OF_HEAVINESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_CD_INV_SP_COLD",
    conclusion: "C_COLD_DAMPNESS_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Relieved by heat
    conditions: [{ concept: "C_EPIGASTRIC_COLD_SENSATION", state: "PRESENT" }]
  },
  {
    rule_id: "R_CD_INV_SP_TASTE",
    conclusion: "C_COLD_DAMPNESS_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6,
    conditions: [{ concept: "C_TASTE_ALTERATION_SPLEEN", state: "PRESENT" }]
  },
  {
    rule_id: "R_CD_INV_SP_NOTHIRST",
    conclusion: "C_COLD_DAMPNESS_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6, // Damp obstruction prevents thirst
    conditions: [{ concept: "C_NO_THIRST", state: "PRESENT" }]
  },
  {
    rule_id: "R_CD_INV_SP_NAUSEA",
    conclusion: "C_COLD_DAMPNESS_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6, // Stomach Qi cannot descend
    conditions: [{ concept: "C_NAUSEA_VOMITING", state: "PRESENT" }]
  },
  {
    rule_id: "R_CD_INV_SP_DISCHARGE",
    conclusion: "C_COLD_DAMPNESS_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Dampness flowing downward
    conditions: [{ concept: "C_WHITE_VAGINAL_DISCHARGE", state: "PRESENT" }]
  },
  {
    rule_id: "R_CD_INV_SP_STOOLS",
    conclusion: "C_COLD_DAMPNESS_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.65, // Spleen transportation failure (Reused)
    conditions: [{ concept: "C_LOOSE_STOOLS", state: "PRESENT" }]
  },
  {
    rule_id: "R_CD_INV_SP_TIRED",
    conclusion: "C_COLD_DAMPNESS_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6, // Spleen Qi compromised (Reused)
    conditions: [{ concept: "C_TIREDNESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_CD_INV_SP_OEDEMA",
    conclusion: "C_COLD_DAMPNESS_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.65, // Failed fluid transformation (Reused)
    conditions: [{ concept: "C_OEDEMA", state: "PRESENT" }]
  },
  {
    rule_id: "R_CD_INV_SP_TONGUE",
    conclusion: "C_COLD_DAMPNESS_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Pale body with thick sticky white coating (Atomic Tongue properties)
    conditions: [
      { concept: "C_PALE_TONGUE", state: "PRESENT" },
      { concept: "C_STICKY_COATING", state: "PRESENT" },
      { concept: "C_WHITE_COATING", state: "PRESENT" }
    ]
  },
  {
    rule_id: "R_CD_INV_SP_PULSE",
    conclusion: "C_COLD_DAMPNESS_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Slippery and Slow (Atomic Pulse properties)
    conditions: [
      { concept: "C_SLIPPERY_PULSE", state: "PRESENT" },
      { concept: "C_SLOW_PULSE", state: "PRESENT" }
    ]
  },

  // -------------------------------------------------------------
  // PATTERN 2: Damp-Heat Invading the Spleen
  // -------------------------------------------------------------
  {
    rule_id: "R_DH_INV_SP_FULLNESS",
    conclusion: "C_DAMP_HEAT_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Cardinal diagnostic tip component
    conditions: [{ concept: "C_EPIGASTRIC_ABDOMINAL_FULLNESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_DH_INV_SP_PAIN",
    conclusion: "C_DAMP_HEAT_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75,
    conditions: [{ concept: "C_ABDOMINAL_PAIN", state: "PRESENT" }]
  },
  {
    rule_id: "R_DH_INV_SP_HEAVINESS",
    conclusion: "C_DAMP_HEAT_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Dampness signature
    conditions: [{ concept: "C_FEELING_OF_HEAVINESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_DH_INV_SP_THIRST",
    conclusion: "C_DAMP_HEAT_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Heat thirst but blocked by Dampness
    conditions: [{ concept: "C_THIRST_NO_DESIRE_TO_DRINK", state: "PRESENT" }]
  },
  {
    rule_id: "R_DH_INV_SP_STOOLS",
    conclusion: "C_DAMP_HEAT_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Offensive stools indicate Damp-Heat
    conditions: [{ concept: "C_LOOSE_STOOLS_WITH_ODOUR", state: "PRESENT" }]
  },
  {
    rule_id: "R_DH_INV_SP_ANUS",
    conclusion: "C_DAMP_HEAT_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Burning anus indicates heat infusing down
    conditions: [{ concept: "C_BURNING_ANUS", state: "PRESENT" }]
  },
  {
    rule_id: "R_DH_INV_SP_HEAT",
    conclusion: "C_DAMP_HEAT_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7,
    conditions: [{ concept: "C_FEELING_OF_HEAT", state: "PRESENT" }]
  },
  {
    rule_id: "R_DH_INV_SP_URINE",
    conclusion: "C_DAMP_HEAT_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7,
    conditions: [{ concept: "C_SCANTY_DARK_URINE", state: "PRESENT" }]
  },
  {
    rule_id: "R_DH_INV_SP_FEVER",
    conclusion: "C_DAMP_HEAT_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Low-grade fever worse in afternoon
    conditions: [{ concept: "C_LOW_GRADE_FEVER", state: "PRESENT" }]
  },
  {
    rule_id: "R_DH_INV_SP_COMPLEXION",
    conclusion: "C_DAMP_HEAT_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Dull tangerine-peel yellow
    conditions: [{ concept: "C_DULL_YELLOW_COMPLEXION", state: "PRESENT" }]
  },
  {
    rule_id: "R_DH_INV_SP_SCLERA",
    conclusion: "C_DAMP_HEAT_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Jaundice eyes
    conditions: [{ concept: "C_YELLOW_SCLERA", state: "PRESENT" }]
  },
  {
    rule_id: "R_DH_INV_SP_SWEAT",
    conclusion: "C_DAMP_HEAT_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.65,
    conditions: [{ concept: "C_OILY_SWEAT", state: "PRESENT" }]
  },
  {
    rule_id: "R_DH_INV_SP_BITTER",
    conclusion: "C_DAMP_HEAT_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7,
    conditions: [{ concept: "C_BITTER_TASTE", state: "PRESENT" }]
  },
  {
    rule_id: "R_DH_INV_SP_ERUPTIONS",
    conclusion: "C_DAMP_HEAT_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Damp-Heat manifesting in skin
    conditions: [{ concept: "C_SKIN_ERUPTIONS", state: "PRESENT" }]
  },
  {
    rule_id: "R_DH_INV_SP_NAUSEA",
    conclusion: "C_DAMP_HEAT_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.65,
    conditions: [{ concept: "C_NAUSEA_VOMITING", state: "PRESENT" }]
  },
  {
    rule_id: "R_DH_INV_SP_TONGUE",
    conclusion: "C_DAMP_HEAT_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Red body with sticky yellow coating (Atomic Tongue properties)
    conditions: [
      { concept: "C_RED_TONGUE", state: "PRESENT" },
      { concept: "C_STICKY_COATING", state: "PRESENT" },
      { concept: "C_YELLOW_COATING", state: "PRESENT" }
    ]
  },
  {
    rule_id: "R_DH_INV_SP_PULSE",
    conclusion: "C_DAMP_HEAT_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Slippery and Rapid (Atomic Pulse properties)
    conditions: [
      { concept: "C_SLIPPERY_PULSE", state: "PRESENT" },
      { concept: "C_RAPID_PULSE", state: "PRESENT" }
    ]
  },

  // -------------------------------------------------------------
  // PATTERN 3: Spleen- and Heart-Blood Deficiency
  // -------------------------------------------------------------
  {
    rule_id: "R_SP_HT_BLD_PALP",
    conclusion: "C_SPLEEN_AND_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Key symptom (Diagnostic Tip)
    conditions: [{ concept: "C_PALPITATIONS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_HT_BLD_INSOMNIA",
    conclusion: "C_SPLEEN_AND_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Key symptom (Diagnostic Tip - Reused)
    conditions: [{ concept: "C_INSOMNIA", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_HT_BLD_STOOLS",
    conclusion: "C_SPLEEN_AND_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Key symptom (Diagnostic Tip - Reused)
    conditions: [{ concept: "C_LOOSE_STOOLS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_HT_BLD_PERIODS",
    conclusion: "C_SPLEEN_AND_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Key symptom (Diagnostic Tip - Reused)
    conditions: [{ concept: "C_SCANTY_PERIODS_AMENORRHOEA", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_HT_BLD_DIZZY",
    conclusion: "C_SPLEEN_AND_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // General Blood deficiency sign
    conditions: [{ concept: "C_DIZZINESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_HT_BLD_MEMORY",
    conclusion: "C_SPLEEN_AND_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Heart Blood fails to nourish brain
    conditions: [{ concept: "C_POOR_MEMORY", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_HT_BLD_ANXIETY",
    conclusion: "C_SPLEEN_AND_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Mind unanchored
    conditions: [{ concept: "C_ANXIETY", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_HT_BLD_STARTLE",
    conclusion: "C_SPLEEN_AND_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7,
    conditions: [{ concept: "C_PROPENSITY_TO_BE_STARTLED", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_HT_BLD_TIRED",
    conclusion: "C_SPLEEN_AND_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Reused
    conditions: [{ concept: "C_TIREDNESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_HT_BLD_LIMBS",
    conclusion: "C_SPLEEN_AND_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.65, // Muscles lack nourishment (Reused)
    conditions: [{ concept: "C_WEAK_LIMBS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_HT_BLD_APPETITE",
    conclusion: "C_SPLEEN_AND_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.65, // Reused
    conditions: [{ concept: "C_POOR_APPETITE", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_HT_BLD_COMPLEXION",
    conclusion: "C_SPLEEN_AND_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6, // Dull-pale face (Reused)
    conditions: [{ concept: "C_PALE_COMPLEXION", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_HT_BLD_TONGUE",
    conclusion: "C_SPLEEN_AND_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Pale and Thin (Atomic Tongue properties)
    conditions: [
      { concept: "C_PALE_TONGUE", state: "PRESENT" },
      { concept: "C_THIN_TONGUE", state: "PRESENT" }
    ]
  },
  {
    rule_id: "R_SP_HT_BLD_PULSE_CHOPPY",
    conclusion: "C_SPLEEN_AND_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Choppy pulse reflects Blood deficiency (Reused)
    conditions: [{ concept: "C_CHOPPY_PULSE", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_HT_BLD_PULSE_FINE",
    conclusion: "C_SPLEEN_AND_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Fine pulse reflects Blood deficiency (Reused)
    conditions: [{ concept: "C_FINE_PULSE", state: "PRESENT" }]
  },

  // -------------------------------------------------------------
  // PATTERN 4: Spleen- and Lung-Qi Deficiency
  // -------------------------------------------------------------
  {
    rule_id: "R_SP_LU_QI_APPETITE",
    conclusion: "C_SPLEEN_AND_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Key symptom (Diagnostic Tip - Reused)
    conditions: [{ concept: "C_POOR_APPETITE", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LU_QI_TIRED",
    conclusion: "C_SPLEEN_AND_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Key symptom (Diagnostic Tip - Reused)
    conditions: [{ concept: "C_TIREDNESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LU_QI_BREATHLESS",
    conclusion: "C_SPLEEN_AND_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Key symptom (Diagnostic Tip)
    conditions: [{ concept: "C_BREATHLESSNESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LU_QI_COUGH",
    conclusion: "C_SPLEEN_AND_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Lung Qi fails to descend
    conditions: [{ concept: "C_COUGH", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LU_QI_VOICE",
    conclusion: "C_SPLEEN_AND_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Gathering Qi failure (Reused)
    conditions: [{ concept: "C_WEAK_VOICE", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LU_QI_SWEATING",
    conclusion: "C_SPLEEN_AND_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Defensive Qi cannot hold sweat
    conditions: [{ concept: "C_SPONTANEOUS_SWEATING", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LU_QI_COLDS",
    conclusion: "C_SPLEEN_AND_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Weak exterior defense
    conditions: [{ concept: "C_PROPENSITY_TO_CATCH_COLDS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LU_QI_DISLIKECOLD",
    conclusion: "C_SPLEEN_AND_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.65, // Reused
    conditions: [{ concept: "C_FEELING_COLD", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LU_QI_OBESITY",
    conclusion: "C_SPLEEN_AND_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6, // Dampness accumulating due to Spleen failure
    conditions: [{ concept: "C_OBESITY_TENDENCY", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LU_QI_DISTENSION",
    conclusion: "C_SPLEEN_AND_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.65, // Reused
    conditions: [{ concept: "C_ABDOMINAL_DISTENSION", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LU_QI_STOOLS",
    conclusion: "C_SPLEEN_AND_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.65, // Reused
    conditions: [{ concept: "C_LOOSE_STOOLS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LU_QI_LIMBS",
    conclusion: "C_SPLEEN_AND_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.65, // Reused
    conditions: [{ concept: "C_WEAK_LIMBS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LU_QI_TONGUE",
    conclusion: "C_SPLEEN_AND_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6, // Reused
    conditions: [{ concept: "C_PALE_TONGUE", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LU_QI_PULSE",
    conclusion: "C_SPLEEN_AND_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Right side empty pulse (Reused)
    conditions: [{ concept: "C_EMPTY_PULSE", state: "PRESENT" }]
  },

  // -------------------------------------------------------------
  // PATTERN 5: Spleen- and Liver-Blood Deficiency
  // -------------------------------------------------------------
  {
    rule_id: "R_SP_LV_BLD_STOOLS",
    conclusion: "C_SPLEEN_AND_LIVER_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Key symptom (Diagnostic Tip - Reused)
    conditions: [{ concept: "C_LOOSE_STOOLS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LV_BLD_PERIODS",
    conclusion: "C_SPLEEN_AND_LIVER_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Key symptom (Diagnostic Tip - Reused)
    conditions: [{ concept: "C_SCANTY_PERIODS_AMENORRHOEA", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LV_BLD_BLURRED",
    conclusion: "C_SPLEEN_AND_LIVER_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Key symptom (Diagnostic Tip)
    conditions: [{ concept: "C_BLURRED_VISION", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LV_BLD_NUMB",
    conclusion: "C_SPLEEN_AND_LIVER_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Sinews lack nourishment
    conditions: [{ concept: "C_NUMBNESS_TINGLING_LIMBS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LV_BLD_FLOATERS",
    conclusion: "C_SPLEEN_AND_LIVER_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7,
    conditions: [{ concept: "C_EYE_FLOATERS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LV_BLD_NIGHTVIS",
    conclusion: "C_SPLEEN_AND_LIVER_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7,
    conditions: [{ concept: "C_DIMINISHED_NIGHT_VISION", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LV_BLD_CRAMPS",
    conclusion: "C_SPLEEN_AND_LIVER_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7,
    conditions: [{ concept: "C_MUSCLE_CRAMPS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LV_BLD_NAILS",
    conclusion: "C_SPLEEN_AND_LIVER_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Nails reflect Liver-Blood
    conditions: [{ concept: "C_WITHERED_BRITTLE_NAILS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LV_BLD_DRYHAIR",
    conclusion: "C_SPLEEN_AND_LIVER_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.65, // Long standing Blood deficiency causes dryness
    conditions: [{ concept: "C_DRY_HAIR_SKIN", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LV_BLD_AIMLESS",
    conclusion: "C_SPLEEN_AND_LIVER_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.65, // Hun lacks anchorage
    conditions: [{ concept: "C_AIMLESSNESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LV_BLD_TIRED",
    conclusion: "C_SPLEEN_AND_LIVER_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.65, // Reused
    conditions: [{ concept: "C_TIREDNESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LV_BLD_APPETITE",
    conclusion: "C_SPLEEN_AND_LIVER_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.65, // Reused
    conditions: [{ concept: "C_POOR_APPETITE", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LV_BLD_DISTENSION",
    conclusion: "C_SPLEEN_AND_LIVER_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6, // Reused
    conditions: [{ concept: "C_ABDOMINAL_DISTENSION", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LV_BLD_TONGUE",
    conclusion: "C_SPLEEN_AND_LIVER_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Pale body, orange sides, dry (Atomic Tongue properties)
    conditions: [
      { concept: "C_PALE_TONGUE", state: "PRESENT" },
      { concept: "C_ORANGE_SIDES_TONGUE", state: "PRESENT" },
      { concept: "C_DRY_TONGUE", state: "PRESENT" }
    ]
  },
  {
    rule_id: "R_SP_LV_BLD_PULSE_CHOPPY",
    conclusion: "C_SPLEEN_AND_LIVER_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Reused
    conditions: [{ concept: "C_CHOPPY_PULSE", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_LV_BLD_PULSE_FINE",
    conclusion: "C_SPLEEN_AND_LIVER_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Reused
    conditions: [{ concept: "C_FINE_PULSE", state: "PRESENT" }]
  },

  // -------------------------------------------------------------
  // PATTERN 6: Obstruction of Spleen by Dampness with Stagnation of Liver-Qi
  // -------------------------------------------------------------
  {
    rule_id: "R_SP_DAMP_LV_QI_OPPR",
    conclusion: "C_OBSTRUCTION_OF_SPLEEN_BY_DAMPNESS_WITH_LIVER_QI_STAG",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Key symptom (Diagnostic Tip)
    conditions: [{ concept: "C_OPPRESSION_OF_EPIGASTRIUM", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_DAMP_LV_QI_DIST",
    conclusion: "C_OBSTRUCTION_OF_SPLEEN_BY_DAMPNESS_WITH_LIVER_QI_STAG",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Key symptom (Diagnostic Tip)
    conditions: [{ concept: "C_EPIGASTRIC_HYPOCHONDRIAL_DISTENSION", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_DAMP_LV_QI_PAIN",
    conclusion: "C_OBSTRUCTION_OF_SPLEEN_BY_DAMPNESS_WITH_LIVER_QI_STAG",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Stagnation in hypochondrium
    conditions: [{ concept: "C_HYPOCHONDRIAL_PAIN", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_DAMP_LV_QI_TASTE",
    conclusion: "C_OBSTRUCTION_OF_SPLEEN_BY_DAMPNESS_WITH_LIVER_QI_STAG",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Dampness signature
    conditions: [{ concept: "C_STICKY_TASTE", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_DAMP_LV_QI_IRRIT",
    conclusion: "C_OBSTRUCTION_OF_SPLEEN_BY_DAMPNESS_WITH_LIVER_QI_STAG",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Liver-Qi stagnation emotional trait
    conditions: [{ concept: "C_IRRITABILITY", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_DAMP_LV_QI_HEAVY",
    conclusion: "C_OBSTRUCTION_OF_SPLEEN_BY_DAMPNESS_WITH_LIVER_QI_STAG",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Dampness signature
    conditions: [{ concept: "C_FEELING_OF_HEAVINESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_DAMP_LV_QI_DRYMOUTH",
    conclusion: "C_OBSTRUCTION_OF_SPLEEN_BY_DAMPNESS_WITH_LIVER_QI_STAG",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Heat begins to form from obstruction
    conditions: [{ concept: "C_DRY_MOUTH_NO_THIRST", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_DAMP_LV_QI_APPETITE",
    conclusion: "C_OBSTRUCTION_OF_SPLEEN_BY_DAMPNESS_WITH_LIVER_QI_STAG",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.65, // Reused
    conditions: [{ concept: "C_POOR_APPETITE", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_DAMP_LV_QI_STOOLS",
    conclusion: "C_OBSTRUCTION_OF_SPLEEN_BY_DAMPNESS_WITH_LIVER_QI_STAG",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.65, // Reused
    conditions: [{ concept: "C_LOOSE_STOOLS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_DAMP_LV_QI_NAUSEA",
    conclusion: "C_OBSTRUCTION_OF_SPLEEN_BY_DAMPNESS_WITH_LIVER_QI_STAG",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.65,
    conditions: [{ concept: "C_NAUSEA_VOMITING", state: "PRESENT" }]
  },
  {
    rule_id: "R_SP_DAMP_LV_QI_TONGUE",
    conclusion: "C_OBSTRUCTION_OF_SPLEEN_BY_DAMPNESS_WITH_LIVER_QI_STAG",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Thick sticky yellow coating (Atomic Tongue properties)
    conditions: [
      { concept: "C_THICK_COATING", state: "PRESENT" },
      { concept: "C_STICKY_COATING", state: "PRESENT" },
      { concept: "C_YELLOW_COATING", state: "PRESENT" }
    ]
  },
  {
    rule_id: "R_SP_DAMP_LV_QI_PULSE",
    conclusion: "C_OBSTRUCTION_OF_SPLEEN_BY_DAMPNESS_WITH_LIVER_QI_STAG",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Slippery-Wiry pulse (Atomic Pulse properties)
    conditions: [
      { concept: "C_SLIPPERY_PULSE", state: "PRESENT" },
      { concept: "C_WIRY_PULSE", state: "PRESENT" }
    ]
  },
  
 {
    rule_id: "R_ST_SP_QI_DEF_APPETITE",
    conclusion: "C_STOMACH_AND_SPLEEN_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8,
    conditions: [{ concept: "C_POOR_APPETITE", state: "PRESENT" }]
  },
  {
    rule_id: "R_ST_SP_QI_DEF_EPIG_DISC",
    conclusion: "C_STOMACH_AND_SPLEEN_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8,
    conditions: [{ concept: "C_EPIGASTRIC_DISCOMFORT", state: "PRESENT" }]
  },
  {
    rule_id: "R_ST_SP_QI_DEF_TIREDNESS",
    conclusion: "C_STOMACH_AND_SPLEEN_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8,
    conditions: [{ concept: "C_TIREDNESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_ST_SP_QI_DEF_DISTENSION",
    conclusion: "C_STOMACH_AND_SPLEEN_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7,
    conditions: [{ concept: "C_ABDOMINAL_DISTENSION", state: "PRESENT" }]
  },
  {
    rule_id: "R_ST_SP_QI_DEF_LIMBS",
    conclusion: "C_STOMACH_AND_SPLEEN_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7,
    conditions: [{ concept: "C_WEAK_LIMBS", state: "PRESENT" }]
  },
  {
    rule_id: "R_ST_SP_QI_DEF_STOOLS",
    conclusion: "C_STOMACH_AND_SPLEEN_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7,
    conditions: [{ concept: "C_LOOSE_STOOLS", state: "PRESENT" }]
  },
  {
    rule_id: "R_ST_SP_QI_DEF_LACK_TASTE",
    conclusion: "C_STOMACH_AND_SPLEEN_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7,
    conditions: [{ concept: "C_LACK_OF_TASTE_SENSATION", state: "PRESENT" }]
  },
  {
    rule_id: "R_ST_SP_QI_DEF_COMPLEXION",
    conclusion: "C_STOMACH_AND_SPLEEN_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6,
    conditions: [{ concept: "C_PALE_COMPLEXION", state: "PRESENT" }]
  },
  {
    rule_id: "R_ST_SP_QI_DEF_TONGUE",
    conclusion: "C_STOMACH_AND_SPLEEN_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6,
    conditions: [{ concept: "C_PALE_TONGUE", state: "PRESENT" }]
  },
  {
    rule_id: "R_ST_SP_QI_DEF_PULSE",
    conclusion: "C_STOMACH_AND_SPLEEN_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6,
    conditions: [{ concept: "C_EMPTY_PULSE", state: "PRESENT" }]
  },
  
// -------------------------------------------------------------
  // PATTERN 1: Liver-Qi Stagnation
  // -------------------------------------------------------------
  {
    rule_id: "R_LIV_QI_STAG_DISTENSION",
    conclusion: "C_LIVER_QI_STAGNATION",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Diagnostic tip: Feeling of distension and a Wiry pulse diagnose this.
    conditions: [{ concept: "C_EPIGASTRIC_HYPOCHONDRIAL_DISTENSION", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_QI_STAG_WIRY",
    conclusion: "C_LIVER_QI_STAGNATION",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Diagnostic tip: Feeling of distension and a Wiry pulse diagnose this.
    conditions: [{ concept: "C_WIRY_PULSE", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_QI_STAG_DEPRESSION",
    conclusion: "C_LIVER_QI_STAGNATION",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Cardinal psychic level stagnation manifestation
    conditions: [{ concept: "C_MENTAL_DEPRESSION", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_QI_STAG_SIGH",
    conclusion: "C_LIVER_QI_STAGNATION",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Spontaneous way to release stagnant chest Qi
    conditions: [{ concept: "C_SIGHING", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_QI_STAG_LUMP",
    conclusion: "C_LIVER_QI_STAGNATION",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Plum-stone Qi in the throat
    conditions: [{ concept: "C_LUMP_IN_THROAT", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_QI_STAG_PMT",
    conclusion: "C_LIVER_QI_STAGNATION",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Stagnation affecting Directing/Penetrating vessels
    conditions: [{ concept: "C_PREMENSTRUAL_TENSION", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_QI_STAG_BREAST",
    conclusion: "C_LIVER_QI_STAGNATION",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Breast distension under the Liver channel pathway
    conditions: [{ concept: "C_PREMENSTRUAL_BREAST_DISTENSION", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_QI_STAG_IRREGULAR",
    conclusion: "C_LIVER_QI_STAGNATION",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Stagnation in Uterus
    conditions: [{ concept: "C_IRREGULAR_PERIODS", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_QI_STAG_TONGUE",
    conclusion: "C_LIVER_QI_STAGNATION",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6, // Normal body, Red sides in severe/long-standing cases
    conditions: [{ concept: "C_RED_SIDES_TONGUE", state: "PRESENT" }]
  },

  // -------------------------------------------------------------
  // PATTERN 2: Stagnant Liver-Qi Turning into Heat
  // Requires Wiry + Rapid pulse concurrently.
  // -------------------------------------------------------------
  {
    rule_id: "R_LIV_QI_HEAT_TONGUE",
    conclusion: "C_STAGNANT_LIVER_QI_TURNING_INTO_HEAT",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Diagnostic tip: Distension, Wiry pulse, and Red sides
    conditions: [{ concept: "C_RED_SIDES_TONGUE", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_QI_HEAT_DIST",
    conclusion: "C_STAGNANT_LIVER_QI_TURNING_INTO_HEAT",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Diagnostic tip requirement
    conditions: [{ concept: "C_EPIGASTRIC_HYPOCHONDRIAL_DISTENSION", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_QI_HEAT_PULSE",
    conclusion: "C_STAGNANT_LIVER_QI_TURNING_INTO_HEAT",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Diagnostic tip requirement (Wiry and slightly Rapid pulse)
    conditions: [
      { concept: "C_WIRY_PULSE", state: "PRESENT" },
      { concept: "C_RAPID_PULSE", state: "PRESENT" }
    ]
  },
  {
    rule_id: "R_LIV_QI_HEAT_OUTBURSTS",
    conclusion: "C_STAGNANT_LIVER_QI_TURNING_INTO_HEAT",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Heat makes emotional stasis manifest as outbursts
    conditions: [{ concept: "C_OUTBURSTS_OF_ANGER", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_QI_HEAT_FEELING",
    conclusion: "C_STAGNANT_LIVER_QI_TURNING_INTO_HEAT",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Subjective heat sensation
    conditions: [{ concept: "C_FEELING_OF_HEAT", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_QI_HEAT_FACE",
    conclusion: "C_STAGNANT_LIVER_QI_TURNING_INTO_HEAT",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Heat rising to complexion
    conditions: [{ concept: "C_RED_FACE", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_QI_HEAT_THIRST",
    conclusion: "C_STAGNANT_LIVER_QI_TURNING_INTO_HEAT",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Heat consuming fluids
    conditions: [{ concept: "C_THIRST", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_QI_HEAT_BLEED",
    conclusion: "C_STAGNANT_LIVER_QI_TURNING_INTO_HEAT",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Heavy periods due to heat in Blood
    conditions: [{ concept: "C_EXCESSIVE_UTERINE_BLEEDING", state: "PRESENT" }]
  },

  // -------------------------------------------------------------
  // PATTERN 3: Rebellious Liver-Qi
  // -------------------------------------------------------------
  {
    rule_id: "R_REBEL_LIV_QI_BELCH",
    conclusion: "C_REBELLIOUS_LIVER_QI",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Diagnostic tip: Belching, irritability, and a Wiry pulse
    conditions: [{ concept: "C_BELCHING", state: "PRESENT" }]
  },
  {
    rule_id: "R_REBEL_LIV_QI_IRRIT",
    conclusion: "C_REBELLIOUS_LIVER_QI",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Diagnostic tip requirement
    conditions: [{ concept: "C_IRRITABILITY", state: "PRESENT" }]
  },
  {
    rule_id: "R_REBEL_LIV_QI_WIRY",
    conclusion: "C_REBELLIOUS_LIVER_QI",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Diagnostic tip requirement
    conditions: [{ concept: "C_WIRY_PULSE", state: "PRESENT" }]
  },
  {
    rule_id: "R_REBEL_LIV_QI_NAUSEA",
    conclusion: "C_REBELLIOUS_LIVER_QI",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Horizontal movement prevents descent of Stomach-Qi
    conditions: [{ concept: "C_NAUSEA_VOMITING", state: "PRESENT" }]
  },
  {
    rule_id: "R_REBEL_LIV_QI_HICCUP",
    conclusion: "C_REBELLIOUS_LIVER_QI",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Subverted Stomach descending flow
    conditions: [{ concept: "C_HICCUP", state: "PRESENT" }]
  },
  {
    rule_id: "R_REBEL_LIV_QI_CHURN",
    conclusion: "C_REBELLIOUS_LIVER_QI",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Epigastric churn
    conditions: [{ concept: "C_CHURNING_STOMACH", state: "PRESENT" }]
  },
  {
    rule_id: "R_REBEL_LIV_QI_DIST",
    conclusion: "C_REBELLIOUS_LIVER_QI",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Hypochondrial or epigastric distension
    conditions: [{ concept: "C_EPIGASTRIC_HYPOCHONDRIAL_DISTENSION", state: "PRESENT" }]
  },
  {
    rule_id: "R_REBEL_LIV_QI_BREAST",
    conclusion: "C_REBELLIOUS_LIVER_QI",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Upward rebellion affecting the breasts
    conditions: [{ concept: "C_BREAST_DISTENSION", state: "PRESENT" }]
  },

  // -------------------------------------------------------------
  // PATTERN 4: Liver-Blood Stasis
  // Requires Purple + Purple Sides tongue concurrently.
  // -------------------------------------------------------------
  {
    rule_id: "R_LIV_BLOOD_STASIS_PAIN",
    conclusion: "C_LIVER_BLOOD_STASIS",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Diagnostic tip: Stabbing pain and a Purple tongue
    conditions: [{ concept: "C_HYPOCHONDRIAL_PAIN", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_BLOOD_STASIS_TONGUE",
    conclusion: "C_LIVER_BLOOD_STASIS",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Diagnostic tip requirement (Purple especially on the sides)
    conditions: [
      { concept: "C_PURPLE_TONGUE", state: "PRESENT" },
      { concept: "C_PURPLE_SIDES_TONGUE", state: "PRESENT" }
    ]
  },
  {
    rule_id: "R_LIV_BLOOD_STASIS_CLOTS",
    conclusion: "C_LIVER_BLOOD_STASIS",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Cardinal menstrual sign
    conditions: [{ concept: "C_DARK_CLOTTED_MENSES", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_BLOOD_STASIS_DYSM",
    conclusion: "C_LIVER_BLOOD_STASIS",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Stabbing premenstrual / menstrual pain
    conditions: [{ concept: "C_PAINFUL_PERIODS", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_BLOOD_STASIS_MASS",
    conclusion: "C_LIVER_BLOOD_STASIS",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Immobile fixed masses in the abdomen
    conditions: [{ concept: "C_FIXED_ABDOMINAL_MASSES", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_BLOOD_STASIS_PULSE_WIRY",
    conclusion: "C_LIVER_BLOOD_STASIS",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7,
    conditions: [{ concept: "C_WIRY_PULSE", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_BLOOD_STASIS_PULSE_FIRM",
    conclusion: "C_LIVER_BLOOD_STASIS",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Confined pulse typical of Blood stasis
    conditions: [{ concept: "C_FIRM_PULSE", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_BLOOD_STASIS_HEM",
    conclusion: "C_LIVER_BLOOD_STASIS",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Hematemesis or Epistaxis from stasis block in channel
    conditions: [{ concept: "C_VOMITING_OF_BLOOD", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_BLOOD_STASIS_PERIPH",
    conclusion: "C_LIVER_BLOOD_STASIS",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Purple lips, nails, and complexion
    conditions: [{ concept: "C_PURPLE_LIPS", state: "PRESENT" }]
  },

  // -------------------------------------------------------------
  // PATTERN 5: Liver-Fire Blazing
  // Requires Red + Red Sides tongue and Full + Wiry + Rapid pulse concurrently.
  // -------------------------------------------------------------
  {
    rule_id: "R_LIV_FIRE_HEADACHE",
    conclusion: "C_LIVER_FIRE_BLAZING",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Diagnostic tip key symptom
    conditions: [{ concept: "C_TEMPORAL_HEADACHE", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_FIRE_EYES",
    conclusion: "C_LIVER_FIRE_BLAZING",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Diagnostic tip key symptom
    conditions: [{ concept: "C_RED_EYES", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_FIRE_TONGUE",
    conclusion: "C_LIVER_FIRE_BLAZING",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Diagnostic tip: Red body, redder sides, dry yellow coating
    conditions: [
      { concept: "C_RED_TONGUE", state: "PRESENT" },
      { concept: "C_RED_SIDES_TONGUE", state: "PRESENT" },
      { concept: "C_YELLOW_COATING", state: "PRESENT" },
      { concept: "C_DRY_COATING", state: "PRESENT" }
    ]
  },
  {
    rule_id: "R_LIV_FIRE_PULSE",
    conclusion: "C_LIVER_FIRE_BLAZING",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Full-Wiry-Rapid pulse quality
    conditions: [
      { concept: "C_FULL_PULSE", state: "PRESENT" },
      { concept: "C_WIRY_PULSE", state: "PRESENT" },
      { concept: "C_RAPID_PULSE", state: "PRESENT" }
    ]
  },
  {
    rule_id: "R_LIV_FIRE_BITTER",
    conclusion: "C_LIVER_FIRE_BLAZING",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Bitter taste present all day (distinguishes from HT fire)
    conditions: [{ concept: "C_BITTER_TASTE", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_FIRE_TINNITUS",
    conclusion: "C_LIVER_FIRE_BLAZING",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // High-pitched sudden whistle
    conditions: [{ concept: "C_TINNITUS", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_FIRE_ANGER",
    conclusion: "C_LIVER_FIRE_BLAZING",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Pronounced outbursts of anger due to Fire disturbing mind
    conditions: [{ concept: "C_OUTBURSTS_OF_ANGER", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_FIRE_BOWELS",
    conclusion: "C_LIVER_FIRE_BLAZING",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Fire dries up fluids in intestines
    conditions: [{ concept: "C_CONSTIPATION_DRY_STOOLS", state: "PRESENT" }]
  },

  // -------------------------------------------------------------
  // PATTERN 6: Damp-Heat in the Liver
  // Requires Red + Red Sides tongue and Slippery + Wiry + Rapid pulse concurrently.
  // -------------------------------------------------------------
  {
    rule_id: "R_DH_LIV_FULL",
    conclusion: "C_DAMP_HEAT_IN_LIVER",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Diagnostic tip key symptom (hypochondrial and abdominal fullness)
    conditions: [{ concept: "C_HYPOCHONDRIAL_ABDOMINAL_FULLNESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_DH_LIV_HEAVY",
    conclusion: "C_DAMP_HEAT_IN_LIVER",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Diagnostic tip key symptom (heaviness)
    conditions: [{ concept: "C_FEELING_OF_HEAVINESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_DH_LIV_TONGUE",
    conclusion: "C_DAMP_HEAT_IN_LIVER",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Diagnostic tip: Red body, redder sides, sticky yellow coating
    conditions: [
      { concept: "C_RED_TONGUE", state: "PRESENT" },
      { concept: "C_RED_SIDES_TONGUE", state: "PRESENT" },
      { concept: "C_STICKY_COATING", state: "PRESENT" },
      { concept: "C_YELLOW_COATING", state: "PRESENT" }
    ]
  },
  {
    rule_id: "R_DH_LIV_PULSE",
    conclusion: "C_DAMP_HEAT_IN_LIVER",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Slippery-Wiry-Rapid pulse quality
    conditions: [
      { concept: "C_SLIPPERY_PULSE", state: "PRESENT" },
      { concept: "C_WIRY_PULSE", state: "PRESENT" },
      { concept: "C_RAPID_PULSE", state: "PRESENT" }
    ]
  },
  {
    rule_id: "R_DH_LIV_DISCHARGE",
    conclusion: "C_DAMP_HEAT_IN_LIVER",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Genital symptoms distinguish from general DH
    conditions: [{ concept: "C_YELLOW_VAGINAL_DISCHARGE", state: "PRESENT" }]
  },
  {
    rule_id: "R_DH_LIV_GEN_ITCH",
    conclusion: "C_DAMP_HEAT_IN_LIVER",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Genital skin rashes and itching
    conditions: [{ concept: "C_GENITAL_ITCHING_RASH", state: "PRESENT" }]
  },
  {
    rule_id: "R_DH_LIV_SCROTUM",
    conclusion: "C_DAMP_HEAT_IN_LIVER",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Redness and swelling of scrotum
    conditions: [{ concept: "C_SCROTAL_REDNESS_SWELLING", state: "PRESENT" }]
  },
  {
    rule_id: "R_DH_LIV_URINE",
    conclusion: "C_DAMP_HEAT_IN_LIVER",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Burning and difficulty on urination
    conditions: [{ concept: "C_BURNING_URINATION", state: "PRESENT" }]
  },
  
      {
      "rule_id": "R_STAGNATION_OF_COLD_IN_LIVER_CHANNEL",
      "conclusion": "C_STAGNATION_OF_COLD_IN_LIVER_CHANNEL",
      "type": "CLINICAL_INFERENCE",
      "conditions": [
        {
          "concept": "C_HYPOGASTRIC_FULLNESS_DISTENSION",
          "state": "PRESENT",
          "base_weight": 0.6
        },
        {
          "concept": "C_HYPOGASTRIC_PAIN_DOWN_GENITALS",
          "state": "PRESENT",
          "base_weight": 0.8
        },
        {
          "concept": "C_PAIN_UP_HYPOCHONDRIUM",
          "state": "PRESENT",
          "base_weight": 0.6
        },
        {
          "concept": "C_PAIN_ALLEV_WARMTH",
          "state": "PRESENT",
          "base_weight": 0.7
        },
        {
          "concept": "C_TESTIS_STRAINING_SCROTUM_CONTRACTION",
          "state": "PRESENT",
          "base_weight": 0.7
        },
        {
          "concept": "C_VERTICAL_HEADACHE",
          "state": "PRESENT",
          "base_weight": 0.6
        },
        {
          "concept": "C_FEELING_COLD",
          "state": "PRESENT",
          "base_weight": 0.6
        },
        {
          "concept": "C_COLD_LIMBS",
          "state": "PRESENT",
          "base_weight": 0.8
        },
        {
          "concept": "C_VOMITING_CLEAR_FLUID_OR_DRY",
          "state": "PRESENT",
          "base_weight": 0.5
        },
        {
          "concept": "C_VAGINAL_SHRINKING",
          "state": "PRESENT",
          "base_weight": 0.5
        },
        {
          "concept": "C_PALE_TONGUE",
          "state": "PRESENT",
          "base_weight": 0.6
        },
        {
          "concept": "C_WET_TONGUE",
          "state": "PRESENT",
          "base_weight": 0.6
        },
        {
          "concept": "C_WHITE_TONGUE_COATING",
          "state": "PRESENT",
          "base_weight": 0.6
        },
        {
          "concept": "C_DEEP_PULSE",
          "state": "PRESENT",
          "base_weight": 0.8
        },
        {
          "concept": "C_WIRY_PULSE",
          "state": "PRESENT",
          "base_weight": 0.8
        },
        {
          "concept": "C_SLOW_PULSE",
          "state": "PRESENT",
          "base_weight": 0.8
        }
      ]
    },
    {
      "rule_id": "R_LIVER_BLOOD_DEFICIENCY",
      "conclusion": "C_LIVER_BLOOD_DEFICIENCY",
      "type": "CLINICAL_INFERENCE",
      "conditions": [
        {
          "concept": "C_DIZZINESS",
          "state": "PRESENT",
          "base_weight": 0.6
        },
        {
          "concept": "C_NUMBNESS_TINGLING_LIMBS",
          "state": "PRESENT",
          "base_weight": 0.7
        },
        {
          "concept": "C_INSOMNIA",
          "state": "PRESENT",
          "base_weight": 0.6
        },
        {
          "concept": "C_BLURRED_VISION",
          "state": "PRESENT",
          "base_weight": 0.8
        },
        {
          "concept": "C_EYE_FLOATERS",
          "state": "PRESENT",
          "base_weight": 0.7
        },
        {
          "concept": "C_DIMINISHED_NIGHT_VISION",
          "state": "PRESENT",
          "base_weight": 0.6
        },
        {
          "concept": "C_SCANTY_MENSTRUATION_AMENORRHOEA",
          "state": "PRESENT",
          "base_weight": 0.8
        },
        {
          "concept": "C_DULL_PALE_COMPLEXION_NO_LUSTRE",
          "state": "PRESENT",
          "base_weight": 0.8
        },
        {
          "concept": "C_PALE_LIPS",
          "state": "PRESENT",
          "base_weight": 0.6
        },
        {
          "concept": "C_MUSCULAR_WEAKNESS",
          "state": "PRESENT",
          "base_weight": 0.6
        },
        {
          "concept": "C_CRAMPS",
          "state": "PRESENT",
          "base_weight": 0.7
        },
        {
          "concept": "C_WITHERED_BRITTLE_NAILS",
          "state": "PRESENT",
          "base_weight": 0.6
        },
        {
          "concept": "C_DRY_HAIR_SKIN",
          "state": "PRESENT",
          "base_weight": 0.5
        },
        {
          "concept": "C_DEPRESSION",
          "state": "PRESENT",
          "base_weight": 0.5
        },
        {
          "concept": "C_AIMLESSNESS",
          "state": "PRESENT",
          "base_weight": 0.5
        },
        {
          "concept": "C_PALE_TONGUE",
          "state": "PRESENT",
          "base_weight": 0.8
        },
        {
          "concept": "C_PALE_TONGUE_SIDES",
          "state": "PRESENT",
          "base_weight": 0.8
        },
        {
          "concept": "C_ORANGEY_TONGUE_SIDES",
          "state": "PRESENT",
          "base_weight": 0.8
        },
        {
          "concept": "C_THIN_TONGUE",
          "state": "PRESENT",
          "base_weight": 0.6
        },
        {
          "concept": "C_DRY_TONGUE",
          "state": "PRESENT",
          "base_weight": 0.5
        },
        {
          "concept": "C_CHOPPY_PULSE",
          "state": "PRESENT",
          "base_weight": 0.8
        },
        {
          "concept": "C_FINE_PULSE",
          "state": "PRESENT",
          "base_weight": 0.8
        }
      ]
    },
    {
      "rule_id": "R_LIVER_YIN_DEFICIENCY",
      "conclusion": "C_LIVER_YIN_DEFICIENCY",
      "type": "CLINICAL_INFERENCE",
      "conditions": [
        {
          "concept": "C_DIZZINESS",
          "state": "PRESENT",
          "base_weight": 0.6
        },
        {
          "concept": "C_NUMBNESS_TINGLING_LIMBS",
          "state": "PRESENT",
          "base_weight": 0.7
        },
        {
          "concept": "C_INSOMNIA",
          "state": "PRESENT",
          "base_weight": 0.6
        },
        {
          "concept": "C_BLURRED_VISION",
          "state": "PRESENT",
          "base_weight": 0.8
        },
        {
          "concept": "C_EYE_FLOATERS",
          "state": "PRESENT",
          "base_weight": 0.7
        },
        {
          "concept": "C_DRY_EYES",
          "state": "PRESENT",
          "base_weight": 0.8
        },
        {
          "concept": "C_DIMINISHED_NIGHT_VISION",
          "state": "PRESENT",
          "base_weight": 0.6
        },
        {
          "concept": "C_SCANTY_MENSTRUATION_AMENORRHOEA",
          "state": "PRESENT",
          "base_weight": 0.8
        },
        {
          "concept": "C_DULL_PALE_COMPLEXION_NO_LUSTRE",
          "state": "PRESENT",
          "base_weight": 0.8
        },
        {
          "concept": "C_RED_CHEEKBONES",
          "state": "PRESENT",
          "base_weight": 0.8
        },
        {
          "concept": "C_MUSCULAR_WEAKNESS",
          "state": "PRESENT",
          "base_weight": 0.6
        },
        {
          "concept": "C_CRAMPS",
          "state": "PRESENT",
          "base_weight": 0.7
        },
        {
          "concept": "C_WITHERED_BRITTLE_NAILS",
          "state": "PRESENT",
          "base_weight": 0.6
        },
        {
          "concept": "C_DRY_HAIR_SKIN",
          "state": "PRESENT",
          "base_weight": 0.5
        },
        {
          "concept": "C_DEPRESSION",
          "state": "PRESENT",
          "base_weight": 0.5
        },
        {
          "concept": "C_AIMLESSNESS",
          "state": "PRESENT",
          "base_weight": 0.5
        },
        {
          "concept": "C_NORMAL_TONGUE_COLOUR",
          "state": "PRESENT",
          "base_weight": 0.6
        },
        {
          "concept": "C_NO_TONGUE_COATING",
          "state": "PRESENT",
          "base_weight": 0.8
        },
        {
          "concept": "C_ROOTLESS_TONGUE_COATING",
          "state": "PRESENT",
          "base_weight": 0.7
        },
        {
          "concept": "C_FLOATING_PULSE",
          "state": "PRESENT",
          "base_weight": 0.8
        },
        {
          "concept": "C_EMPTY_PULSE",
          "state": "PRESENT",
          "base_weight": 0.8
        },
        {
          "concept": "C_ANXIETY",
          "state": "PRESENT",
          "base_weight": 0.6
        },
        {
          "concept": "C_EVENING_HEAT",
          "state": "PRESENT",
          "base_weight": 0.7
        },
        {
          "concept": "C_NIGHT_SWEATING",
          "state": "PRESENT",
          "base_weight": 0.8
        },
        {
          "concept": "C_FIVE_PALM_HEAT",
          "state": "PRESENT",
          "base_weight": 0.7
        },
        {
          "concept": "C_THIRST_SIPS",
          "state": "PRESENT",
          "base_weight": 0.7
        },
        {
          "concept": "C_HEAVY_MENSTRUAL_BLEEDING",
          "state": "PRESENT",
          "base_weight": 0.7
        },
        {
          "concept": "C_RED_TONGUE",
          "state": "PRESENT",
          "base_weight": 0.8
        },
        {
          "concept": "C_RAPID_PULSE",
          "state": "PRESENT",
          "base_weight": 0.8
        }
        ]
        },
        
        // -------------------------------------------------------------
  // HEART PATTERN 1: Heart Qi Deficiency
  // -------------------------------------------------------------
  {
    rule_id: "R_HT_QI_DEF_PALP",
    conclusion: "C_HEART_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Cardinal Heart sign
    conditions: [{ concept: "C_PALPITATIONS", state: "PRESENT" }]
  },
  {
    rule_id: "R_HT_QI_DEF_SOB",
    conclusion: "C_HEART_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Zong Qi (Gathering Qi) weakness
    conditions: [{ concept: "C_BREATHLESSNESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_HT_QI_DEF_SWEAT",
    conclusion: "C_HEART_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Qi failing to hold sweat
    conditions: [{ concept: "C_SPONTANEOUS_SWEATING", state: "PRESENT" }]
  },
  {
    rule_id: "R_HT_QI_DEF_TIRED",
    conclusion: "C_HEART_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6, // Reused general Qi def sign
    conditions: [{ concept: "C_TIREDNESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_HT_QI_DEF_PULSE",
    conclusion: "C_HEART_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7,
    conditions: [{ concept: "C_EMPTY_PULSE", state: "PRESENT" }]
  },

  // -------------------------------------------------------------
  // HEART PATTERN 2: Heart Blood Deficiency
  // -------------------------------------------------------------
  {
    rule_id: "R_HT_BLD_DEF_PALP",
    conclusion: "C_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8,
    conditions: [{ concept: "C_PALPITATIONS", state: "PRESENT" }]
  },
  {
    rule_id: "R_HT_BLD_DEF_INSOMNIA",
    conclusion: "C_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Blood failing to anchor the Mind
    conditions: [{ concept: "C_INSOMNIA", state: "PRESENT" }]
  },
  {
    rule_id: "R_HT_BLD_DEF_MEMORY",
    conclusion: "C_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7,
    conditions: [{ concept: "C_POOR_MEMORY", state: "PRESENT" }]
  },
  {
    rule_id: "R_HT_BLD_DEF_ANXIETY",
    conclusion: "C_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7,
    conditions: [{ concept: "C_ANXIETY", state: "PRESENT" }]
  },
  {
    rule_id: "R_HT_BLD_DEF_LIPS",
    conclusion: "C_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6, // Reused Blood def sign
    conditions: [{ concept: "C_PALE_LIPS", state: "PRESENT" }]
  },
  {
    rule_id: "R_HT_BLD_DEF_TONGUE",
    conclusion: "C_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7,
    conditions: [{ concept: "C_PALE_TONGUE", state: "PRESENT" }]
  },
  {
    rule_id: "R_HT_BLD_DEF_PULSE_CHOPPY",
    conclusion: "C_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Choppy or Fine
    conditions: [{ concept: "C_CHOPPY_PULSE", state: "PRESENT" }]
  },
  {
    rule_id: "R_HT_BLD_DEF_PULSE_FINE",
    conclusion: "C_HEART_BLOOD_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Choppy or Fine
    conditions: [{ concept: "C_FINE_PULSE", state: "PRESENT" }]
  },

  // -------------------------------------------------------------
  // HEART PATTERN 3: Heart Yin Deficiency
  // -------------------------------------------------------------
  {
    rule_id: "R_HT_YIN_DEF_PALP",
    conclusion: "C_HEART_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8,
    conditions: [{ concept: "C_PALPITATIONS", state: "PRESENT" }]
  },
  {
    rule_id: "R_HT_YIN_DEF_INSOMNIA",
    conclusion: "C_HEART_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Yin failing to anchor Mind at night
    conditions: [{ concept: "C_INSOMNIA", state: "PRESENT" }]
  },
  {
    rule_id: "R_HT_YIN_DEF_NIGHT_SWEAT",
    conclusion: "C_HEART_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Classic Yin deficiency sign
    conditions: [{ concept: "C_NIGHT_SWEATING", state: "PRESENT" }]
  },
  {
    rule_id: "R_HT_YIN_DEF_FIVE_PALM",
    conclusion: "C_HEART_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, 
    conditions: [{ concept: "C_FIVE_PALM_HEAT", state: "PRESENT" }]
  },
  {
    rule_id: "R_HT_YIN_DEF_TONGUE",
    conclusion: "C_HEART_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Red body, Red tip, No coating
    conditions: [
      { concept: "C_RED_TONGUE", state: "PRESENT" },
      { concept: "C_RED_TIP_TONGUE", state: "PRESENT" },
      { concept: "C_NO_COATING", state: "PRESENT" }
    ]
  },
  {
    rule_id: "R_HT_YIN_DEF_PULSE",
    conclusion: "C_HEART_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Rapid + Empty/Floating
    conditions: [
      { concept: "C_RAPID_PULSE", state: "PRESENT" },
      { concept: "C_EMPTY_PULSE", state: "PRESENT" }
    ]
  },

  // -------------------------------------------------------------
  // HEART PATTERN 4: Heart Fire Blazing
  // -------------------------------------------------------------
  {
    rule_id: "R_HT_FIRE_PALP",
    conclusion: "C_HEART_FIRE_BLAZING",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8,
    conditions: [{ concept: "C_PALPITATIONS", state: "PRESENT" }]
  },
  {
    rule_id: "R_HT_FIRE_ULCERS",
    conclusion: "C_HEART_FIRE_BLAZING",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Key diagnostic tip: Heart opens to the tongue
    conditions: [{ concept: "C_MOUTH_TONGUE_ULCERS", state: "PRESENT" }]
  },
  {
    rule_id: "R_HT_FIRE_AGITATION",
    conclusion: "C_HEART_FIRE_BLAZING",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Fire severely disturbing the Mind
    conditions: [{ concept: "C_SEVERE_AGITATION", state: "PRESENT" }]
  },
  {
    rule_id: "R_HT_FIRE_THIRST",
    conclusion: "C_HEART_FIRE_BLAZING",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7,
    conditions: [{ concept: "C_THIRST", state: "PRESENT" }]
  },
  {
    rule_id: "R_HT_FIRE_URINE",
    conclusion: "C_HEART_FIRE_BLAZING",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Heat transferring to Small Intestine
    conditions: [{ concept: "C_SCANTY_DARK_URINE", state: "PRESENT" }]
  },
  {
    rule_id: "R_HT_FIRE_TONGUE",
    conclusion: "C_HEART_FIRE_BLAZING",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Red tip with swelling or spots
    conditions: [
      { concept: "C_RED_TONGUE", state: "PRESENT" },
      { concept: "C_RED_TIP_SPOTS", state: "PRESENT" },
      { concept: "C_YELLOW_COATING", state: "PRESENT" }
    ]
  },
  {
    rule_id: "R_HT_FIRE_PULSE",
    conclusion: "C_HEART_FIRE_BLAZING",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Full and Rapid
    conditions: [
      { concept: "C_FULL_PULSE", state: "PRESENT" },
      { concept: "C_RAPID_PULSE", state: "PRESENT" }
    ]
  },
  // -------------------------------------------------------------
  // LUNG PATTERN 1: Lung Qi Deficiency
  // -------------------------------------------------------------
  {
    rule_id: "R_LU_QI_DEF_BREATH",
    conclusion: "C_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Cardinal diagnostic tip (Gathering Qi weakness)
    conditions: [{ concept: "C_BREATHLESSNESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_LU_QI_DEF_VOICE",
    conclusion: "C_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Cardinal diagnostic tip
    conditions: [{ concept: "C_WEAK_VOICE", state: "PRESENT" }]
  },
  {
    rule_id: "R_LU_QI_DEF_COUGH",
    conclusion: "C_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Lung Qi failing to descend
    conditions: [{ concept: "C_COUGH", state: "PRESENT" }]
  },
  {
    rule_id: "R_LU_QI_DEF_SPUTUM",
    conclusion: "C_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Fluid accumulation due to Qi def
    conditions: [{ concept: "C_CLEAR_WATERY_SPUTUM", state: "PRESENT" }]
  },
  {
    rule_id: "R_LU_QI_DEF_SWEAT",
    conclusion: "C_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Defensive Qi failing to hold pores
    conditions: [{ concept: "C_SPONTANEOUS_SWEATING", state: "PRESENT" }]
  },
  {
    rule_id: "R_LU_QI_DEF_COLDS",
    conclusion: "C_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Defensive Qi weakness
    conditions: [{ concept: "C_PROPENSITY_TO_CATCH_COLDS", state: "PRESENT" }]
  },
  {
    rule_id: "R_LU_QI_DEF_TONGUE",
    conclusion: "C_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6,
    conditions: [{ concept: "C_PALE_TONGUE", state: "PRESENT" }]
  },
  {
    rule_id: "R_LU_QI_DEF_PULSE",
    conclusion: "C_LUNG_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Empty pulse, especially on the right front position
    conditions: [{ concept: "C_EMPTY_PULSE", state: "PRESENT" }]
  },

  // -------------------------------------------------------------
  // LUNG PATTERN 2: Lung Yin Deficiency
  // -------------------------------------------------------------
  {
    rule_id: "R_LU_YIN_DEF_COUGH",
    conclusion: "C_LUNG_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Diagnostic tip key symptom
    conditions: [{ concept: "C_DRY_COUGH", state: "PRESENT" }]
  },
  {
    rule_id: "R_LU_YIN_DEF_HOARSE",
    conclusion: "C_LUNG_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Throat lacks moisture
    conditions: [{ concept: "C_HOARSE_VOICE", state: "PRESENT" }]
  },
  {
    rule_id: "R_LU_YIN_DEF_SPUTUM",
    conclusion: "C_LUNG_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Fluids are dried up
    conditions: [{ concept: "C_SCANTY_SPUTUM", state: "PRESENT" }]
  },
  {
    rule_id: "R_LU_YIN_DEF_DRY_MOUTH",
    conclusion: "C_LUNG_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, 
    conditions: [{ concept: "C_DRY_MOUTH_AND_THROAT", state: "PRESENT" }]
  },
  {
    rule_id: "R_LU_YIN_DEF_BLOOD",
    conclusion: "C_LUNG_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Empty-Heat damages vessels
    conditions: [{ concept: "C_COUGHING_OF_BLOOD", state: "PRESENT" }]
  },
  {
    rule_id: "R_LU_YIN_DEF_NIGHT_SWEAT",
    conclusion: "C_LUNG_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Classic Yin def sign
    conditions: [{ concept: "C_NIGHT_SWEATING", state: "PRESENT" }]
  },
  {
    rule_id: "R_LU_YIN_DEF_TONGUE",
    conclusion: "C_LUNG_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Red body, peeled coating
    conditions: [
      { concept: "C_RED_TONGUE", state: "PRESENT" },
      { concept: "C_NO_COATING", state: "PRESENT" }
    ]
  },
  {
    rule_id: "R_LU_YIN_DEF_PULSE",
    conclusion: "C_LUNG_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Fine-Rapid pulse
    conditions: [
      { concept: "C_FINE_PULSE", state: "PRESENT" },
      { concept: "C_RAPID_PULSE", state: "PRESENT" }
    ]
  },

  // -------------------------------------------------------------
  // LUNG PATTERN 3: Phlegm-Heat in the Lungs
  // -------------------------------------------------------------
  {
    rule_id: "R_PHLEGM_HEAT_LU_COUGH",
    conclusion: "C_PHLEGM_HEAT_IN_LUNGS",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Often described as barking
    conditions: [{ concept: "C_COUGH", state: "PRESENT" }]
  },
  {
    rule_id: "R_PHLEGM_HEAT_LU_SPUTUM",
    conclusion: "C_PHLEGM_HEAT_IN_LUNGS",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Cardinal sign of Heat cooking Phlegm
    conditions: [{ concept: "C_YELLOW_SPUTUM", state: "PRESENT" }]
  },
  {
    rule_id: "R_PHLEGM_HEAT_LU_SOB",
    conclusion: "C_PHLEGM_HEAT_IN_LUNGS",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Phlegm obstructing airways
    conditions: [{ concept: "C_BREATHLESSNESS", state: "PRESENT" }]
  },
  {
    rule_id: "R_PHLEGM_HEAT_LU_CHEST",
    conclusion: "C_PHLEGM_HEAT_IN_LUNGS",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, 
    conditions: [{ concept: "C_CHEST_PAIN", state: "PRESENT" }]
  },
  {
    rule_id: "R_PHLEGM_HEAT_LU_NOSTRILS",
    conclusion: "C_PHLEGM_HEAT_IN_LUNGS",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Classic physical sign of lung heat/obstruction
    conditions: [{ concept: "C_FLARING_OF_NOSTRILS", state: "PRESENT" }]
  },
  {
    rule_id: "R_PHLEGM_HEAT_LU_HEAT",
    conclusion: "C_PHLEGM_HEAT_IN_LUNGS",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Systemic heat
    conditions: [{ concept: "C_FEELING_OF_HEAT", state: "PRESENT" }]
  },
  {
    rule_id: "R_PHLEGM_HEAT_LU_TONGUE",
    conclusion: "C_PHLEGM_HEAT_IN_LUNGS",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Red body, thick sticky yellow coating
    conditions: [
      { concept: "C_RED_TONGUE", state: "PRESENT" },
      { concept: "C_THICK_COATING", state: "PRESENT" },
      { concept: "C_STICKY_COATING", state: "PRESENT" },
      { concept: "C_YELLOW_COATING", state: "PRESENT" }
    ]
  },
  {
    rule_id: "R_PHLEGM_HEAT_LU_PULSE",
    conclusion: "C_PHLEGM_HEAT_IN_LUNGS",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Slippery (Phlegm) and Rapid (Heat)
    conditions: [
      { concept: "C_SLIPPERY_PULSE", state: "PRESENT" },
      { concept: "C_RAPID_PULSE", state: "PRESENT" }
    ]
  }, 
  // -------------------------------------------------------------
  // KIDNEY PATTERN 1: Kidney Yin Deficiency
  // -------------------------------------------------------------
  {
    rule_id: "R_KID_YIN_DEF_BACK",
    conclusion: "C_KIDNEY_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Cardinal Kidney sign
    conditions: [{ concept: "C_BACKACHE", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_YIN_DEF_KNEES",
    conclusion: "C_KIDNEY_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Cardinal Kidney sign
    conditions: [{ concept: "C_WEAK_KNEES", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_YIN_DEF_TINNITUS",
    conclusion: "C_KIDNEY_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Kidneys open to the ears (gradual onset)
    conditions: [{ concept: "C_TINNITUS", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_YIN_DEF_NIGHT_SWEAT",
    conclusion: "C_KIDNEY_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Empty Heat sign
    conditions: [{ concept: "C_NIGHT_SWEATING", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_YIN_DEF_PALM_HEAT",
    conclusion: "C_KIDNEY_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75,
    conditions: [{ concept: "C_FIVE_PALM_HEAT", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_YIN_DEF_DRY_MOUTH",
    conclusion: "C_KIDNEY_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Especially at night
    conditions: [{ concept: "C_DRY_MOUTH_AND_THROAT", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_YIN_DEF_EMISSIONS",
    conclusion: "C_KIDNEY_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Empty heat disturbing the Jing Room
    conditions: [{ concept: "C_NOCTURNAL_EMISSIONS", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_YIN_DEF_TONGUE",
    conclusion: "C_KIDNEY_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Red + Peeled/No Coating
    conditions: [
      { concept: "C_RED_TONGUE", state: "PRESENT" },
      { concept: "C_NO_COATING", state: "PRESENT" }
    ]
  },
  {
    rule_id: "R_KID_YIN_DEF_PULSE",
    conclusion: "C_KIDNEY_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Floating-Empty and Rapid
    conditions: [
      { concept: "C_EMPTY_PULSE", state: "PRESENT" },
      { concept: "C_RAPID_PULSE", state: "PRESENT" }
    ]
  },

  // -------------------------------------------------------------
  // KIDNEY PATTERN 2: Kidney Yang Deficiency
  // -------------------------------------------------------------
  {
    rule_id: "R_KID_YANG_DEF_BACK",
    conclusion: "C_KIDNEY_YANG_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Cardinal Kidney sign
    conditions: [{ concept: "C_BACKACHE", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_YANG_DEF_KNEES",
    conclusion: "C_KIDNEY_YANG_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Often cold and weak
    conditions: [{ concept: "C_WEAK_KNEES", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_YANG_DEF_COLD",
    conclusion: "C_KIDNEY_YANG_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Ming Men fire failing to warm
    conditions: [{ concept: "C_FEELING_COLD", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_YANG_DEF_COLD_LIMBS",
    conclusion: "C_KIDNEY_YANG_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, 
    conditions: [{ concept: "C_COLD_LIMBS", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_YANG_DEF_LIBIDO",
    conclusion: "C_KIDNEY_YANG_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Ming Men fire decline
    conditions: [{ concept: "C_DECREASED_LIBIDO", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_YANG_DEF_INFERTILITY",
    conclusion: "C_KIDNEY_YANG_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Reused from Liver stasis, but common in cold uterus
    conditions: [{ concept: "C_INFERTILITY", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_YANG_DEF_NIGHT_URINE",
    conclusion: "C_KIDNEY_YANG_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Kidneys failing to manage fluids overnight
    conditions: [{ concept: "C_NIGHT_URINATION", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_YANG_DEF_OEDEMA",
    conclusion: "C_KIDNEY_YANG_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Reused from Spleen Yang def, often affects ankles
    conditions: [{ concept: "C_OEDEMA", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_YANG_DEF_TONGUE",
    conclusion: "C_KIDNEY_YANG_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Pale and Wet
    conditions: [
      { concept: "C_PALE_TONGUE", state: "PRESENT" },
      { concept: "C_WET_TONGUE", state: "PRESENT" }
    ]
  },
  {
    rule_id: "R_KID_YANG_DEF_PULSE",
    conclusion: "C_KIDNEY_YANG_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Deep and Weak
    conditions: [
      { concept: "C_DEEP_PULSE", state: "PRESENT" },
      { concept: "C_WEAK_PULSE", state: "PRESENT" }
    ]
  },

  // -------------------------------------------------------------
  // KIDNEY PATTERN 3: Kidney Essence (Jing) Deficiency
  // -------------------------------------------------------------
  {
    rule_id: "R_KID_JING_DEF_BACK",
    conclusion: "C_KIDNEY_JING_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Marrow fails to fill the bones
    conditions: [{ concept: "C_BACKACHE", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_JING_DEF_KNEES",
    conclusion: "C_KIDNEY_JING_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, 
    conditions: [{ concept: "C_WEAK_KNEES", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_JING_DEF_HAIR",
    conclusion: "C_KIDNEY_JING_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Hair is the manifestation of Kidney Jing
    conditions: [{ concept: "C_HAIR_LOSS", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_JING_DEF_GREY_HAIR",
    conclusion: "C_KIDNEY_JING_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8,
    conditions: [{ concept: "C_PREMATURE_GREY_HAIR", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_JING_DEF_BONES",
    conclusion: "C_KIDNEY_JING_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Kidneys govern the bones
    conditions: [{ concept: "C_BONE_PROBLEMS", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_JING_DEF_MEMORY",
    conclusion: "C_KIDNEY_JING_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Sea of Marrow (Brain) is undernourished
    conditions: [{ concept: "C_POOR_MEMORY", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_JING_DEF_DEAFNESS",
    conclusion: "C_KIDNEY_JING_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Reused
    conditions: [{ concept: "C_DEAFNESS", state: "PRESENT" }]
  },

  // -------------------------------------------------------------
  // KIDNEY PATTERN 4: Kidney Qi Not Firm
  // -------------------------------------------------------------
  {
    rule_id: "R_KID_QI_FIRM_BACK",
    conclusion: "C_KIDNEY_QI_NOT_FIRM",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, 
    conditions: [{ concept: "C_BACKACHE", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_QI_FIRM_INCONT",
    conclusion: "C_KIDNEY_QI_NOT_FIRM",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Key diagnostic tip: Lower gate failure
    conditions: [{ concept: "C_INCONTINENCE", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_QI_FIRM_FREQ",
    conclusion: "C_KIDNEY_QI_NOT_FIRM",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Reused
    conditions: [{ concept: "C_URINARY_FREQUENCY_URGENCY", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_QI_FIRM_NIGHT_URINE",
    conclusion: "C_KIDNEY_QI_NOT_FIRM",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, 
    conditions: [{ concept: "C_NIGHT_URINATION", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_QI_FIRM_EMISSIONS",
    conclusion: "C_KIDNEY_QI_NOT_FIRM",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Semen not firmly held
    conditions: [{ concept: "C_NOCTURNAL_EMISSIONS", state: "PRESENT" }]
  },
  {
    rule_id: "R_KID_QI_FIRM_PREM_EJAC",
    conclusion: "C_KIDNEY_QI_NOT_FIRM",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Lower gate failure
    conditions: [{ concept: "C_PREMATURE_EJACULATION", state: "PRESENT" }]
  }, 
  
  // -------------------------------------------------------------
  // STOMACH PATTERNS
  // -------------------------------------------------------------
  {
    rule_id: "R_ST_FIRE_GUMS",
    conclusion: "C_STOMACH_FIRE",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Stomach channel goes to the gums
    conditions: [{ concept: "C_SWOLLEN_GUMS", state: "PRESENT" }]
  },
  {
    rule_id: "R_ST_FIRE_BREATH",
    conclusion: "C_STOMACH_FIRE",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8,
    conditions: [{ concept: "C_FOUL_BREATH", state: "PRESENT" }]
  },
  {
    rule_id: "R_ST_FIRE_HUNGER",
    conclusion: "C_STOMACH_FIRE",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Fire digests food rapidly
    conditions: [{ concept: "C_CONSTANT_HUNGER", state: "PRESENT" }]
  },
  {
    rule_id: "R_ST_YIN_DEF_APPETITE",
    conclusion: "C_STOMACH_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Yin def causes hunger with NO desire to eat
    conditions: [{ concept: "C_POOR_APPETITE", state: "PRESENT" }]
  },
  {
    rule_id: "R_ST_YIN_DEF_MOUTH",
    conclusion: "C_STOMACH_YIN_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, 
    conditions: [{ concept: "C_DRY_MOUTH_AND_THROAT", state: "PRESENT" }]
  },
  {
    rule_id: "R_ST_QI_REBEL_VOMIT",
    conclusion: "C_STOMACH_QI_REBELLION",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Cardinal sign of Qi moving upward
    conditions: [{ concept: "C_NAUSEA_VOMITING", state: "PRESENT" }]
  },
  {
    rule_id: "R_ST_QI_REBEL_BELCH",
    conclusion: "C_STOMACH_QI_REBELLION",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8,
    conditions: [{ concept: "C_BELCHING", state: "PRESENT" }]
  },
  {
    rule_id: "R_ST_COLD_PAIN",
    conclusion: "C_COLD_INVADING_STOMACH",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Sudden pain relieved by heat
    conditions: [{ concept: "C_PAIN_ALLEVIATED_BY_WARMTH", state: "PRESENT" }]
  },
  {
    rule_id: "R_ST_COLD_VOMIT",
    conclusion: "C_COLD_INVADING_STOMACH",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Vomiting clear fluids implies cold/lack of heat
    conditions: [{ concept: "C_VOMITING_CLEAR_WATERY_FLUID", state: "PRESENT" }]
  },

  // -------------------------------------------------------------
  // LARGE INTESTINE (LI) PATTERNS
  // -------------------------------------------------------------
  {
    rule_id: "R_LI_DH_STOOLS",
    conclusion: "C_LI_DAMP_HEAT",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Classic sign of damp-heat in the bowel (dysentery)
    conditions: [{ concept: "C_MUCUS_IN_STOOLS", state: "PRESENT" }]
  },
  {
    rule_id: "R_LI_DH_TENESMUS",
    conclusion: "C_LI_DAMP_HEAT",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Heavy Dampness obstructing the rectum
    conditions: [{ concept: "C_TENESMUS", state: "PRESENT" }]
  },
  {
    rule_id: "R_LI_DH_ANUS",
    conclusion: "C_LI_DAMP_HEAT",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Heat
    conditions: [{ concept: "C_BURNING_ANUS", state: "PRESENT" }]
  },
  {
    rule_id: "R_LI_DRY_CONSTIPATION",
    conclusion: "C_LI_DRYNESS",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Dry stools
    conditions: [{ concept: "C_CONSTIPATION_DRY_STOOLS", state: "PRESENT" }]
  },
  {
    rule_id: "R_LI_DRY_TONGUE",
    conclusion: "C_LI_DRYNESS",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, 
    conditions: [{ concept: "C_DRY_COATING", state: "PRESENT" }]
  },

  // -------------------------------------------------------------
  // SMALL INTESTINE (SI) PATTERNS
  // -------------------------------------------------------------
  {
    rule_id: "R_SI_HEAT_URINE",
    conclusion: "C_SI_FULL_HEAT",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Heat passed from the Heart to SI and Bladder
    conditions: [{ concept: "C_BURNING_URINATION", state: "PRESENT" }]
  },
  {
    rule_id: "R_SI_HEAT_ULCERS",
    conclusion: "C_SI_FULL_HEAT",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Heart-Heat connection
    conditions: [{ concept: "C_MOUTH_TONGUE_ULCERS", state: "PRESENT" }]
  },
  {
    rule_id: "R_SI_HEAT_AGITATION",
    conclusion: "C_SI_FULL_HEAT",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Heart-Heat connection
    conditions: [{ concept: "C_SEVERE_AGITATION", state: "PRESENT" }]
  },

  // -------------------------------------------------------------
  // BLADDER PATTERNS
  // -------------------------------------------------------------
  {
    rule_id: "R_BL_DH_FREQ",
    conclusion: "C_BLADDER_DAMP_HEAT",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Classic UTI symptom
    conditions: [{ concept: "C_URINARY_FREQUENCY_URGENCY", state: "PRESENT" }]
  },
  {
    rule_id: "R_BL_DH_BURN",
    conclusion: "C_BLADDER_DAMP_HEAT",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Heat in Bladder
    conditions: [{ concept: "C_BURNING_URINATION", state: "PRESENT" }]
  },
  {
    rule_id: "R_BL_DH_GRAVEL",
    conclusion: "C_BLADDER_DAMP_HEAT",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Heat condensing dampness into stones
    conditions: [{ concept: "C_GRAVEL_IN_URINE", state: "PRESENT" }]
  },
  {
    rule_id: "R_BL_DH_DARK",
    conclusion: "C_BLADDER_DAMP_HEAT",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, 
    conditions: [{ concept: "C_SCANTY_DARK_URINE", state: "PRESENT" }]
  },

  // -------------------------------------------------------------
  // GALLBLADDER PATTERNS
  // -------------------------------------------------------------
  {
    rule_id: "R_GB_DH_HYPO",
    conclusion: "C_GB_DAMP_HEAT",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Channel location
    conditions: [{ concept: "C_HYPOCHONDRIAL_PAIN", state: "PRESENT" }]
  },
  {
    rule_id: "R_GB_DH_BITTER",
    conclusion: "C_GB_DAMP_HEAT",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Bile taste
    conditions: [{ concept: "C_BITTER_TASTE", state: "PRESENT" }]
  },
  {
    rule_id: "R_GB_DH_JAUNDICE",
    conclusion: "C_GB_DAMP_HEAT",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Damp-heat affecting Liver/GB
    conditions: [{ concept: "C_YELLOW_SCLERA", state: "PRESENT" }]
  },
  
  // -------------------------------------------------------------
  // GALLBLADDER PATTERN: Gallbladder Qi Deficiency
  // -------------------------------------------------------------
  {
    rule_id: "R_GB_QI_DEF_TIMID",
    conclusion: "C_GB_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Cardinal psychological sign
    conditions: [{ concept: "C_TIMIDITY", state: "PRESENT" }]
  },
  {
    rule_id: "R_GB_QI_DEF_INDECISION",
    conclusion: "C_GB_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // The GB controls the capacity to make decisions
    conditions: [{ concept: "C_INDECISION", state: "PRESENT" }]
  },
  {
    rule_id: "R_GB_QI_DEF_STARTLED",
    conclusion: "C_GB_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Reused from Heart/Liver: easily startled due to lack of GB courage
    conditions: [{ concept: "C_PROPENSITY_TO_BE_STARTLED", state: "PRESENT" }]
  },
  {
    rule_id: "R_GB_QI_DEF_SIGHING",
    conclusion: "C_GB_QI_DEFICIENCY",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.65, // Reused from Liver Qi Stagnation
    conditions: [{ concept: "C_SIGHING", state: "PRESENT" }]
  },
  
  // -------------------------------------------------------------
  // PATTERN: Liver Invading the Spleen (Overacting)
  // -------------------------------------------------------------
  {
    rule_id: "R_LIV_INV_SP_IRRIT",
    conclusion: "C_LIVER_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Liver component
    conditions: [{ concept: "C_IRRITABILITY", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_INV_SP_STOOLS",
    conclusion: "C_LIVER_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Spleen component
    conditions: [{ concept: "C_LOOSE_STOOLS", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_INV_SP_DIST",
    conclusion: "C_LIVER_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Stagnation component
    conditions: [{ concept: "C_EPIGASTRIC_HYPOCHONDRIAL_DISTENSION", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_INV_SP_TIRED",
    conclusion: "C_LIVER_INVADING_SPLEEN",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.6, // Spleen Qi Def component
    conditions: [{ concept: "C_TIREDNESS", state: "PRESENT" }]
  },

  // -------------------------------------------------------------
  // PATTERN: Liver Invading the Stomach (Overacting)
  // -------------------------------------------------------------
  {
    rule_id: "R_LIV_INV_ST_BELCH",
    conclusion: "C_LIVER_INVADING_STOMACH",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Stomach Qi rebelling upward
    conditions: [{ concept: "C_BELCHING", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_INV_ST_NAUSEA",
    conclusion: "C_LIVER_INVADING_STOMACH",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.8, // Stomach Qi rebelling upward
    conditions: [{ concept: "C_NAUSEA_VOMITING", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_INV_ST_IRRIT",
    conclusion: "C_LIVER_INVADING_STOMACH",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.7, // Liver component
    conditions: [{ concept: "C_IRRITABILITY", state: "PRESENT" }]
  },
  {
    rule_id: "R_LIV_INV_ST_PAIN",
    conclusion: "C_LIVER_INVADING_STOMACH",
    type: "CLINICAL_INFERENCE",
    base_weight: 0.75, // Epigastric distress
    conditions: [{ concept: "C_EPIGASTRIC_DISCOMFORT", state: "PRESENT" }]
  }
];