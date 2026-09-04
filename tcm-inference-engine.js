// tcm-inference-engine.js
// The 5-Layer Semantic Inference Pipeline  

class SemanticInferenceEngine {
  
  constructor(lexicon, concepts, relationships, rules) {
    this.lexicon = lexicon;
    this.concepts = concepts;
    this.relationships = relationships;
    this.rules = rules;
  }

  process(text) {
    const evidence = this._extractEvidence(text);
    const semantic = this._expandSemantics(evidence);
    const clinical = this._inferClinical(evidence);
    
    return {
      EXPLICIT_EVIDENCE: evidence,
      SEMANTIC_EXPANSION: semantic,
      CLINICAL_INFERENCE: clinical
    };
  }

  // LAYER 1 & 2: Lexical Match & Context Assessment
  _extractEvidence(text) {
    const evidenceObj = {};
    const lowerText = text.toLowerCase();
    
    // Simple lookbehinds for negation and severity modifiers
    const negationRegex = /\b(no|not|without|denies|zero)\s+(?:\w+\s+){0,2}/i;
    const severeRegex = /\b(very|extremely|absolutely|severe)\s+(?:\w+\s+){0,2}/i;

    for (const [phrase, cid] of Object.entries(this.lexicon)) {
      const phraseIndex = lowerText.indexOf(phrase);
      if (phraseIndex !== -1) {
            // Extract context window (approx 30 characters before the phrase)
        let contextWindow = lowerText.substring(Math.max(0, phraseIndex - 30), phraseIndex);
        
        // PREVENT CONTEXT BLEED: Stop looking backward if we hit punctuation!
        const lastPunctuation = contextWindow.search(/[.;,!?](?!.*[.;,!?])/);
        if (lastPunctuation !== -1) {
          contextWindow = contextWindow.substring(lastPunctuation + 1);
        }
        
        let state = "PRESENT";
        let strength = 1.0;


        if (negationRegex.test(contextWindow)) state = "NEGATED";
        if (severeRegex.test(contextWindow)) strength = 1.2;

        evidenceObj[cid] = {
          concept_id: cid,
          state: state,
          evidence_strength: strength,
          source_text: phrase,
          certainty: "OBSERVED"
        };
      }
    }
    return evidenceObj;
  }

  // LAYER 3: Semantic Traversal
  _expandSemantics(evidence) {
    const semanticObj = {};
    for (const [cid, ev] of Object.entries(evidence)) {
      if (ev.state === "NEGATED") continue; // Do not semantically expand negated concepts
      
      const relatedEdges = this.relationships.filter(r => r.source === cid);
      relatedEdges.forEach(edge => {
        semanticObj[edge.target] = {
          semantic_strength: edge.strength * ev.evidence_strength,
          path: [cid, edge.type, edge.target]
        };
      });
    }
    return semanticObj;
  }

  // LAYER 4 & 5: Inference & Bounded Aggregation
  _inferClinical(evidence) {
    const clinicalObj = {};

    this.rules.forEach(rule => {
      // Check if ALL conditions for this rule are met in the Evidence model
      const conditionsMet = rule.conditions.every(cond => {
        return evidence[cond.concept] && evidence[cond.concept].state === cond.state;
      });

      if (conditionsMet) {
        const targetCid = rule.conclusion;
        
        // Find the primary evidence strength triggering this rule
        const triggerStrength = evidence[rule.conditions[0].concept].evidence_strength;
        const weightContribution = rule.base_weight * triggerStrength;

        if (!clinicalObj[targetCid]) {
          clinicalObj[targetCid] = {
            aggregated_score: 0,
            contributing_sources: 0,
            audit_trail: []
          };
        }

        // BOUNDED ENGINEERING AGGREGATION FUNCTION: Score = 1 - ((1 - w1) * (1 - w2))
        // This prevents runaway score inflation from multiple supporting paths.
        const currentInv = 1 - clinicalObj[targetCid].aggregated_score;
        const newInv = 1 - weightContribution;
        clinicalObj[targetCid].aggregated_score = 1 - (currentInv * newInv);
        
        clinicalObj[targetCid].contributing_sources += 1;
        clinicalObj[targetCid].audit_trail.push({
          rule: rule.rule_id,
          source_evidence: rule.conditions.map(c => c.concept).join(" + "),
          weight_contribution: weightContribution
        });
      }
    });

    return clinicalObj;
  }
}
