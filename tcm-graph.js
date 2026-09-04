// tcm-graph.js
// LAYER 2 & 3: The Knowledge Graph and Inference Schema

const TCM_CONCEPTS = {
  "C_IRRITABILITY": { name: "Irritability", category: "SYMPTOM" },
  "C_ANGER": { name: "Anger", category: "SYMPTOM" },
  "C_FRUSTRATION": { name: "Frustration", category: "SYMPTOM" },
  "C_THIRST": { name: "Thirst", category: "SYMPTOM" },
  "C_CHEST_TIGHTNESS": { name: "Chest Tightness", category: "SYMPTOM" },
  "C_STRESS": { name: "Stress", category: "ETIOLOGY" },
  "C_LIVER_QI_STAGNATION": { name: "Liver Qi Stagnation", category: "PATTERN" },
  "C_COLD_PATTERN": { name: "Cold Pattern", category: "PATTERN" }
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
  }
];
