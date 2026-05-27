var words = [
    { word: "個人主義的な", trait_type: "独立性" },
    { word: "自立した", trait_type: "独立性" },
    { word: "野心的な", trait_type: "独立性" },
    { word: "冒険好きな", trait_type: "独立性" },
    { word: "自信のある", trait_type: "独立性" },
    { word: "支配的な", trait_type: "独立性" },
    { word: "議論好きな", trait_type: "独立性" },
    { word: "よそよそしい", trait_type: "独立性" },
    { word: "思い上がった", trait_type: "独立性" },
    { word: "自己中心的な", trait_type: "独立性" },
    { word: "型にはまらない", trait_type: "独立性" },
    { word: "率直な", trait_type: "独立性" },
    { word: "攻撃的な", trait_type: "独立性" },
    { word: "自己主張の強い", trait_type: "独立性" },
    { word: "遠慮のない", trait_type: "独立性" },
    { word: "頼りになる", trait_type: "協調性" },
    { word: "協力的な", trait_type: "協調性" },
    { word: "気配りのできる", trait_type: "協調性" },
    { word: "寛容な", trait_type: "協調性" },
    { word: "利他的な", trait_type: "協調性" },
    { word: "影響を受けやすい", trait_type: "協調性" },
    { word: "同調的な", trait_type: "協調性" },
    { word: "依存的な", trait_type: "協調性" },
    { word: "気弱な", trait_type: "協調性" },
    { word: "従順な", trait_type: "協調性" },
    { word: "型にはまった", trait_type: "協調性" },
    { word: "おだやかな", trait_type: "協調性" },
    { word: "親切な", trait_type: "協調性" },
    { word: "自己否定的な", trait_type: "協調性" },
    { word: "慎重な", trait_type: "協調性" }
  ];

  var order_patterns = {
    1: [21, 5, 14, 0, 18, 27, 8, 29, 3, 22, 10, 15, 25, 7, 19, 13, 2, 28, 9, 17, 11, 26, 1, 24, 12, 16, 6, 23, 4, 20],
    2: [8, 19, 3, 26, 12, 21, 14, 28, 0, 15, 23, 7, 18, 9, 29, 4, 25, 13, 22, 10, 27, 2, 16, 5, 24, 11, 17, 6, 20, 1],
    3: [13, 27, 6, 18, 22, 9, 1, 25, 12, 20, 29, 15, 8, 28, 3, 17, 10, 24, 0, 21, 5, 26, 14, 23, 11, 16, 4, 19, 7, 2],
    4: [4, 16, 23, 11, 28, 7, 24, 1, 19, 10, 27, 13, 25, 5, 18, 8, 22, 2, 29, 9, 15, 12, 26, 0, 21, 6, 17, 14, 20, 3]
  };

  var order_group = jsPsych.data.getURLVariable('order_group');
  order_group = order_group || window.order_group_from_qualtrics;
  order_group = parseInt(order_group);
  order_group = (order_group >= 1 && order_group <= 4) ? order_group : Math.floor(Math.random() * 4) + 1;

  var button_layout = jsPsych.data.getURLVariable('button_layout');
  button_layout = button_layout || window.button_layout_from_qualtrics;
  button_layout = (button_layout === 'A' || button_layout === 'B') ? button_layout : (Math.random() < 0.5 ? 'A' : 'B');

  jsPsych.data.addProperties({
    order_group: order_group,
    button_layout: button_layout
  });

  var left_label = button_layout === 'A' ? "私である" : "私でない";
  var right_label = button_layout === 'A' ? "私でない" : "私である";

  var active_prompt_html = 
    '<div class="key-prompt-container" id="prompt-container">' +
      '<div class="key-prompt-choice" id="prompt-f"><div class="key-prompt-item"><span class="choice-label">' + left_label + '</span></div><span class="key-highlight">[F]</span></div>' +
      '<div class="key-prompt-choice" id="prompt-j"><div class="key-prompt-item"><span class="choice-label">' + right_label + '</span></div><span class="key-highlight">[J]</span></div>' +
    '</div>';

  var fixation_prompt_html = 
    '<div class="key-prompt-container" style="opacity: 0.15; pointer-events: none;">' +
      '<div class="key-prompt-choice"><div class="key-prompt-item"><span class="choice-label">' + left_label + '</span></div><span class="key-highlight">[F]</span></div>' +
      '<div class="key-prompt-choice"><div class="key-prompt-item"><span class="choice-label">' + right_label + '</span></div><span class="key-highlight">[J]</span></div>' +
    '</div>';

  var timeline = [];

  var fullscreen_enter = {
    type: 'fullscreen',
    fullscreen_mode: true,
    message: '<p style="font-size: 18px;">実験は全画面で行います。</p>',
    button_label: '全画面で開始する'
  };
  timeline.push(fullscreen_enter);

  var start_instruction = {
    type: 'html-keyboard-response',
    stimulus: function() {
      return '<div class="instruction-text">' +
               '<p style="text-align: center; font-weight: bold; font-size: 20px; margin-bottom: 20px;">実験開始の確認</p>' +
               '<p>これからスライドに単語が1つずつ表示されます。</p>' +
               '<p>表示された単語が自分自身に当てはまるかどうかに応じて、キーボードの <b>[F] キー</b> または <b>[J] キー</b> を押して回答してください。</p>' +
               '<p>キーの割り当ては以下の通りです：</p>' +
               '<div class="key-prompt-container" style="margin-bottom: 20px;">' +
                 '<div class="key-prompt-choice"><div class="key-prompt-item"><span class="choice-label">' + left_label + '</span></div><span class="key-highlight">[F]</span></div>' +
                 '<div class="key-prompt-choice"><div class="key-prompt-item"><span class="choice-label">' + right_label + '</span></div><span class="key-highlight">[J]</span></div>' +
               '</div>' +
               '<p>※ 回答できる時間は各単語につき <b>2秒間</b> です。単語を確認してから、自分に当てはまるかどうかを回答してください。</p>' +
               '<p style="text-align: center; font-weight: bold; color: #d9534f; margin-top: 30px; font-size: 19px;">' +
               'スペースキーを押すと、実験が開始します。' +
               '</p>' +
             '</div>';
    },
    choices: [' '],
    data: { trial_purpose: 'instruction' }
  };
  timeline.push(start_instruction);

  var selected_indices = order_patterns[order_group];
  var main_words = [];
  for (var i = 0; i < selected_indices.length; i++) {
    main_words.push(words[selected_indices[i]]);
  }

  var practice_words = main_words.slice(-4);
  var all_trials = [];

  practice_words.forEach(function(item, index) {
    all_trials.push({
      word: item.word,
      trait_type: item.trait_type,
      purpose: 'practice',
      index: index + 1
    });
  });

  main_words.forEach(function(item, index) {
    all_trials.push({
      word: item.word,
      trait_type: item.trait_type,
      purpose: 'stimulus',
      index: index + 1
    });
  });

  all_trials.forEach(function(item) {
    var trial = {
      type: 'html-keyboard-response',
      stimulus: '<div class="stimulus-slide">' + item.word + '</div>',
      choices: jsPsych.NO_KEYS,
      trial_duration: null,
      prompt: active_prompt_html,
      data: {
        trial_purpose: item.purpose,
        trial_index: item.index,
        word: item.word,
        trait_type: item.trait_type
      },
      on_load: function() {
        window.focus();
        var start_time = performance.now();
        var trial_completed = false;
        var timeout_id = null;
        
        var handle_keydown = function(e) {
          if (trial_completed) return;
          var key = e.key.toLowerCase();
          
            if (key === 'f' || key === 'j') {
            trial_completed = true;
            if (timeout_id) clearTimeout(timeout_id);
            var rt = performance.now() - start_time;
            var feedback_delay = Math.max(0, 2000 - rt) + 450;
            
            var active_element = document.getElementById(key === 'f' ? 'prompt-f' : 'prompt-j');
            if (active_element) {
              var active_box = active_element.querySelector('.key-prompt-item');
              if (active_box) {
                active_box.style.backgroundColor = '#0056b3';
                active_box.style.color = '#ffffff';
                active_box.style.borderColor = '#0056b3';
              }
              var highlight = active_element.querySelector('.key-highlight');
              if (highlight) highlight.style.color = '#ffffff';
            }
            
            setTimeout(function() {
              document.removeEventListener('keydown', handle_keydown);
              jsPsych.finishTrial({
                rt: rt,
                response: key
              });
            }, feedback_delay);
          }
        };
        
        document.addEventListener('keydown', handle_keydown);
        
        timeout_id = setTimeout(function() {
          if (!trial_completed) {
            trial_completed = true;
            document.removeEventListener('keydown', handle_keydown);
            var prompt_container = document.getElementById('prompt-container');
            if (prompt_container) {
              prompt_container.style.opacity = '0.35';
            }
            setTimeout(function() {
              jsPsych.finishTrial({
                rt: null,
                response: null
              });
            }, 450);
          }
        }, 2000);
      },
      on_finish: function(data) {
        if (data.response === null) {
          data.response_label = 'timeout';
        } else {
          data.response_label = (data.response === 'f') ? left_label : right_label;
        }
      }
    };
    timeline.push(trial);

    var fixation = {
      type: 'html-keyboard-response',
      stimulus: '<div class="stimulus-slide">+</div>',
      choices: jsPsych.NO_KEYS,
      trial_duration: 700,
      prompt: fixation_prompt_html,
      data: { trial_purpose: item.purpose + '_fixation', trial_index: item.index }
    };
    timeline.push(fixation);
  });

  var fullscreen_exit = {
    type: 'fullscreen',
    fullscreen_mode: false
  };
  timeline.push(fullscreen_exit);
