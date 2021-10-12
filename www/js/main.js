  const questionNumber = document.getElementById('questionNumber')
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p')
  const coment = document.getElementById('coment');

  const quizSet =[
    {q: 'あべちゃんが住んでいるのは次のうちどれ？', c:['栃木県足利市', '群馬県太田市', '埼玉県草加市', 'ニューヨーク']},
    {q: 'あべちゃんが一番好きな食べ物は次のうちどれ？', c:['からあげ', 'ラーメン', 'ハンバーガー', 'ゴーヤチャンプル']},
    {q: 'あべちゃんが飼っているのは次のうちどれ？', c:['ねこ', 'いぬ', 'キリン', 'ウサギ']},
    {q: 'あべちゃんが得意なことは次のうちどれ？', c:['腕相撲', '書道', '一輪車', '超能力']},
    {q: 'あべちゃんの働いているコンビニは次のうちどれ？', c:['セブンイレブン', 'ローソン', 'ファミリーマート', 'セイコーマート']},
    {q: 'あべちゃんが好きなコーラは次のうちどれ？', c:['コカコーラ', 'ペプシコーラ', 'メッツコーラ', 'コークハイ']},
    {q: 'あべちゃんが飼っている猫の名前は次のうちどれ？', c:['なな', 'もも', 'たま', 'りん']},
    {q: 'あべちゃんの本職の楽器は次のうちどれ？', c:['ギター', 'キーボード', 'ベース', 'ドラム']},
    {q: 'あべちゃんの最寄駅は次のうちどれ？', c:['野州山辺駅', '足利市駅', '韮川駅', '東武和泉駅']},
    {q: 'あべちゃんの苗字の漢字は次のうちどれ？', c:['阿部', '安倍', '阿倍', '岡部']},
  ];
  let currentNum = 0;
  let isAnswered;
  let score = 0;
  function shuffle(arr) {
    
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
      document.querySelector('.Answer').classList.add('correct');
    }

    btn.classList.remove('disabled');

  }

  function setQuiz(){
    isAnswered = false;
    let currentNum1 = currentNum + 1;
    questionNumber.textContent = `第${currentNum1}問`
    question.textContent = quizSet[currentNum].q;

    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }
    
    const shuffleChoices = shuffle([...quizSet[currentNum].c]);
    
    shuffleChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      if (li.textContent === quizSet[currentNum].c[0]) {
        li.classList.add('Answer');
      }

      choices.appendChild(li);
  
    });
    

    if (currentNum === quizSet.length - 1){
      btn.textContent = '結果を見る'
    }
  }
  
  setQuiz();
  
  btn.addEventListener('click' , () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    let scoreComent
    btn.classList.add('disabled');
    switch (score) {
      case 0:
      case 1:
        scoreComent = "あべちゃんに会ったことないよね？"
      break;
      case 2:
      case 3:
      case 4:
        scoreComent = "あべちゃんを知りましょう"
      break;
      case 5:
      case 6:
        scoreComent = "そこそこあべちゃんを知っています"
      break;
      case 7:
      case 8:
        scoreComent = "目指せあべちゃんマスター！"
      break;
      case 9:
        scoreComent = "あともう一歩がんばれ！"
      break;
      case 10:
        scoreComent = "あべちゃんマスターです！"
      break;

    }
    if(currentNum === quizSet.length - 1){
      scoreLabel.textContent = `${score}問正解！`;
      coment.textContent =`${scoreComent}`
      result.classList.remove('hidden')
    } else {
      currentNum++;
      setQuiz();
    }

    
  });