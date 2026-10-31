/* ============================================================================
   TCM UNIFIED QUIZ & STUDY HUB ENGINE (tcm-quiz.js) -- MASTERY EDITION
   Tracks:
   1. 'location'        -> Point Location Quiz (Standard MCQ + FITB Lvl 1-4)
   2. 'clinical_points' -> Point Actions, Indications & Combinations Quiz
   3. 'patterns'        -> Zang-Fu & Pattern Differentiation Mastery Quiz
   ============================================================================ */

(function () {
  // --- 1. INJECT STYLES & MODALS MATCHING INDEX.HTML ---
  function injectQuizHubDOM() {
    if (document.getElementById("toolsHubModal")) return;

    const style = document.createElement("style");
    style.textContent = `
      #toolsHubModal, #quizModal, #quizFilterModal, #quizDistractorModal, #quizResumeModal {
        display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; height: 100dvh;
        z-index: 10016; justify-content: center; align-items: center;
        background: rgba(0,0,0,0.6);
      }
      #quizModal {
        background: #f0f0f5; z-index: 10018; flex-direction: column;
        justify-content: flex-start; align-items: stretch;
      }
      #quizFilterModal, #quizDistractorModal, #quizResumeModal { z-index: 10019; }

      .hub-card-btn {
        display: flex; align-items: center; gap: 14px; width: 100%;
        padding: 14px 16px; border-radius: 12px; border: 1px solid #d1d1d6;
        background: #f8f8fa; color: #2c2c2e; text-align: left; cursor: pointer;
        transition: transform 0.1s, border-color 0.15s; box-sizing: border-box;
      }
      .hub-card-btn:active { transform: scale(0.98); border-color: #cc5500; }
      .hub-card-icon {
        width: 44px; height: 44px; border-radius: 12px; background: #ffffff;
        display: flex; align-items: center; justify-content: center;
        font-size: 22px; box-shadow: 0 2px 6px rgba(0,0,0,0.08); flex-shrink: 0;
      }
      .hub-card-title { font-size: 15px; font-weight: 800; color: #cc5500; margin-bottom: 2px; }
      .hub-card-sub { font-size: 12px; color: #666; line-height: 1.3; }

      /* Quiz Top Track Switcher & Header */
      .quiz-top-bar {
        display: flex; justify-content: space-between; align-items: center; gap: 8px;
        padding: calc(10px + env(safe-area-inset-top)) 15px 10px 15px;
        background: #ffffff; border-bottom: 1px solid #d1d1d6; flex-shrink: 0;
      }
      .quiz-top-bar > div:last-child {
        flex-shrink: 0; /* Keeps the score and X button from being squished */
      }
      .quiz-track-tabs {
        display: flex; background: #e3e3e8; border-radius: 10px; padding: 3px; gap: 2px;
        overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none;
      }
      .quiz-track-tabs::-webkit-scrollbar { display: none; }
      .quiz-track-tab {
        border: none; background: transparent; padding: 6px 10px; border-radius: 8px;
        font-size: 12px; font-weight: 800; color: #555; cursor: pointer; white-space: nowrap;
      }
      .quiz-track-tab.active {
        background: #ffffff; color: #cc5500; box-shadow: 0 1px 4px rgba(0,0,0,0.12);
      }
      .quiz-subtoolbar {
        display: flex; justify-content: flex-start; align-items: center; gap: 8px;
        padding: 8px 15px; background: rgba(240,240,245,0.95);
        border-bottom: 1px solid #d1d1d6; flex-shrink: 0; 
        overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none;
      }
      .quiz-subtoolbar::-webkit-scrollbar { display: none; }
      .quiz-subtoolbar > div {
        flex-wrap: nowrap !important; /* Overrides inline HTML wrapping */
        flex-shrink: 0;
      }
      .quiz-subtoolbar > div:last-child {
        margin-left: auto; /* Pins the "Pool: All" label to the right */
        padding-left: 15px;
      }
      .quiz-pill-btn {
        background: #e3e3e8; color: #007aff; border: none; border-radius: 8px;
        padding: 6px 11px; font-size: 12.5px; font-weight: 800; cursor: pointer;
        white-space: nowrap; /* Stops button text from wrapping */
      }
      .quiz-pill-btn:active { transform: scale(0.96); }
      .quiz-score-badge {
        font-size: 13px; font-weight: 800; color: #cc5500; letter-spacing: 0.3px;
        white-space: nowrap;
      }

      /* Settings Drawer inside Quiz */
      .quiz-settings-panel {
        display: none; background: #ffffff; border-bottom: 2px solid #cc5500;
        padding: 14px 15px; flex-direction: column; gap: 10px; flex-shrink: 0;
        box-shadow: 0 8px 20px rgba(0,0,0,0.12); z-index: 20;
      }
      .quiz-settings-panel.open { display: flex; }
      .quiz-settings-row { display: flex; gap: 8px; flex-wrap: wrap; }
      .quiz-select {
        flex: 1; min-width: 120px; padding: 9px 10px; border-radius: 8px;
        border: 1px solid #c7c7cc; background: #f8f8fa; color: #2c2c2e;
        font-size: 13.5px; font-weight: 700;
      }

      /* Main Quiz Scroll Body */
      .quiz-scroll-body {
        flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch;
        padding: 15px 15px 50px 15px; max-width: 760px; width: 100%; margin: 0 auto; box-sizing: border-box;
        display: flex; flex-direction: column; gap: 14px;
      }
      .quiz-question-card {
        background: #ffffff; border: 1px solid #d1d1d6; border-radius: 12px;
        padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      }
      .quiz-q-header-row {
        display: flex; justify-content: space-between; align-items: center; gap: 8px;
        margin-bottom: 10px;
      }
      .quiz-q-label {
        font-size: 11.5px; font-weight: 800; text-transform: uppercase;
        color: #cc5500; letter-spacing: 0.6px; display: block;
      }
      .quiz-requeue-pill {
        background: rgba(255, 59, 48, 0.12); color: #ff3b30; border: 1px solid rgba(255, 59, 48, 0.3);
        border-radius: 12px; padding: 2px 8px; font-size: 10.5px; font-weight: 800;
        text-transform: uppercase; letter-spacing: 0.4px;
      }
      .quiz-clue-btn {
        background: rgba(255, 149, 0, 0.15); color: #cc5500; border: 1px solid rgba(204, 85, 0, 0.3);
        border-radius: 14px; padding: 3px 10px; font-size: 11.5px; font-weight: 800;
        cursor: pointer; white-space: nowrap;
      }
      .quiz-clue-btn:active { transform: scale(0.95); }
      .quiz-q-body {
        font-size: 15px; line-height: 1.5; color: #2c2c2e; font-weight: 500;
      }
      .quiz-fitb-blank {
        color: #007aff; font-weight: 800; text-decoration: underline;
        text-decoration-thickness: 2px; text-underline-offset: 3px;
        padding: 0 2px;
      }
      .quiz-diag-box {
        background: #f8f8fa; border-left: 3px solid #cc5500;
        padding: 8px 12px; border-radius: 6px; margin-top: 8px; font-size: 14px;
      }

      /* Options Grid */
      .quiz-options-grid { display: flex; flex-direction: column; gap: 10px; }
      .quiz-opt-btn {
        background: #ffffff; border: 2px solid #e0e0e0; border-radius: 10px;
        padding: 13px 14px; font-size: 14.5px; font-weight: 600; color: #2c2c2e;
        text-align: left; cursor: pointer; transition: transform 0.1s, border-color 0.15s;
        line-height: 1.4; display: flex; align-items: flex-start; gap: 10px;
      }
      .quiz-opt-btn:active { transform: scale(0.99); }
      .quiz-opt-btn[disabled] { cursor: default; }
      .quiz-opt-key {
        background: #e3e3e8; color: #555; font-size: 11px; font-weight: 800;
        border-radius: 5px; padding: 2px 6px; flex-shrink: 0; margin-top: 1px;
      }
      .quiz-opt-btn.correct {
        background: rgba(52, 199, 89, 0.12); border-color: #34c759; color: #1e7e34;
      }
      .quiz-opt-btn.incorrect {
        background: rgba(255, 59, 48, 0.12); border-color: #ff3b30; color: #d70015; opacity: 0.85;
      }

      /* Post-Answer Clinical Anchor & Side-by-Side Diff Digest */
      .quiz-digest-card {
        display: none; flex-direction: column; gap: 10px;
        background: #ffffff; border: 1px solid #d1d1d6; border-left: 4px solid #34c759;
        border-radius: 10px; padding: 12px 14px; font-size: 13.5px; line-height: 1.45;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      }
      .quiz-digest-card.missed { border-left-color: #ff3b30; }
      .quiz-diff-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
        margin-top: 4px; padding-top: 8px; border-top: 1px dashed #d1d1d6;
      }
      @media (max-width: 520px) {
        .quiz-diff-grid { grid-template-columns: 1fr; }
      }
      .quiz-diff-col {
        background: #f8f8fa; border-radius: 8px; padding: 8px 10px; border: 1px solid #e5e5ea;
      }
      .quiz-digest-details {
        margin-top: 6px; padding-top: 6px; border-top: 1px dashed #e5e5ea; font-size: 12.5px; color: #555;
      }
      .quiz-digest-details summary {
        font-weight: 800; color: #007aff; cursor: pointer; user-select: none; outline: none;
      }

      /* Post-Answer Quick Inspection Bar */
      .quiz-inspect-bar {
        display: none; flex-wrap: wrap; gap: 8px; align-items: center;
        background: rgba(0, 122, 255, 0.08); border: 1px solid rgba(0, 122, 255, 0.25);
        padding: 10px 12px; border-radius: 10px;
      }
      .quiz-bottom-bar {
        padding: 10px 15px calc(12px + env(safe-area-inset-bottom)) 15px;
        background: #ffffff; border-top: 1px solid #d1d1d6; flex-shrink: 0;
      }
      .quiz-main-action-btn {
        width: 100%; max-width: 730px; margin: 0 auto; display: block;
        padding: 14px; border-radius: 10px; border: none; background: #cc5500;
        color: #ffffff; font-size: 16px; font-weight: 800; cursor: pointer;
      }
      .quiz-main-action-btn.secondary {
        background: transparent; color: #007aff; border: 2px solid #007aff;
      }

      /* Filter Group Tree */
      .qf-group { border-bottom: 1px solid #e5e5ea; padding: 8px 0; }
      .qf-header { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 15px; }
      .qf-expand-btn {
        background: #e3e3e8; border: none; color: #333; font-weight: 800;
        width: 26px; height: 26px; border-radius: 6px; cursor: pointer;
      }
      .qf-points-list {
        display: none; flex-direction: column; gap: 8px; margin-top: 8px; padding-left: 34px;
      }
      .qf-points-list.open { display: flex; }

      @media (max-width: 430px) {
        .quiz-top-bar { padding-left: 10px; padding-right: 10px; gap: 8px; }
        .quiz-track-tab { font-size: 11.5px; }
        .quiz-score-badge { font-size: 12px; }
      }

      @media (prefers-color-scheme: dark) {
        #quizModal { background: #000000; }
        .hub-card-btn { background: #2c2c2e; border-color: #38383a; color: #ffffff; }
        .hub-card-icon { background: #1c1c1e; }
        .hub-card-title { color: #ff9f0a; }
        .hub-card-sub { color: #aeaeb2; }
        .quiz-top-bar, .quiz-settings-panel, .quiz-bottom-bar { background: #1c1c1e; border-color: #38383a; }
        .quiz-subtoolbar { background: #121214; border-color: #38383a; }
        .quiz-track-tabs { background: #2c2c2e; }
        .quiz-track-tab { color: #aeaeb2; }
        .quiz-track-tab.active { background: #3a3a3c; color: #ff9f0a; }
        .quiz-pill-btn { background: #2c2c2e; color: #0a84ff; }
        .quiz-score-badge { color: #ff9f0a; }
        .quiz-select { background: #2c2c2e; color: #ffffff; border-color: #38383a; }
        .quiz-question-card, .quiz-digest-card { background: #1c1c1e; border-color: #38383a; color: #f2f2f7; }
        .quiz-diff-grid, .quiz-digest-details { border-top-color: #38383a; color: #aeaeb2; }
        .quiz-digest-details summary { color: #0a84ff; }
        .quiz-diff-col { background: #2c2c2e; border-color: #38383a; }
        .quiz-q-label { color: #ff9f0a; }
        .quiz-clue-btn { background: rgba(255, 159, 10, 0.2); color: #ff9f0a; border-color: rgba(255, 159, 10, 0.4); }
        .quiz-q-body { color: #f2f2f7; }
        .quiz-fitb-blank { color: #64b5f6; }
        .quiz-diag-box { background: #2c2c2e; border-left-color: #ff9f0a; }
        .quiz-opt-btn { background: #1c1c1e; border-color: #38383a; color: #f2f2f7; }
        .quiz-opt-key { background: #2c2c2e; color: #aeaeb2; }
        .quiz-opt-btn.correct { background: rgba(48, 209, 88, 0.2); border-color: #30d158; color: #30d158; }
        .quiz-opt-btn.incorrect { background: rgba(255, 69, 58, 0.2); border-color: #ff453a; color: #ff453a; }
        .qf-group { border-bottom-color: #38383a; }
        .qf-header { color: #ffffff; }
        .qf-expand-btn { background: #2c2c2e; color: #ffffff; }
      }
    `;
    document.head.appendChild(style);

    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <!-- 1. STUDY, QUIZ & TOOLS HUB MODAL -->
      <div id="toolsHubModal" onclick="if(event.target===this) closeToolsHubModal()">
        <div class="modal-content" style="max-width: 420px; gap: 10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <h3 class="modal-title">Study & Clinical Tools</h3>
            <button onclick="closeToolsHubModal()" style="background:transparent; border:none; font-size:26px; color:#8e8e93; cursor:pointer; line-height:1;">&times;</button>
          </div>

          <button class="hub-card-btn" onclick="closeToolsHubModal(); openQuizModal('patterns');">
            <div class="hub-card-icon">☯️</div>
            <div>
              <div class="hub-card-title">Pattern Differentiation Quiz</div>
              <div class="hub-card-sub" id="hubPatternCountSub">Vignettes, Triads, Sibling Diff, Tongue/Pulse, Rx Rationales & Evolution</div>
            </div>
          </button>

          <button class="hub-card-btn" onclick="closeToolsHubModal(); openQuizModal('clinical_points');">
            <div class="hub-card-icon">⚡</div>
            <div>
              <div class="hub-card-title">Actions & Indications Quiz</div>
              <div class="hub-card-sub">Point differentiation, Odd-Indication-Out, Combinations & FITB</div>
            </div>
          </button>

          <button class="hub-card-btn" onclick="closeToolsHubModal(); openQuizModal('location');">
            <div class="hub-card-icon">📍</div>
            <div>
              <div class="hub-card-title">Point Location Quiz</div>
              <div class="hub-card-sub">Standard MCQ & Level 1–4 Fill-in-the-Blank (Cun, Anatomy, Landmarks)</div>
            </div>
          </button>

          <button class="hub-card-btn" onclick="closeToolsHubModal(); openStudySettingsModal();">
            <div class="hub-card-icon">🧠</div>
            <div>
              <div class="hub-card-title">SRS Flashcard Deck</div>
              <div class="hub-card-sub">Study Global Due Deck or your current filtered set with occlusions</div>
            </div>
          </button>

          <button class="hub-card-btn" onclick="closeToolsHubModal(); openIntakeModal();">
            <div class="hub-card-icon">📋</div>
            <div>
              <div class="hub-card-title">Clinical Intake Parser</div>
              <div class="hub-card-sub">Paste patient case notes to rank candidate patterns and points</div>
            </div>
          </button>
        </div>
      </div>

      <!-- 2. FULL-SCREEN UNIFIED QUIZ MODAL -->
      <div id="quizModal">
        <div class="quiz-top-bar">
          <div class="quiz-track-tabs">
            <button class="quiz-track-tab" id="tabQuizLocation" onclick="switchQuizTrack('location')">📍 Location</button>
            <button class="quiz-track-tab" id="tabQuizClinical" onclick="switchQuizTrack('clinical_points')">⚡ Act/Ind</button>
            <button class="quiz-track-tab active" id="tabQuizPatterns" onclick="switchQuizTrack('patterns')">☯️ Patterns</button>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="quiz-score-badge" id="quizTopScore">0/0 • 0%</span>
            <button onclick="closeQuizModal()" style="background:transparent; border:none; font-size:26px; color:#8e8e93; cursor:pointer; line-height:1;">&times;</button>
          </div>
        </div>

        <div class="quiz-subtoolbar">
          <div style="display:flex; gap:6px; align-items:center; flex-wrap:wrap;">
            <button class="quiz-pill-btn" onclick="toggleQuizSettings()">⚙️ Settings</button>
            <button class="quiz-pill-btn" onclick="openQuizFilterModal()">🎯 Filter Pool</button>
            <button class="quiz-pill-btn" onclick="openQuickPeekSearch('')">⚡ Peek Search</button>
            <button class="quiz-pill-btn" onclick="if(typeof compareList!=='undefined' && compareList.length>0){openCompareModal();}else if(typeof showToast==='function'){showToast('Compare basket is empty');}">⚖️ Compare</button>
          </div>
          <div style="font-size:12px; color:#8e8e93; font-weight:700;" id="quizPoolSummaryLabel">Pool: All</div>
        </div>

        <!-- Collapsible Settings Panel -->
        <div class="quiz-settings-panel" id="quizSettingsPanel">
          <div class="quiz-settings-row">
            <select id="qzSubModeSelect" class="quiz-select" onchange="onQuizModeOrDiffChange()"></select>
            <select id="qzDifficultySelect" class="quiz-select" onchange="onQuizModeOrDiffChange()"></select>
          </div>
          <div class="quiz-settings-row">
            <select id="qzLimitSelect" class="quiz-select" onchange="retakeQuizWholePool()">
              <option value="all">All Cards in Filtered Pool</option>
              <option value="10" selected>10 Cards per Batch</option>
              <option value="15">15 Cards per Batch</option>
              <option value="20">20 Cards per Batch</option>
              <option value="25">25 Cards per Batch</option>
            </select>
            <button class="quiz-pill-btn" style="flex:1; padding:9px;" onclick="openQuizDistractorModal()">🛡️ Answer Pool</button>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; padding-top:4px; gap:10px; flex-wrap:wrap;">
            <label style="font-size:13px; font-weight:700; color:#666; display:flex; align-items:center; gap:8px; cursor:pointer;">
              <input type="checkbox" id="qzRequireRevealToggle" checked onchange="qzRequireReveal = this.checked;">
              Hide choices until "Reveal Options"
            </label>
            <label style="font-size:13px; font-weight:700; color:#666; display:flex; align-items:center; gap:8px; cursor:pointer;">
              <input type="checkbox" id="qzShowDigestToggle" checked onchange="qzShowDigest = this.checked;">
              Show Clinical Digest
            </label>
            <label style="font-size:13px; font-weight:700; color:#666; display:flex; align-items:center; gap:8px; cursor:pointer;">
              <input type="checkbox" id="qzMasteryRequeueToggle" checked onchange="qzMasteryRequeue = this.checked;">
              🔁 Re-queue missed cards in batch
            </label>
            <button class="quiz-pill-btn" style="background:#cc5500; color:#fff; margin-left:auto;" onclick="toggleQuizSettings()">Done</button>
          </div>
        </div>

        <!-- Active Quiz View -->
        <div class="quiz-scroll-body" id="qzActiveView">
          <div class="quiz-question-card" id="qzQuestionCard">
            <div class="quiz-q-header-row">
              <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                <span class="quiz-q-label" id="qzQuestionLabel">Loading...</span>
                <span class="quiz-requeue-pill" id="qzRequeueBadge" style="display:none;">🔁 Mastery Retry</span>
              </div>
              <button type="button" class="quiz-clue-btn" id="qzClueBtn" style="display:none;" onclick="revealNextQuizClue()">💡 +1 Clue</button>
            </div>
            <div class="quiz-q-body" id="qzQuestionBody"></div>
          </div>

          <button class="quiz-main-action-btn secondary" id="qzRevealBtn" onclick="revealQuizOptions()" style="display:none;">Reveal Options 👁️ <span style="font-size:12px; font-weight:600; opacity:0.8;">(Space)</span></button>

          <div class="quiz-options-grid" id="qzOptionsGrid"></div>

          <!-- Post-Answer Clinical Anchor & Side-by-Side Diff Digest -->
          <div class="quiz-digest-card" id="qzDigestCard"></div>

          <div class="quiz-inspect-bar" id="qzInspectBar"></div>
        </div>

        <!-- Summary View -->
        <div class="quiz-scroll-body" id="qzSummaryView" style="display:none;">
          <div class="quiz-question-card" style="text-align:center; padding:24px 16px;">
            <h2 style="margin:0 0 8px 0; color:#cc5500;">Batch Complete!</h2>
            <div style="font-size:38px; font-weight:900; color:#34c759; margin:8px 0;" id="qzFinalPct">0%</div>
            <div style="font-size:15px; color:#8e8e93; font-weight:600;">
              Correct: <strong id="qzFinalScore">0</strong> of <strong id="qzFinalTotal">0</strong>
            </div>
            <div id="qzSummaryPoolNote" style="font-size:12.5px; color:#8e8e93; margin-top:6px;"></div>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            <button class="quiz-main-action-btn" id="qzRetakeMissedBtn" style="background:#ff3b30; display:none;" onclick="retakeQuizMissedOnly()">🔁 Retake Missed Only</button>
            <button class="quiz-main-action-btn secondary" id="qzCompareMissedBtn" style="display:none;" onclick="compareAllQuizMissed()">⚖️ Send Missed to Compare Matrix</button>
            <button class="quiz-main-action-btn" style="background:#007aff;" onclick="retakeQuizWholePool()">🔄 Start Next Batch / Cycle Pool</button>
          </div>

          <div class="quiz-question-card" id="qzMissedContainer" style="display:none;">
            <h4 style="margin:0 0 12px 0; color:#ff3b30; font-size:16px;">Missed Questions:</h4>
            <div id="qzMissedList" style="display:flex; flex-direction:column; gap:12px;"></div>
          </div>
        </div>

        <div class="quiz-bottom-bar" id="qzBottomBar" style="display:none;">
          <button class="quiz-main-action-btn" id="qzNextBtn" onclick="generateNextQuizQuestion()">Next Question ➔ <span style="font-size:12px; font-weight:600; opacity:0.85;">(Enter / Space)</span></button>
        </div>
      </div>

      <!-- 3. FILTER POOL MODAL (Preserves Exact Sheet Channel Order + Live Counter) -->
      <div id="quizFilterModal" onclick="if(event.target===this) closeQuizFilterModal()">
        <div class="modal-content" style="height:78vh; max-height:700px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <h3 class="modal-title" id="qzFilterModalTitle">Filter Quiz Pool</h3>
            <button onclick="closeQuizFilterModal()" style="background:transparent; border:none; font-size:26px; color:#8e8e93; cursor:pointer; line-height:1;">&times;</button>
          </div>

          <!-- Quick Sync with Main Screen Search or Compare Basket -->
          <div style="display:flex; gap:6px; margin-bottom:8px; flex-wrap:wrap;">
            <button class="quiz-pill-btn" onclick="useMainFilteredInQuiz()">🔍 Use Main Search Set</button>
            <button class="quiz-pill-btn" onclick="useCompareBasketInQuiz()">⚖️ Use Compare Basket</button>
            <button class="quiz-pill-btn" onclick="resetQuizFilterToAll()">🔄 Reset to All</button>
          </div>

          <div style="margin-bottom:8px;">
            <select id="qzImpFilter" class="quiz-select" style="width:100%;" onchange="updateFilterModalLiveCount()">
              <option value="all" selected>All Importance Levels</option>
              <option value="any">Any Important (!, !!, !!!)</option>
              <option value="!">! Only</option>
              <option value="!!">!! Only</option>
              <option value="!!!">!!! Only</option>
            </select>
          </div>

          <div style="display:flex; gap:8px; margin-bottom:8px;">
            <input type="text" id="qzPointSearchInput" class="search-box" style="padding:8px 12px; font-size:16px;" placeholder="Search e.g. spleen, liver, st36..." oninput="filterQuizModalTree()">
            <button class="quiz-pill-btn" style="background:#cc5500; color:#fff; white-space:nowrap;" onclick="selectSearchedQuizItems()">Select Shown</button>
          </div>

          <div id="qzChannelTree" style="flex:1; overflow-y:auto; padding-right:4px; margin-bottom:10px;"></div>

          <div class="modal-buttons">
            <button class="cancel-btn" onclick="closeQuizFilterModal()">Cancel</button>
            <button class="save-btn" id="qzApplyFilterBtn" onclick="applyQuizPoolFilter()">Apply & Restart Quiz</button>
          </div>
        </div>
      </div>

      <!-- 4. DISTRACTOR / ANSWER POOL MODAL -->
      <div id="quizDistractorModal" onclick="if(event.target===this) closeQuizDistractorModal()">
        <div class="modal-content" style="height:68vh; max-height:600px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <h3 class="modal-title">Filter Answer Options</h3>
            <button onclick="closeQuizDistractorModal()" style="background:transparent; border:none; font-size:26px; color:#8e8e93; cursor:pointer; line-height:1;">&times;</button>
          </div>
          <p style="font-size:12.5px; color:#8e8e93; margin:0 0 10px 0;">Select which channels/groups can appear as wrong multiple-choice options.</p>
          <div id="qzDistractorList" style="flex:1; overflow-y:auto; margin-bottom:10px;"></div>
          <div class="modal-buttons">
            <button class="save-btn" onclick="applyQuizDistractorFilter()">Save Answer Pool</button>
          </div>
        </div>
      </div>

      <!-- 5. RESUME SESSION MODAL -->
      <div id="quizResumeModal" onclick="if(event.target===this) document.getElementById('quizResumeModal').style.display='none'">
        <div class="modal-content" style="max-width:360px; text-align:center; padding:24px 20px;">
          <h3 class="modal-title" style="margin-bottom:6px;">Resume Quiz?</h3>
          <p style="color:#8e8e93; font-size:13.5px; margin:0 0 14px 0;">You have an unfinished session in this quiz track.</p>
          <div id="qzResumeStatsText" style="font-size:17px; font-weight:800; color:#cc5500; margin-bottom:18px;"></div>
          <div class="modal-buttons" style="display:flex; flex-direction:column; gap:10px;">
            <button class="save-btn" style="width:100%; background:#007aff; box-shadow:0 4px 10px rgba(0,122,255,0.3);" onclick="confirmResumeQuizSession()">▶️ Resume Session</button>
            <button class="save-btn" style="width:100%; background:#ff9f0a; box-shadow:0 4px 10px rgba(255,159,10,0.3);" onclick="abandonSavedQuizSession()">🔄 Start Fresh</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(wrapper);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectQuizHubDOM);
  } else {
    injectQuizHubDOM();
  }

  // --- 2. STATE & CONSTANTS ---
  let currentTrack = "patterns"; // 'location' | 'clinical_points' | 'patterns'
  let qzSubMode = "mixed_mastery";
  let qzDifficulty = "medium";
  let qzRequireReveal = true;
  let qzShowDigest = true;
  let qzMasteryRequeue = true;

  let trackEligiblePoints = [];
  let trackFilteredPoints = [];
  let trackDistractorPoints = [];
  let activeQuizPool = [];
  let remainingQuizQueue = [];
  let sessionMisses = [];
  let requeuedCardCounts = {}; // Tracks how many times a card was re-queued in this batch
  let lastUsedSubModeByCard = {}; // Forces a different angle when a missed card reappears
  let currentIsRequeuedTry = false;

  let currentTargetPoint = null;
  let currentCorrectAnswer = "";
  let currentPickedWrongPointId = null;
  let currentContrastPointId = null;
  let currentDecoySourceNote = null;
  let currentClueQueue = [];
  let qzScore = 0;
  let qzTotalAnswered = 0;

  // Location Blank Categories
  const locBlankCategories = {
    cunNumbers: ['0.1', '0.2', '0.3', '0.4', '0.5', '0.7', '0.8', '1', '1.3', '1.5', '2', '2.5', '3', '3.5', '4', '4.3', '4.5', '5', '5.5', '6', '7', '8', '9', '12'],
    pointNumbers: Array.from({ length: 67 }, (_, i) => String(i + 1)),
    directions: ['superior', 'inferior', 'anterior', 'posterior', 'medial', 'lateral', 'distal', 'proximal', 'dorsal', 'ventral', 'ulnar', 'radial', 'left', 'right', 'superficial', 'deep'],
    anatomy: ['border', 'tendon', 'margin', 'crease', 'umbilicus', 'ligament', 'muscle', 'bone', 'process', 'prominence', 'depression', 'malleolus', 'patella', 'clavicle', 'sternum', 'costal', 'joint', 'fossa', 'protuberance', 'condyle', 'epicondyle', 'tuberosity', 'angle', 'nipple', 'intercostal', 'spinous']
  };
  const locNumRegexStr = "\\d+(?:\\.\\d+)?";
  const locDirRegexStr = locBlankCategories.directions.join("|");
  const locAnatRegexStr = locBlankCategories.anatomy.join("|");
  const locTargetWordsRegex = new RegExp("\\b(" + locNumRegexStr + "|" + locDirRegexStr + "|" + locAnatRegexStr + ")\\b", "gi");
  const locNumRegexGlobal = new RegExp("\\b(" + locNumRegexStr + ")\\b", "gi");
  const locSpecificWordsRegex = new RegExp("\\b(" + locDirRegexStr + "|" + locAnatRegexStr + ")\\b", "gi");

  // Clinical & Pattern Diagnostic Blank Categories
  const clinicalBlankCategories = {
    verbs: ['tonifies', 'tonify', 'nourishes', 'nourish', 'clears', 'clear', 'drains', 'drain', 'cools', 'cool', 'warms', 'warm', 'expels', 'expel', 'scatters', 'scatter', 'resolves', 'resolve', 'transforms', 'transform', 'calms', 'calm', 'pacifies', 'pacify', 'subdues', 'subdue', 'descends', 'descend', 'raises', 'raise', 'lifts', 'lift', 'regulates', 'regulate', 'harmonizes', 'harmonize', 'invigorates', 'invigorate', 'activates', 'activate', 'stops', 'stop', 'alleviates', 'alleviate', 'benefits', 'benefit', 'opens', 'open', 'unbinds', 'unbind', 'moistens', 'moisten', 'astringes', 'astringe', 'consolidates', 'consolidate', 'releases', 'release', 'extinguishes', 'extinguish'],
    pathogens: ['wind', 'heat', 'cold', 'dampness', 'damp', 'phlegm', 'fire', 'dryness', 'summerheat', 'stagnation', 'stasis', 'rebellious', 'deficiency', 'excess', 'collapse', 'sinking'],
    substances: ['qi', 'blood', 'yin', 'yang', 'jing', 'essence', 'shen', 'mind', 'fluids', 'wei qi', 'ying qi', 'yuan qi', 'body fluids'],
    organs: ['lung', 'lungs', 'large intestine', 'stomach', 'spleen', 'heart', 'small intestine', 'bladder', 'kidney', 'kidneys', 'pericardium', 'san jiao', 'triple burner', 'gall bladder', 'gallbladder', 'liver', 'uterus', 'brain', 'marrow', 'chest', 'diaphragm', 'throat', 'eyes', 'ears', 'nose'],
    tongueBody: ['pale', 'red', 'deep-red', 'purple', 'bluish-purple', 'swollen', 'thin', 'stiff', 'flabby', 'deviated', 'cracked', 'quivering', 'short', 'scarlet'],
    tongueCoat: ['white', 'yellow', 'grey', 'black', 'sticky', 'slippery', 'dry', 'peeled', 'rootless', 'thick', 'thin', 'geographic', 'mirror'],
    pulseQualities: ['floating', 'deep', 'slow', 'rapid', 'empty', 'full', 'wiry', 'taut', 'slippery', 'rolling', 'choppy', 'hesitant', 'fine', 'thready', 'weak', 'frail', 'soggy', 'soft', 'tight', 'knotted', 'intermittent', 'hurried', 'overflowing', 'flooding', 'leather', 'hidden', 'minute', 'hollow', 'scattered'],
    keySignSwaps: ['spontaneous sweating', 'night sweating', 'five-palm heat', 'cold limbs', 'feeling of cold', 'feeling of heat', 'tidal fever', 'alternating chills and fever', 'palpitations', 'insomnia', 'dream-disturbed sleep', 'dizziness', 'vertigo', 'tinnitus', 'loose stools', 'constipation', 'scanty dark urine', 'profuse pale urine', 'distension', 'stabbing pain', 'dull pain', 'heavy sensation', 'oppression in the chest', 'shortness of breath', 'sighing', 'irritability', 'depression']
  };

  const pointAliases = {
    'HE': 'HT', 'TB': 'SJ', 'TE': 'SJ', 'TH': 'SJ', 'T.B.': 'SJ', 'P': 'PC',
    'LIV': 'LV', 'LR': 'LV', 'KID': 'KD', 'KI': 'KD', 'UB': 'BL',
    'REN': 'CV', 'RN': 'CV', 'DU': 'GV', 'L.I.': 'LI', 'G.B.': 'GB'
  };

  // Enforces SJ instead of TB/T.B./TE and cleans dotted channel prefixes (L.I., G.B.)
  function standardizeTCMTerminology(str) {
    if (!str) return "";
    return String(str)
      .replace(/\b(?:T\.B\.|TB|TE|TH)(?=\s*-?\s*\d+\b)/gi, "SJ")
      .replace(/\bTriple\s+Burner\b/gi, "San Jiao")
      .replace(/\bL\.I\.(?=\s*-?\s*\d+\b)/gi, "LI")
      .replace(/\bG\.B\.(?=\s*-?\s*\d+\b)/gi, "GB");
  }

  function normalizePointCode(name) {
    let clean = standardizeTCMTerminology(String(name || "")).toUpperCase().replace(/[\s\-]/g, "");
    const match = clean.match(/^([A-Z.]+)(\d+)$/);
    if (match) {
      let prefix = match[1].replace(/\./g, "");
      if (pointAliases[prefix]) prefix = pointAliases[prefix];
      return prefix + match[2];
    }
    return clean;
  }

  function shuffleArr(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // --- 3. DEEP SELF-SPOILER SCRUBBER (Preserves Hyphenated Terms & Supports Plain-Text Option Scrubbing) ---
  function maskSelfSpoilers(rawHtmlOrText, pointObj, customBadgeText = "[ ??? ]", plainText = false) {
    if (!rawHtmlOrText || !pointObj) return "";
    let textOut = standardizeTCMTerminology(rawHtmlOrText);
    let terms = [];
    const shortName = standardizeTCMTerminology(String(pointObj["Short Name"] || "").trim());
    const fullName = standardizeTCMTerminology(String(pointObj["Full Name"] || pointObj[" Full Name"] || "").trim());

    if (shortName) {
      if (typeof expandTCMPoint === "function") {
        terms.push(...expandTCMPoint(shortName.toLowerCase()));
      }
      terms.push(shortName.toLowerCase());

      const afterColon = shortName.includes(":") ? shortName.split(":").slice(1).join(":").trim() : shortName;
      if (afterColon.length > 3) terms.push(afterColon.toLowerCase());

      // Split ONLY on parens, commas, slashes, or SPACED dashes so hyphenated terms like "Heart-Qi" stay intact
      shortName.split(/[(),\/]|\s+[\-\u2013\u2014]\s+/).map(s => s.trim()).forEach(part => {
        const cleanPart = part
          .replace(/^the\s+8\s+principles\s*:\s*/i, "")
          .replace(/^qi,\s*blood\s*&\s*fluids\s*:\s*/i, "")
          .replace(/^aka\s*:\s*/i, "")
          .trim();
        if (cleanPart.length >= 4) {
          terms.push(cleanPart.toLowerCase());
          if (/\spattern$/i.test(cleanPart)) {
            const strippedPat = cleanPart.replace(/\s+pattern$/i, "").trim().toLowerCase();
            if (strippedPat.length >= 4) terms.push(strippedPat);
          }
        }
      });

      const lowerShort = shortName.toLowerCase();
      const organsList = ['heart', 'liver', 'spleen', 'lung', 'lungs', 'kidney', 'kidneys', 'stomach', 'gall bladder', 'gallbladder', 'small intestine', 'large intestine', 'bladder', 'pericardium', 'uterus', 'san jiao'];
      const subsList = ['qi', 'blood', 'yin', 'yang', 'fire', 'wind', 'cold', 'damp', 'dampness', 'heat', 'phlegm', 'essence', 'jing', 'fluid', 'fluids', 'water', 'food'];
      const pathList = ['deficiency', 'excess', 'stagnation', 'stasis', 'rebellion', 'rebellious', 'sinking', 'collapse', 'blazing', 'rising', 'invading', 'insulting', 'obstructing', 'obstructed', 'harassing', 'misting', 'empty', 'full', 'dryness', 'bi'];

      const matchedOrgans = organsList.filter(o => lowerShort.includes(o));
      const matchedSubs = subsList.filter(s => new RegExp("\\b" + s + "\\b", "i").test(lowerShort));
      const matchedPaths = pathList.filter(pa => new RegExp("\\b" + pa + "\\b", "i").test(lowerShort));

      matchedOrgans.forEach(org => {
        matchedSubs.forEach(sub => {
          terms.push(`${org} ${sub}`, `${org}-${sub}`);
          matchedPaths.forEach(pa => {
            terms.push(`${org} ${sub} ${pa}`, `${pa} of ${org} ${sub}`, `${pa} of ${org}-${sub}`, `${pa} ${org} ${sub}`, `${pa} ${org}-${sub}`);
          });
        });
        matchedPaths.forEach(pa => {
          terms.push(`${org} ${pa}`, `${pa} of ${org}`, `${pa} of the ${org}`);
        });
      });

      const revMatch = afterColon.toLowerCase().match(/^(.+?)\s+(deficiency|stagnation|stasis|blazing|rising|sinking|collapse|rebellion|excess)$/i);
      if (revMatch) {
        const root = revMatch[1].trim();
        const pathWord = revMatch[2].trim();
        terms.push(`${pathWord} of ${root}`, `${pathWord} of the ${root}`);
        if (root.length >= 5) terms.push(root);
      }
    }

    if (fullName && fullName.length > 3 && !/^(deficiency|excess|full|empty|empty\/full|combined|interior|exterior)\s+pattern$/i.test(fullName)) {
      const fnLines = fullName.split(/\n+/).map(l => l.trim()).filter(Boolean);
      fnLines.slice(0, 2).forEach(line => {
        if (line.length > 3 && !/point|channel|vessel|studyguide|midterm/i.test(line)) {
          terms.push(line.toLowerCase());
        }
      });
    }

    const escaped = [...new Set(terms)]
      .filter(t => t && t.length >= 3)
      .sort((a, b) => b.length - a.length)
      .map(t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/[\s\-]+/g, "[\\s\\-]+"));

    if (escaped.length === 0) return textOut;
    const regex = new RegExp("\\b(" + escaped.join("|") + ")\\b", "gi");

    // If customBadgeText is plain prose (e.g. "this pattern" or a point code in option buttons), do not wrap in blue underline span
    const usePlain = plainText || customBadgeText === "this pattern" || !customBadgeText.startsWith("[");
    const replacementStr = usePlain
      ? customBadgeText
      : `<span class='quiz-fitb-blank'>${customBadgeText}</span>`;

    return textOut.split(/(<[^>]*>)/g).map(part => {
      return part.startsWith("<") ? part : part.replace(regex, replacementStr);
    }).join("");
  }

  // --- 4. MULTI-SECTION PATTERN PARSER (Linear-Time O(N), Cached) ---
  const patternParseCache = new Map();
  const pointClinicalCache = new Map();

  // Matches all bullet/chevron variants in the CSV: ➣ (\u27A3), ➢ (\u27A2), ➔ (\u2794), • (\u2022), -, *
  function cleanSectionLines(rawVal) {
    if (!rawVal) return [];
    let clean = standardizeTCMTerminology(stripBBCode(String(rawVal)))
      .replace(/\r\n/g, "\n")
      .replace(/`+/g, "")
      .trim();
    return clean
      .split(/\n|;;/)
      .filter(line => !/^\|(?:[\s\-:]+\|)+$/.test(line.trim()))
      .map(line => {
        let t = line.trim();
        if (t.startsWith("|") && t.endsWith("|")) {
          return t.slice(1, -1).split("|").map(c => c.trim()).filter(Boolean).join(" -- ");
        }
        return t.replace(/^(?:[\u27A2\u27A3\u2794\u2022\-\*]|\d+\.)\s*/, "").replace(/`+$/g, "").trim();
      })
      .filter(l => l.length > 2);
  }

  // Fast linear-time splitter for single or multi-point rationale lines (zero backtracking)
  const RX_ACTION_SPLIT_RX = /\b(is\s+the\b|are\s+the\b|is\s+used\b|are\s+used\b|is\s+a\b|also\s+|with\s+direct\s+moxa|with\s+moxa|in\s+combination|tonifies|tonify|nourishes|nourish|clears|clear|drains|drain|moves|move|calms|calm|opens|open|resolves|resolve|subdues|subdue|regulates|regulate|strengthens|strengthen|warms|warm|cools|cool|rescues|rescue|stops|stop|promotes|promote|pacifies|pacify|relieves|relieve|harmonizes|harmonize|makes|make|helps|help|smooths|smooth|smoothes|eliminates|eliminate|expels|expel|disperses|disperse|activates|activate|descends|descend|lifts|lift|raises|raise|conducts|conduct|stimulates|stimulate|restores|restore)\b/i;

  function extractPointRationaleFromLine(line) {
    // Must start with a point code (or SP4/PC6 combo)
    if (!/^(?:LU|LI|ST|SP|HT|HE|SI|BL|UB|KI|KD|KID|PC|P|SJ|GB|LR|LIV|LV|DU|GV|RN|REN|CV|EX-[A-Z]+)\s*-?\s*\d+/i.test(line)) {
      return null;
    }
    // 1. Check for explicit colon or spaced-dash delimiter (e.g. "GB20 (Fengchi): Number one point..." or "Ren-17, PC-6 - Move Qi...")
    const delimMatch = line.match(/^([^:]+?)\s*(?::|\s+[\-\u2013\u2014]\s+)\s*(.+)$/);
    if (delimMatch && delimMatch[1].length <= 65 && delimMatch[2].length > 6) {
      const ptLabel = delimMatch[1].trim();
      const cMatch = ptLabel.match(/([A-Za-z]+)\s*-?\s*(\d+)/);
      return {
        pointCode: cMatch ? normalizePointCode(cMatch[1] + cMatch[2]) : ptLabel,
        pointLabel: ptLabel,
        explanation: delimMatch[2].trim(),
        fullLine: line
      };
    }
    // 2. Otherwise split at the first clinical verb/phrase
    const verbMatch = RX_ACTION_SPLIT_RX.exec(line);
    if (verbMatch && verbMatch.index > 2 && verbMatch.index <= 75) {
      const ptLabel = line.slice(0, verbMatch.index).replace(/[,;\s]+$/, "").trim();
      const expBody = line.slice(verbMatch.index).trim();
      if (expBody.length > 6) {
        const cMatch = ptLabel.match(/([A-Za-z]+)\s*-?\s*(\d+)/);
        return {
          pointCode: cMatch ? normalizePointCode(cMatch[1] + cMatch[2]) : ptLabel,
          pointLabel: ptLabel,
          explanation: expBody,
          fullLine: line
        };
      }
    }
    return null;
  }

  function parseManifestationRecord(pointObj) {
    const id = pointObj["Short Name"];
    const raw = pointObj["Clinical Manifestations"] || "";
    const txRaw = pointObj["Treatment Principle"] || "";
    const rxRaw = (pointObj["Point Prescription"] || "") + "\n" + (pointObj["Supplementary Points"] || "");
    const descRaw = (pointObj["Description"] || "") + "\n" + (pointObj["Analysis"] || "") + "\n" + (pointObj["Aetiology"] || "");
    const cacheKey = `${id}::${raw.length}::${txRaw.length}::${rxRaw.length}::${descRaw.length}`;
    if (patternParseCache.has(cacheKey)) return patternParseCache.get(cacheKey);

    let clean = standardizeTCMTerminology(stripBBCode(String(raw))).replace(/\r\n/g, "\n").replace(/`+/g, "").trim();

    clean = clean
      .split("\n")
      .filter(line => !/^\|(?:[\s\-:]+\|)+$/.test(line.trim()))
      .map(line => {
        let t = line.trim();
        if (t.startsWith("|") && t.endsWith("|")) {
          return t.slice(1, -1).split("|").map(c => c.trim()).filter(Boolean).join(" -- ");
        }
        return t;
      })
      .join("\n");

    const keyMatch = clean.match(/(?:Key|Cardinal|Main)\s+Symptoms?\s*:\s*(.+?)(?=\n\s*\n|\n\s*(?:[\u27A2\u27A3\u2794\u2022\-\*]\s*)?(?:Tongue|Pulse|All Clinical|Other|Secondary|Key|Clinical)|$)/is);
    const symLineMatch = !keyMatch ? clean.match(/(?:^|\n)\s*(?:[\u27A2\u27A3\u2794\u2022\-\*])?\s*Symptoms?\s*:\s*(.+?)(?=\n\s*\n|\n\s*(?:Tongue|Pulse|[\u27A2\u27A3\u2794\u2022\*])|$)/is) : null;
    const tongueMatch = clean.match(/(?:^|\n)\s*(?:[\u27A2\u27A3\u2794\u2022\-\*])?\s*Tongue\s*:\s*(.+?)(?=\n\s*\n|\n\s*(?:[\u27A2\u27A3\u2794\u2022\-\*]\s*)?(?:Key|Pulse|All Clinical|Other|[\u27A2\u27A3\u2794\u2022])|$)/is);
    const pulseMatch = clean.match(/(?:^|\n)\s*(?:[\u27A2\u27A3\u2794\u2022\-\*])?\s*Pulse\s*:\s*(.+?)(?=\n\s*\n|\n\s*(?:[\u27A2\u27A3\u2794\u2022\-\*]\s*)?(?:Key|Tongue|All Clinical|Other|[\u27A2\u27A3\u2794\u2022])|$)/is);

    let keyRaw = keyMatch ? keyMatch[1].replace(/\s+/g, " ").trim() : (symLineMatch ? symLineMatch[1].replace(/\s+/g, " ").trim() : "");
    let tongue = tongueMatch ? tongueMatch[1].replace(/\s+/g, " ").trim() : "";
    let pulse = pulseMatch ? pulseMatch[1].replace(/\s+/g, " ").trim() : "";

    let embeddedAetLines = [];
    const embAetMatch = clean.match(/Aetiology\s*(?:&\s*Precursors)?\s*:\s*([\s\S]+)$/i);
    if (embAetMatch) {
      embeddedAetLines = cleanSectionLines(embAetMatch[1]);
      clean = clean.slice(0, embAetMatch.index).trim();
    }

    let bullets = [...clean.matchAll(/(?:^|\n)\s*(?:[\u27A2\u27A3\u2794\u2022\*])\s*([^\n]+)/g)]
      .map(m => m[1].replace(/^(?:[\u27A2\u27A3\u2794\u2022\-\*])\s*/, "").trim())
      .filter(Boolean);

    const rawLines = clean
      .split(/\n|;;/)
      .map(l => l.replace(/^(?:[\u27A2\u27A3\u2794\u2022\-\*]|\d+\.)\s*/, "").trim())
      .filter(l => l.length > 2 && !/^(?:All\s+)?Clinical\s+Manifestations?\s*:?$/i.test(l) && !/^Tongue\s*&\s*Pulse\s*:?$/i.test(l));

    if (!tongue) {
      const tLine = rawLines.find(l => /^tongue\s*:/i.test(l));
      if (tLine) tongue = tLine.replace(/^tongue\s*[:\-\u2013\u2014]?\s*/i, "").trim();
    }
    if (!pulse) {
      const pLine = rawLines.find(l => /^pulse\s*:/i.test(l));
      if (pLine) pulse = pLine.replace(/^pulse\s*[:\-\u2013\u2014]?\s*/i, "").trim();
    }

    if (bullets.length === 0) {
      rawLines.forEach(line => {
        if (/^(?:Key|Cardinal|Main)\s+Symptoms?\s*:/i.test(line)) return;
        if (/^Tongue\s*:/i.test(line) || /^Pulse\s*:/i.test(line) || /^Tongue\s*&\s*Pulse\s*:?$/i.test(line)) return;
        if (line === tongue || line === pulse) return;

        if (rawLines.length <= 2 && (line.includes(";") || line.split(",").length >= 4)) {
          const sep = line.includes(";") ? ";" : ",";
          line.split(sep).map(s => s.trim()).filter(s => s.length > 2).forEach(s => {
            if (!/\btongue\b/i.test(s) && !/\bpulse\b/i.test(s)) bullets.push(s);
          });
        } else {
          bullets.push(line);
        }
      });
    } else {
      bullets = bullets.filter(b => {
        if (/^Tongue\s*:/i.test(b) || /^Pulse\s*:/i.test(b) || /^Tongue\s*&\s*Pulse\s*:?$/i.test(b)) return false;
        if (/^(?:Key\s+)?Symptoms?\s*:/i.test(b)) return false;
        return true;
      });
    }

    let keySymptoms = [];
    if (keyRaw) {
      keySymptoms = keyRaw
        .replace(/\.$/, "")
        .split(/,|;/)
        .map(s => s.trim())
        .filter(s => s.length > 2);
    }
    if (keySymptoms.length === 0 && bullets.length > 0) {
      keySymptoms = bullets.slice(0, Math.min(3, bullets.length));
      keyRaw = keySymptoms.join(", ");
    }
    if (bullets.length === 0 && keySymptoms.length > 0) {
      bullets = [...keySymptoms];
    }

    const keySymptomsNoTP = keySymptoms.filter(s => !/\b(pulse|tongue)\b/i.test(s));
    const keyRawNoTP = keySymptomsNoTP.length > 0 ? keySymptomsNoTP.join(", ") : keyRaw;

    const rawTxSource = (pointObj["Treatment Principle"] || "") + "\n" +
      ((!pointObj["Treatment Principle"] && pointObj["Diagnosis & Differentiation"]) ? pointObj["Diagnosis & Differentiation"] : "");
    const rawTxLines = cleanSectionLines(rawTxSource)
      .filter(l => !/^Core\s+Pattern\s+Treatment\s+Principles$/i.test(l))
      .map(l => l.replace(/^(?:Principle\s+of\s+treatment|Treatment\s+principle|Tx\s+Principle)\s*:\s*/i, "").replace(/\.$/, "").trim())
      .filter(Boolean);
    const uniqueTxLines = [];
    const seenTxLower = new Set();
    rawTxLines.forEach(l => {
      const low = l.toLowerCase();
      if (!seenTxLower.has(low)) {
        seenTxLower.add(low);
        uniqueTxLines.push(l);
      }
    });
    const txPrinciple = uniqueTxLines.join("; ");

    const allRxLines = cleanSectionLines(pointObj["Point Prescription"]).filter(
      l => !/^(?:Explanation|Points|Method|Core Essential Acupuncture Points|Extraordinary Vessel Point Pairings|Primary Points & Rationale)\s*:?$/i.test(l)
    );
    const suppLines = cleanSectionLines(pointObj["Supplementary Points"]).filter(
      l => !/^(?:Supplementary\s*(?:&|and)?\s*Specialized\s*Points|Supplementary\s*points)\s*:?$/i.test(l)
    );

    let rxPointsLine = "";
    let rxMethodLine = "";
    const rxExplanations = [];
    const pointCodes = [];
    const ptRx = /\b(LU|LI|ST|SP|HT|HE|SI|BL|UB|KI|KD|KID|PC|P|SJ|GB|LR|LIV|LV|DU|GV|RN|REN|CV|EX-[A-Z]+|Yintang|Zigong)\s*-?\s*(\d*)\b/gi;

    allRxLines.forEach((line, idx) => {
      if (/^Points\s*:/i.test(line)) {
        rxPointsLine = line.replace(/^Points\s*:\s*/i, "").replace(/\.$/, "").trim();
      } else if (/^(?:Method|Needle\s+Technique|Strict\s+Rule)\s*:/i.test(line)) {
        rxMethodLine = line.replace(/^(?:Method|Needle\s+Technique|Strict\s+Rule)\s*:\s*/i, "").replace(/\.$/, "").trim();
      } else if (/^(?:Reducing|Reinforcing|Even)\s+(?:or\s+even\s+)?method/i.test(line) && !rxMethodLine) {
        rxMethodLine = line.replace(/\.$/, "").trim();
      } else {
        const strippedOfCodes = line
          .replace(/\b(?:LU|LI|ST|SP|HT|HE|SI|BL|UB|KI|KD|KID|PC|P|SJ|GB|LR|LIV|LV|DU|GV|RN|REN|CV|EX-[A-Z]+)\s*-?\s*\d+(?:\s+[A-Z][a-z]+|\s*\([^)]+\))?/gi, "")
          .replace(/[,;\s.&+\/()]+/g, "")
          .trim();

        if (strippedOfCodes.length === 0 && !rxPointsLine) {
          rxPointsLine = line.replace(/\.$/, "").trim();
        } else {
          const parsedExp = extractPointRationaleFromLine(line);
          if (parsedExp) {
            rxExplanations.push(parsedExp);
          } else if (!rxPointsLine && idx === 0 && /\d/.test(line)) {
            rxPointsLine = line.replace(/\.$/, "").trim();
          }
        }
      }

      let m;
      ptRx.lastIndex = 0;
      while ((m = ptRx.exec(line)) !== null) {
        if (!m[2] && !/^(yintang|zigong)$/i.test(m[1])) continue;
        const norm = m[2] ? normalizePointCode(m[1] + m[2]) : m[1];
        if (!pointCodes.includes(norm)) pointCodes.push(norm);
      }
    });

    suppLines.forEach(line => {
      const parsedSupp = extractPointRationaleFromLine(line);
      if (parsedSupp) rxExplanations.push(parsedSupp);
    });

    if (!rxPointsLine && pointCodes.length > 0) {
      rxPointsLine = pointCodes.join(", ");
    }

    if (!rxMethodLine && uniqueTxLines.length > 1) {
      const moxaOrNeedleLine = uniqueTxLines.find(l => /\b(moxa|moxibustion|needle\s+retention|reducing\s+method|reinforcing\s+method|contraindicated)\b/i.test(l));
      if (moxaOrNeedleLine) rxMethodLine = moxaOrNeedleLine;
    }

    let rawAetText = standardizeTCMTerminology(stripBBCode(String(pointObj["Aetiology"] || "")));
    let embeddedPathLines = [];
    const pathSplit = rawAetText.split(/Pathogenesis\s*&\s*Analysis\s*:/i);
    if (pathSplit.length > 1) {
      rawAetText = pathSplit[0];
      embeddedPathLines = cleanSectionLines(pathSplit[1]);
    }

    const aetiologyLines = [
      ...cleanSectionLines(rawAetText).filter(l => !/^Aetiology(?:\s*&\s*Precursors)?\s*:?$/i.test(l)),
      ...embeddedAetLines
    ];
    const descriptionLines = cleanSectionLines(pointObj["Description"]).filter(
      l => !/^(?:Deepening Tissue Progression|Zang Organ Associations|Normal Menstruation Overview)\s*:?$/i.test(l)
    );
    const precursorLines = cleanSectionLines(pointObj["Precursors of Pattern"]).filter(
      l => !/^Pattern Progression & Precursor Links$/i.test(l)
    );
    const developmentLines = cleanSectionLines(pointObj["Developments From Pattern"]).filter(
      l => !/^Pathological Sequelae & Long-Term Complications$/i.test(l)
    );
    const analysisLines = [
      ...descriptionLines,
      ...embeddedPathLines,
      ...cleanSectionLines(pointObj["Analysis"] || pointObj["Explanation"])
    ];

    const mechanismSentences = [];
    analysisLines.forEach(line => {
      line.split(/(?<=\.)\s+/).forEach(sent => {
        const s = sent.trim();
        if (s.length > 30 && /\b(because|due to|reflects|results in|results from|fails to|cannot|lack of|caused by|indicates|accounts for)\b/i.test(s)) {
          mechanismSentences.push(s);
        }
      });
    });

    const parsed = {
      isStructured: Boolean(keyMatch || tongueMatch || pulseMatch),
      keyRaw,
      keyRawNoTP,
      keySymptoms,
      keySymptomsNoTP,
      tongue,
      pulse,
      symptoms: bullets,
      txPrinciple,
      txLines: uniqueTxLines,
      rxLines: allRxLines,
      rxPointsLine,
      rxMethodLine,
      rxExplanations,
      suppLines,
      pointCodes,
      aetiologyLines,
      descriptionLines,
      precursorLines,
      developmentLines,
      analysisLines,
      mechanismSentences,
      rawClean: clean
    };
    patternParseCache.set(cacheKey, parsed);
    return parsed;
  }

  // --- 5. CACHED PARSER FOR POINT ACTIONS, INDICATIONS, COMBINATIONS, POINT CATEGORIES & NEEDLING CAUTIONS ---
  function parsePointClinicalLines(pointObj, mode) {
    const id = pointObj["Short Name"] || "";
    const cacheKey = `${id}::${mode}`;
    if (pointClinicalCache.has(cacheKey)) return pointClinicalCache.get(cacheKey);

    let res;
    if (mode === "categories") {
      let rawFullName = standardizeTCMTerminology(pointObj["Full Name"] || pointObj[" Full Name"] || "");
      const fnLines = cleanSectionLines(rawFullName).filter(l =>
        /\b(front-mu|back-shu|yuan-source|luo-connecting|xi-cleft|jing-well|ying-spring|shu-stream|jing-river|he-sea|confluent|hui-meeting|window of heaven|command point|heavenly star|ghost point|meeting point|sea of)\b/i.test(l)
      );
      res = { lines: fnLines, rawText: fnLines.join("\n") };
    } else if (mode === "needling") {
      let rawNeedling = standardizeTCMTerminology([pointObj["Needling"], pointObj["Cautions"]].filter(Boolean).join("\n"));
      const nLines = cleanSectionLines(rawNeedling);
      res = { lines: nLines, rawText: rawNeedling };
    } else {
      let rawAct = standardizeTCMTerminology(pointObj["Actions"] || "");
      let rawInd = standardizeTCMTerminology(pointObj["Indications"] || "");
      let rawComb = standardizeTCMTerminology([pointObj["Combinations"], pointObj["SS Combo"]].filter(Boolean).join("\n"));
      let rawSummary = standardizeTCMTerminology(pointObj["Summary of clinical application"] || "");

      let combinedRaw = "";
      if (mode === "actions") combinedRaw = rawAct;
      else if (mode === "indications") combinedRaw = rawInd;
      else if (mode === "combinations") combinedRaw = rawComb;
      else combinedRaw = [rawAct, rawInd, rawSummary].filter(Boolean).join("\n");

      let lines = cleanSectionLines(combinedRaw);
      if (lines.length === 1 && lines[0].includes(";")) {
        lines = lines[0].split(";").map(s => s.trim()).filter(s => s.length > 2);
      }
      res = { lines, rawText: combinedRaw };
    }

    pointClinicalCache.set(cacheKey, res);
    return res;
  }

  // --- 6. SUB-MODE ELIGIBILITY FILTER (With O(1) Fast-Paths for Default Modes) ---
  function getSubModeEligiblePool(poolArray) {
    if (!Array.isArray(poolArray)) return [];
    // Fast-path: trackEligiblePoints are already pre-filtered for default modes
    if (currentTrack === "location") return poolArray;
    if (currentTrack === "clinical_points" && (qzSubMode === "both_mcq" || qzSubMode === "except_mcq" || qzSubMode === "fitb_clinical")) {
      return poolArray;
    }
    if (currentTrack === "patterns" && (qzSubMode === "mixed_mastery" || qzSubMode === "vignette" || qzSubMode === "cardinal_triad" || qzSubMode === "differential" || qzSubMode === "fitb_pattern")) {
      return poolArray;
    }

    return poolArray.filter(p => {
      if (currentTrack === "clinical_points") {
        if (qzSubMode === "actions_mcq") return Boolean(p["Actions"] && String(p["Actions"]).trim());
        if (qzSubMode === "indications_mcq") return Boolean(p["Indications"] && String(p["Indications"]).trim());
        if (qzSubMode === "combinations_mcq") return Boolean((p["Combinations"] && String(p["Combinations"]).trim()) || (p["SS Combo"] && String(p["SS Combo"]).trim()));
        if (qzSubMode === "point_categories_mcq") return parsePointClinicalLines(p, "categories").lines.length > 0;
        if (qzSubMode === "needling_cautions_mcq") return Boolean((p["Needling"] && String(p["Needling"]).trim()) || (p["Cautions"] && String(p["Cautions"]).trim()));
        return true;
      }
      if (currentTrack === "patterns") {
        const pr = parseManifestationRecord(p);
        if (qzSubMode === "tongue_pulse") return Boolean(pr.tongue || pr.pulse);
        if (qzSubMode === "tx_prescription") return Boolean(pr.txPrinciple || pr.rxPointsLine || pr.rxMethodLine || pr.rxLines.length > 0);
        if (qzSubMode === "rx_rationale") return pr.rxExplanations.length > 0 || Boolean(pr.rxPointsLine);
        if (qzSubMode === "pathology_chain") {
          return pr.aetiologyLines.length > 0 || pr.precursorLines.length > 0 || pr.developmentLines.length > 0 || pr.analysisLines.length > 0 || pr.mechanismSentences.length > 0;
        }
        return true;
      }
      return true;
    });
  }

  // --- 7. HUB & MODAL NAVIGATION ---
  window.openToolsHubModal = function () {
    injectQuizHubDOM();
    if (typeof closeBottomSheet === "function") closeBottomSheet();

    const patternCount = (typeof points !== "undefined" ? points : []).filter(
      p => p["Clinical Manifestations"] && String(p["Clinical Manifestations"]).trim() !== ""
    ).length;
    const subEl = document.getElementById("hubPatternCountSub");
    if (subEl && patternCount > 0) {
      subEl.textContent = `${patternCount} patterns • Vignettes, Triads, Sibling Diff, Pathology, Tongue/Pulse & Rx Rationales`;
    }

    document.getElementById("toolsHubModal").style.display = "flex";
  };

  window.closeToolsHubModal = function () {
    const el = document.getElementById("toolsHubModal");
    if (el) el.style.display = "none";
  };

  window.openQuizModal = function (track = "patterns") {
    injectQuizHubDOM();
    if (typeof closeBottomSheet === "function") closeBottomSheet();
    document.getElementById("quizModal").style.display = "flex";
    switchQuizTrack(track);
  };

  window.closeQuizModal = function () {
    saveQuizSessionState();
    if (typeof clearCompare === "function") clearCompare();
    document.getElementById("quizModal").style.display = "none";
  };

  window.toggleQuizSettings = function () {
    document.getElementById("quizSettingsPanel").classList.toggle("open");
  };

  // --- 8. TRACK INITIALIZATION & DROPDOWN CONFIGURATION ---
  window.switchQuizTrack = function (track) {
    currentTrack = track;
    document.getElementById("tabQuizLocation").classList.toggle("active", track === "location");
    document.getElementById("tabQuizClinical").classList.toggle("active", track === "clinical_points");
    document.getElementById("tabQuizPatterns").classList.toggle("active", track === "patterns");

    const masterPoints = typeof points !== "undefined" ? points : [];
    let rawEligible = [];
    if (track === "location") {
      rawEligible = masterPoints.filter(p => p["Short Name"] && (p["Location "] || p["Location"]));
    } else if (track === "clinical_points") {
      rawEligible = masterPoints.filter(
        p => p["Short Name"] && (p["Location "] || p["Location"]) &&
             ((p["Actions"] && String(p["Actions"]).trim()) ||
              (p["Indications"] && String(p["Indications"]).trim()) ||
              (p["Combinations"] && String(p["Combinations"]).trim()))
      );
    } else {
      rawEligible = masterPoints.filter(
        p => p["Short Name"] && p["Clinical Manifestations"] && String(p["Clinical Manifestations"]).trim() !== ""
      );
    }

    // Deduplicate by Short Name and merge any sparse duplicate rows into the richer record
    const byShortName = new Map();
    rawEligible.forEach(p => {
      const key = String(p["Short Name"]).trim();
      if (!byShortName.has(key)) {
        byShortName.set(key, p);
      } else {
        const existing = Object.assign({}, byShortName.get(key));
        Object.keys(p).forEach(k => {
          if ((!existing[k] || String(existing[k]).trim() === "") && p[k] && String(p[k]).trim() !== "") {
            existing[k] = p[k];
          }
        });
        byShortName.set(key, existing);
      }
    });
    trackEligiblePoints = Array.from(byShortName.values());

    trackFilteredPoints = [...trackEligiblePoints];
    trackDistractorPoints = [...trackEligiblePoints];
    activeQuizPool = [...trackEligiblePoints];

    populateSubModeSelect();
    initQuizFilterTree();
    initQuizDistractorTree();
    updatePoolSummaryBanner();

    if (!checkSavedQuizSession()) {
      retakeQuizWholePool();
    }
  };

  function populateSubModeSelect() {
    const subSel = document.getElementById("qzSubModeSelect");
    subSel.innerHTML = "";

    if (currentTrack === "location") {
      subSel.add(new Option("Identify Location / Point (MCQ)", "standard", true, true));
      subSel.add(new Option("Fill in the Blank (Location)", "fitb"));
    } else if (currentTrack === "clinical_points") {
      subSel.add(new Option("⚡ All Clinical Point Modes (NCBAHM Comprehensive)", "both_mcq", true, true));
      subSel.add(new Option("🎯 Actions Only (Diff & EXCEPT)", "actions_mcq"));
      subSel.add(new Option("🩺 Indications & Clinical Application", "indications_mcq"));
      subSel.add(new Option("🏷️ Point Categories (5-Shu, Mu/Shu, Luo/Xi, Confluent)", "point_categories_mcq"));
      subSel.add(new Option("🔗 Point Combinations & Synergy", "combinations_mcq"));
      subSel.add(new Option("⚠️ Needling Depth, Moxa & Safety Cautions", "needling_cautions_mcq"));
      subSel.add(new Option("🚫 Odd Action/Indication Out (EXCEPT Only)", "except_mcq"));
      subSel.add(new Option("📝 Clinical Fill in the Blank", "fitb_clinical"));
    } else if (currentTrack === "patterns") {
      subSel.add(new Option("☯️ Comprehensive Mastery (All 8 NCBAHM Pattern Modes)", "mixed_mastery", true, true));
      subSel.add(new Option("🩺 Clinical Vignette ➔ Pattern (+Clue Ladder)", "vignette"));
      subSel.add(new Option("🎯 Cardinal Triad (Key Symptoms ⇄ Pattern)", "cardinal_triad"));
      subSel.add(new Option("⚖️ Sibling Differential & Odd-Sign-Out (EXCEPT)", "differential"));
      subSel.add(new Option("👅 Tongue & Pulse Differentiation (2-Way)", "tongue_pulse"));
      subSel.add(new Option("🌿 Tx Principle, Needle Method & Point Formula", "tx_prescription"));
      subSel.add(new Option("📍 Point Prescription Rationales & Modifications", "rx_rationale"));
      subSel.add(new Option("🔗 Pathology Mechanisms, Aetiology & Evolution", "pathology_chain"));
      subSel.add(new Option("📝 Diagnostic Fill in the Blank (Lvl 1–4)", "fitb_pattern"));
    }

    qzSubMode = subSel.value;
    populateDifficultySelect();
  }

  function populateDifficultySelect() {
    const diffSel = document.getElementById("qzDifficultySelect");
    diffSel.innerHTML = "";
    qzSubMode = document.getElementById("qzSubModeSelect").value;

    if (qzSubMode.startsWith("fitb")) {
      diffSel.add(new Option("Lvl 1 (1 Key Blank)", "fitb1", true, true));
      diffSel.add(new Option("Lvl 2 (Multi-Term Blank)", "fitb2"));
      diffSel.add(new Option("Lvl 3 (1 Blank ➔ Identify Card)", "fitb3"));
      diffSel.add(new Option("Lvl 4 (Max Blanks ➔ Identify Card)", "fitb4"));
    } else {
      diffSel.add(new Option("Easy (Full Clues / Broad Contrast)", "easy"));
      diffSel.add(new Option("Medium (Standard Vignette / Siblings)", "medium", true, true));
      diffSel.add(new Option("Hard (Partial Clues / Close Siblings)", "hard"));
      diffSel.add(new Option("Insane (Minimal Clues / High Interference)", "insane"));
    }
    qzDifficulty = diffSel.value;
  }

  window.onQuizModeOrDiffChange = function () {
    const prevWasFitb = qzSubMode.startsWith("fitb");
    qzSubMode = document.getElementById("qzSubModeSelect").value;
    const nowIsFitb = qzSubMode.startsWith("fitb");
    if (prevWasFitb !== nowIsFitb) {
      populateDifficultySelect();
    } else {
      qzDifficulty = document.getElementById("qzDifficultySelect").value;
    }
    retakeQuizWholePool();
  };

  function updatePoolSummaryBanner() {
    const el = document.getElementById("quizPoolSummaryLabel");
    if (!el) return;

    const eligibleFiltered = getSubModeEligiblePool(trackFilteredPoints);
    const totalTrack = trackEligiblePoints.length;
    const isFiltered = trackFilteredPoints.length < totalTrack;
    const limitVal = document.getElementById("qzLimitSelect")?.value || "10";

    if (limitVal === "all") {
      if (isFiltered) {
        el.textContent = `Pool: ${activeQuizPool.length} Filtered (of ${totalTrack} Total)`;
      } else {
        el.textContent = `Pool: All ${activeQuizPool.length}`;
      }
    } else {
      let seenIds = [];
      try { seenIds = JSON.parse(localStorage.getItem(getSeenKey()) || "[]"); } catch (e) {}
      const unseenLeft = eligibleFiltered.filter(p => !seenIds.includes(p["Short Name"])).length;

      if (isFiltered) {
        el.textContent = `Batch: ${activeQuizPool.length} • Filtered: ${eligibleFiltered.length} (${unseenLeft} left) / ${totalTrack}`;
      } else {
        el.textContent = `Batch: ${activeQuizPool.length} of ${eligibleFiltered.length} (${unseenLeft} unseen)`;
      }
    }
  }

  // --- 9. SMART DISTRACTOR ENGINES ---
  function getAnatomicalRegions(locText) {
    if (!locText) return { specific: null, macro: "other" };
    const t = locText.toLowerCase();
    let specific = null, macro = "other";

    if (t.includes("lower leg") || t.includes("calf")) specific = "lower leg";
    else if (t.includes("upper leg") || t.includes("thigh")) specific = "upper leg";
    else if (t.includes("foot") || t.includes("toe") || t.includes("sole") || t.includes("malleolus") || t.includes("ankle")) specific = "foot/ankle";
    else if (t.includes("forearm")) specific = "forearm";
    else if (t.includes("upper arm") || t.includes("shoulder")) specific = "upper arm";
    else if (t.includes("cubital crease") || t.includes("olecranon")) specific = "elbow";
    else if (t.includes("hand") || t.includes("finger") || t.includes("palm") || t.includes("wrist")) specific = "hand/wrist";
    else if (t.includes("abdomen") || t.includes("umbilicus")) specific = "abdomen";
    else if (t.includes("chest") || t.includes("sternum") || t.includes("clavicle") || t.includes("rib")) specific = "chest";
    else if (t.includes("back") || t.includes("spine") || t.includes("thoracic") || t.includes("lumbar") || t.includes("sacrum") || t.includes("scapula")) specific = "back";
    else if (t.includes("face") || t.includes("eye") || t.includes("nose") || t.includes("mouth") || t.includes("jaw") || t.includes("cheek")) specific = "face";
    else if (t.includes("head") || t.includes("scalp")) specific = "head";
    else if (t.includes("neck") || t.includes("cervical")) specific = "neck";

    if (["lower leg", "upper leg", "foot/ankle"].includes(specific) || t.includes("leg") || t.includes("knee") || t.includes("popliteal")) macro = "leg";
    else if (["forearm", "upper arm", "hand/wrist", "elbow"].includes(specific) || t.includes("arm") || t.includes("cubital")) macro = "arm";
    else if (["abdomen", "chest", "back"].includes(specific) || t.includes("torso")) macro = "torso";
    else if (["face", "head", "neck"].includes(specific) || t.includes("ear")) macro = "head";

    return { specific, macro };
  }

  function getCloseNumbers(targetStr, fullPool) {
    let targetNum = parseFloat(targetStr);
    if (isNaN(targetNum)) return shuffleArr(fullPool.filter(w => w !== targetStr));
    let filtered = fullPool.filter(w => parseFloat(w) !== targetNum);
    filtered.sort((a, b) => Math.abs(parseFloat(a) - targetNum) - Math.abs(parseFloat(b) - targetNum));
    return shuffleArr(filtered.slice(0, 5));
  }

  function getLocationWordCategory(word, originalText = "", index = -1) {
    let lower = word.toLowerCase();
    if (locBlankCategories.directions.includes(lower)) return "directions";
    if (locBlankCategories.anatomy.includes(lower)) return "anatomy";
    if (!isNaN(parseFloat(word))) {
      if (word.includes(".")) return "cunNumbers";
      if (originalText && index !== -1) {
        let textAfter = originalText.substring(index + word.length, index + word.length + 6).toLowerCase();
        if (textAfter.includes("cun")) return "cunNumbers";
      }
      return "pointNumbers";
    }
    return null;
  }

  function mutateLocationText(text) {
    if (!text) return text;
    let mutated = text;
    let matches = [...mutated.matchAll(locTargetWordsRegex)];
    if (matches.length > 0) {
      let numMutations = Math.floor(Math.random() * 3) + 1;
      let matchesToMutate = shuffleArr(matches).slice(0, numMutations).sort((a, b) => b.index - a.index);
      for (let m of matchesToMutate) {
        let originalWord = m[0];
        let lowerWord = originalWord.toLowerCase();
        let cat = getLocationWordCategory(originalWord, text, m.index);
        if (!cat) continue;
        let pool = (cat === "cunNumbers" || cat === "pointNumbers")
          ? getCloseNumbers(originalWord, locBlankCategories[cat])
          : locBlankCategories[cat].filter(w => w.toLowerCase() !== lowerWord);
        if (pool.length > 0) {
          let newWord = pool[Math.floor(Math.random() * pool.length)];
          if (/^[A-Z]/.test(originalWord)) newWord = newWord.charAt(0).toUpperCase() + newWord.slice(1);
          mutated = mutated.substring(0, m.index) + newWord + mutated.substring(m.index + originalWord.length);
        }
      }
    }
    return mutated;
  }

  // Uses global replacement so repeated terms in a statement never contradict themselves
  function mutateClinicalOrPatternStatement(text) {
    if (!text) return text;
    let out = text;
    const allGroups = Object.values(clinicalBlankCategories);
    let swapsDone = 0;

    for (let group of shuffleArr(allGroups)) {
      if (swapsDone >= 2) break;
      const escaped = [...group].sort((a, b) => b.length - a.length).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
      const rx = new RegExp("\\b(" + escaped.join("|") + ")\\b", "i");
      const m = out.match(rx);
      if (m) {
        const orig = m[1];
        const alternatives = group.filter(w => w.toLowerCase() !== orig.toLowerCase());
        if (alternatives.length > 0) {
          let rep = alternatives[Math.floor(Math.random() * alternatives.length)];
          if (/^[A-Z]/.test(orig)) rep = rep.charAt(0).toUpperCase() + rep.slice(1);
          const globalOrigRx = new RegExp("\\b" + orig.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "gi");
          out = out.replace(globalOrigRx, rep);
          swapsDone++;
        }
      }
    }
    return out;
  }

  function getSmartPointDistractors(targetPoint, count) {
    const targetName = targetPoint["Short Name"];
    const normTargetName = normalizePointCode(targetName);

    if (typeof hardcodedDistractors !== "undefined" && !window._normalizedDistractors) {
      window._normalizedDistractors = {};
      for (let key in hardcodedDistractors) {
        let normKey = normalizePointCode(key);
        window._normalizedDistractors[normKey] = {};
        for (let diff in hardcodedDistractors[key]) {
          window._normalizedDistractors[normKey][diff] = hardcodedDistractors[key][diff].map(normalizePointCode);
        }
      }
    }

    if (currentTrack === "location" && window._normalizedDistractors && window._normalizedDistractors[normTargetName] && window._normalizedDistractors[normTargetName][qzDifficulty]) {
      let hardcodedNormNames = window._normalizedDistractors[normTargetName][qzDifficulty];
      let curatedObjects = trackDistractorPoints.filter(p => hardcodedNormNames.includes(normalizePointCode(p["Short Name"])));
      let otherPoints = trackDistractorPoints.filter(
        p => p["Short Name"] !== targetName && !curatedObjects.some(c => c["Short Name"] === p["Short Name"])
      );
      let wildcards = shuffleArr(otherPoints).slice(0, 2);
      let combined = shuffleArr([...curatedObjects, ...wildcards]);
      if (combined.length >= count) return combined.slice(0, count);
    }

    const otherPoints = trackDistractorPoints.filter(p => p["Short Name"] !== targetName);

    if (currentTrack === "clinical_points") {
      const targetClinical = stripBBCode((targetPoint["Actions"] || "") + " " + (targetPoint["Indications"] || "")).toLowerCase();
      const targetChan = targetPoint["Channel Full Name"] || targetPoint[" Channel Full Name"] || "";
      const clinicalTokens = [
        ...clinicalBlankCategories.verbs,
        ...clinicalBlankCategories.pathogens,
        ...clinicalBlankCategories.substances,
        ...clinicalBlankCategories.organs
      ].filter(tok => targetClinical.includes(tok));

      const scored = otherPoints.map(p => {
        const pText = stripBBCode((p["Actions"] || "") + " " + (p["Indications"] || "")).toLowerCase();
        const pChan = p["Channel Full Name"] || p[" Channel Full Name"] || "";
        let overlap = 0;
        clinicalTokens.forEach(tok => { if (pText.includes(tok)) overlap += 3; });
        if (pChan && pChan === targetChan) overlap += 5;
        return { point: p, score: overlap + Math.random() };
      });

      if (qzDifficulty === "easy") {
        return shuffleArr(otherPoints).slice(0, count);
      } else if (qzDifficulty === "medium") {
        scored.sort((a, b) => b.score - a.score);
        return shuffleArr(scored.slice(0, Math.max(count * 3, 15)).map(s => s.point)).slice(0, count);
      } else {
        scored.sort((a, b) => b.score - a.score);
        return shuffleArr(scored.slice(0, Math.max(count + 2, 8)).map(s => s.point)).slice(0, count);
      }
    }

    let match = targetName.match(/^([A-Za-z.]+)[-\s]*(\d+)/);
    let prefix = match ? match[1] : "";
    let targetNum = match ? parseInt(match[2], 10) : 0;
    let targetLoc = (targetPoint["Location "] || targetPoint["Location"] || "").toLowerCase();
    let targetRegions = getAnatomicalRegions(targetLoc);

    let sameChannelPoints = prefix
      ? otherPoints.filter(p => p["Short Name"].startsWith(prefix)).sort((a, b) => {
          let numA = parseInt((a["Short Name"].match(/\d+/) || [0])[0], 10);
          let numB = parseInt((b["Short Name"].match(/\d+/) || [0])[0], 10);
          return Math.abs(numA - targetNum) - Math.abs(numB - targetNum);
        })
      : [];

    if (qzDifficulty === "easy") {
      let macroPool = otherPoints.filter(p => getAnatomicalRegions((p["Location "] || p["Location"] || "").toLowerCase()).macro === targetRegions.macro);
      let res = shuffleArr(macroPool).slice(0, count);
      if (res.length < count) {
        res = res.concat(shuffleArr(otherPoints.filter(x => !res.includes(x))).slice(0, count - res.length));
      }
      return res;
    }

    let specificPool = otherPoints.filter(p => {
      let r = getAnatomicalRegions((p["Location "] || p["Location"] || "").toLowerCase());
      return (r.specific && r.specific === targetRegions.specific) || r.macro === targetRegions.macro;
    });
    let combined = [...new Set([...sameChannelPoints.slice(0, 6), ...shuffleArr(specificPool).slice(0, 8), ...shuffleArr(otherPoints)])];
    return shuffleArr(combined.slice(0, 12)).slice(0, count);
  }

  function getSmartPatternDistractors(targetPattern, count) {
    const targetName = targetPattern["Short Name"];
    const targetTitleLower = (targetName + " " + (targetPattern["Full Name"] || targetPattern[" Full Name"] || "")).toLowerCase();
    const targetParsed = parseManifestationRecord(targetPattern);
    const targetChanFull = (targetPattern["Channel Full Name"] || targetPattern[" Channel Full Name"] || "").trim().toLowerCase();
    const targetChanShort = (targetPattern["Channel Short Name"] || targetPattern[" Channel Short Name"] || "").trim().toLowerCase();

    const otherPatterns = trackDistractorPoints.filter(p => p["Short Name"] !== targetName);
    if (otherPatterns.length <= count) return shuffleArr(otherPatterns);

    const organs = clinicalBlankCategories.organs.filter(o => targetTitleLower.includes(o));
    const pathogens = [...clinicalBlankCategories.pathogens, ...clinicalBlankCategories.substances].filter(pa => targetTitleLower.includes(pa));

    const targetKeyWords = new Set(
      targetParsed.keySymptoms
        .join(" ")
        .toLowerCase()
        .split(/\W+/)
        .filter(w => w.length > 3 && !["pulse", "tongue", "with", "from", "that"].includes(w))
    );
    const targetSymWords = new Set(
      targetParsed.symptoms
        .join(" ")
        .toLowerCase()
        .split(/\W+/)
        .filter(w => w.length > 3)
    );

    const scored = otherPatterns.map(p => {
      const pTitleLower = (p["Short Name"] + " " + (p["Full Name"] || p[" Full Name"] || "")).toLowerCase();
      const pChanFull = (p["Channel Full Name"] || p[" Channel Full Name"] || "").trim().toLowerCase();
      const pChanShort = (p["Channel Short Name"] || p[" Channel Short Name"] || "").trim().toLowerCase();
      const pParsed = parseManifestationRecord(p);

      let score = 0;

      // 1. Same sub-group (e.g. Heart Patterns vs Heart Patterns, 6 Stages vs 6 Stages, Bi Syndromes vs Bi Syndromes)
      if (targetChanShort && pChanShort) {
        if (pChanShort === targetChanShort) score += 22;
        else if (pChanShort.includes(targetChanShort) || targetChanShort.includes(pChanShort)) score += 12;
      }
      if (targetChanFull && pChanFull && pChanFull === targetChanFull) {
        score += 14;
      }

      // 2. Shared Zang-Fu Organ (creates Same-Organ / Different-Pathology sibling traps)
      let sharedOrganCount = 0;
      organs.forEach(org => {
        if (pTitleLower.includes(org)) {
          score += 18;
          sharedOrganCount++;
        }
      });

      // 3. Shared Pathogen / Substance (creates Same-Pathology / Different-Organ sibling traps, e.g. Heart-Blood vs Liver-Blood)
      pathogens.forEach(pa => {
        if (pTitleLower.includes(pa)) {
          score += (sharedOrganCount === 0 ? 14 : 8);
        }
      });

      // 4. Shared Key/Cardinal Symptoms (highest board-exam differential value)
      pParsed.keySymptoms.forEach(ks => {
        ks.toLowerCase().split(/\W+/).forEach(w => {
          if (targetKeyWords.has(w)) score += 4;
        });
      });

      // 5. General symptom & tongue/pulse overlap
      pParsed.symptoms.forEach(sym => {
        sym.toLowerCase().split(/\W+/).forEach(w => {
          if (w.length > 3 && targetSymWords.has(w)) score += 1.2;
        });
      });

      const imp = String(p.Important || "").trim();
      if (imp === "!!!") score += 4;
      else if (imp === "!!") score += 2.5;
      else if (imp === "!") score += 1.5;

      return { point: p, score: score + (Math.random() * 1.5) };
    });

    scored.sort((a, b) => b.score - a.score);

    if (qzDifficulty === "easy") {
      // Easy: Broader contrast from lower-overlap pool while keeping same macro category when possible
      const midSlice = scored.slice(Math.min(4, Math.floor(scored.length / 3)));
      return shuffleArr(midSlice.length >= count ? midSlice : scored).slice(0, count).map(s => s.point);
    } else if (qzDifficulty === "medium") {
      return shuffleArr(scored.slice(0, Math.max(count * 2 + 2, 12)).map(s => s.point)).slice(0, count);
    } else {
      // Hard & Insane: Closest clinical siblings (top 6-7 highest-scoring differentials)
      return shuffleArr(scored.slice(0, Math.max(count + 1, 6)).map(s => s.point)).slice(0, count);
    }
  }

  // --- 10. INTERACTIVE CLUE LADDER (Progressive Reveal for Vignettes) ---
  function setupClueLadder(cluesArray) {
    currentClueQueue = Array.isArray(cluesArray) ? [...cluesArray] : [];
    const clueBtn = document.getElementById("qzClueBtn");
    if (!clueBtn) return;
    if (currentClueQueue.length > 0) {
      clueBtn.style.display = "inline-block";
      clueBtn.textContent = `💡 +1 Clue (${currentClueQueue.length})`;
    } else {
      clueBtn.style.display = "none";
    }
  }

  window.revealNextQuizClue = function () {
    if (currentClueQueue.length === 0) return;
    const nextClueHtml = currentClueQueue.shift();
    const bodyEl = document.getElementById("qzQuestionBody");
    if (bodyEl) {
      const clueDiv = document.createElement("div");
      clueDiv.style.cssText = "margin-top:6px; padding:6px 10px; background:rgba(255,149,0,0.1); border-left:3px solid #ff9f0a; border-radius:4px; animation: fadeIn 0.2s ease;";
      clueDiv.innerHTML = nextClueHtml;
      bodyEl.appendChild(clueDiv);
    }
    const clueBtn = document.getElementById("qzClueBtn");
    if (clueBtn) {
      if (currentClueQueue.length > 0) {
        clueBtn.textContent = `💡 +1 Clue (${currentClueQueue.length})`;
      } else {
        clueBtn.style.display = "none";
      }
    }
  };

  // --- 11. QUESTION GENERATORS FOR ALL 3 TRACKS ---
  window.generateNextQuizQuestion = function () {
    const nextBtn = document.getElementById("qzNextBtn");
    const bottomBar = document.getElementById("qzBottomBar");
    const inspectBar = document.getElementById("qzInspectBar");
    const digestCard = document.getElementById("qzDigestCard");
    const optionsGrid = document.getElementById("qzOptionsGrid");
    const revealBtn = document.getElementById("qzRevealBtn");
    const requeueBadge = document.getElementById("qzRequeueBadge");

    nextBtn.style.display = "none";
    bottomBar.style.display = "none";
    inspectBar.style.display = "none";
    inspectBar.innerHTML = "";
    if (digestCard) {
      digestCard.style.display = "none";
      digestCard.innerHTML = "";
    }
    optionsGrid.innerHTML = "";
    currentPickedWrongPointId = null;
    currentContrastPointId = null;
    currentDecoySourceNote = null;
    setupClueLadder([]);

    const activeView = document.getElementById("qzActiveView");
    if (activeView) activeView.scrollTop = 0;

    if (activeQuizPool.length === 0) {
      document.getElementById("qzQuestionLabel").textContent = "Empty Pool for This Mode";
      document.getElementById("qzQuestionBody").innerHTML = "No records in your current filter have data for this quiz mode. Tap <b>🎯 Filter Pool</b> or switch the Sub-Mode in <b>⚙️ Settings</b>.";
      return;
    }

    if (remainingQuizQueue.length === 0) {
      showQuizSummaryScreen();
      return;
    }

    const poppedItem = remainingQuizQueue.pop();
    if (poppedItem && poppedItem._isRequeuedWrapper) {
      currentTargetPoint = poppedItem.point;
      currentIsRequeuedTry = true;
    } else {
      currentTargetPoint = poppedItem;
      currentIsRequeuedTry = false;
    }

    if (requeueBadge) {
      requeueBadge.style.display = currentIsRequeuedTry ? "inline-block" : "none";
    }

    saveQuizSessionState();

    if (currentTrack === "location") {
      buildLocationQuestion(currentTargetPoint);
    } else if (currentTrack === "clinical_points") {
      buildClinicalPointsQuestion(currentTargetPoint);
    } else {
      buildPatternDifferentiationQuestion(currentTargetPoint);
    }

    if (qzRequireReveal) {
      optionsGrid.style.display = "none";
      revealBtn.style.display = "block";
    } else {
      optionsGrid.style.display = "flex";
      revealBtn.style.display = "none";
    }
  };

  window.revealQuizOptions = function () {
    document.getElementById("qzRevealBtn").style.display = "none";
    document.getElementById("qzOptionsGrid").style.display = "flex";
  };

  // --- TRACK 1 BUILDER: POINT LOCATION ---
  function buildLocationQuestion(targetPoint) {
    const rawText = targetPoint["Location "] || targetPoint["Location"] || "";
    const labelEl = document.getElementById("qzQuestionLabel");
    const bodyEl = document.getElementById("qzQuestionBody");
    let qDiff = qzDifficulty;
    let optionsData = [];

    if (qzSubMode === "fitb") {
      let cleanText = stripBBCode(rawText);
      let allMatches = [...cleanText.matchAll(locTargetWordsRegex)];
      let numMatches = [...cleanText.matchAll(locNumRegexGlobal)];
      let wordMatches = [...cleanText.matchAll(locSpecificWordsRegex)];

      if ((qDiff === "fitb2" || qDiff === "fitb4") && numMatches.length === 0) qDiff = qDiff === "fitb2" ? "fitb1" : "fitb3";
      if (allMatches.length === 0) qDiff = "standard";

      if (qDiff.startsWith("fitb")) {
        let matchesToReplace = [];
        if (qDiff === "fitb1" || qDiff === "fitb3") {
          matchesToReplace.push(allMatches[Math.floor(Math.random() * allMatches.length)]);
        } else {
          matchesToReplace.push(...numMatches);
          if (qDiff === "fitb4" && wordMatches.length > 0) {
            matchesToReplace.push(...shuffleArr(wordMatches).slice(0, Math.min(wordMatches.length, 2)));
          }
        }

        let seenIdx = new Set();
        let ordered = matchesToReplace.filter(m => {
          if (seenIdx.has(m.index)) return false;
          seenIdx.add(m.index);
          return true;
        }).sort((a, b) => a.index - b.index);

        let correctMissingWords = ordered.map(m => m[0].toLowerCase());
        let displayHtml = bbcodeToHtml(rawText);
        ordered.forEach(m => {
          let wRx = new RegExp("\\b" + m[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i");
          displayHtml = displayHtml.replace(wRx, "<span class='quiz-fitb-blank'>[ ______ ]</span>");
        });

        const buildFakeCombo = () => ordered.map(m => {
          let cat = getLocationWordCategory(m[0], cleanText, m.index) || "anatomy";
          let pool = (cat === "cunNumbers" || cat === "pointNumbers")
            ? getCloseNumbers(m[0], locBlankCategories[cat])
            : locBlankCategories[cat].filter(w => w.toLowerCase() !== m[0].toLowerCase());
          if (pool.length === 0) pool = locBlankCategories[cat];
          return pool[Math.floor(Math.random() * pool.length)];
        }).join(", ");

        if (qDiff === "fitb1") {
          labelEl.textContent = `Location Blank • ${targetPoint["Short Name"]}`;
          currentCorrectAnswer = correctMissingWords[0];
          let cat = getLocationWordCategory(currentCorrectAnswer, cleanText, ordered[0].index) || "anatomy";
          let pool = (cat === "cunNumbers" || cat === "pointNumbers")
            ? getCloseNumbers(currentCorrectAnswer, locBlankCategories[cat])
            : locBlankCategories[cat].filter(w => w.toLowerCase() !== currentCorrectAnswer);
          optionsData = shuffleArr([currentCorrectAnswer, ...pool.slice(0, 5)]).map(t => ({ text: t }));
        } else if (qDiff === "fitb2") {
          labelEl.textContent = `Location Numbers • ${targetPoint["Short Name"]}`;
          currentCorrectAnswer = correctMissingWords.join(", ");
          let set = new Set([currentCorrectAnswer]);
          let guard = 0;
          while (set.size < 6 && guard++ < 40) set.add(buildFakeCombo());
          optionsData = shuffleArr([...set]).map(t => ({ text: t }));
        } else {
          labelEl.textContent = qDiff === "fitb3" ? "Identify Point & Missing Term" : "Identify Point & All Missing Values";
          displayHtml = maskSelfSpoilers(displayHtml, targetPoint);
          currentCorrectAnswer = `${targetPoint["Short Name"]} (${correctMissingWords.join(", ")})`;
          let opts = [{ text: currentCorrectAnswer, pointId: targetPoint["Short Name"] }];
          let distractors = getSmartPointDistractors(targetPoint, 5);

          if (qDiff === "fitb4" && Math.random() < 0.5) {
            opts.push({ text: `${targetPoint["Short Name"]} (${buildFakeCombo()})`, pointId: targetPoint["Short Name"] });
            distractors = distractors.slice(0, 4);
          }
          distractors.forEach(d => {
            opts.push({ text: `${d["Short Name"]} (${buildFakeCombo()})`, pointId: d["Short Name"] });
          });
          optionsData = shuffleArr(opts);
        }

        bodyEl.innerHTML = displayHtml;
        renderQuizOptionButtons(optionsData);
        return;
      }
    }

    const distractors = getSmartPointDistractors(targetPoint, 6);
    if (Math.random() < 0.55) {
      labelEl.textContent = "Identify the Point from Location";
      bodyEl.innerHTML = maskSelfSpoilers(bbcodeToHtml(rawText), targetPoint);
      currentCorrectAnswer = targetPoint["Short Name"];
      optionsData = shuffleArr([
        { text: targetPoint["Short Name"], pointId: targetPoint["Short Name"] },
        ...distractors.slice(0, 5).map(d => ({ text: d["Short Name"], pointId: d["Short Name"] }))
      ]);
    } else {
      labelEl.textContent = "Select the Exact Location";
      bodyEl.innerHTML = `<div style="font-size:24px; font-weight:900; color:#cc5500; text-align:center; padding:8px 0;">${escapeHTML(targetPoint["Short Name"])}</div>`;
      currentCorrectAnswer = stripBBCode(rawText).trim();
      let opts = [{ text: bbcodeToHtml(rawText), rawCompare: currentCorrectAnswer, pointId: targetPoint["Short Name"] }];

      for (let i = 0; i < 3 && opts.length < 3; i++) {
        let mut = mutateLocationText(rawText);
        if (stripBBCode(mut).trim() !== currentCorrectAnswer && !opts.some(o => o.rawCompare === stripBBCode(mut).trim())) {
          opts.push({ text: bbcodeToHtml(mut), rawCompare: stripBBCode(mut).trim(), pointId: targetPoint["Short Name"] });
        }
      }
      for (let d of distractors) {
        if (opts.length >= 6) break;
        let dLoc = d["Location "] || d["Location"] || "";
        if (dLoc && stripBBCode(dLoc).trim() !== currentCorrectAnswer) {
          opts.push({ text: bbcodeToHtml(dLoc), rawCompare: stripBBCode(dLoc).trim(), pointId: d["Short Name"] });
        }
      }
      optionsData = shuffleArr(opts);
    }

    renderQuizOptionButtons(optionsData);
  }

  // --- TRACK 2 BUILDER: POINT ACTIONS, INDICATIONS, CATEGORIES, NEEDLING & COMBINATIONS ---
  function buildClinicalPointsQuestion(targetPoint) {
    const labelEl = document.getElementById("qzQuestionLabel");
    const bodyEl = document.getElementById("qzQuestionBody");
    const distractors = getSmartPointDistractors(targetPoint, 6);
    const stdTargetName = standardizeTCMTerminology(targetPoint["Short Name"]);

    // Choose effective sub-mode when in comprehensive 'both_mcq'
    let effectivePointMode = qzSubMode;
    if (qzSubMode === "both_mcq") {
      const availableModes = ["both_mcq", "actions_mcq", "indications_mcq", "except_mcq"];
      if (parsePointClinicalLines(targetPoint, "categories").lines.length > 0 && Math.random() < 0.25) {
        availableModes.push("point_categories_mcq");
      }
      if (parsePointClinicalLines(targetPoint, "combinations").lines.length > 0 && Math.random() < 0.2) {
        availableModes.push("combinations_mcq");
      }
      if (parsePointClinicalLines(targetPoint, "needling").lines.some(l => /caution|contraindicated|moxa|artery|pneumothorax/i.test(l)) && Math.random() < 0.2) {
        availableModes.push("needling_cautions_mcq");
      }
      effectivePointMode = availableModes[Math.floor(Math.random() * availableModes.length)];
    }

    // 1. POINT CATEGORIES SUB-MODE (Five-Shu, Yuan, Luo, Xi-Cleft, Front-Mu, Back-Shu, Confluent, Hui-Meeting)
    if (effectivePointMode === "point_categories_mcq") {
      const catParsed = parsePointClinicalLines(targetPoint, "categories");
      if (catParsed.lines.length > 0) {
        const chosenCat = catParsed.lines[Math.floor(Math.random() * catParsed.lines.length)];
        const askWhichPoint = Math.random() < 0.65;

        if (askWhichPoint) {
          labelEl.textContent = "Point Category Identification";
          bodyEl.innerHTML = `
            <div style="font-size:13px; color:#8e8e93; margin-bottom:6px;">Which acupuncture point holds the following category designation?</div>
            <div class="quiz-diag-box" style="font-size:15.5px; font-weight:700;">${maskSelfSpoilers(escapeHTML(chosenCat), targetPoint)}</div>
          `;
          const actPreview = parsePointClinicalLines(targetPoint, "actions").lines.slice(0, 2);
          if (actPreview.length > 0) {
            setupClueLadder([`<strong>Key Action:</strong> ${maskSelfSpoilers(escapeHTML(actPreview.join("; ")), targetPoint)}`]);
          }
          currentCorrectAnswer = stdTargetName;
          const opts = [
            { text: stdTargetName, pointId: targetPoint["Short Name"] },
            ...distractors.slice(0, 5).map(d => ({ text: standardizeTCMTerminology(d["Short Name"]), pointId: d["Short Name"] }))
          ];
          renderQuizOptionButtons(shuffleArr(opts));
          return;
        } else {
          labelEl.textContent = `Point Category • ${stdTargetName}`;
          bodyEl.innerHTML = `
            <div style="font-size:20px; font-weight:900; color:#cc5500; margin-bottom:6px;">${escapeHTML(stdTargetName)}</div>
            <div style="color:#007aff; font-weight:700;">Which of the following is an official point category / classification for <u>${escapeHTML(stdTargetName)}</u>?</div>
          `;
          currentCorrectAnswer = chosenCat;
          let opts = [{ text: escapeHTML(chosenCat), rawCompare: chosenCat, pointId: targetPoint["Short Name"] }];
          for (let d of distractors) {
            if (opts.length >= 6) break;
            const dCats = parsePointClinicalLines(d, "categories").lines;
            if (dCats.length > 0 && !opts.some(o => o.rawCompare.toLowerCase() === dCats[0].toLowerCase())) {
              opts.push({ text: escapeHTML(dCats[0]), rawCompare: dCats[0], pointId: d["Short Name"] });
            }
          }
          if (opts.length >= 3) {
            renderQuizOptionButtons(shuffleArr(opts));
            return;
          }
        }
      }
    }

    // 2. NEEDLING DEPTH, MOXA & SAFETY CAUTIONS SUB-MODE
    if (effectivePointMode === "needling_cautions_mcq") {
      const needlingLines = parsePointClinicalLines(targetPoint, "needling").lines;
      if (needlingLines.length > 0) {
        const cautionLine = needlingLines.find(l => /caution|contraindicated|avoid|pneumothorax|pregnancy|moxibustion|artery/i.test(l)) || needlingLines[0];
        labelEl.textContent = `Needling & Safety Cautions • ${stdTargetName}`;
        bodyEl.innerHTML = `
          <div style="font-size:20px; font-weight:900; color:#cc5500; margin-bottom:6px;">${escapeHTML(stdTargetName)}</div>
          <div style="color:#007aff; font-weight:700;">Select the accurate needling technique or safety caution for <u>${escapeHTML(stdTargetName)}</u>:</div>
        `;
        const cleanCaution = maskSelfSpoilers(escapeHTML(cautionLine), targetPoint, stdTargetName);
        currentCorrectAnswer = stripBBCode(cleanCaution).trim();
        let opts = [{ text: cleanCaution, rawCompare: currentCorrectAnswer, pointId: targetPoint["Short Name"] }];

        for (let d of distractors) {
          if (opts.length >= 5) break;
          const dNLines = parsePointClinicalLines(d, "needling").lines;
          if (dNLines.length > 0) {
            const dPick = dNLines.find(l => /caution|contraindicated|avoid|pneumothorax|pregnancy|moxibustion|artery/i.test(l)) || dNLines[0];
            const dDisp = maskSelfSpoilers(escapeHTML(dPick), d, stdTargetName);
            const dRaw = stripBBCode(dDisp).trim();
            if (dRaw.toLowerCase() !== currentCorrectAnswer.toLowerCase() && !opts.some(o => o.rawCompare.toLowerCase() === dRaw.toLowerCase())) {
              opts.push({ text: dDisp, rawCompare: dRaw, pointId: d["Short Name"] });
            }
          }
        }
        if (opts.length >= 3) {
          renderQuizOptionButtons(shuffleArr(opts));
          return;
        }
      }
    }

    // 3. POINT COMBINATIONS SUB-MODE
    if (effectivePointMode === "combinations_mcq") {
      const combParsed = parsePointClinicalLines(targetPoint, "combinations");
      if (combParsed.lines.length > 0) {
        const chosenLine = combParsed.lines[Math.floor(Math.random() * combParsed.lines.length)];
        labelEl.textContent = "Point Combinations & Clinical Synergy";
        bodyEl.innerHTML = `
          <div style="font-size:13px; color:#8e8e93; margin-bottom:6px;">Which point completes this clinical combination?</div>
          <div class="quiz-diag-box">${maskSelfSpoilers(bbcodeToHtml(chosenLine), targetPoint)}</div>
        `;
        currentCorrectAnswer = stdTargetName;
        const opts = [
          { text: stdTargetName, pointId: targetPoint["Short Name"] },
          ...distractors.slice(0, 5).map(d => ({ text: standardizeTCMTerminology(d["Short Name"]), pointId: d["Short Name"] }))
        ];
        renderQuizOptionButtons(shuffleArr(opts));
        return;
      }
    }

    const fieldMode = effectivePointMode === "actions_mcq" ? "actions" : (effectivePointMode === "indications_mcq" ? "indications" : "both");
    const parsed = parsePointClinicalLines(targetPoint, fieldMode);
    const fallbackParsed = parsed.lines.length > 0 ? parsed : parsePointClinicalLines(targetPoint, "both");

    // 4. CLINICAL FILL-IN-THE-BLANK SUB-MODE
    if (qzSubMode === "fitb_clinical") {
      const allClinicalTerms = [
        ...clinicalBlankCategories.verbs,
        ...clinicalBlankCategories.pathogens,
        ...clinicalBlankCategories.substances,
        ...clinicalBlankCategories.organs
      ].sort((a, b) => b.length - a.length);
      const termRx = new RegExp("\\b(" + allClinicalTerms.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")\\b", "gi");

      const sampleLines = fallbackParsed.lines.slice(0, 4).join("\n• ");
      const cleanSample = "• " + sampleLines;
      const matches = [...cleanSample.matchAll(termRx)];

      if (matches.length > 0) {
        const pickCount = (qzDifficulty === "fitb2" || qzDifficulty === "fitb4") ? Math.min(3, matches.length) : 1;
        const uniqueWordMatches = [];
        const seenLower = new Set();
        shuffleArr(matches).forEach(m => {
          const low = m[0].toLowerCase();
          if (!seenLower.has(low)) {
            seenLower.add(low);
            uniqueWordMatches.push(m);
          }
        });
        const chosen = uniqueWordMatches.slice(0, pickCount).sort((a, b) => a.index - b.index);
        const missingWords = chosen.map(m => m[0].toLowerCase());

        let displayHtml = escapeHTML(cleanSample).replace(/\n/g, "<br>");
        chosen.forEach(m => {
          const r = new RegExp("\\b" + m[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "gi");
          displayHtml = displayHtml.replace(r, "<span class='quiz-fitb-blank'>[ ______ ]</span>");
        });

        const buildFakeTerms = () => chosen.map(m => {
          const wLower = m[0].toLowerCase();
          const catList = Object.values(clinicalBlankCategories).find(arr => arr.includes(wLower)) || clinicalBlankCategories.pathogens;
          const pool = catList.filter(x => x !== wLower);
          return pool[Math.floor(Math.random() * pool.length)];
        }).join(", ");

        if (qzDifficulty === "fitb1" || qzDifficulty === "fitb2") {
          labelEl.textContent = `Clinical Blank • ${stdTargetName}`;
          currentCorrectAnswer = missingWords.join(", ");
          let set = new Set([currentCorrectAnswer]);
          let guard = 0;
          while (set.size < 6 && guard++ < 40) set.add(buildFakeTerms());
          bodyEl.innerHTML = displayHtml;
          renderQuizOptionButtons(shuffleArr([...set]).map(t => ({ text: t })));
          return;
        } else {
          labelEl.textContent = "Identify Point & Missing Clinical Term(s)";
          currentCorrectAnswer = `${stdTargetName} (${missingWords.join(", ")})`;
          let opts = [{ text: currentCorrectAnswer, pointId: targetPoint["Short Name"] }];
          distractors.slice(0, 5).forEach(d => {
            opts.push({ text: `${standardizeTCMTerminology(d["Short Name"])} (${buildFakeTerms()})`, pointId: d["Short Name"] });
          });
          bodyEl.innerHTML = maskSelfSpoilers(displayHtml, targetPoint);
          renderQuizOptionButtons(shuffleArr(opts));
          return;
        }
      }
    }

    const lines = fallbackParsed.lines;
    const shuffledLines = shuffleArr(lines);
    const targetAllNorm = new Set(lines.map(l => stripBBCode(l).trim().toLowerCase()));

    // 5. "EXCEPT" (ODD ACTION/INDICATION OUT) QUESTION
    if ((effectivePointMode === "except_mcq" || (effectivePointMode === "both_mcq" && Math.random() < 0.28)) && lines.length >= 3 && distractors.length > 0) {
      let decoyLine = null;
      let decoyPoint = null;
      for (let d of distractors) {
        const dLines = parsePointClinicalLines(d, fieldMode).lines;
        const found = shuffleArr(dLines).find(l => !targetAllNorm.has(stripBBCode(l).trim().toLowerCase()));
        if (found) {
          decoyLine = found;
          decoyPoint = d;
          break;
        }
      }

      if (decoyLine && decoyPoint) {
        const stdDecoyName = standardizeTCMTerminology(decoyPoint["Short Name"]);
        currentContrastPointId = decoyPoint["Short Name"];
        currentDecoySourceNote = `That action/indication actually belongs to <b>${escapeHTML(stdDecoyName)}</b>.`;
        labelEl.textContent = `Odd Clinical Feature Out (EXCEPT) • ${stdTargetName}`;
        bodyEl.innerHTML = `
          <div style="font-size:20px; font-weight:900; color:#cc5500; margin-bottom:6px;">${escapeHTML(stdTargetName)}</div>
          <div style="color:#007aff; font-weight:700;">All of the following are Actions or Indications for <u>${escapeHTML(stdTargetName)}</u> <b>EXCEPT</b>:</div>
        `;
        currentCorrectAnswer = stripBBCode(decoyLine).trim();
        const trueOpts = shuffledLines.slice(0, 4).map(l => ({
          text: bbcodeToHtml(l),
          rawCompare: stripBBCode(l).trim(),
          pointId: targetPoint["Short Name"]
        }));
        const opts = [
          { text: bbcodeToHtml(decoyLine), rawCompare: currentCorrectAnswer, pointId: decoyPoint["Short Name"] },
          ...trueOpts
        ];
        renderQuizOptionButtons(shuffleArr(opts));
        return;
      }
    }

    // 6. STANDARD CLINICAL VIGNETTE ➔ POINT OR POINT ➔ ACTION/INDICATION
    let visibleCount = lines.length;
    if (qzDifficulty === "medium") visibleCount = Math.min(3, Math.max(2, Math.ceil(lines.length / 2)));
    else if (qzDifficulty === "hard") visibleCount = Math.min(2, lines.length);
    else if (qzDifficulty === "insane") visibleCount = 1;

    const askForPoint = lines.length === 1 || Math.random() < 0.6;

    if (askForPoint) {
      const shownLines = shuffledLines.slice(0, visibleCount);
      const hiddenLines = shuffledLines.slice(visibleCount, visibleCount + 3);
      const catLines = parsePointClinicalLines(targetPoint, "categories").lines;
      if (catLines.length > 0) {
        hiddenLines.push(`<strong>Point Category:</strong> ${maskSelfSpoilers(escapeHTML(catLines[0]), targetPoint)}`);
      }
      const fieldTitle = fieldMode === "actions" ? "Actions" : (fieldMode === "indications" ? "Indications" : "Actions & Indications");
      labelEl.textContent = `Identify the Point from ${fieldTitle}`;

      let html = shownLines.map(l => `<div style="margin-bottom:6px;">➣ ${maskSelfSpoilers(bbcodeToHtml(l), targetPoint)}</div>`).join("");
      bodyEl.innerHTML = html;

      setupClueLadder(hiddenLines.map(l => `➣ ${maskSelfSpoilers(bbcodeToHtml(l), targetPoint)}`));

      currentCorrectAnswer = stdTargetName;
      const opts = [
        { text: stdTargetName, pointId: targetPoint["Short Name"] },
        ...distractors.slice(0, 5).map(d => ({ text: standardizeTCMTerminology(d["Short Name"]), pointId: d["Short Name"] }))
      ];
      renderQuizOptionButtons(shuffleArr(opts));
    } else {
      const targetLine = shuffledLines[0];
      const contextLines = shuffledLines.slice(1, Math.min(3, shuffledLines.length));
      labelEl.textContent = `Clinical Differentiation • ${stdTargetName}`;

      let html = `<div style="font-size:18px; font-weight:800; color:#cc5500; margin-bottom:8px;">${escapeHTML(stdTargetName)}</div>`;
      if (contextLines.length > 0 && qzDifficulty !== "insane") {
        html += `<div style="font-size:12px; color:#8e8e93; text-transform:uppercase; font-weight:700; margin-bottom:4px;">Known Clinical Features:</div>`;
        html += contextLines.map(l => `<div style="margin-bottom:4px;">➣ ${bbcodeToHtml(l)}</div>`).join("");
      }
      html += `<div style="margin-top:10px; color:#007aff; font-weight:700;">Which of the following is ALSO a correct Action/Indication for ${escapeHTML(stdTargetName)}?</div>`;
      bodyEl.innerHTML = html;

      currentCorrectAnswer = stripBBCode(targetLine).trim();
      let opts = [{ text: bbcodeToHtml(targetLine), rawCompare: currentCorrectAnswer, pointId: targetPoint["Short Name"] }];

      if (qzDifficulty === "hard" || qzDifficulty === "insane") {
        const mut = mutateClinicalOrPatternStatement(targetLine);
        if (stripBBCode(mut).trim().toLowerCase() !== currentCorrectAnswer.toLowerCase()) {
          opts.push({ text: bbcodeToHtml(mut), rawCompare: stripBBCode(mut).trim(), pointId: targetPoint["Short Name"] });
        }
      }

      for (let d of distractors) {
        if (opts.length >= 6) break;
        const dParsed = parsePointClinicalLines(d, fieldMode);
        const candidates = shuffleArr(dParsed.lines).filter(
          l => !targetAllNorm.has(stripBBCode(l).trim().toLowerCase()) && !opts.some(o => o.rawCompare.toLowerCase() === stripBBCode(l).trim().toLowerCase())
        );
        if (candidates.length > 0) {
          opts.push({ text: bbcodeToHtml(candidates[0]), rawCompare: stripBBCode(candidates[0]).trim(), pointId: d["Short Name"] });
        }
      }
      renderQuizOptionButtons(shuffleArr(opts));
    }
  }

  // --- TRACK 3 BUILDER: ZANG-FU & PATTERN DIFFERENTIATION MASTERY ---
  function buildPatternDifferentiationQuestion(targetPattern) {
    const labelEl = document.getElementById("qzQuestionLabel");
    const bodyEl = document.getElementById("qzQuestionBody");
    const parsed = parseManifestationRecord(targetPattern);
    const distractors = getSmartPatternDistractors(targetPattern, 6);
    const cardId = targetPattern["Short Name"];

    // Choose effective sub-mode (if 'mixed_mastery', balance across all available modes and avoid repeating the last mode on a re-queued retry)
    let effectiveMode = qzSubMode;
    if (qzSubMode === "mixed_mastery") {
      const candidateModes = ["vignette", "cardinal_triad", "differential", "fitb_pattern"];
      if (parsed.tongue || parsed.pulse) candidateModes.push("tongue_pulse");
      if (parsed.txPrinciple || parsed.rxPointsLine || parsed.rxMethodLine) candidateModes.push("tx_prescription");
      if (parsed.rxExplanations.length > 0) candidateModes.push("rx_rationale");
      if (
        parsed.aetiologyLines.length > 0 ||
        parsed.precursorLines.length > 0 ||
        parsed.developmentLines.length > 0 ||
        parsed.analysisLines.length > 0 ||
        parsed.mechanismSentences.length > 0
      ) {
        candidateModes.push("pathology_chain");
      }

      const lastMode = lastUsedSubModeByCard[cardId];
      const filteredCandidates = candidateModes.length > 1
        ? candidateModes.filter(m => m !== lastMode)
        : candidateModes;
      effectiveMode = filteredCandidates[Math.floor(Math.random() * filteredCandidates.length)];
    }
    lastUsedSubModeByCard[cardId] = effectiveMode;

    // SUB-MODE 1: PATTERN DIAGNOSTIC FILL-IN-THE-BLANK (Global Replacement so Pulse never spoils Key Symptoms!)
    if (effectiveMode === "fitb_pattern") {
      const diagVocab = [
        ...clinicalBlankCategories.keySignSwaps,
        ...clinicalBlankCategories.tongueBody,
        ...clinicalBlankCategories.tongueCoat,
        ...clinicalBlankCategories.pulseQualities,
        ...clinicalBlankCategories.pathogens,
        ...clinicalBlankCategories.substances
      ].sort((a, b) => b.length - a.length);
      const rx = new RegExp("\\b(" + diagVocab.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")\\b", "gi");

      let sourceBlock = "";
      if (parsed.keyRaw) sourceBlock += `Key Symptoms: ${parsed.keyRaw}\n`;
      if (parsed.tongue) sourceBlock += `Tongue: ${parsed.tongue}\n`;
      if (parsed.pulse) sourceBlock += `Pulse: ${parsed.pulse}`;
      if (!sourceBlock.trim()) sourceBlock = parsed.symptoms.slice(0, 4).join("\n• ");

      const matches = [...sourceBlock.matchAll(rx)];
      if (matches.length > 0) {
        const pickCount = (qzDifficulty === "fitb2" || qzDifficulty === "fitb4") ? Math.min(3, matches.length) : 1;
        const uniqueMatches = [];
        const seenLower = new Set();
        shuffleArr(matches).forEach(m => {
          const low = m[0].toLowerCase();
          if (!seenLower.has(low)) {
            seenLower.add(low);
            uniqueMatches.push(m);
          }
        });

        const chosen = uniqueMatches.slice(0, pickCount).sort((a, b) => a.index - b.index);
        const missingWords = chosen.map(m => m[0].toLowerCase());

        let displayHtml = escapeHTML(sourceBlock).replace(/\n/g, "<br>");
        chosen.forEach(m => {
          const r = new RegExp("\\b" + m[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "gi");
          displayHtml = displayHtml.replace(r, "<span class='quiz-fitb-blank'>[ ______ ]</span>");
        });

        const buildFakeDiag = () => chosen.map(m => {
          const wLower = m[0].toLowerCase();
          const catList = Object.values(clinicalBlankCategories).find(arr => arr.includes(wLower)) || clinicalBlankCategories.pulseQualities;
          const pool = catList.filter(x => x !== wLower);
          return pool[Math.floor(Math.random() * pool.length)];
        }).join(", ");

        const isAskCardToo = (qzDifficulty === "fitb3" || qzDifficulty === "fitb4");
        if (!isAskCardToo) {
          labelEl.textContent = `Pattern Diagnostic Blank • ${targetPattern["Short Name"]}`;
          currentCorrectAnswer = missingWords.join(", ");
          let set = new Set([currentCorrectAnswer]);
          let guard = 0;
          while (set.size < 6 && guard++ < 40) set.add(buildFakeDiag());
          bodyEl.innerHTML = `<div style="font-size:17px; font-weight:800; color:#cc5500; margin-bottom:8px;">${escapeHTML(targetPattern["Short Name"])}</div>` + displayHtml;
          renderQuizOptionButtons(shuffleArr([...set]).map(t => ({ text: t })));
          return;
        } else {
          labelEl.textContent = "Identify Pattern & Missing Finding(s)";
          currentCorrectAnswer = `${targetPattern["Short Name"]} (${missingWords.join(", ")})`;
          let opts = [{ text: currentCorrectAnswer, pointId: targetPattern["Short Name"] }];
          distractors.slice(0, 5).forEach(d => {
            opts.push({ text: `${d["Short Name"]} (${buildFakeDiag()})`, pointId: d["Short Name"] });
          });
          bodyEl.innerHTML = maskSelfSpoilers(displayHtml, targetPattern, "[ TARGET PATTERN ]");
          renderQuizOptionButtons(shuffleArr(opts));
          return;
        }
      }
    }

    // SUB-MODE 2: CARDINAL TRIAD (Key Symptoms ⇄ Pattern, with Tongue/Pulse spoiler protection)
    if (effectiveMode === "cardinal_triad" && parsed.keyRaw) {
      const askForKey = Math.random() < 0.55;
      if (askForKey) {
        labelEl.textContent = "Cardinal Triad • Identify Key Symptoms";
        let html = `<div style="font-size:20px; font-weight:900; color:#cc5500; margin-bottom:6px;">${escapeHTML(targetPattern["Short Name"])}</div>`;
        const keyContainsTP = /\b(pulse|tongue)\b/i.test(parsed.keyRaw);
        if ((parsed.tongue || parsed.pulse) && !keyContainsTP) {
          html += `<div class="quiz-diag-box" style="margin-bottom:8px;">`;
          if (parsed.tongue) html += `<div><strong>Tongue:</strong> ${escapeHTML(parsed.tongue)}</div>`;
          if (parsed.pulse) html += `<div><strong>Pulse:</strong> ${escapeHTML(parsed.pulse)}</div>`;
          html += `</div>`;
        } else if (parsed.tongue) {
          setupClueLadder([`<strong>Tongue:</strong> ${escapeHTML(parsed.tongue)}`]);
        }
        html += `<div style="color:#007aff; font-weight:700;">Select the classic <u>Key Symptoms</u> for this pattern:</div>`;
        bodyEl.innerHTML = html;

        currentCorrectAnswer = parsed.keyRaw;
        let opts = [{ text: escapeHTML(parsed.keyRaw), rawCompare: parsed.keyRaw, pointId: targetPattern["Short Name"] }];

        if (qzDifficulty === "hard" || qzDifficulty === "insane") {
          const mutKey = mutateClinicalOrPatternStatement(parsed.keyRaw);
          if (mutKey.toLowerCase() !== parsed.keyRaw.toLowerCase()) {
            opts.push({ text: escapeHTML(mutKey), rawCompare: mutKey, pointId: targetPattern["Short Name"] });
          }
        }
        for (let d of distractors) {
          if (opts.length >= 6) break;
          const dPr = parseManifestationRecord(d);
          if (dPr.keyRaw && !opts.some(o => o.rawCompare.toLowerCase() === dPr.keyRaw.toLowerCase())) {
            opts.push({ text: escapeHTML(dPr.keyRaw), rawCompare: dPr.keyRaw, pointId: d["Short Name"] });
          }
        }
        if (opts.length >= 4) {
          renderQuizOptionButtons(shuffleArr(opts));
          return;
        }
      } else {
        labelEl.textContent = "Cardinal Triad • Key Symptoms ➔ Pattern";
        let html = `<div style="font-size:15.5px; font-weight:700; margin-bottom:8px;"><span style="color:#cc5500;">Key Symptoms:</span> ${maskSelfSpoilers(escapeHTML(parsed.keyRaw), targetPattern, "[ TARGET PATTERN ]")}</div>`;
        const extraClues = [];
        if (parsed.tongue) extraClues.push(`<strong>Tongue:</strong> ${escapeHTML(parsed.tongue)}`);
        if (parsed.pulse && !/\bpulse\b/i.test(parsed.keyRaw)) extraClues.push(`<strong>Pulse:</strong> ${escapeHTML(parsed.pulse)}`);
        if (qzDifficulty === "easy" || qzDifficulty === "medium") {
          if (extraClues.length > 0) html += `<div class="quiz-diag-box">${extraClues.join(" • ")}</div>`;
        } else {
          setupClueLadder(extraClues);
        }
        bodyEl.innerHTML = html;
        currentCorrectAnswer = targetPattern["Short Name"];
        renderQuizOptionButtons(shuffleArr([
          { text: targetPattern["Short Name"], pointId: targetPattern["Short Name"] },
          ...distractors.slice(0, 5).map(d => ({ text: d["Short Name"], pointId: d["Short Name"] }))
        ]));
        return;
      }
    }

    // SUB-MODE 3: POINT PRESCRIPTION RATIONALES & MODIFICATIONS (Supports Single & Multi-Point Explanations)
    if (effectiveMode === "rx_rationale" && parsed.rxExplanations.length > 0) {
      const expItem = parsed.rxExplanations[Math.floor(Math.random() * parsed.rxExplanations.length)];
      const askWhichPoint = parsed.rxExplanations.length >= 2 && Math.random() < 0.65;

      if (askWhichPoint) {
        labelEl.textContent = `Point Prescription Rationale • ${targetPattern["Short Name"]}`;
        const maskedExplanation = maskSelfSpoilers(escapeHTML(expItem.explanation), targetPattern, escapeHTML(targetPattern["Short Name"]));
        let html = `
          <div style="font-size:18px; font-weight:900; color:#cc5500; margin-bottom:6px;">${escapeHTML(targetPattern["Short Name"])}</div>
          <div style="font-size:13px; color:#8e8e93; margin-bottom:6px;">In the Point Prescription for this pattern, which point(s) match the following clinical rationale / action?</div>
          <div class="quiz-diag-box" style="font-size:14.5px;">"...${maskedExplanation}"</div>
        `;
        if (parsed.rxPointsLine) {
          setupClueLadder([`<strong>Full Formula Pool:</strong> ${escapeHTML(parsed.rxPointsLine)}`]);
        }
        bodyEl.innerHTML = html;

        currentCorrectAnswer = expItem.pointLabel;
        let opts = [{ text: escapeHTML(expItem.pointLabel), rawCompare: expItem.pointLabel }];

        parsed.rxExplanations.forEach(otherExp => {
          if (otherExp.pointLabel !== expItem.pointLabel && !opts.some(o => o.rawCompare === otherExp.pointLabel)) {
            opts.push({ text: escapeHTML(otherExp.pointLabel), rawCompare: otherExp.pointLabel });
          }
        });

        for (let d of distractors) {
          if (opts.length >= 6) break;
          const dPr = parseManifestationRecord(d);
          dPr.rxExplanations.forEach(dExp => {
            if (opts.length < 6 && dExp.pointLabel !== expItem.pointLabel && !opts.some(o => o.rawCompare === dExp.pointLabel)) {
              opts.push({ text: escapeHTML(dExp.pointLabel), rawCompare: dExp.pointLabel });
            }
          });
        }
        if (opts.length >= 3) {
          renderQuizOptionButtons(shuffleArr(opts));
          return;
        }
      } else {
        labelEl.textContent = `Point Role in Pattern • ${targetPattern["Short Name"]}`;
        let html = `
          <div style="font-size:18px; font-weight:900; color:#cc5500; margin-bottom:4px;">${escapeHTML(targetPattern["Short Name"])}</div>
          <div style="color:#007aff; font-weight:700; margin-bottom:6px;">What is the specific clinical rationale for including <u>${escapeHTML(expItem.pointLabel)}</u> in this pattern's prescription?</div>
        `;
        bodyEl.innerHTML = html;

        const cleanExp = maskSelfSpoilers(escapeHTML(expItem.explanation), targetPattern, "this pattern");
        currentCorrectAnswer = stripBBCode(cleanExp).trim();
        let opts = [{ text: cleanExp, rawCompare: currentCorrectAnswer, pointId: targetPattern["Short Name"] }];

        parsed.rxExplanations.forEach(otherExp => {
          if (otherExp.pointLabel !== expItem.pointLabel && opts.length < 4) {
            const oDisp = maskSelfSpoilers(escapeHTML(otherExp.explanation), targetPattern, "this pattern");
            const oRaw = stripBBCode(oDisp).trim();
            if (!opts.some(o => o.rawCompare.toLowerCase() === oRaw.toLowerCase())) {
              opts.push({ text: oDisp, rawCompare: oRaw, pointId: targetPattern["Short Name"] });
            }
          }
        });
        for (let d of distractors) {
          if (opts.length >= 5) break;
          const dPr = parseManifestationRecord(d);
          if (dPr.rxExplanations.length > 0) {
            const dExp = dPr.rxExplanations[0];
            const dDisp = maskSelfSpoilers(escapeHTML(dExp.explanation), d, "this pattern");
            const dRaw = stripBBCode(dDisp).trim();
            if (!opts.some(o => o.rawCompare.toLowerCase() === dRaw.toLowerCase())) {
              opts.push({ text: dDisp, rawCompare: dRaw, pointId: d["Short Name"] });
            }
          }
        }
        if (opts.length >= 3) {
          renderQuizOptionButtons(shuffleArr(opts));
          return;
        }
      }
    }

    // SUB-MODE 4: TREATMENT PRINCIPLE, NEEDLING METHOD/MOXA & POINT FORMULA
    if (effectiveMode === "tx_prescription" && (parsed.txPrinciple || parsed.rxPointsLine || parsed.rxMethodLine)) {
      // Variant A: Needling Method / Moxa / Reinforcing-vs-Reducing Exception Question (if rxMethodLine has specific method/moxa details)
      if (parsed.rxMethodLine && parsed.rxMethodLine.length > 18 && Math.random() < 0.35) {
        labelEl.textContent = `Needling Method & Moxa Rule • ${targetPattern["Short Name"]}`;
        let html = `<div style="font-size:19px; font-weight:900; color:#cc5500; margin-bottom:6px;">${escapeHTML(targetPattern["Short Name"])}</div>`;
        if (parsed.rxPointsLine) {
          html += `<div style="font-size:13px; color:#666; margin-bottom:8px;"><b>Prescription:</b> ${escapeHTML(parsed.rxPointsLine)}</div>`;
        }
        html += `<div style="color:#007aff; font-weight:700;">Select the correct needling method and moxibustion rule for this prescription:</div>`;
        bodyEl.innerHTML = html;

        const cleanMeth = maskSelfSpoilers(escapeHTML(parsed.rxMethodLine), targetPattern, "this pattern");
        currentCorrectAnswer = stripBBCode(cleanMeth).trim();
        let opts = [{ text: cleanMeth, rawCompare: currentCorrectAnswer, pointId: targetPattern["Short Name"] }];

        for (let d of distractors) {
          if (opts.length >= 5) break;
          const dPr = parseManifestationRecord(d);
          if (dPr.rxMethodLine) {
            const dDisp = maskSelfSpoilers(escapeHTML(dPr.rxMethodLine), d, "this pattern");
            const dRaw = stripBBCode(dDisp).trim();
            if (dRaw.toLowerCase() !== currentCorrectAnswer.toLowerCase() && !opts.some(o => o.rawCompare.toLowerCase() === dRaw.toLowerCase())) {
              opts.push({ text: dDisp, rawCompare: dRaw, pointId: d["Short Name"] });
            }
          }
        }
        if (opts.length >= 3) {
          renderQuizOptionButtons(shuffleArr(opts));
          return;
        }
      }

      const hasFormula = Boolean(parsed.rxPointsLine);
      const useFormula = hasFormula && (!parsed.txPrinciple || Math.random() < 0.6);

      if (useFormula) {
        const askFormulaFromPattern = Math.random() < 0.55;
        if (askFormulaFromPattern) {
          labelEl.textContent = "Pattern ➔ Select Point Prescription";
          let html = `<div style="font-size:20px; font-weight:900; color:#cc5500; margin-bottom:6px;">${escapeHTML(targetPattern["Short Name"])}</div>`;
          if (parsed.keyRaw && qzDifficulty !== "insane") {
            html += `<div style="font-size:13.5px; color:#666; margin-bottom:8px;"><b>Key Signs:</b> ${escapeHTML(parsed.keyRaw)}</div>`;
          }
          if (parsed.txPrinciple) {
            setupClueLadder([`<strong>Tx Principle:</strong> ${escapeHTML(parsed.txPrinciple)}`]);
          }
          html += `<div style="color:#007aff; font-weight:700;">Select the classic Point Prescription for this pattern:</div>`;
          bodyEl.innerHTML = html;

          currentCorrectAnswer = parsed.rxPointsLine;
          let opts = [{ text: escapeHTML(parsed.rxPointsLine), rawCompare: parsed.rxPointsLine, pointId: targetPattern["Short Name"] }];

          for (let d of distractors) {
            if (opts.length >= 5) break;
            const dPr = parseManifestationRecord(d);
            if (dPr.rxPointsLine && !opts.some(o => o.rawCompare.toLowerCase() === dPr.rxPointsLine.toLowerCase())) {
              opts.push({ text: escapeHTML(dPr.rxPointsLine), rawCompare: dPr.rxPointsLine, pointId: d["Short Name"] });
            }
          }
          if (opts.length >= 3) {
            renderQuizOptionButtons(shuffleArr(opts));
            return;
          }
        } else {
          labelEl.textContent = "Point Prescription ➔ Identify Pattern";
          let boxHtml = `<div><strong>Points:</strong> ${escapeHTML(parsed.rxPointsLine)}</div>`;
          if (parsed.rxMethodLine) {
            boxHtml += `<div style="margin-top:4px;"><strong>Method:</strong> ${maskSelfSpoilers(escapeHTML(parsed.rxMethodLine), targetPattern, "[ TARGET PATTERN ]")}</div>`;
          }
          let html = `
            <div style="font-size:13px; color:#8e8e93; margin-bottom:4px;">Which pattern is treated by this Point Prescription?</div>
            <div class="quiz-diag-box" style="font-size:15px;">${boxHtml}</div>
          `;
          const clues = [];
          if (parsed.rxExplanations.length > 0) {
            const sampleExp = parsed.rxExplanations[0];
            clues.push(`<strong>Point Note (${escapeHTML(sampleExp.pointLabel)}):</strong> ${maskSelfSpoilers(escapeHTML(sampleExp.explanation), targetPattern, "[ TARGET PATTERN ]")}`);
          }
          if (parsed.keyRaw) {
            clues.push(`<strong>Key Signs:</strong> ${maskSelfSpoilers(escapeHTML(parsed.keyRaw), targetPattern, "[ TARGET PATTERN ]")}`);
          }
          setupClueLadder(clues);
          bodyEl.innerHTML = html;
          currentCorrectAnswer = targetPattern["Short Name"];
          renderQuizOptionButtons(shuffleArr([
            { text: targetPattern["Short Name"], pointId: targetPattern["Short Name"] },
            ...distractors.slice(0, 5).map(d => ({ text: d["Short Name"], pointId: d["Short Name"] }))
          ]));
          return;
        }
      }

      if (parsed.txPrinciple) {
        labelEl.textContent = "Select the Treatment Principle";
        let html = `<div style="font-size:19px; font-weight:900; color:#cc5500; margin-bottom:6px;">${escapeHTML(targetPattern["Short Name"])}</div>`;
        if (parsed.keyRaw && qzDifficulty !== "insane") {
          html += `<div style="font-size:13.5px; color:#666; margin-bottom:8px;"><b>Key Signs:</b> ${escapeHTML(parsed.keyRaw)}</div>`;
        }
        html += `<div style="color:#007aff; font-weight:700;">Select the appropriate Treatment Principle:</div>`;
        bodyEl.innerHTML = html;

        currentCorrectAnswer = parsed.txPrinciple;
        let opts = [{ text: escapeHTML(parsed.txPrinciple), rawCompare: parsed.txPrinciple, pointId: targetPattern["Short Name"] }];

        const mutTx = mutateClinicalOrPatternStatement(parsed.txPrinciple);
        if (mutTx.toLowerCase() !== parsed.txPrinciple.toLowerCase()) {
          opts.push({ text: escapeHTML(mutTx), rawCompare: mutTx, pointId: targetPattern["Short Name"] });
        }
        for (let d of distractors) {
          if (opts.length >= 6) break;
          const dPr = parseManifestationRecord(d);
          if (dPr.txPrinciple && !opts.some(o => o.rawCompare.toLowerCase() === dPr.txPrinciple.toLowerCase())) {
            opts.push({ text: escapeHTML(dPr.txPrinciple), rawCompare: dPr.txPrinciple, pointId: d["Short Name"] });
          }
        }
        if (opts.length >= 3) {
          renderQuizOptionButtons(shuffleArr(opts));
          return;
        }
      }
    }

    // SUB-MODE 5: PATHOLOGY MECHANISMS, AETIOLOGY, PRECURSORS & DEVELOPMENTS (2-Way)
    if (effectiveMode === "pathology_chain") {
      const chainBlocks = [];
      if (parsed.mechanismSentences.length > 0) chainBlocks.push({ key: "mechanismSentences", label: "Pathological Mechanism", lines: parsed.mechanismSentences });
      if (parsed.precursorLines.length > 0) chainBlocks.push({ key: "precursorLines", label: "Precursors of Pattern", lines: parsed.precursorLines });
      if (parsed.developmentLines.length > 0) chainBlocks.push({ key: "developmentLines", label: "Developments From Pattern", lines: parsed.developmentLines });
      if (parsed.aetiologyLines.length > 0) chainBlocks.push({ key: "aetiologyLines", label: "Aetiology", lines: parsed.aetiologyLines });
      if (parsed.analysisLines.length > 0) chainBlocks.push({ key: "analysisLines", label: "Pathology & Description", lines: parsed.analysisLines });

      if (chainBlocks.length > 0) {
        const chosen = chainBlocks[Math.floor(Math.random() * chainBlocks.length)];
        const chosenLine = chosen.lines[Math.floor(Math.random() * chosen.lines.length)];
        const askForwardFromPattern = Math.random() < 0.55;

        if (askForwardFromPattern) {
          labelEl.textContent = `Pathology & Evolution • ${chosen.label}`;
          let html = `
            <div style="font-size:19px; font-weight:900; color:#cc5500; margin-bottom:6px;">${escapeHTML(targetPattern["Short Name"])}</div>
            <div style="color:#007aff; font-weight:700;">Which statement accurately describes the <u>${escapeHTML(chosen.label)}</u> for this pattern?</div>
          `;
          if (parsed.keyRaw) {
            setupClueLadder([`<strong>Key Symptoms:</strong> ${escapeHTML(parsed.keyRaw)}`]);
          }
          bodyEl.innerHTML = html;

          const neutralizePatternName = (lineText, patObj) => {
            return maskSelfSpoilers(escapeHTML(lineText), patObj, "this pattern");
          };

          const cleanCorrectDisplay = neutralizePatternName(chosenLine, targetPattern);
          currentCorrectAnswer = stripBBCode(cleanCorrectDisplay).trim();
          let opts = [{ text: cleanCorrectDisplay, rawCompare: currentCorrectAnswer, pointId: targetPattern["Short Name"] }];

          for (let d of distractors) {
            if (opts.length >= 5) break;
            const dPr = parseManifestationRecord(d);
            const dLines = dPr[chosen.key] && dPr[chosen.key].length > 0
              ? dPr[chosen.key]
              : [...dPr.mechanismSentences, ...dPr.precursorLines, ...dPr.developmentLines, ...dPr.aetiologyLines, ...dPr.analysisLines];
            if (dLines.length > 0) {
              const dLine = dLines[0];
              const dDisplay = neutralizePatternName(dLine, d);
              const dRaw = stripBBCode(dDisplay).trim();
              if (dRaw.toLowerCase() !== currentCorrectAnswer.toLowerCase() && !opts.some(o => o.rawCompare.toLowerCase() === dRaw.toLowerCase())) {
                opts.push({ text: dDisplay, rawCompare: dRaw, pointId: d["Short Name"] });
              }
            }
          }

          if (opts.length >= 3) {
            renderQuizOptionButtons(shuffleArr(opts));
            return;
          }
        }

        labelEl.textContent = `Identify Pattern from ${chosen.label}`;
        const joinedText = chosen.lines.slice(0, 2).join(" • ");
        bodyEl.innerHTML = `
          <div style="font-size:13px; color:#8e8e93; margin-bottom:6px;">Identify the <b>[ TARGET PATTERN ]</b> described in this ${escapeHTML(chosen.label)} note:</div>
          <div class="quiz-diag-box">${maskSelfSpoilers(escapeHTML(joinedText), targetPattern, "[ TARGET PATTERN ]")}</div>
        `;
        const clues = [];
        if (parsed.keyRaw) clues.push(`<strong>Key Symptoms:</strong> ${maskSelfSpoilers(escapeHTML(parsed.keyRaw), targetPattern, "[ TARGET PATTERN ]")}`);
        if (parsed.tongue || parsed.pulse) clues.push(`<strong>Tongue:</strong> ${escapeHTML(parsed.tongue || "--")} • <strong>Pulse:</strong> ${escapeHTML(parsed.pulse || "--")}`);
        setupClueLadder(clues);

        currentCorrectAnswer = targetPattern["Short Name"];
        renderQuizOptionButtons(shuffleArr([
          { text: targetPattern["Short Name"], pointId: targetPattern["Short Name"] },
          ...distractors.slice(0, 5).map(d => ({ text: d["Short Name"], pointId: d["Short Name"] }))
        ]));
        return;
      }
    }

    // SUB-MODE 6: TONGUE & PULSE DIFFERENTIATION (Bidirectional)
    if (effectiveMode === "tongue_pulse" && (parsed.tongue || parsed.pulse)) {
      const formatTP = (pObj) => {
        const pr = parseManifestationRecord(pObj);
        let parts = [];
        if (pr.tongue) parts.push(`Tongue: ${pr.tongue}`);
        if (pr.pulse) parts.push(`Pulse: ${pr.pulse}`);
        return parts.join(" • ");
      };

      const targetTP = formatTP(targetPattern);
      if (targetTP) {
        if (Math.random() < 0.65) {
          labelEl.textContent = "Tongue & Pulse Differentiation";
          const keyPreview = parsed.keySymptomsNoTP.slice(0, 3).join(", ");
          let html = `<div style="font-size:18px; font-weight:800; color:#cc5500; margin-bottom:6px;">${escapeHTML(targetPattern["Short Name"])}</div>`;
          if (keyPreview && qzDifficulty !== "insane") {
            html += `<div style="font-size:13.5px; color:#666; margin-bottom:8px;"><b>Cardinal Signs:</b> ${escapeHTML(keyPreview)}</div>`;
          } else if (keyPreview) {
            setupClueLadder([`<strong>Cardinal Signs:</strong> ${escapeHTML(keyPreview)}`]);
          }
          html += `<div style="color:#007aff; font-weight:700;">Select the classic Tongue & Pulse presentation for this pattern:</div>`;
          bodyEl.innerHTML = html;

          currentCorrectAnswer = targetTP;
          let opts = [{ text: escapeHTML(targetTP), rawCompare: targetTP, pointId: targetPattern["Short Name"] }];

          const mutatedTP = mutateClinicalOrPatternStatement(targetTP);
          if (mutatedTP !== targetTP) {
            opts.push({ text: escapeHTML(mutatedTP), rawCompare: mutatedTP, pointId: targetPattern["Short Name"] });
          }

          for (let d of distractors) {
            if (opts.length >= 6) break;
            const dTP = formatTP(d);
            if (dTP && !opts.some(o => o.rawCompare.toLowerCase() === dTP.toLowerCase())) {
              opts.push({ text: escapeHTML(dTP), rawCompare: dTP, pointId: d["Short Name"] });
            }
          }
          if (opts.length >= 4) {
            renderQuizOptionButtons(shuffleArr(opts));
            return;
          }
        } else {
          labelEl.textContent = "Tongue & Pulse + Anchor Sign ➔ Pattern";
          const anchorSign = parsed.keySymptomsNoTP[0] || parsed.symptoms[0] || "";
          let html = `<div class="quiz-diag-box" style="font-size:15px;"><strong>${escapeHTML(targetTP)}</strong></div>`;
          if (anchorSign) {
            html += `<div style="margin-top:8px;"><strong>Presenting Sign:</strong> ${maskSelfSpoilers(escapeHTML(anchorSign), targetPattern, "[ TARGET PATTERN ]")}</div>`;
          }
          if (parsed.symptoms.length > 1) {
            setupClueLadder(parsed.symptoms.slice(1, 3).map(s => `➣ ${maskSelfSpoilers(escapeHTML(s), targetPattern, "[ TARGET PATTERN ]")}`));
          }
          bodyEl.innerHTML = html;
          currentCorrectAnswer = targetPattern["Short Name"];
          renderQuizOptionButtons(shuffleArr([
            { text: targetPattern["Short Name"], pointId: targetPattern["Short Name"] },
            ...distractors.slice(0, 5).map(d => ({ text: d["Short Name"], pointId: d["Short Name"] }))
          ]));
          return;
        }
      }
    }

    // SUB-MODE 7: SIBLING DIFFERENTIAL & "EXCEPT" (ODD SIGN OUT)
    if (effectiveMode === "differential" && parsed.symptoms.length >= 2 && distractors.length > 0) {
      const sibling = distractors[0];
      const sibParsed = parseManifestationRecord(sibling);
      const sibSet = new Set(sibParsed.symptoms.map(s => s.toLowerCase()));
      const targetAllLower = new Set(parsed.symptoms.map(s => s.toLowerCase()));

      const sibUnique = sibParsed.symptoms.filter(s => !targetAllLower.has(s.toLowerCase()));
      if (parsed.symptoms.length >= 3 && sibUnique.length > 0 && Math.random() < 0.5) {
        const decoySym = sibUnique[Math.floor(Math.random() * sibUnique.length)];
        currentContrastPointId = sibling["Short Name"];
        currentDecoySourceNote = `"${escapeHTML(decoySym)}" belongs to <b>${escapeHTML(sibling["Short Name"])}</b>, not ${escapeHTML(targetPattern["Short Name"])}.`;

        labelEl.textContent = "Pattern Exclusion • Odd Manifestation Out (EXCEPT)";
        bodyEl.innerHTML = `
          <div style="font-size:19px; font-weight:900; color:#cc5500; margin-bottom:6px;">${escapeHTML(targetPattern["Short Name"])}</div>
          <div style="color:#007aff; font-weight:700;">All of the following are clinical manifestations of <u>${escapeHTML(targetPattern["Short Name"])}</u> <b>EXCEPT</b>:</div>
        `;
        currentCorrectAnswer = decoySym;
        const trueSyms = shuffleArr(parsed.symptoms).slice(0, 4).map(s => ({
          text: escapeHTML(s),
          rawCompare: s,
          pointId: targetPattern["Short Name"]
        }));
        const opts = [
          { text: escapeHTML(decoySym), rawCompare: decoySym, pointId: sibling["Short Name"] },
          ...trueSyms
        ];
        renderQuizOptionButtons(shuffleArr(opts));
        return;
      }

      const uniqueToTarget = parsed.symptoms.filter(s => !sibSet.has(s.toLowerCase()));
      const sharedWithSibling = parsed.symptoms.filter(s => sibSet.has(s.toLowerCase()));

      if (uniqueToTarget.length > 0) {
        const chosenUnique = uniqueToTarget[Math.floor(Math.random() * uniqueToTarget.length)];
        currentContrastPointId = sibling["Short Name"];
        labelEl.textContent = "Sibling Pattern Differential Diagnosis";

        let html = "";
        if (sharedWithSibling.length > 0) {
          html += `<div style="margin-bottom:8px;">Both <b>${escapeHTML(targetPattern["Short Name"])}</b> and <b>${escapeHTML(sibling["Short Name"])}</b> share: <i>${escapeHTML(sharedWithSibling.slice(0, 2).join(", "))}</i>.</div>`;
        } else {
          const contextSyms = parsed.symptoms.filter(s => s !== chosenUnique).slice(0, 2);
          html += `<div style="margin-bottom:8px;">Comparing <b style="color:#cc5500;">${escapeHTML(targetPattern["Short Name"])}</b> (${escapeHTML(contextSyms.join(", "))}) vs. <b>${escapeHTML(sibling["Short Name"])}</b>:</div>`;
        }
        html += `<div style="color:#007aff; font-weight:700;">Which of the following manifestations specifically differentiates and belongs to <u>${escapeHTML(targetPattern["Short Name"])}</u>?</div>`;
        bodyEl.innerHTML = html;

        currentCorrectAnswer = chosenUnique;
        let opts = [{ text: escapeHTML(chosenUnique), rawCompare: chosenUnique, pointId: targetPattern["Short Name"] }];

        for (let d of distractors) {
          if (opts.length >= 6) break;
          const dParsed = parseManifestationRecord(d);
          const dUnique = shuffleArr(dParsed.symptoms).find(
            s => !targetAllLower.has(s.toLowerCase()) && !opts.some(o => o.rawCompare.toLowerCase() === s.toLowerCase())
          );
          if (dUnique) {
            opts.push({ text: escapeHTML(dUnique), rawCompare: dUnique, pointId: d["Short Name"] });
          }
        }

        if (opts.length >= 4) {
          renderQuizOptionButtons(shuffleArr(opts));
          return;
        }
      }
    }

    // SUB-MODE 8 (DEFAULT): PROGRESSIVE CLINICAL VIGNETTE ➔ IDENTIFY THE PATTERN (+Clue Ladder)
    labelEl.textContent = "Identify the Pattern from Clinical Manifestations";
    let html = "";
    const clueQueue = [];
    const shuffledSyms = shuffleArr(parsed.symptoms);

    if (qzDifficulty === "easy") {
      if (parsed.keyRaw) {
        html += `<div style="margin-bottom:8px;"><strong style="color:#cc5500;">Key Symptoms:</strong> ${maskSelfSpoilers(escapeHTML(parsed.keyRaw), targetPattern, "[ TARGET PATTERN ]")}</div>`;
      }
      if (parsed.symptoms.length > 0) {
        html += parsed.symptoms.slice(0, 6).map(s => `<div>➣ ${maskSelfSpoilers(escapeHTML(s), targetPattern, "[ TARGET PATTERN ]")}</div>`).join("");
      }
      if (parsed.tongue || parsed.pulse) {
        html += `<div class="quiz-diag-box">`;
        if (parsed.tongue) html += `<div><strong>Tongue:</strong> ${escapeHTML(parsed.tongue)}</div>`;
        if (parsed.pulse) html += `<div><strong>Pulse:</strong> ${escapeHTML(parsed.pulse)}</div>`;
        html += `</div>`;
      }
    } else if (qzDifficulty === "medium") {
      const pool = shuffledSyms.length > 0 ? shuffledSyms.slice(0, 4) : parsed.keySymptoms;
      html += pool.map(s => `<div style="margin-bottom:4px;">➣ ${maskSelfSpoilers(escapeHTML(s), targetPattern, "[ TARGET PATTERN ]")}</div>`).join("");
      if (parsed.tongue || parsed.pulse) {
        html += `<div class="quiz-diag-box">`;
        if (parsed.tongue) html += `<div><strong>Tongue:</strong> ${escapeHTML(parsed.tongue)}</div>`;
        if (parsed.pulse) html += `<div><strong>Pulse:</strong> ${escapeHTML(parsed.pulse)}</div>`;
        html += `</div>`;
      }
      if (parsed.keyRaw) clueQueue.push(`<strong>Key Symptoms:</strong> ${maskSelfSpoilers(escapeHTML(parsed.keyRaw), targetPattern, "[ TARGET PATTERN ]")}`);
      if (parsed.rxPointsLine) clueQueue.push(`<strong>Point Rx:</strong> ${escapeHTML(parsed.rxPointsLine)}`);
    } else if (qzDifficulty === "hard") {
      const pool = shuffledSyms.length > 0 ? shuffledSyms.slice(0, 3) : parsed.keySymptoms.slice(0, 2);
      html += pool.map(s => `<div style="margin-bottom:4px;">➣ ${maskSelfSpoilers(escapeHTML(s), targetPattern, "[ TARGET PATTERN ]")}</div>`).join("");
      const showTongue = Math.random() < 0.5;
      if (showTongue && parsed.tongue) {
        html += `<div class="quiz-diag-box"><strong>Tongue:</strong> ${escapeHTML(parsed.tongue)}</div>`;
        if (parsed.pulse) clueQueue.push(`<strong>Pulse:</strong> ${escapeHTML(parsed.pulse)}`);
      } else if (parsed.pulse) {
        html += `<div class="quiz-diag-box"><strong>Pulse:</strong> ${escapeHTML(parsed.pulse)}</div>`;
        if (parsed.tongue) clueQueue.push(`<strong>Tongue:</strong> ${escapeHTML(parsed.tongue)}`);
      }
      if (parsed.keyRaw) clueQueue.push(`<strong>Key Symptoms:</strong> ${maskSelfSpoilers(escapeHTML(parsed.keyRaw), targetPattern, "[ TARGET PATTERN ]")}`);
    } else {
      const nonCardinal = parsed.symptoms.length > 3 ? parsed.symptoms.slice(1) : parsed.symptoms;
      const pool = shuffleArr(nonCardinal).slice(0, Math.min(2, nonCardinal.length));
      html += pool.map(s => `<div style="margin-bottom:4px;">➣ ${maskSelfSpoilers(escapeHTML(s), targetPattern, "[ TARGET PATTERN ]")}</div>`).join("");
      html += `<div style="font-size:12px; color:#8e8e93; font-style:italic; margin-top:6px;">(Key Signs, Tongue & Pulse withheld -- tap 💡 +1 Clue if needed)</div>`;
      if (parsed.tongue || parsed.pulse) {
        clueQueue.push(`<strong>Tongue:</strong> ${escapeHTML(parsed.tongue || "--")} • <strong>Pulse:</strong> ${escapeHTML(parsed.pulse || "--")}`);
      }
      if (parsed.keyRaw) clueQueue.push(`<strong>Key Symptoms:</strong> ${maskSelfSpoilers(escapeHTML(parsed.keyRaw), targetPattern, "[ TARGET PATTERN ]")}`);
    }

    bodyEl.innerHTML = html;
    setupClueLadder(clueQueue);
    currentCorrectAnswer = targetPattern["Short Name"];

    const opts = [
      { text: targetPattern["Short Name"], pointId: targetPattern["Short Name"] },
      ...distractors.slice(0, 5).map(d => ({ text: d["Short Name"], pointId: d["Short Name"] }))
    ];
    renderQuizOptionButtons(shuffleArr(opts));
  }

  // --- 12. RENDER OPTION BUTTONS, INTRA-BATCH RE-QUEUE, CLINICAL DIGEST & GRADE ANSWERS ---
  function renderQuizOptionButtons(optionsData) {
    const grid = document.getElementById("qzOptionsGrid");
    grid.innerHTML = "";

    optionsData.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "quiz-opt-btn";
      const rawCompareVal = opt.rawCompare !== undefined ? opt.rawCompare : stripBBCode(opt.text).trim();
      btn.dataset.compare = rawCompareVal;
      if (opt.pointId) btn.dataset.pointId = opt.pointId;

      btn.innerHTML = `<span class="quiz-opt-key">${idx + 1}</span><span style="flex:1;">${opt.text}</span>`;
      btn.onclick = () => gradeQuizAnswer(btn);
      grid.appendChild(btn);
    });
  }

  function gradeQuizAnswer(selectedBtn) {
    const allBtns = Array.from(document.querySelectorAll("#qzOptionsGrid .quiz-opt-btn"));
    if (allBtns.some(b => b.disabled)) return;
    allBtns.forEach(b => (b.disabled = true));
    setupClueLadder([]);

    qzTotalAnswered++;
    const pickedVal = (selectedBtn.dataset.compare || "").trim().toLowerCase();
    const targetVal = String(currentCorrectAnswer || "").trim().toLowerCase();
    const isCorrect = pickedVal === targetVal;
    const cardId = currentTargetPoint ? currentTargetPoint["Short Name"] : "";

    if (isCorrect) {
      selectedBtn.classList.add("correct");
      qzScore++;
      // Only mark card as "seen" in the cycle when answered correctly without failing first, OR after passing its retry!
      if (currentTargetPoint && document.getElementById("qzLimitSelect")?.value !== "all") {
        try {
          const seenSet = new Set(JSON.parse(localStorage.getItem(getSeenKey()) || "[]"));
          seenSet.add(cardId);
          localStorage.setItem(getSeenKey(), JSON.stringify([...seenSet]));
        } catch (e) {}
      }
    } else {
      selectedBtn.classList.add("incorrect");
      currentPickedWrongPointId = selectedBtn.dataset.pointId || null;

      allBtns.forEach(b => {
        if ((b.dataset.compare || "").trim().toLowerCase() === targetVal) {
          b.classList.add("correct");
        }
      });

      if (!sessionMisses.some(m => m.point["Short Name"] === cardId)) {
        sessionMisses.push({
          point: currentTargetPoint,
          questionHtml: document.getElementById("qzQuestionBody").innerHTML,
          selected: selectedBtn.innerText.replace(/^\d+\s*/, ""),
          correct: currentCorrectAnswer
        });
      }

      // Intra-Batch Mastery Loop: Re-insert missed card 3–4 questions back in the queue (up to 2 retries per batch)
      const prevRetries = requeuedCardCounts[cardId] || 0;
      if (qzMasteryRequeue && currentTargetPoint && prevRetries < 2) {
        requeuedCardCounts[cardId] = prevRetries + 1;
        const insertIndex = Math.max(0, remainingQuizQueue.length - 3);
        remainingQuizQueue.splice(insertIndex, 0, {
          _isRequeuedWrapper: true,
          point: currentTargetPoint
        });
      }
    }

    updateQuizScoreUI();
    renderPostAnswerDigest(isCorrect);
    renderPostAnswerInspectionBar();

    const nextBtn = document.getElementById("qzNextBtn");
    const bottomBar = document.getElementById("qzBottomBar");
    nextBtn.innerHTML = remainingQuizQueue.length === 0
      ? `Finish & See Results ➔ <span style="font-size:12px; opacity:0.85;">(Enter)</span>`
      : `Next Question ➔ <span style="font-size:12px; opacity:0.85;">(Enter / Space)</span>`;
    nextBtn.style.display = "block";
    bottomBar.style.display = "block";
  }

  // Renders an immediate Clinical Anchor & Differential Comparison Card right beneath the options
  function renderPostAnswerDigest(isCorrect) {
    const card = document.getElementById("qzDigestCard");
    if (!card || !qzShowDigest || !currentTargetPoint) return;

    card.className = "quiz-digest-card" + (isCorrect ? "" : " missed");
    let html = "";

    if (currentDecoySourceNote) {
      html += `<div style="color:#cc5500; font-weight:700;">💡 ${currentDecoySourceNote}</div>`;
    }

    const otherId = (!isCorrect && currentPickedWrongPointId && currentPickedWrongPointId !== currentTargetPoint["Short Name"])
      ? currentPickedWrongPointId
      : (currentContrastPointId && currentContrastPointId !== currentTargetPoint["Short Name"] ? currentContrastPointId : null);
    const otherPoint = otherId ? (typeof points !== "undefined" ? points.find(p => p["Short Name"] === otherId) : null) : null;

    if (currentTrack === "patterns") {
      const buildPatternAnchorHtml = (pObj, badgeHtml, includeDeepNotes = false) => {
        const pr = parseManifestationRecord(pObj);
        let box = `<div style="font-weight:800; font-size:14.5px; color:#cc5500; margin-bottom:4px;">${badgeHtml} ${escapeHTML(pObj["Short Name"])}</div>`;
        if (pr.keyRaw) box += `<div><b>Key Signs:</b> ${escapeHTML(pr.keyRaw)}</div>`;
        else if (pr.symptoms.length > 0) box += `<div><b>Signs:</b> ${escapeHTML(pr.symptoms.slice(0, 3).join("; "))}</div>`;
        if (pr.tongue) box += `<div><b>Tongue:</b> ${escapeHTML(pr.tongue)}</div>`;
        if (pr.pulse) box += `<div><b>Pulse:</b> ${escapeHTML(pr.pulse)}</div>`;
        if (pr.txPrinciple) box += `<div style="margin-top:3px; color:#007aff;"><b>Tx Principle:</b> ${escapeHTML(pr.txPrinciple)}</div>`;
        if (pr.rxPointsLine) {
          box += `<div><b>Prescription:</b> ${escapeHTML(pr.rxPointsLine)}${pr.rxMethodLine ? ` <i>(${escapeHTML(pr.rxMethodLine)})</i>` : ""}</div>`;
        } else if (pr.pointCodes.length > 0) {
          box += `<div><b>Points:</b> ${escapeHTML(pr.pointCodes.slice(0, 8).join(", "))}</div>`;
        }

        if (includeDeepNotes) {
          const deepParts = [];
          if (pr.aetiologyLines.length > 0) {
            deepParts.push(`<div><b>Aetiology:</b> ${escapeHTML(pr.aetiologyLines.slice(0, 2).join(" • "))}</div>`);
          }
          if (pr.precursorLines.length > 0) {
            deepParts.push(`<div><b>Precursors:</b> ${escapeHTML(pr.precursorLines.join(" • "))}</div>`);
          }
          if (pr.developmentLines.length > 0) {
            deepParts.push(`<div><b>Developments:</b> ${escapeHTML(pr.developmentLines.join(" • "))}</div>`);
          }
          if (pr.rxExplanations.length > 0) {
            const expList = pr.rxExplanations.map(e => `• <b>${escapeHTML(e.pointLabel)}:</b> ${escapeHTML(e.explanation)}`).join("<br>");
            deepParts.push(`<div style="margin-top:4px;"><b>Point Explanations:</b><br>${expList}</div>`);
          }
          if (deepParts.length > 0) {
            box += `<details class="quiz-digest-details" ${!isCorrect ? "open" : ""}><summary>Pathology, Evolution & Point Rationales</summary><div style="margin-top:6px; display:flex; flex-direction:column; gap:4px;">${deepParts.join("")}</div></details>`;
          }
        }
        return box;
      };

      if (otherPoint) {
        const otherBadge = (!isCorrect && currentPickedWrongPointId === otherId) ? "❌ Your Pick:" : "⚖️ Sibling Contrast:";
        html += `
          <div class="quiz-diff-grid">
            <div class="quiz-diff-col">${buildPatternAnchorHtml(currentTargetPoint, "✅ Target:", true)}</div>
            <div class="quiz-diff-col">${buildPatternAnchorHtml(otherPoint, otherBadge, false)}</div>
          </div>
        `;
      } else {
        html += buildPatternAnchorHtml(currentTargetPoint, "☯️ Pattern Anchor:", true);
      }
    } else if (currentTrack === "clinical_points") {
      const buildPointAnchorHtml = (pObj, badgeHtml) => {
        const act = parsePointClinicalLines(pObj, "actions").lines.slice(0, 3).join("; ");
        const ind = parsePointClinicalLines(pObj, "indications").lines.slice(0, 3).join("; ");
        let box = `<div style="font-weight:800; font-size:14.5px; color:#cc5500; margin-bottom:4px;">${badgeHtml} ${escapeHTML(pObj["Short Name"])}</div>`;
        if (act) box += `<div><b>Actions:</b> ${bbcodeToHtml(act)}</div>`;
        if (ind) box += `<div><b>Indications:</b> ${bbcodeToHtml(ind)}</div>`;
        return box;
      };

      if (otherPoint) {
        const otherBadge = (!isCorrect && currentPickedWrongPointId === otherId) ? "❌ Your Pick:" : "⚖️ Contrast:";
        html += `
          <div class="quiz-diff-grid">
            <div class="quiz-diff-col">${buildPointAnchorHtml(currentTargetPoint, "✅ Target:")}</div>
            <div class="quiz-diff-col">${buildPointAnchorHtml(otherPoint, otherBadge)}</div>
          </div>
        `;
      } else {
        html += buildPointAnchorHtml(currentTargetPoint, "⚡ Clinical Summary:");
      }
    } else {
      const loc = currentTargetPoint["Location "] || currentTargetPoint["Location"] || "";
      html += `<div><strong style="color:#cc5500;">📍 ${escapeHTML(currentTargetPoint["Short Name"])}:</strong> ${bbcodeToHtml(loc)}</div>`;
    }

    if (html) {
      card.innerHTML = html;
      card.style.display = "flex";
    }
  }

  function renderPostAnswerInspectionBar() {
    const bar = document.getElementById("qzInspectBar");
    if (!currentTargetPoint) return;

    const targetId = currentTargetPoint["Short Name"];
    const safeTarget = targetId.replace(/'/g, "\\'");
    let html = `<button class="quiz-pill-btn" onclick="openQuickPeekById('${safeTarget}')">⚡ Peek ${escapeHTML(targetId)}</button>`;

    const hasContrast = currentContrastPointId && currentContrastPointId !== targetId;
    const hasWrongPick = currentPickedWrongPointId &&
                         currentPickedWrongPointId !== targetId &&
                         currentPickedWrongPointId !== currentContrastPointId;

    if (hasContrast) {
      const safeContrast = currentContrastPointId.replace(/'/g, "\\'");
      html += `<button class="quiz-pill-btn" onclick="openQuickPeekById('${safeContrast}')">⚡ Peek ${escapeHTML(currentContrastPointId)}</button>`;
    }

    if (hasWrongPick) {
      const safeWrong = currentPickedWrongPointId.replace(/'/g, "\\'");
      const pickLabel = hasContrast ? `${currentPickedWrongPointId} (Your Pick)` : currentPickedWrongPointId;
      html += `<button class="quiz-pill-btn" onclick="openQuickPeekById('${safeWrong}')">⚡ Peek ${escapeHTML(pickLabel)}</button>`;
    }

    if (hasContrast && hasWrongPick) {
      const safeContrast = currentContrastPointId.replace(/'/g, "\\'");
      const safeWrong = currentPickedWrongPointId.replace(/'/g, "\\'");
      html += `<button class="quiz-pill-btn" style="background:#cc5500; color:#fff;" onclick="compareQuizItems(['${safeTarget}', '${safeContrast}'])">⚖️ Compare Pair (2)</button>`;
      html += `<button class="quiz-pill-btn" style="background:#007aff; color:#fff;" onclick="compareQuizItems(['${safeTarget}', '${safeContrast}', '${safeWrong}'])">⚖️ Compare All 3</button>`;
    } else if (hasContrast) {
      const safeContrast = currentContrastPointId.replace(/'/g, "\\'");
      html += `<button class="quiz-pill-btn" style="background:#cc5500; color:#fff;" onclick="compareQuizItems(['${safeTarget}', '${safeContrast}'])">⚖️ Compare Both</button>`;
    } else if (hasWrongPick) {
      const safeWrong = currentPickedWrongPointId.replace(/'/g, "\\'");
      html += `<button class="quiz-pill-btn" style="background:#cc5500; color:#fff;" onclick="compareQuizItems(['${safeTarget}', '${safeWrong}'])">⚖️ Compare Both</button>`;
    }

    const srsSec = currentTrack === "patterns" ? "Clinical Manifestations" : (currentTrack === "clinical_points" ? "Actions" : "Location");
    html += `<button class="quiz-pill-btn" style="margin-left:auto; background:#34c759; color:#fff;" onclick="enrollQuizCardInSRS('${safeTarget}', '${srsSec}')">🧠 +SRS (${srsSec})</button>`;

    bar.innerHTML = html;
    bar.style.display = "flex";
  }

  window.enrollQuizCardInSRS = function (pointId, sectionLabel) {
    if (typeof points === "undefined") return;
    const p = points.find(x => x["Short Name"] === pointId);
    if (!p) return;
    const cardId = pointId + "::" + sectionLabel;
    if (typeof pendingSRSUpdates !== "undefined") {
      pendingSRSUpdates.push({ cardId: cardId, rating: "swipe-wrong" });
      if (typeof saveSRSQueueLocal === "function") saveSRSQueueLocal();
      if (typeof updateStudySyncBadge === "function") updateStudySyncBadge();
      if (typeof showToast === "function") showToast(`🧠 Added ${pointId} (${sectionLabel}) to SRS Queue`);
    }
  };

  window.compareQuizItems = function (idsArray) {
    if (typeof compareList !== "undefined" && Array.isArray(idsArray)) {
      if (typeof backupCompareList !== "undefined") backupCompareList = [];
      compareList = [...new Set(idsArray.filter(Boolean))];
      if (typeof updateCompareBasketUI === "function") updateCompareBasketUI();
      if (typeof openCompareModal === "function") openCompareModal();
    }
  };

  function updateQuizScoreUI() {
    const pct = qzTotalAnswered === 0 ? 0 : Math.round((qzScore / qzTotalAnswered) * 100);
    document.getElementById("quizTopScore").textContent = `${qzScore}/${qzTotalAnswered} • ${pct}% (${remainingQuizQueue.length} left)`;
  }

  // --- 13. POOL MANAGEMENT, RETAKE MISSED & SUMMARY ---
  function getSeenKey() { return `tcmSeen_${currentTrack}`; }
  function getStateKey() { return `tcmQuizState_${currentTrack}`; }

  window.retakeQuizWholePool = function () {
    const limitVal = document.getElementById("qzLimitSelect").value;
    const eligibleFiltered = getSubModeEligiblePool(trackFilteredPoints);

    if (eligibleFiltered.length === 0) {
      activeQuizPool = [];
      startQuizRound();
      return;
    }

    if (limitVal === "all") {
      activeQuizPool = [...eligibleFiltered];
      localStorage.removeItem(getSeenKey());
    } else {
      const limit = parseInt(limitVal, 10);
      let seenIds = [];
      try { seenIds = JSON.parse(localStorage.getItem(getSeenKey()) || "[]"); } catch (e) {}
      let unseen = eligibleFiltered.filter(p => !seenIds.includes(p["Short Name"]));

      if (unseen.length === 0) {
        if (typeof showToast === "function") showToast("🎉 Completed all cards in filtered pool! Cycling fresh.");
        seenIds = [];
        localStorage.removeItem(getSeenKey());
        unseen = [...eligibleFiltered];
      }
      activeQuizPool = shuffleArr(unseen).slice(0, Math.min(limit, unseen.length));
    }
    startQuizRound();
  };

  window.retakeQuizMissedOnly = function () {
    if (sessionMisses.length === 0) return;
    activeQuizPool = sessionMisses.map(m => m.point);
    startQuizRound();
  };

  window.compareAllQuizMissed = function () {
    if (typeof compareList === "undefined") return;
    if (typeof backupCompareList !== "undefined") backupCompareList = [];
    compareList = [];
    sessionMisses.forEach(m => {
      const id = m.point["Short Name"];
      if (!compareList.includes(id)) {
        compareList.push(id);
      }
    });
    if (typeof updateCompareBasketUI === "function") updateCompareBasketUI();
    if (typeof showToast === "function") showToast(`Comparing ${compareList.length} missed items`);
    if (typeof openCompareModal === "function") openCompareModal();
  };

  function startQuizRound() {
    qzScore = 0;
    qzTotalAnswered = 0;
    sessionMisses = [];
    requeuedCardCounts = {};
    remainingQuizQueue = shuffleArr([...activeQuizPool]);

    document.getElementById("qzSummaryView").style.display = "none";
    document.getElementById("qzActiveView").style.display = "flex";
    updatePoolSummaryBanner();
    updateQuizScoreUI();
    generateNextQuizQuestion();
  }

  function showQuizSummaryScreen() {
    localStorage.removeItem(getStateKey());
    document.getElementById("qzActiveView").style.display = "none";
    document.getElementById("qzBottomBar").style.display = "none";
    document.getElementById("qzSummaryView").style.display = "flex";

    const pct = qzTotalAnswered === 0 ? 0 : Math.round((qzScore / qzTotalAnswered) * 100);
    document.getElementById("qzFinalPct").textContent = pct + "%";
    document.getElementById("qzFinalScore").textContent = qzScore;
    document.getElementById("qzFinalTotal").textContent = qzTotalAnswered;

    const eligibleFiltered = getSubModeEligiblePool(trackFilteredPoints);
    let seenIds = [];
    try { seenIds = JSON.parse(localStorage.getItem(getSeenKey()) || "[]"); } catch (e) {}
    const unseenLeft = eligibleFiltered.filter(p => !seenIds.includes(p["Short Name"])).length;
    const poolNote = document.getElementById("qzSummaryPoolNote");
    if (poolNote) {
      poolNote.textContent = `Filtered Pool: ${eligibleFiltered.length} cards (${unseenLeft} unseen remaining in cycle)`;
    }

    const missedBtn = document.getElementById("qzRetakeMissedBtn");
    const compBtn = document.getElementById("qzCompareMissedBtn");
    const missedBox = document.getElementById("qzMissedContainer");
    const missedList = document.getElementById("qzMissedList");

    if (sessionMisses.length > 0) {
      missedBtn.style.display = "block";
      missedBtn.textContent = `🔁 Retake ${sessionMisses.length} Missed Only`;
      compBtn.style.display = "block";
      missedBox.style.display = "block";
      missedList.innerHTML = sessionMisses.map(m => {
        const safeId = m.point["Short Name"].replace(/'/g, "\\'");
        return `
          <div style="border-bottom:1px solid #e5e5ea; padding-bottom:10px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <strong style="font-size:15px; color:#cc5500;">${escapeHTML(m.point["Short Name"])}</strong>
              <button class="quiz-pill-btn" onclick="openQuickPeekById('${safeId}')">⚡ Peek</button>
            </div>
            <div style="font-size:12.5px; color:#8e8e93; margin:4px 0;">${m.questionHtml}</div>
            <div style="font-size:13px; color:#ff3b30;"><b>Your Answer:</b> ${escapeHTML(m.selected)}</div>
            <div style="font-size:13px; color:#34c759;"><b>Correct:</b> ${escapeHTML(m.correct)}</div>
          </div>
        `;
      }).join("");
    } else {
      missedBtn.style.display = "none";
      compBtn.style.display = "none";
      missedBox.style.display = "none";
    }
  }

  // --- 14. FILTER & DISTRACTOR TREES (Exact Sheet Order + Live Match Counter) ---
  function initQuizFilterTree() {
    const container = document.getElementById("qzChannelTree");
    container.innerHTML = "";

    let channelsMap = {};
    let channelOrder = [];

    trackEligiblePoints.forEach(p => {
      let chan = p["Channel Full Name"] || p[" Channel Full Name"] || "Other";
      if (!channelsMap[chan]) {
        channelsMap[chan] = [];
        channelOrder.push(chan);
      }
      channelsMap[chan].push(p);
    });

    const allDiv = document.createElement("div");
    allDiv.className = "qf-group";
    allDiv.innerHTML = `<label class="checkbox-label qf-header"><input type="checkbox" id="qzSelectAllGlobal" checked onchange="toggleAllQuizFilter(this)"> <span>All (${trackEligiblePoints.length})</span></label>`;
    container.appendChild(allDiv);

    channelOrder.forEach(chan => {
      const groupDiv = document.createElement("div");
      groupDiv.className = "qf-group";
      const pts = channelsMap[chan];

      const headerDiv = document.createElement("div");
      headerDiv.className = "qf-header";

      const expBtn = document.createElement("button");
      expBtn.className = "qf-expand-btn";
      expBtn.innerHTML = "&#43;";
      expBtn.onclick = e => {
        e.preventDefault();
        const list = groupDiv.querySelector(".qf-points-list");
        const isOpen = list.classList.toggle("open");
        expBtn.innerHTML = isOpen ? "&minus;" : "&#43;";
      };

      const chanCb = document.createElement("input");
      chanCb.type = "checkbox";
      chanCb.className = "qz-chan-cb";
      chanCb.checked = true;
      chanCb.onchange = e => {
        groupDiv.querySelectorAll(".qz-pt-cb").forEach(cb => (cb.checked = e.target.checked));
        syncQuizGlobalCheckbox();
        updateFilterModalLiveCount();
      };

      const titleSpan = document.createElement("span");
      titleSpan.style.flex = "1";
      titleSpan.textContent = `${chan} (${pts.length})`;

      headerDiv.appendChild(expBtn);
      headerDiv.appendChild(chanCb);
      headerDiv.appendChild(titleSpan);
      groupDiv.appendChild(headerDiv);

      const ptsList = document.createElement("div");
      ptsList.className = "qf-points-list";

      pts.forEach(p => {
        const lbl = document.createElement("label");
        lbl.className = "checkbox-label qz-pt-label";
        lbl.style.fontSize = "14px";
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.className = "qz-pt-cb";
        cb.value = p["Short Name"];
        cb.checked = true;
        cb.onchange = () => {
          syncSingleQuizGroup(groupDiv);
          updateFilterModalLiveCount();
        };

        const imp = String(p.Important || "").trim();
        const span = document.createElement("span");
        span.textContent = p["Short Name"] + (imp ? ` (${imp})` : "");
        lbl.appendChild(cb);
        lbl.appendChild(span);
        ptsList.appendChild(lbl);
      });

      groupDiv.appendChild(ptsList);
      container.appendChild(groupDiv);
    });

    updateFilterModalLiveCount();
  }

  function computeCurrentModalFilteredPoints() {
    const impVal = document.getElementById("qzImpFilter")?.value || "all";
    const checkedSet = new Set(
      Array.from(document.querySelectorAll("#qzChannelTree .qz-pt-cb"))
        .filter(cb => cb.checked)
        .map(cb => cb.value)
    );

    let base = trackEligiblePoints.filter(p => checkedSet.has(p["Short Name"]));
    if (impVal === "any") {
      base = base.filter(p => ["!", "!!", "!!!"].includes(String(p.Important || "").trim()));
    } else if (impVal !== "all") {
      base = base.filter(p => String(p.Important || "").trim() === impVal);
    }
    return base;
  }

  window.updateFilterModalLiveCount = function () {
    const matched = computeCurrentModalFilteredPoints();
    const eligibleCount = getSubModeEligiblePool(matched).length;
    const applyBtn = document.getElementById("qzApplyFilterBtn");
    const titleEl = document.getElementById("qzFilterModalTitle");
    if (applyBtn) {
      applyBtn.textContent = `Apply & Restart (${eligibleCount} Cards)`;
    }
    if (titleEl) {
      titleEl.textContent = `Filter Quiz Pool (${eligibleCount} / ${trackEligiblePoints.length})`;
    }
  };

  window.toggleAllQuizFilter = function (cb) {
    document.querySelectorAll("#qzChannelTree .qz-chan-cb, #qzChannelTree .qz-pt-cb").forEach(b => {
      b.checked = cb.checked;
      b.indeterminate = false;
    });
    updateFilterModalLiveCount();
  };

  window.resetQuizFilterToAll = function () {
    const impEl = document.getElementById("qzImpFilter");
    if (impEl) impEl.value = "all";
    const searchEl = document.getElementById("qzPointSearchInput");
    if (searchEl) searchEl.value = "";
    filterQuizModalTree();
    const allCb = document.getElementById("qzSelectAllGlobal");
    if (allCb) {
      allCb.checked = true;
      allCb.indeterminate = false;
    }
    toggleAllQuizFilter({ checked: true });
  };

  function syncSingleQuizGroup(groupDiv) {
    const allPts = Array.from(groupDiv.querySelectorAll(".qz-pt-cb"));
    const chanCb = groupDiv.querySelector(".qz-chan-cb");
    const allChecked = allPts.every(b => b.checked);
    const someChecked = allPts.some(b => b.checked);
    chanCb.checked = allChecked;
    chanCb.indeterminate = someChecked && !allChecked;
    syncQuizGlobalCheckbox();
  }

  function syncQuizGlobalCheckbox() {
    const allChan = Array.from(document.querySelectorAll("#qzChannelTree .qz-chan-cb"));
    const globalCb = document.getElementById("qzSelectAllGlobal");
    if (!globalCb) return;
    const allChecked = allChan.every(b => b.checked && !b.indeterminate);
    const someChecked = allChan.some(b => b.checked || b.indeterminate);
    globalCb.checked = allChecked;
    globalCb.indeterminate = someChecked && !allChecked;
  }

  window.filterQuizModalTree = function () {
    const raw = document.getElementById("qzPointSearchInput").value.toLowerCase();
    const queries = raw.split(",").map(q => q.trim()).filter(Boolean);

    document.querySelectorAll("#qzChannelTree .qf-group").forEach(group => {
      if (group.querySelector("#qzSelectAllGlobal")) return;
      const list = group.querySelector(".qf-points-list");
      const labels = group.querySelectorAll(".qz-pt-label");
      let hasMatch = false;

      labels.forEach(lbl => {
        const text = lbl.textContent.toLowerCase();
        const match = queries.length === 0 || queries.some(q => {
          const tNorm = text.replace(/[-\s]/g, "");
          const qNorm = q.replace(/[-\s]/g, "");
          return tNorm.includes(qNorm);
        });
        lbl.style.display = match ? "flex" : "none";
        if (match && queries.length > 0) hasMatch = true;
      });

      if (queries.length > 0) {
        group.style.display = hasMatch ? "block" : "none";
        if (hasMatch) {
          list.classList.add("open");
          group.querySelector(".qf-expand-btn").innerHTML = "&minus;";
        }
      } else {
        group.style.display = "block";
      }
    });
  };

  window.selectSearchedQuizItems = function () {
    document.querySelectorAll("#qzChannelTree .qz-pt-cb, #qzChannelTree .qz-chan-cb").forEach(cb => {
      cb.checked = false;
      cb.indeterminate = false;
    });
    document.querySelectorAll("#qzChannelTree .qz-pt-label").forEach(lbl => {
      if (lbl.style.display !== "none" && lbl.closest(".qf-group").style.display !== "none") {
        lbl.querySelector(".qz-pt-cb").checked = true;
      }
    });
    document.querySelectorAll("#qzChannelTree .qf-group").forEach(g => {
      if (!g.querySelector("#qzSelectAllGlobal")) syncSingleQuizGroup(g);
    });
    updateFilterModalLiveCount();
  };

  window.useMainFilteredInQuiz = function () {
    if (typeof filteredPoints === "undefined" || filteredPoints.length === 0) return;
    const mainIds = new Set(filteredPoints.map(p => p["Short Name"]));
    document.querySelectorAll("#qzChannelTree .qz-pt-cb").forEach(cb => {
      cb.checked = mainIds.has(cb.value);
    });
    document.querySelectorAll("#qzChannelTree .qf-group").forEach(g => {
      if (!g.querySelector("#qzSelectAllGlobal")) syncSingleQuizGroup(g);
    });
    updateFilterModalLiveCount();
    applyQuizPoolFilter();
  };

  window.useCompareBasketInQuiz = function () {
    if (typeof compareList === "undefined" || compareList.length === 0) {
      if (typeof showToast === "function") showToast("Compare Basket is currently empty.");
      return;
    }
    const compSet = new Set(compareList);
    document.querySelectorAll("#qzChannelTree .qz-pt-cb").forEach(cb => {
      cb.checked = compSet.has(cb.value);
    });
    document.querySelectorAll("#qzChannelTree .qf-group").forEach(g => {
      if (!g.querySelector("#qzSelectAllGlobal")) syncSingleQuizGroup(g);
    });
    updateFilterModalLiveCount();
    applyQuizPoolFilter();
  };

  window.openQuizFilterModal = function () {
    updateFilterModalLiveCount();
    document.getElementById("quizFilterModal").style.display = "flex";
  };

  window.closeQuizFilterModal = function () {
    document.getElementById("quizFilterModal").style.display = "none";
  };

  window.applyQuizPoolFilter = function () {
    trackFilteredPoints = computeCurrentModalFilteredPoints();

    closeQuizFilterModal();
    document.getElementById("quizSettingsPanel").classList.remove("open");
    localStorage.removeItem(getSeenKey());
    retakeQuizWholePool();
  };

  // Distractor Pool Modal
  function initQuizDistractorTree() {
    const container = document.getElementById("qzDistractorList");
    container.innerHTML = "";
    let channelOrder = [];
    trackEligiblePoints.forEach(p => {
      let c = p["Channel Full Name"] || p[" Channel Full Name"] || "Other";
      if (!channelOrder.includes(c)) channelOrder.push(c);
    });

    const allDiv = document.createElement("div");
    allDiv.className = "qf-group";
    allDiv.innerHTML = `<label class="checkbox-label qf-header"><input type="checkbox" id="qzDistAll" checked onchange="document.querySelectorAll('.qz-dist-cb').forEach(b=>b.checked=this.checked)"> <span>All Channels / Groups</span></label>`;
    container.appendChild(allDiv);

    channelOrder.forEach(c => {
      const d = document.createElement("div");
      d.className = "qf-group";
      d.innerHTML = `<label class="checkbox-label"><input type="checkbox" class="qz-dist-cb" value="${escapeHTML(c)}" checked> <span>${escapeHTML(c)}</span></label>`;
      container.appendChild(d);
    });
  }

  window.openQuizDistractorModal = function () {
    document.getElementById("quizDistractorModal").style.display = "flex";
  };

  window.closeQuizDistractorModal = function () {
    document.getElementById("quizDistractorModal").style.display = "none";
  };

  window.applyQuizDistractorFilter = function () {
    const checkedChans = new Set(
      Array.from(document.querySelectorAll(".qz-dist-cb")).filter(b => b.checked).map(b => b.value)
    );
    trackDistractorPoints = trackEligiblePoints.filter(p => {
      const c = p["Channel Full Name"] || p[" Channel Full Name"] || "Other";
      return checkedChans.has(c);
    });
    if (trackDistractorPoints.length === 0) trackDistractorPoints = [...trackEligiblePoints];
    closeQuizDistractorModal();
  };

  // --- 15. SESSION SAVE & RESUME ---
  function saveQuizSessionState() {
    if (remainingQuizQueue.length === 0 && !currentTargetPoint) return;
    const state = {
      subMode: qzSubMode,
      difficulty: qzDifficulty,
      limitVal: document.getElementById("qzLimitSelect")?.value || "10",
      filteredIds: trackFilteredPoints.map(p => p["Short Name"]),
      activeIds: activeQuizPool.map(p => p["Short Name"]),
      remainingIds: remainingQuizQueue.map(item => (item && item._isRequeuedWrapper ? item.point["Short Name"] : item["Short Name"])),
      currentTargetId: currentTargetPoint ? currentTargetPoint["Short Name"] : null,
      misses: sessionMisses.map(m => ({
        pointId: m.point["Short Name"],
        questionHtml: m.questionHtml,
        selected: m.selected,
        correct: m.correct
      })),
      score: qzScore,
      totalAnswered: qzTotalAnswered
    };
    try {
      localStorage.setItem(getStateKey(), JSON.stringify(state));
    } catch (e) {}
  }

  function checkSavedQuizSession() {
    const raw = localStorage.getItem(getStateKey());
    if (!raw) return false;
    try {
      const state = JSON.parse(raw);
      if (state.totalAnswered > 0 && state.remainingIds && state.remainingIds.length > 0) {
        const pct = Math.round((state.score / state.totalAnswered) * 100);
        document.getElementById("qzResumeStatsText").textContent = `${state.totalAnswered} Answered • ${pct}% (${state.remainingIds.length} Left)`;
        document.getElementById("quizResumeModal").style.display = "flex";
        return true;
      }
    } catch (e) {}
    return false;
  }

  window.confirmResumeQuizSession = function () {
    document.getElementById("quizResumeModal").style.display = "none";
    const raw = localStorage.getItem(getStateKey());
    if (!raw) return retakeQuizWholePool();

    try {
      const state = JSON.parse(raw);
      qzSubMode = state.subMode || qzSubMode;
      document.getElementById("qzSubModeSelect").value = qzSubMode;
      populateDifficultySelect();
      qzDifficulty = state.difficulty || qzDifficulty;
      document.getElementById("qzDifficultySelect").value = qzDifficulty;
      if (state.limitVal && document.getElementById("qzLimitSelect")) {
        document.getElementById("qzLimitSelect").value = state.limitVal;
      }

      const byId = id => trackEligiblePoints.find(p => p["Short Name"] === id);

      if (Array.isArray(state.filteredIds) && state.filteredIds.length > 0) {
        const restoredFiltered = state.filteredIds.map(byId).filter(Boolean);
        if (restoredFiltered.length > 0) {
          trackFilteredPoints = restoredFiltered;
          const fSet = new Set(state.filteredIds);
          document.querySelectorAll("#qzChannelTree .qz-pt-cb").forEach(cb => {
            cb.checked = fSet.has(cb.value);
          });
          document.querySelectorAll("#qzChannelTree .qf-group").forEach(g => {
            if (!g.querySelector("#qzSelectAllGlobal")) syncSingleQuizGroup(g);
          });
        }
      }

      activeQuizPool = (state.activeIds || []).map(byId).filter(Boolean);
      remainingQuizQueue = (state.remainingIds || []).map(byId).filter(Boolean);
      const target = state.currentTargetId ? byId(state.currentTargetId) : null;
      if (target) remainingQuizQueue.push(target);

      sessionMisses = (state.misses || []).map(m => {
        const pt = byId(m.pointId);
        return pt ? { point: pt, questionHtml: m.questionHtml, selected: m.selected, correct: m.correct } : null;
      }).filter(Boolean);

      qzScore = state.score || 0;
      qzTotalAnswered = state.totalAnswered || 0;

      document.getElementById("qzSummaryView").style.display = "none";
      document.getElementById("qzActiveView").style.display = "flex";
      updatePoolSummaryBanner();
      updateQuizScoreUI();
      generateNextQuizQuestion();
    } catch (e) {
      retakeQuizWholePool();
    }
  };

  window.abandonSavedQuizSession = function () {
    document.getElementById("quizResumeModal").style.display = "none";
    localStorage.removeItem(getStateKey());
    retakeQuizWholePool();
  };

  // --- 16. KEYBOARD SHORTCUTS FOR IPAD / DESKTOP ---
  document.addEventListener("keydown", e => {
    const activeEl = document.activeElement;
    const isTyping = activeEl && (
      activeEl.tagName === "INPUT" ||
      activeEl.tagName === "TEXTAREA" ||
      activeEl.tagName === "SELECT" ||
      activeEl.isContentEditable
    );

    const hub = document.getElementById("toolsHubModal");
    const isHubOpen = hub && hub.style.display === "flex";

    if (((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key.toLowerCase() === "k") || (!isTyping && e.key === "[")) {
      e.preventDefault();
      if (isHubOpen) {
        closeToolsHubModal();
      } else {
        openToolsHubModal();
      }
      return;
    }

    if (isHubOpen) {
      if (!isTyping) {
        if (e.key === "1") { e.preventDefault(); closeToolsHubModal(); openQuizModal("patterns"); return; }
        if (e.key === "2") { e.preventDefault(); closeToolsHubModal(); openQuizModal("clinical_points"); return; }
        if (e.key === "3") { e.preventDefault(); closeToolsHubModal(); openQuizModal("location"); return; }
        if (e.key === "4") { e.preventDefault(); closeToolsHubModal(); openStudySettingsModal(); return; }
        if (e.key === "5") { e.preventDefault(); closeToolsHubModal(); openIntakeModal(); return; }
      }
      return;
    }

    const qzModal = document.getElementById("quizModal");
    if (!qzModal || qzModal.style.display !== "flex") return;

    if (typeof isQuickPeekOpen === "function" && isQuickPeekOpen()) return;
    if (document.getElementById("compareModal")?.style.display === "flex") return;
    if (document.getElementById("lightbox")?.style.display === "flex") return;
    if (document.getElementById("editModal")?.style.display === "flex") return;
    if (document.getElementById("quizFilterModal")?.style.display === "flex") return;
    if (document.getElementById("quizDistractorModal")?.style.display === "flex") return;
    if (document.getElementById("quizResumeModal")?.style.display === "flex") return;

    if (isTyping) return;

    if (!e.metaKey && !e.ctrlKey && e.key.toLowerCase() === "c") {
      const clueBtn = document.getElementById("qzClueBtn");
      if (clueBtn && clueBtn.style.display !== "none") {
        e.preventDefault();
        revealNextQuizClue();
        return;
      }
    }

    const revealBtn = document.getElementById("qzRevealBtn");
    const nextBtn = document.getElementById("qzNextBtn");

    if (e.key === " " || e.key === "Enter") {
      if (revealBtn && revealBtn.style.display === "block") {
        e.preventDefault();
        revealQuizOptions();
        return;
      }
      if (nextBtn && nextBtn.style.display === "block") {
        e.preventDefault();
        generateNextQuizQuestion();
        return;
      }
    }

    if (/^[1-6]$/.test(e.key)) {
      const idx = parseInt(e.key, 10) - 1;
      const grid = document.getElementById("qzOptionsGrid");
      if (grid && grid.style.display !== "none") {
        const btns = grid.querySelectorAll(".quiz-opt-btn");
        if (btns[idx] && !btns[idx].disabled) {
          e.preventDefault();
          btns[idx].click();
        }
      }
    }
  });
})();