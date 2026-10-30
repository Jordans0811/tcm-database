/* ============================================================================
   TCM UNIFIED QUIZ & STUDY HUB ENGINE (tcm-quiz.js)
   Tracks:
   1. 'location'        -> Point Location Quiz (Standard MCQ + FITB Lvl 1-4)
   2. 'clinical_points' -> Point Actions & Indications Differentiation Quiz
   3. 'patterns'        -> Zang-Fu & Pattern Differentiation Quiz (160+ rows)
   ============================================================================ */

(function () {
  // --- 1. INJECT STYLES & MODALS MATCHING INDEX.HTML ---
  function injectQuizHubDOM() {
    if (document.getElementById("toolsHubModal")) return;

    const style = document.createElement("style");
    style.textContent = `
      #toolsHubModal, #quizModal, #quizFilterModal, #quizDistractorModal, #quizResumeModal {
        display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
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
      .quiz-track-tabs {
        display: flex; background: #e3e3e8; border-radius: 10px; padding: 3px; gap: 2px;
      }
      .quiz-track-tab {
        border: none; background: transparent; padding: 6px 10px; border-radius: 8px;
        font-size: 12px; font-weight: 800; color: #555; cursor: pointer; white-space: nowrap;
      }
      .quiz-track-tab.active {
        background: #ffffff; color: #cc5500; box-shadow: 0 1px 4px rgba(0,0,0,0.12);
      }
      .quiz-subtoolbar {
        display: flex; justify-content: space-between; align-items: center; gap: 8px;
        padding: 8px 15px; background: rgba(240,240,245,0.95);
        border-bottom: 1px solid #d1d1d6; flex-shrink: 0; flex-wrap: wrap;
      }
      .quiz-pill-btn {
        background: #e3e3e8; color: #007aff; border: none; border-radius: 8px;
        padding: 6px 11px; font-size: 12.5px; font-weight: 800; cursor: pointer;
      }
      .quiz-pill-btn:active { transform: scale(0.96); }
      .quiz-score-badge {
        font-size: 13px; font-weight: 800; color: #cc5500; letter-spacing: 0.3px;
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
        padding: 15px; max-width: 760px; width: 100%; margin: 0 auto; box-sizing: border-box;
        display: flex; flex-direction: column; gap: 14px;
      }
      .quiz-question-card {
        background: #ffffff; border: 1px solid #d1d1d6; border-radius: 12px;
        padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      }
      .quiz-q-label {
        font-size: 11.5px; font-weight: 800; text-transform: uppercase;
        color: #cc5500; letter-spacing: 0.6px; margin-bottom: 10px; display: block;
      }
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
      
      
      .quiz-score-badge { white-space: nowrap; }
      @media (max-width: 767px) {
        .quiz-kb-hint { display: none; }
      }
      @media (max-width: 430px) {
        .quiz-top-bar { padding-left: 10px; padding-right: 10px; gap: 4px; }
        .quiz-track-tab { padding: 6px 7px; font-size: 11px; }
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
        .quiz-question-card { background: #1c1c1e; border-color: #38383a; }
        .quiz-q-label { color: #ff9f0a; }
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

          <button class="hub-card-btn" onclick="closeToolsHubModal(); openQuizModal('location');">
            <div class="hub-card-icon">📍</div>
            <div>
              <div class="hub-card-title">Point Location Quiz</div>
              <div class="hub-card-sub">Standard MCQ & Level 1–4 Fill-in-the-Blank (Cun, Anatomy, Landmarks)</div>
            </div>
          </button>

          <button class="hub-card-btn" onclick="closeToolsHubModal(); openQuizModal('clinical_points');">
            <div class="hub-card-icon">⚡</div>
            <div>
              <div class="hub-card-title">Actions & Indications Quiz</div>
              <div class="hub-card-sub">Point clinical differentiation, vignette matching & action/indication blanks</div>
            </div>
          </button>

          <button class="hub-card-btn" onclick="closeToolsHubModal(); openQuizModal('patterns');">
            <div class="hub-card-icon">☯️</div>
            <div>
              <div class="hub-card-title">Pattern Differentiation Quiz</div>
              <div class="hub-card-sub" id="hubPatternCountSub">Zang-Fu clinical manifestations, Tongue/Pulse & sibling contrast</div>
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
            <button class="quiz-track-tab active" id="tabQuizLocation" onclick="switchQuizTrack('location')">📍 Location</button>
            <button class="quiz-track-tab" id="tabQuizClinical" onclick="switchQuizTrack('clinical_points')">⚡ Act/Ind</button>
            <button class="quiz-track-tab" id="tabQuizPatterns" onclick="switchQuizTrack('patterns')">☯️ Patterns</button>
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
              <option value="all">All Cards in Pool</option>
              <option value="10" selected>10 Random Cards</option>
              <option value="15">15 Random Cards</option>
              <option value="20">20 Random Cards</option>
              <option value="25">25 Random Cards</option>
            </select>
            <button class="quiz-pill-btn" style="flex:1; padding:9px;" onclick="openQuizDistractorModal()">🛡️ Answer Pool</button>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; padding-top:4px;">
            <label style="font-size:13px; font-weight:700; color:#666; display:flex; align-items:center; gap:8px; cursor:pointer;">
              <input type="checkbox" id="qzRequireRevealToggle" checked onchange="qzRequireReveal = this.checked;">
              Hide choices until "Reveal Options" is tapped
            </label>
            <button class="quiz-pill-btn" style="background:#cc5500; color:#fff;" onclick="toggleQuizSettings()">Done</button>
          </div>
        </div>

        <!-- Active Quiz View -->
        <div class="quiz-scroll-body" id="qzActiveView">
          <div class="quiz-question-card" id="qzQuestionCard">
            <span class="quiz-q-label" id="qzQuestionLabel">Loading...</span>
            <div class="quiz-q-body" id="qzQuestionBody"></div>
          </div>

          <button class="quiz-main-action-btn secondary" id="qzRevealBtn" onclick="revealQuizOptions()" style="display:none;">Reveal Options 👁️ <span style="font-size:12px; font-weight:600; opacity:0.8;">(Space)</span></button>

          <div class="quiz-options-grid" id="qzOptionsGrid"></div>

          <div class="quiz-inspect-bar" id="qzInspectBar"></div>
        </div>

        <!-- Summary View -->
        <div class="quiz-scroll-body" id="qzSummaryView" style="display:none;">
          <div class="quiz-question-card" style="text-align:center; padding:24px 16px;">
            <h2 style="margin:0 0 8px 0; color:#cc5500;">Session Complete!</h2>
            <div style="font-size:38px; font-weight:900; color:#34c759; margin:8px 0;" id="qzFinalPct">0%</div>
            <div style="font-size:15px; color:#8e8e93; font-weight:600;">
  Correct: <strong id="qzFinalScore">0</strong> of <strong id="qzFinalTotal">0</strong>
</div>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            <button class="quiz-main-action-btn" id="qzRetakeMissedBtn" style="background:#ff3b30; display:none;" onclick="retakeQuizMissedOnly()">🔁 Retake Missed Only</button>
            <button class="quiz-main-action-btn secondary" id="qzCompareMissedBtn" style="display:none;" onclick="compareAllQuizMissed()">⚖️ Send Missed to Compare Matrix</button>
            <button class="quiz-main-action-btn" style="background:#007aff;" onclick="retakeQuizWholePool()">🔄 Start Next Batch / Restart Pool</button>
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

      <!-- 3. FILTER POOL MODAL (Preserves Exact Sheet Channel Order) -->
      <div id="quizFilterModal" onclick="if(event.target===this) closeQuizFilterModal()">
        <div class="modal-content" style="height:78vh; max-height:700px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <h3 class="modal-title">Filter Quiz Pool</h3>
            <button onclick="closeQuizFilterModal()" style="background:transparent; border:none; font-size:26px; color:#8e8e93; cursor:pointer; line-height:1;">&times;</button>
          </div>

          <!-- Quick Sync with Main Screen Search or Compare Basket -->
          <div style="display:flex; gap:6px; margin-bottom:8px; flex-wrap:wrap;">
            <button class="quiz-pill-btn" onclick="useMainFilteredInQuiz()">🔍 Use Main Search Set</button>
            <button class="quiz-pill-btn" onclick="useCompareBasketInQuiz()">⚖️ Use Compare Basket</button>
          </div>

          <div style="margin-bottom:8px;">
            <select id="qzImpFilter" class="quiz-select" style="width:100%;">
              <option value="all" selected>All Importance Levels</option>
              <option value="any">Any Important (!, !!, !!!)</option>
              <option value="!">! Only</option>
              <option value="!!">!! Only</option>
              <option value="!!!">!!! Only</option>
            </select>
          </div>

          <div style="display:flex; gap:8px; margin-bottom:8px;">
            <input type="text" id="qzPointSearchInput" class="search-box" style="padding:8px 12px; font-size:16px;" placeholder="e.g. st36, lu7, heart qi..." oninput="filterQuizModalTree()">
            <button class="quiz-pill-btn" style="background:#cc5500; color:#fff; white-space:nowrap;" onclick="selectSearchedQuizItems()">Select Shown</button>
          </div>

          <div id="qzChannelTree" style="flex:1; overflow-y:auto; padding-right:4px; margin-bottom:10px;"></div>

          <div class="modal-buttons">
            <button class="cancel-btn" onclick="closeQuizFilterModal()">Cancel</button>
            <button class="save-btn" onclick="applyQuizPoolFilter()">Apply & Restart Quiz</button>
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
      <div id="quizResumeModal" onclick="if(event.target===this) abandonSavedQuizSession()">
        <div class="modal-content" style="max-width:360px; text-align:center; padding:24px 20px;">
          <h3 class="modal-title" style="margin-bottom:6px;">Resume Quiz?</h3>
          <p style="color:#8e8e93; font-size:13.5px; margin:0 0 14px 0;">You have an unfinished session in this quiz track.</p>
          <div id="qzResumeStatsText" style="font-size:17px; font-weight:800; color:#cc5500; margin-bottom:18px;"></div>
          <div style="display:flex; flex-direction:column; gap:10px;">
            <button class="save-btn" style="background:#007aff;" onclick="confirmResumeQuizSession()">▶️ Resume Session</button>
            <button class="save-btn" style="background:#ff9f0a;" onclick="abandonSavedQuizSession()">🔄 Start Fresh</button>
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
  let currentTrack = "location"; // 'location' | 'clinical_points' | 'patterns'
  let qzSubMode = "standard";
  let qzDifficulty = "medium";
  let qzRequireReveal = true;

  let trackEligiblePoints = [];
  let trackFilteredPoints = [];
  let trackDistractorPoints = [];
  let activeQuizPool = [];
  let remainingQuizQueue = [];
  let sessionMisses = [];
  let currentTargetPoint = null;
  let currentCorrectAnswer = "";
  let currentPickedWrongPointId = null;
  let currentContrastPointId = null;
  let qzScore = 0;
  let qzTotalAnswered = 0;

  // Location Blank Categories (from pointquiz.html)
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

  // Clinical & Pattern Diagnostic Blank Categories (for Actions/Indications & Pattern FITB/Mutator)
  const clinicalBlankCategories = {
    verbs: ['tonifies', 'nourishes', 'clears', 'drains', 'cools', 'warms', 'expels', 'scatters', 'resolves', 'transforms', 'calms', 'pacifies', 'subdues', 'descends', 'raises', 'lifts', 'regulates', 'harmonizes', 'invigorates', 'activates', 'stops', 'alleviates', 'benefits', 'opens', 'unbinds', 'moistens', 'astringes', 'consolidates', 'releases', 'extinguishes'],
    pathogens: ['wind', 'heat', 'cold', 'dampness', 'damp', 'phlegm', 'fire', 'dryness', 'summerheat', 'stagnation', 'stasis', 'rebellious', 'deficiency', 'excess', 'collapse', 'sinking'],
    substances: ['qi', 'blood', 'yin', 'yang', 'jing', 'essence', 'shen', 'mind', 'fluids', 'wei qi', 'ying qi', 'yuan qi', 'body fluids'],
    organs: ['lung', 'large intestine', 'stomach', 'spleen', 'heart', 'small intestine', 'bladder', 'kidney', 'pericardium', 'san jiao', 'gall bladder', 'gallbladder', 'liver', 'uterus', 'brain', 'marrow', 'chest', 'diaphragm', 'throat', 'eyes', 'ears', 'nose'],
    tongueBody: ['pale', 'red', 'deep-red', 'purple', 'bluish-purple', 'swollen', 'thin', 'stiff', 'flabby', 'deviated', 'cracked', 'quivering', 'short', 'scarlet'],
    tongueCoat: ['white', 'yellow', 'grey', 'black', 'sticky', 'slippery', 'dry', 'peeled', 'rootless', 'thick', 'thin', 'geographic', 'mirror'],
    pulseQualities: ['floating', 'deep', 'slow', 'rapid', 'empty', 'full', 'wiry', 'taut', 'slippery', 'rolling', 'choppy', 'hesitant', 'fine', 'thready', 'weak', 'frail', 'soggy', 'soft', 'tight', 'knotted', 'intermittent', 'hurried', 'overflowing', 'flooding', 'leather', 'hidden', 'minute', 'hollow', 'scattered'],
    keySignSwaps: ['spontaneous sweating', 'night sweating', 'five-palm heat', 'cold limbs', 'feeling of cold', 'feeling of heat', 'tidal fever', 'alternating chills and fever', 'palpitations', 'insomnia', 'dream-disturbed sleep', 'dizziness', 'vertigo', 'tinnitus', 'loose stools', 'constipation', 'scanty dark urine', 'profuse pale urine', 'distension', 'stabbing pain', 'dull pain', 'heavy sensation', 'oppression in the chest', 'shortness of breath', 'sighing', 'irritability', 'depression']
  };

  const pointAliases = {
    'HE': 'HT', 'TB': 'SJ', 'TE': 'SJ', 'TH': 'SJ', 'P': 'PC',
    'LIV': 'LV', 'LR': 'LV', 'KID': 'KD', 'KI': 'KD', 'UB': 'BL',
    'REN': 'CV', 'RN': 'CV', 'DU': 'GV', 'L.I.': 'LI'
  };

  function normalizePointCode(name) {
    let clean = String(name || "").toUpperCase().replace(/[\s\-]/g, "");
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

  // --- 3. SELF-SPOILER SCRUBBER (Prevents prompts from giving away the point/pattern name) ---
  function maskSelfSpoilers(rawHtmlOrText, pointObj) {
    if (!rawHtmlOrText || !pointObj) return "";
    let terms = [];
    const shortName = String(pointObj["Short Name"] || "").trim();
    const fullName = String(pointObj["Full Name"] || pointObj[" Full Name"] || "").trim();

    if (shortName) {
      if (typeof expandTCMPoint === "function") {
        terms.push(...expandTCMPoint(shortName.toLowerCase()));
      } else {
        terms.push(shortName.toLowerCase());
      }
    }
    if (fullName && fullName.length > 3) {
      terms.push(fullName.toLowerCase());
      fullName.split(/[()\/,]/).map(s => s.trim().toLowerCase()).forEach(part => {
        if (part.length > 3) terms.push(part);
      });
    }

    const escaped = [...new Set(terms)]
      .filter(Boolean)
      .sort((a, b) => b.length - a.length)
      .map(t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "[\\s\\-]+"));

    if (escaped.length === 0) return rawHtmlOrText;
    const regex = new RegExp("\\b(" + escaped.join("|") + ")\\b", "gi");

    return rawHtmlOrText.split(/(<[^>]*>)/g).map(part => {
      return part.startsWith("<") ? part : part.replace(regex, "<span class='quiz-fitb-blank'>[ ??? ]</span>");
    }).join("");
  }

  // --- 4. ADAPTIVE 2-TIER CLINICAL MANIFESTATIONS PARSER (Handles all 160+ Pattern rows) ---
  const patternParseCache = new Map();

  function parseManifestationRecord(pointObj) {
    const id = pointObj["Short Name"];
    const raw = pointObj["Clinical Manifestations"] || "";
    const cacheKey = id + "::" + raw.length;
    if (patternParseCache.has(cacheKey)) return patternParseCache.get(cacheKey);

    let clean = stripBBCode(String(raw)).replace(/\r\n/g, "\n").trim();

    // Remove markdown table separator lines and convert pipe rows to clean lines
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

    // Tier 1: Look for explicit Structured Headers
    const keyMatch = clean.match(/(?:Key|Cardinal|Main)\s+Symptoms?\s*:\s*(.+?)(?=\n\s*\n|\n\s*(?:Tongue|Pulse|All Clinical|Other|Secondary|Key|Clinical)|$)/is);
    const tongueMatch = clean.match(/(?:^|\n)\s*(?:➣|•|-|\*)?\s*Tongue\s*:\s*(.+?)(?=\n\s*\n|\n\s*(?:Key|Pulse|All Clinical|Other|➣|•)|$)/is);
    const pulseMatch = clean.match(/(?:^|\n)\s*(?:➣|•|-|\*)?\s*Pulse\s*:\s*(.+?)(?=\n\s*\n|\n\s*(?:Key|Tongue|All Clinical|Other|➣|•)|$)/is);

    let keyRaw = keyMatch ? keyMatch[1].replace(/\s+/g, " ").trim() : "";
    let tongue = tongueMatch ? tongueMatch[1].replace(/\s+/g, " ").trim() : "";
    let pulse = pulseMatch ? pulseMatch[1].replace(/\s+/g, " ").trim() : "";

    // Extract explicit ➣ / • / - bullets
    let bullets = [...clean.matchAll(/(?:^|\n)\s*(?:➣|•|\*)\s*([^\n]+)/g)]
      .map(m => m[1].trim())
      .filter(Boolean);

    // Tier 2 Fallback: If unstructured (no explicit Tongue:, Pulse:, or ➣ bullets)
    const rawLines = clean
      .split(/\n|;;/)
      .map(l => l.replace(/^(?:➣|•|-|\*|\d+\.)\s*/, "").trim())
      .filter(l => l.length > 2 && !/^(?:All\s+)?Clinical\s+Manifestations?\s*:?$/i.test(l));

    if (!tongue) {
      const tLine = rawLines.find(l => /\btongue\b/i.test(l) && !/^key\s+symptoms?/i.test(l));
      if (tLine) {
        tongue = tLine.replace(/^tongue\s*[:\-–]?\s*/i, "").trim();
      }
    }
    if (!pulse) {
      const pLine = rawLines.find(l => /\bpulse\b/i.test(l) && !/^key\s+symptoms?/i.test(l));
      if (pLine) {
        pulse = pLine.replace(/^pulse\s*[:\-–]?\s*/i, "").trim();
      }
    }

    if (bullets.length === 0) {
      // Split remaining lines or semicolon/comma clauses into discrete symptom items
      rawLines.forEach(line => {
        if (/^(?:Key|Cardinal|Main)\s+Symptoms?\s*:/i.test(line)) return;
        if (/^Tongue\s*:/i.test(line) || /^Pulse\s*:/i.test(line)) return;
        if (line === tongue || line === pulse) return;

        // If a single long paragraph has semicolons or commas, break it into digestible symptom phrases
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
      // Filter out any bullet that is purely a Tongue: or Pulse: line
      bullets = bullets.filter(b => !/^Tongue\s*:/i.test(b) && !/^Pulse\s*:/i.test(b));
    }

    // Parse Key Symptoms array (or synthesize from top 3 bullets if unstructured)
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

    const parsed = {
      isStructured: Boolean(keyMatch || tongueMatch || pulseMatch),
      keyRaw,
      keySymptoms,
      tongue,
      pulse,
      symptoms: bullets,
      rawClean: clean
    };
    patternParseCache.set(cacheKey, parsed);
    return parsed;
  }

  // --- 5. PARSER FOR POINT ACTIONS & INDICATIONS ---
  function parsePointClinicalLines(pointObj, mode) {
    let rawAct = pointObj["Actions"] || "";
    let rawInd = pointObj["Indications"] || "";
    let combinedRaw = "";

    if (mode === "actions") combinedRaw = rawAct;
    else if (mode === "indications") combinedRaw = rawInd;
    else combinedRaw = [rawAct, rawInd].filter(Boolean).join("\n");

    let clean = stripBBCode(combinedRaw).replace(/\r\n/g, "\n");
    let lines = clean
      .split(/\n|;;/)
      .map(l => l.replace(/^(?:➣|•|-|\*|\d+\.)\s*/, "").trim())
      .filter(l => l.length > 2 && !/^\|(?:[\s\-:]+\|)+$/.test(l));

    // If a card has only 1 giant semicolon-separated line, split by semicolon
    if (lines.length === 1 && lines[0].includes(";")) {
      lines = lines[0].split(";").map(s => s.trim()).filter(s => s.length > 2);
    }
    return { lines, rawText: combinedRaw };
  }

  // --- 6. HUB & MODAL NAVIGATION ---
  window.openToolsHubModal = function () {
    injectQuizHubDOM();
    if (typeof closeBottomSheet === "function") closeBottomSheet();

    const patternCount = (typeof points !== "undefined" ? points : []).filter(
      p => p["Clinical Manifestations"] && String(p["Clinical Manifestations"]).trim() !== ""
    ).length;
    const subEl = document.getElementById("hubPatternCountSub");
    if (subEl && patternCount > 0) {
      subEl.textContent = `${patternCount} pattern records • Manifestations, Tongue/Pulse & sibling contrast`;
    }

    document.getElementById("toolsHubModal").style.display = "flex";
  };

  window.closeToolsHubModal = function () {
    const el = document.getElementById("toolsHubModal");
    if (el) el.style.display = "none";
  };

  window.openQuizModal = function (track = "location") {
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

  // --- 7. TRACK INITIALIZATION & DROPDOWN CONFIGURATION ---
  window.switchQuizTrack = function (track) {
    currentTrack = track;
    document.getElementById("tabQuizLocation").classList.toggle("active", track === "location");
    document.getElementById("tabQuizClinical").classList.toggle("active", track === "clinical_points");
    document.getElementById("tabQuizPatterns").classList.toggle("active", track === "patterns");

    // Filter eligible database rows while preserving exact Google Sheet order
    const masterPoints = typeof points !== "undefined" ? points : [];
    if (track === "location") {
      trackEligiblePoints = masterPoints.filter(p => p["Short Name"] && (p["Location "] || p["Location"]));
    } else if (track === "clinical_points") {
      trackEligiblePoints = masterPoints.filter(
        p => p["Short Name"] && (p["Location "] || p["Location"]) && ((p["Actions"] && String(p["Actions"]).trim()) || (p["Indications"] && String(p["Indications"]).trim()))
      );
    } else {
      trackEligiblePoints = masterPoints.filter(
        p => p["Short Name"] && p["Clinical Manifestations"] && String(p["Clinical Manifestations"]).trim() !== ""
      );
    }

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
      subSel.add(new Option("Actions + Indications (Diff MCQ)", "both_mcq", true, true));
      subSel.add(new Option("Actions Only (Diff MCQ)", "actions_mcq"));
      subSel.add(new Option("Indications Only (Diff MCQ)", "indications_mcq"));
      subSel.add(new Option("Clinical Fill in the Blank", "fitb_clinical"));
    } else if (currentTrack === "patterns") {
      subSel.add(new Option("Clinical Vignette ➔ Pattern", "vignette", true, true));
      subSel.add(new Option("Sibling Differential & Missing Sign", "differential"));
      subSel.add(new Option("Tongue & Pulse Differentiation", "tongue_pulse"));
      subSel.add(new Option("Diagnostic Fill in the Blank", "fitb_pattern"));
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
      diffSel.add(new Option("Easy (Broad / Full Clues)", "easy"));
      diffSel.add(new Option("Medium (Standard Vignette)", "medium", true, true));
      diffSel.add(new Option("Hard (Subtle Clues / Close Siblings)", "hard"));
      diffSel.add(new Option("Insane (High-Overlap Interference)", "insane"));
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
    if (el) {
      el.textContent = `Pool: ${activeQuizPool.length} of ${trackEligiblePoints.length}`;
    }
  }

  // --- 8. SMART DISTRACTOR ENGINES (Location, Clinical Points, & Patterns) ---
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

  // Mutates clinical verbs, organs, or tongue/pulse descriptors to create realistic wrong statements
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
          out = out.replace(rx, rep);
          swapsDone++;
        }
      }
    }
    return out;
  }

  function getSmartPointDistractors(targetPoint, count) {
    const targetName = targetPoint["Short Name"];
    const normTargetName = normalizePointCode(targetName);

    // 1. Check hardcodedDistractors from distractors.js if present
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

    // 2. If Clinical Points Track (Actions & Indications), rank distractors by shared clinical terms & channel
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
        if (pChan && pChan === targetChan) overlap += 4;
        return { point: p, score: overlap + Math.random() };
      });

      if (qzDifficulty === "easy") {
        return shuffleArr(otherPoints).slice(0, count);
      } else if (qzDifficulty === "medium") {
        scored.sort((a, b) => b.score - a.score);
        return shuffleArr(scored.slice(0, Math.max(count * 3, 15)).map(s => s.point)).slice(0, count);
      } else {
        scored.sort((a, b) => b.score - a.score);
        return shuffleArr(scored.slice(0, Math.max(count + 3, 8)).map(s => s.point)).slice(0, count);
      }
    }

    // 3. Location Fallback (Same Channel / Anatomical Region)
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

  // Smart Distractors for Zang-Fu & Pattern Differentiation
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

      // 1. Channel Short Name & Channel Full Name Match (High priority group/organ match)
      if (targetChanShort && pChanShort) {
        if (pChanShort === targetChanShort) score += 16;
        else if (pChanShort.includes(targetChanShort) || targetChanShort.includes(pChanShort)) score += 10;
      }
      if (targetChanFull && pChanFull && pChanFull === targetChanFull) {
        score += 12;
      }

      // 2. Same Zang-Fu Organ in Pattern Title (e.g., Heart Qi Xu vs Heart Yang Xu vs Heart Blood Xu)
      organs.forEach(org => { if (pTitleLower.includes(org)) score += 15; });

      // 3. Shared Pathogenic Mechanism (e.g., Qi Deficiency, Damp-Heat, Blood Stasis)
      pathogens.forEach(pa => { if (pTitleLower.includes(pa)) score += 6; });

      // 4. Symptom Vocabulary Overlap in Clinical Manifestations
      pParsed.symptoms.forEach(sym => {
        sym.toLowerCase().split(/\W+/).forEach(w => {
          if (w.length > 3 && targetSymWords.has(w)) score += 1.5;
        });
      });

      // 5. High-Yield Importance Boost (!, !!, !!!)
      const imp = String(p.Important || "").trim();
      if (imp === "!!!") score += 4;
      else if (imp === "!!") score += 2.5;
      else if (imp === "!") score += 1.5;

      return { point: p, score: score + (Math.random() * 2) };
    });

    if (qzDifficulty === "easy") {
      return shuffleArr(otherPatterns).slice(0, count);
    } else if (qzDifficulty === "medium") {
      scored.sort((a, b) => b.score - a.score);
      return shuffleArr(scored.slice(0, Math.max(count * 3, 14)).map(s => s.point)).slice(0, count);
    } else {
      scored.sort((a, b) => b.score - a.score);
      return shuffleArr(scored.slice(0, Math.max(count + 2, 7)).map(s => s.point)).slice(0, count);
    }
  }

  // --- 9. QUESTION GENERATORS FOR ALL 3 TRACKS ---
  window.generateNextQuizQuestion = function () {
    const nextBtn = document.getElementById("qzNextBtn");
    const bottomBar = document.getElementById("qzBottomBar");
    const inspectBar = document.getElementById("qzInspectBar");
    const optionsGrid = document.getElementById("qzOptionsGrid");
    const revealBtn = document.getElementById("qzRevealBtn");

    nextBtn.style.display = "none";
    bottomBar.style.display = "none";
    inspectBar.style.display = "none";
    inspectBar.innerHTML = "";
    optionsGrid.innerHTML = "";
    currentPickedWrongPointId = null;
    currentContrastPointId = null;
    const activeView = document.getElementById("qzActiveView");
    if (activeView) activeView.scrollTop = 0;

    if (activeQuizPool.length === 0) {
      document.getElementById("qzQuestionLabel").textContent = "Empty Pool";
      document.getElementById("qzQuestionBody").innerHTML = "No records match your current filter. Tap <b>🎯 Filter Pool</b> above.";
      return;
    }

    if (remainingQuizQueue.length === 0) {
      showQuizSummaryScreen();
      return;
    }

    currentTargetPoint = remainingQuizQueue.pop();
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
    if (!String(rawText).trim()) return generateNextQuizQuestion();

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

    // Standard Location MCQ (Alternates Location -> Point and Point -> Location with Mutated Distractors)
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

      // Add 2 mutated versions of the target location (e.g. 1.5 cun -> 2 cun, medial -> lateral)
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

  // --- TRACK 2 BUILDER: POINT ACTIONS & INDICATIONS (DIFFERENTIATION STYLE) ---
  function buildClinicalPointsQuestion(targetPoint) {
    const labelEl = document.getElementById("qzQuestionLabel");
    const bodyEl = document.getElementById("qzQuestionBody");
    const fieldMode = qzSubMode === "actions_mcq" ? "actions" : (qzSubMode === "indications_mcq" ? "indications" : "both");
    const parsed = parsePointClinicalLines(targetPoint, fieldMode);

    if (parsed.lines.length === 0) return generateNextQuizQuestion();
    const distractors = getSmartPointDistractors(targetPoint, 6);

    // Clinical FITB Mode for Actions & Indications
    if (qzSubMode === "fitb_clinical") {
      const allClinicalTerms = [
        ...clinicalBlankCategories.verbs,
        ...clinicalBlankCategories.pathogens,
        ...clinicalBlankCategories.substances,
        ...clinicalBlankCategories.organs
      ].sort((a, b) => b.length - a.length);
      const termRx = new RegExp("\\b(" + allClinicalTerms.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")\\b", "gi");

      const sampleLines = parsed.lines.slice(0, 4).join("\n• ");
      const cleanSample = "• " + sampleLines;
      const matches = [...cleanSample.matchAll(termRx)];

      if (matches.length > 0) {
        const pickCount = (qzDifficulty === "fitb2" || qzDifficulty === "fitb4") ? Math.min(3, matches.length) : 1;
        const chosen = shuffleArr(matches).slice(0, pickCount).sort((a, b) => a.index - b.index);
        const missingWords = chosen.map(m => m[0].toLowerCase());

        let displayHtml = escapeHTML(cleanSample).replace(/\n/g, "<br>");
        chosen.forEach(m => {
          const r = new RegExp("\\b" + m[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i");
          displayHtml = displayHtml.replace(r, "<span class='quiz-fitb-blank'>[ ______ ]</span>");
        });

        const buildFakeTerms = () => chosen.map(m => {
          const wLower = m[0].toLowerCase();
          const catList = Object.values(clinicalBlankCategories).find(arr => arr.includes(wLower)) || clinicalBlankCategories.pathogens;
          const pool = catList.filter(x => x !== wLower);
          return pool[Math.floor(Math.random() * pool.length)];
        }).join(", ");

        if (qzDifficulty === "fitb1" || qzDifficulty === "fitb2") {
          labelEl.textContent = `Clinical Blank • ${targetPoint["Short Name"]}`;
          currentCorrectAnswer = missingWords.join(", ");
          let set = new Set([currentCorrectAnswer]);
          let guard = 0;
          while (set.size < 6 && guard++ < 40) set.add(buildFakeTerms());
          bodyEl.innerHTML = displayHtml;
          renderQuizOptionButtons(shuffleArr([...set]).map(t => ({ text: t })));
          return;
        } else {
          labelEl.textContent = "Identify Point & Missing Clinical Term(s)";
          currentCorrectAnswer = `${targetPoint["Short Name"]} (${missingWords.join(", ")})`;
          let opts = [{ text: currentCorrectAnswer, pointId: targetPoint["Short Name"] }];
          distractors.slice(0, 5).forEach(d => {
            opts.push({ text: `${d["Short Name"]} (${buildFakeTerms()})`, pointId: d["Short Name"] });
          });
          bodyEl.innerHTML = maskSelfSpoilers(displayHtml, targetPoint);
          renderQuizOptionButtons(shuffleArr(opts));
          return;
        }
      }
    }

    // Standard Differentiation Modes for Actions & Indications
    const shuffledLines = shuffleArr(parsed.lines);
    let visibleCount = parsed.lines.length;
    if (qzDifficulty === "medium") visibleCount = Math.min(3, Math.max(2, Math.ceil(parsed.lines.length / 2)));
    else if (qzDifficulty === "hard") visibleCount = Math.min(2, parsed.lines.length);
    else if (qzDifficulty === "insane") visibleCount = 1;

    // Alternate between: (1) Clinical Profile -> Identify Point, and (2) Point -> Identify Correct Action/Indication
    const askForPoint = parsed.lines.length === 1 || Math.random() < 0.6;

    if (askForPoint) {
      const shownLines = shuffledLines.slice(0, visibleCount);
      const fieldTitle = fieldMode === "actions" ? "Actions" : (fieldMode === "indications" ? "Indications" : "Actions & Indications");
      labelEl.textContent = `Identify the Point from ${fieldTitle}`;

      let html = shownLines.map(l => `<div style="margin-bottom:6px;">➣ ${maskSelfSpoilers(bbcodeToHtml(l), targetPoint)}</div>`).join("");
      if (visibleCount < parsed.lines.length) {
        html += `<div style="font-size:12px; color:#8e8e93; font-style:italic; margin-top:6px;">(+ ${parsed.lines.length - visibleCount} other clinical lines hidden)</div>`;
      }
      bodyEl.innerHTML = html;

      currentCorrectAnswer = targetPoint["Short Name"];
      const opts = [
        { text: targetPoint["Short Name"], pointId: targetPoint["Short Name"] },
        ...distractors.slice(0, 5).map(d => ({ text: d["Short Name"], pointId: d["Short Name"] }))
      ];
      renderQuizOptionButtons(shuffleArr(opts));
    } else {
      const targetLine = shuffledLines[0];
      const contextLines = shuffledLines.slice(1, Math.min(3, shuffledLines.length));
      labelEl.textContent = `Clinical Differentiation • ${targetPoint["Short Name"]}`;

      let html = `<div style="font-size:18px; font-weight:800; color:#cc5500; margin-bottom:8px;">${escapeHTML(targetPoint["Short Name"])}</div>`;
      if (contextLines.length > 0 && qzDifficulty !== "insane") {
        html += `<div style="font-size:12px; color:#8e8e93; text-transform:uppercase; font-weight:700; margin-bottom:4px;">Known Clinical Features:</div>`;
        html += contextLines.map(l => `<div style="margin-bottom:4px;">➣ ${bbcodeToHtml(l)}</div>`).join("");
      }
      html += `<div style="margin-top:10px; color:#007aff; font-weight:700;">Which of the following is ALSO a correct Action/Indication for ${escapeHTML(targetPoint["Short Name"])}?</div>`;
      bodyEl.innerHTML = html;

      currentCorrectAnswer = stripBBCode(targetLine).trim();
      const targetAllNorm = parsed.lines.map(l => stripBBCode(l).trim().toLowerCase());
      let opts = [{ text: bbcodeToHtml(targetLine), rawCompare: currentCorrectAnswer, pointId: targetPoint["Short Name"] }];

      // On Hard/Insane, include a mutated version of the target action/indication
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
          l => !targetAllNorm.includes(stripBBCode(l).trim().toLowerCase()) && !opts.some(o => o.rawCompare.toLowerCase() === stripBBCode(l).trim().toLowerCase())
        );
        if (candidates.length > 0) {
          opts.push({ text: bbcodeToHtml(candidates[0]), rawCompare: stripBBCode(candidates[0]).trim(), pointId: d["Short Name"] });
        }
      }
      renderQuizOptionButtons(shuffleArr(opts));
    }
  }

  // --- TRACK 3 BUILDER: ZANG-FU & PATTERN DIFFERENTIATION (160+ ROWS) ---
  function buildPatternDifferentiationQuestion(targetPattern) {
    const labelEl = document.getElementById("qzQuestionLabel");
    const bodyEl = document.getElementById("qzQuestionBody");
    const parsed = parseManifestationRecord(targetPattern);
    const distractors = getSmartPatternDistractors(targetPattern, 6);

    if (parsed.symptoms.length === 0 && !parsed.tongue && !parsed.pulse) {
      return generateNextQuizQuestion();
    }

    // SUB-MODE A: PATTERN DIAGNOSTIC FILL-IN-THE-BLANK (fitb_pattern)
    if (qzSubMode === "fitb_pattern") {
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
        const chosen = shuffleArr(matches).slice(0, pickCount).sort((a, b) => a.index - b.index);
        const missingWords = chosen.map(m => m[0].toLowerCase());

        let displayHtml = escapeHTML(sourceBlock).replace(/\n/g, "<br>");
        chosen.forEach(m => {
          const r = new RegExp("\\b" + m[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i");
          displayHtml = displayHtml.replace(r, "<span class='quiz-fitb-blank'>[ ______ ]</span>");
        });

        const buildFakeDiag = () => chosen.map(m => {
          const wLower = m[0].toLowerCase();
          const catList = Object.values(clinicalBlankCategories).find(arr => arr.includes(wLower)) || clinicalBlankCategories.pulseQualities;
          const pool = catList.filter(x => x !== wLower);
          return pool[Math.floor(Math.random() * pool.length)];
        }).join(", ");

        if (qzDifficulty === "fitb1" || qzDifficulty === "fitb2") {
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
          bodyEl.innerHTML = maskSelfSpoilers(displayHtml, targetPattern);
          renderQuizOptionButtons(shuffleArr(opts));
          return;
        }
      }
    }

    // SUB-MODE B: TONGUE & PULSE DIFFERENTIATION
    if (qzSubMode === "tongue_pulse" && (parsed.tongue || parsed.pulse)) {
      const formatTP = (pObj) => {
        const pr = parseManifestationRecord(pObj);
        let parts = [];
        if (pr.tongue) parts.push(`Tongue: ${pr.tongue}`);
        if (pr.pulse) parts.push(`Pulse: ${pr.pulse}`);
        return parts.join(" • ");
      };

      const targetTP = formatTP(targetPattern);
      if (targetTP) {
        labelEl.textContent = "Tongue & Pulse Differentiation";
        const keyPreview = parsed.keySymptoms.slice(0, 3).join(", ");
        let html = `<div style="font-size:18px; font-weight:800; color:#cc5500; margin-bottom:6px;">${escapeHTML(targetPattern["Short Name"])}</div>`;
        if (keyPreview && qzDifficulty !== "insane") {
          html += `<div style="font-size:13.5px; color:#666; margin-bottom:8px;"><b>Cardinal Signs:</b> ${escapeHTML(keyPreview)}</div>`;
        }
        html += `<div style="color:#007aff; font-weight:700;">Select the classic Tongue & Pulse presentation for this pattern:</div>`;
        bodyEl.innerHTML = html;

        currentCorrectAnswer = targetTP;
        let opts = [{ text: escapeHTML(targetTP), rawCompare: targetTP, pointId: targetPattern["Short Name"] }];

        // Add mutated Tongue/Pulse option on Hard/Insane
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
      }
    }

    // SUB-MODE C: SIBLING DIFFERENTIAL & MISSING MANIFESTATION ("What differentiates Pattern A from Pattern B?")
    if (qzSubMode === "differential" && parsed.symptoms.length >= 2 && distractors.length > 0) {
      const sibling = distractors[0];
      const sibParsed = parseManifestationRecord(sibling);
      const sibSet = new Set(sibParsed.symptoms.map(s => s.toLowerCase()));

      // Find manifestations unique to targetPattern compared to its closest sibling pattern
      const uniqueToTarget = parsed.symptoms.filter(s => !sibSet.has(s.toLowerCase()));
      const sharedWithSibling = parsed.symptoms.filter(s => sibSet.has(s.toLowerCase()));

      if (uniqueToTarget.length > 0) {
        const chosenUnique = uniqueToTarget[Math.floor(Math.random() * uniqueToTarget.length)];
        labelEl.textContent = "Pattern Differential Diagnosis";

        let html = "";
        if (sharedWithSibling.length > 0) {
          currentContrastPointId = sibling["Short Name"];
          html += `<div style="margin-bottom:8px;">Both <b>${escapeHTML(targetPattern["Short Name"])}</b> and <b>${escapeHTML(sibling["Short Name"])}</b> can present with: <i>${escapeHTML(sharedWithSibling.slice(0, 2).join(", "))}</i>.</div>`;
        } else {
          const contextSyms = parsed.symptoms.filter(s => s !== chosenUnique).slice(0, 2);
          html += `<div style="margin-bottom:8px;">Pattern: <b style="color:#cc5500;">${escapeHTML(targetPattern["Short Name"])}</b> (${escapeHTML(contextSyms.join(", "))})</div>`;
        }
        html += `<div style="color:#007aff; font-weight:700;">Which of the following manifestations specifically belongs to <u>${escapeHTML(targetPattern["Short Name"])}</u>?</div>`;
        bodyEl.innerHTML = html;

        currentCorrectAnswer = chosenUnique;
        const targetAllLower = new Set(parsed.symptoms.map(s => s.toLowerCase()));
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

    // SUB-MODE D (DEFAULT): PROGRESSIVE CLINICAL VIGNETTE -> IDENTIFY THE PATTERN
    labelEl.textContent = "Identify the Pattern from Clinical Manifestations";
    let html = "";

    if (qzDifficulty === "easy") {
      if (parsed.keyRaw) {
        html += `<div style="margin-bottom:8px;"><strong style="color:#cc5500;">Key Symptoms:</strong> ${maskSelfSpoilers(escapeHTML(parsed.keyRaw), targetPattern)}</div>`;
      }
      if (parsed.symptoms.length > 0) {
        html += parsed.symptoms.slice(0, 6).map(s => `<div>➣ ${maskSelfSpoilers(escapeHTML(s), targetPattern)}</div>`).join("");
      }
      if (parsed.tongue || parsed.pulse) {
        html += `<div class="quiz-diag-box">`;
        if (parsed.tongue) html += `<div><strong>Tongue:</strong> ${escapeHTML(parsed.tongue)}</div>`;
        if (parsed.pulse) html += `<div><strong>Pulse:</strong> ${escapeHTML(parsed.pulse)}</div>`;
        html += `</div>`;
      }
    } else if (qzDifficulty === "medium") {
      // Medium hides the "Key Symptoms:" header summary and shows 4 manifestations + Tongue & Pulse
      const pool = parsed.symptoms.length > 0 ? shuffleArr(parsed.symptoms).slice(0, 4) : parsed.keySymptoms;
      html += pool.map(s => `<div style="margin-bottom:4px;">➣ ${maskSelfSpoilers(escapeHTML(s), targetPattern)}</div>`).join("");
      if (parsed.tongue || parsed.pulse) {
        html += `<div class="quiz-diag-box">`;
        if (parsed.tongue) html += `<div><strong>Tongue:</strong> ${escapeHTML(parsed.tongue)}</div>`;
        if (parsed.pulse) html += `<div><strong>Pulse:</strong> ${escapeHTML(parsed.pulse)}</div>`;
        html += `</div>`;
      }
    } else if (qzDifficulty === "hard") {
      // Hard shows 3 manifestations + ONLY Tongue OR Pulse (not both)
      const pool = parsed.symptoms.length > 0 ? shuffleArr(parsed.symptoms).slice(0, 3) : parsed.keySymptoms.slice(0, 2);
      html += pool.map(s => `<div style="margin-bottom:4px;">➣ ${maskSelfSpoilers(escapeHTML(s), targetPattern)}</div>`).join("");
      const showTongue = Math.random() < 0.5;
      if (showTongue && parsed.tongue) {
        html += `<div class="quiz-diag-box"><strong>Tongue:</strong> ${escapeHTML(parsed.tongue)}</div>`;
      } else if (parsed.pulse) {
        html += `<div class="quiz-diag-box"><strong>Pulse:</strong> ${escapeHTML(parsed.pulse)}</div>`;
      }
    } else {
      // Insane shows 2-3 non-obvious manifestations with Tongue/Pulse hidden
      const nonCardinal = parsed.symptoms.length > 3 ? parsed.symptoms.slice(1) : parsed.symptoms;
      const pool = shuffleArr(nonCardinal).slice(0, Math.min(3, nonCardinal.length));
      html += pool.map(s => `<div style="margin-bottom:4px;">➣ ${maskSelfSpoilers(escapeHTML(s), targetPattern)}</div>`).join("");
      html += `<div style="font-size:12px; color:#8e8e93; font-style:italic; margin-top:8px;">(Tongue & Pulse withheld -- Insane Mode)</div>`;
    }

    bodyEl.innerHTML = html;
    currentCorrectAnswer = targetPattern["Short Name"];

    const opts = [
      { text: targetPattern["Short Name"], pointId: targetPattern["Short Name"] },
      ...distractors.slice(0, 5).map(d => ({ text: d["Short Name"], pointId: d["Short Name"] }))
    ];
    renderQuizOptionButtons(shuffleArr(opts));
  }

  // --- 10. RENDER OPTION BUTTONS & GRADE ANSWERS ---
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

    qzTotalAnswered++;
    const pickedVal = (selectedBtn.dataset.compare || "").trim().toLowerCase();
    const targetVal = String(currentCorrectAnswer || "").trim().toLowerCase();

    if (pickedVal === targetVal) {
      selectedBtn.classList.add("correct");
      qzScore++;
    } else {
      selectedBtn.classList.add("incorrect");
      currentPickedWrongPointId = selectedBtn.dataset.pointId || null;

      allBtns.forEach(b => {
        if ((b.dataset.compare || "").trim().toLowerCase() === targetVal) {
          b.classList.add("correct");
        }
      });

      if (!sessionMisses.some(m => m.point["Short Name"] === currentTargetPoint["Short Name"])) {
        sessionMisses.push({
          point: currentTargetPoint,
          questionHtml: document.getElementById("qzQuestionBody").innerHTML,
          selected: selectedBtn.innerText.replace(/^\d+\s*/, ""),
          correct: currentCorrectAnswer
        });
      }
    }

    updateQuizScoreUI();
    renderPostAnswerInspectionBar();

    const nextBtn = document.getElementById("qzNextBtn");
    const bottomBar = document.getElementById("qzBottomBar");
    nextBtn.innerHTML = remainingQuizQueue.length === 0
      ? `Finish & See Results ➔ <span style="font-size:12px; opacity:0.85;">(Enter)</span>`
      : `Next Question ➔ <span style="font-size:12px; opacity:0.85;">(Enter / Space)</span>`;
    nextBtn.style.display = "block";
    bottomBar.style.display = "block";
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

    // 1. If the question contrasted two patterns (e.g., Spleen Qi Xu vs Spleen Yang Xu), show the sibling Peek button
    if (hasContrast) {
      const safeContrast = currentContrastPointId.replace(/'/g, "\\'");
      html += `<button class="quiz-pill-btn" onclick="openQuickPeekById('${safeContrast}')">⚡ Peek ${escapeHTML(currentContrastPointId)}</button>`;
    }

    // 2. If you clicked an option belonging to another pattern (e.g., Spleen Qi Sinking), show its Peek button too
    if (hasWrongPick) {
      const safeWrong = currentPickedWrongPointId.replace(/'/g, "\\'");
      const pickLabel = hasContrast ? `${currentPickedWrongPointId} (Your Pick)` : currentPickedWrongPointId;
      html += `<button class="quiz-pill-btn" onclick="openQuickPeekById('${safeWrong}')">⚡ Peek ${escapeHTML(pickLabel)}</button>`;
    }

    // 3. Build the Compare button(s)
    if (hasContrast && hasWrongPick) {
      // Both a prompt pair AND a 3rd wrong pick exist: offer Compare Pair (2) and Compare All 3
      const safeContrast = currentContrastPointId.replace(/'/g, "\\'");
      const safeWrong = currentPickedWrongPointId.replace(/'/g, "\\'");
      html += `<button class="quiz-pill-btn" style="background:#cc5500; color:#fff;" onclick="compareQuizItems(['${safeTarget}', '${safeContrast}'])">⚖️ Compare Pair (2)</button>`;
      html += `<button class="quiz-pill-btn" style="background:#007aff; color:#fff;" onclick="compareQuizItems(['${safeTarget}', '${safeContrast}', '${safeWrong}'])">⚖️ Compare All 3</button>`;
    } else if (hasContrast) {
      // Prompt contrasted 2 patterns (whether you got it right or picked the contrast pattern's symptom)
      const safeContrast = currentContrastPointId.replace(/'/g, "\\'");
      html += `<button class="quiz-pill-btn" style="background:#cc5500; color:#fff;" onclick="compareQuizItems(['${safeTarget}', '${safeContrast}'])">⚖️ Compare Both</button>`;
    } else if (hasWrongPick) {
      // Standard question where you picked a wrong pattern/point
      const safeWrong = currentPickedWrongPointId.replace(/'/g, "\\'");
      html += `<button class="quiz-pill-btn" style="background:#cc5500; color:#fff;" onclick="compareQuizItems(['${safeTarget}', '${safeWrong}'])">⚖️ Compare Both</button>`;
    }

    bar.innerHTML = html;
    bar.style.display = "flex";
  }

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
    document.getElementById("quizTopScore").textContent = `${qzTotalAnswered}/${activeQuizPool.length} • ${pct}%`;
  }

  // --- 11. POOL MANAGEMENT, RETAKE MISSED & SUMMARY ---
  function getSeenKey() { return `tcmSeen_${currentTrack}`; }
  function getStateKey() { return `tcmQuizState_${currentTrack}`; }

  window.retakeQuizWholePool = function () {
    const limitVal = document.getElementById("qzLimitSelect").value;
    if (limitVal === "all") {
      activeQuizPool = [...trackFilteredPoints];
      localStorage.removeItem(getSeenKey());
    } else {
      const limit = parseInt(limitVal, 10);
      let seenIds = JSON.parse(localStorage.getItem(getSeenKey()) || "[]");
      let unseen = trackFilteredPoints.filter(p => !seenIds.includes(p["Short Name"]));

      if (unseen.length === 0) {
        if (typeof showToast === "function") showToast("🎉 Completed all cards in pool! Cycling fresh.");
        seenIds = [];
        unseen = [...trackFilteredPoints];
      }
      activeQuizPool = shuffleArr(unseen).slice(0, Math.min(limit, unseen.length));
      localStorage.setItem(getSeenKey(), JSON.stringify([...seenIds, ...activeQuizPool.map(p => p["Short Name"])]));
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

  // --- 12. FILTER & DISTRACTOR TREES (Exact Source Channel Order Preserved) ---
  function initQuizFilterTree() {
    const container = document.getElementById("qzChannelTree");
    container.innerHTML = "";

    let channelsMap = {};
    let channelOrder = [];

    // Preserve exact Google Sheet order of channels and points
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
        cb.onchange = () => syncSingleQuizGroup(groupDiv);

        const span = document.createElement("span");
        span.textContent = p["Short Name"];
        lbl.appendChild(cb);
        lbl.appendChild(span);
        ptsList.appendChild(lbl);
      });

      groupDiv.appendChild(ptsList);
      container.appendChild(groupDiv);
    });
  }

  window.toggleAllQuizFilter = function (cb) {
    document.querySelectorAll("#qzChannelTree .qz-chan-cb, #qzChannelTree .qz-pt-cb").forEach(b => {
      b.checked = cb.checked;
      b.indeterminate = false;
    });
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
    const allChecked = allChan.every(b => b.checked);
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
    applyQuizPoolFilter();
  };

  window.openQuizFilterModal = function () {
    document.getElementById("quizFilterModal").style.display = "flex";
  };

  window.closeQuizFilterModal = function () {
    document.getElementById("quizFilterModal").style.display = "none";
  };

  window.applyQuizPoolFilter = function () {
    const globalAll = document.getElementById("qzSelectAllGlobal");
    const impVal = document.getElementById("qzImpFilter").value;

    let base = [];
    if (globalAll && globalAll.checked) {
      base = [...trackEligiblePoints];
    } else {
      const checkedSet = new Set(
        Array.from(document.querySelectorAll("#qzChannelTree .qz-pt-cb"))
          .filter(cb => cb.checked)
          .map(cb => cb.value)
      );
      base = trackEligiblePoints.filter(p => checkedSet.has(p["Short Name"]));
    }

    if (impVal === "any") {
      trackFilteredPoints = base.filter(p => ["!", "!!", "!!!"].includes(String(p.Important || "").trim()));
    } else if (impVal !== "all") {
      trackFilteredPoints = base.filter(p => String(p.Important || "").trim() === impVal);
    } else {
      trackFilteredPoints = base;
    }

    // Dismiss both the Filter Modal and Settings Panel cleanly
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

  // --- 13. SESSION SAVE & RESUME ---
  function saveQuizSessionState() {
    if (remainingQuizQueue.length === 0 && !currentTargetPoint) return;
    const state = {
      subMode: qzSubMode,
      difficulty: qzDifficulty,
      activeIds: activeQuizPool.map(p => p["Short Name"]),
      remainingIds: remainingQuizQueue.map(p => p["Short Name"]),
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

      const byId = id => trackEligiblePoints.find(p => p["Short Name"] === id);
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

  // --- 14. KEYBOARD SHORTCUTS FOR IPAD / DESKTOP ---
  // • Cmd/Ctrl + K  OR  "[" (left bracket, next to "]" for Quick Peek) toggles the Study & Tools Hub
  // • Keys 1–5 inside the Hub launch each tool directly
  // • Keys 1–6, Space, and Enter control the active Quiz (while yielding to Compare & Quick Peek)
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

    // 1. GLOBAL SHORTCUT TO OPEN/CLOSE STUDY & TOOLS HUB: Cmd/Ctrl + K  OR  "["
    if (((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key.toLowerCase() === "k") || (!isTyping && e.key === "[")) {
      e.preventDefault();
      if (isHubOpen) {
        closeToolsHubModal();
      } else {
        openToolsHubModal();
      }
      return;
    }

    // 2. WHEN HUB IS OPEN: Keys 1-5 launch tools directly
    if (isHubOpen) {
      if (!isTyping) {
        if (e.key === "1") { e.preventDefault(); closeToolsHubModal(); openQuizModal("location"); return; }
        if (e.key === "2") { e.preventDefault(); closeToolsHubModal(); openQuizModal("clinical_points"); return; }
        if (e.key === "3") { e.preventDefault(); closeToolsHubModal(); openQuizModal("patterns"); return; }
        if (e.key === "4") { e.preventDefault(); closeToolsHubModal(); openStudySettingsModal(); return; }
        if (e.key === "5") { e.preventDefault(); closeToolsHubModal(); openIntakeModal(); return; }
      }
      return;
    }

    // 3. QUIZ MODAL CONTROLS
    const qzModal = document.getElementById("quizModal");
    if (!qzModal || qzModal.style.display !== "flex") return;

    // Yield if Quick Peek, Compare Modal, Lightbox, Edit Modal, or Filter Modals are open on top
    if (typeof isQuickPeekOpen === "function" && isQuickPeekOpen()) return;
    if (document.getElementById("compareModal")?.style.display === "flex") return;
    if (document.getElementById("lightbox")?.style.display === "flex") return;
    if (document.getElementById("editModal")?.style.display === "flex") return;
    if (document.getElementById("quizFilterModal")?.style.display === "flex") return;
    if (document.getElementById("quizDistractorModal")?.style.display === "flex") return;
    if (document.getElementById("quizResumeModal")?.style.display === "flex") return;

    if (isTyping) return;

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

    // Number keys 1-6 select multiple choice options
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