const TCM_STOPWORDS = new Set([
  // --- Original Template Keywords ---
  "this", "that", "with", "from", "have", "they", "will", "what", "when", 
  "where", "your", "then", "than", "into", "only", "also", "some", "very", 
  "just", "like", "their", "these", "those", "which", "could", "should", 
  "would", "been", "much", "there", "because", "through", "about", 
  "between", "during", "patient", "presents", "complains", "history",

  // --- Essential English Grammar & Connectives ---
  "the", "a", "an", "and", "but", "or", "nor", "for", "yet", "so", "at", "by", 
  "of", "to", "in", "on", "under", "over", "above", "below", "behind", "next", 
  "is", "am", "are", "was", "were", "be", "being", "has", "had", "have", "having", 
  "do", "does", "did", "doing", "can", "cannot", "may", "might", "must", "shall",

  // --- Pronouns & Deictic References ---
  "i", "me", "my", "myself", "we", "us", "our", "ours", "ourselves", "you", 
  "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", 
  "she", "her", "hers", "herself", "it", "its", "itself", "them", "theirs", 
  "themselves", "who", "whom", "whose", "someone", "something", "anyone", "anything",

  // --- Clinical Administrative & Intake Headers ---
  "chief", "complaint", "cc", "hpi", "pmh", "lifestyle", "habits", "vitals", 
  "symptom", "symptoms", "sign", "signs", "diagnosis", "pattern", "evaluation", 
  "assessment", "treatment", "protocol", "principle", "formula", "dosage", 
  "administered", "prescribed", "taking", "uses", "using", "medication", 
  "medications", "herbs", "allergies", "allergic", "family", "father", "mother", 
  "dad", "mom", "brother", "sister", "occupation", "work", "job", "lives", 
  "living", "denies", "denied", "reporting", "reports", "reported", "noted", 
  "notes", "observed", "observations", "states", "stated", "describes", "described", 
  "presenting", "patient's", "px", "hx", "tx", "rx",

  // --- General Time & Duration Modifiers (Non-Diagnostic) ---
  "time", "onset", "duration", "frequency", "ago", "since", "last", "next", 
  "yesterday", "today", "tomorrow", "day", "days", "week", "weeks", "month", 
  "months", "year", "years", "old", "age", "hourly", "daily", "weekly", "monthly", 
  "yearly", "regularly", "frequently", "infrequently", "sometimes", "often", "seldom", 
  "rarely", "always", "never", "usually", "generally", "occasional", "occasionally", 
  "constant", "constantly", "intermittently", "on", "off", "on-and-off",

  // --- Non-Diagnostic Severity & Degree Qualifiers ---
  "mild", "mildly", "moderate", "moderately", "severe", "severely", "slight", 
  "slightly", "marked", "markedly", "significant", "significantly", "extreme", 
  "extremely", "intensely", "gradual", "gradually", "sudden", "suddenly", "acute", 
  "chronic", "status", "level", "degree", "stage", "post", "pre", "primary", 
  "secondary", "associated", "related", "due", "caused", "resulting", "leads", 
  "leading", "shows", "showing", "reveals", "revealing", "indicates", "indicating", 
  "suggests", "suggesting",

  // --- Conversational Fillers ---
  "well", "good", "bad", "better", "worse", "really", "quite", "rather", "pretty", 
  "almost", "nearly", "mostly", "partially", "completely", "entirely", "basically", 
  "actually", "essentially", "literally", "maybe", "perhaps", "possibly", "probably"
]);
