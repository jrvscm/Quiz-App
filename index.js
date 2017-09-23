let score = [];
let count = [];
let questions = [];

function shuffleQuestions() {
  questionsList.sort(function(a, b) {
    return Math.floor(Math.random()*3 - 1);
    });
  questions = questionsList.slice(0,10);
}

  
  function handleStartClicks() {
    $('.starting-statement-container').off().on('click', '.start-button', event => {
      console.log('handleStartClicks ran');
      $('.start-section').fadeOut('fast');
      $('header').fadeOut('fast');
      setTimeout(function() {
      $('.question-answer-section').fadeIn('fast');
    }, 350);
      disableNext();
      disableSubmit();
      inputClicked();
    });  
  }
  
  function renderQuestion(currentCount) {
    if(currentCount === 10) {
      restartQuiz(currentCount);
    } else {
    let quizQuestion = `<p><em>${questions[currentCount].question}</em></p>`;
    console.log('renderQuestion ran');
    selectedAnswers();
    renderAnswers(quizQuestion, currentCount);
  }
  }

  
  function renderAnswers(quizQuestion, currentCount) {
    let quizAnswers = [
         `<div class="answer-div jsAnswerDiv jsAnswerDiv1">
            <input class="jsChoices" type="radio" id="choice1" name="answer" value="incorrect" required>
            <label for="choice1">${questions[currentCount].wrongAnswer1}</label>
          </div>`,

          `<div class="answer-div jsAnswerDiv jsAnswerDiv2">
            <input class="jsChoices" type="radio" id="choice2" name="answer" value="incorrect" required>
            <label for="choice2">${questions[currentCount].wrongAnswer2}</label>
          </div>`,

          `<div class="answer-div jsAnswerDiv jsAnswerDiv3"> 
            <input class="jsChoices "type="radio" id="choice3" name="answer" value="incorrect" required>
            <label for="choice3">${questions[currentCount].wrongAnswer3}</label>
          </div>`,

          `<div class="answer-div jsAnswerDiv jsCorrectChoice jsAnswerDiv4">
            <input class="jsChoices" type="radio" id="choice4" name="answer" value="correct" required>
            <label for="choice4">${questions[currentCount].correctAnswer}</label>
          </div>`];

    console.log('renderAnswers ran');
    shuffleAnswers(quizAnswers, currentCount);
    insertNewQuestion(quizQuestion, currentCount);
  }

  function shuffleAnswers(quizAnswers, currentCount) {
    quizAnswers = quizAnswers.sort(function(a, b) {
      return Math.floor(Math.random()*3);
    });
      quizAnswers = quizAnswers.join('');
    insertNewAnswer(quizAnswers, currentCount);
    console.log('shuffleAnswers ran');
  }

  function insertNewQuestion(quizQuestion, currentCount) {
    $('.quiz-question p').fadeOut('fast');
    setTimeout(function() {
    $('.quiz-question p').empty().append(quizQuestion).fadeIn('fast');
  }, 180);
    console.log('insertNewQuestion ran');
  }

  function insertNewAnswer(quizAnswers, currentCount) {
    $('#jsRadioWrapper').fadeOut('fast');
    setTimeout(function() {
    $('#jsRadioWrapper').empty().append(quizAnswers).fadeIn('fast'); 
    console.log('insertNewAnswer ran');
    updateCount(currentCount);
  }, 180);
  }

  function handleNextButtonClick(currentCount) {
    $('#jsFormFooter').off().on('click', '.jsNextQuestionButton', event => {
      event.preventDefault();
      $('.jsCorrectChoice').removeClass('correct-answer');
      $('.jsCorrectChoice i').remove();
      $('.jsAnswerDiv i').remove();
      $('.jsAnswerDiv').removeClass('clicked-input');
      console.log('handleNextButtonClick() ran');
      displayEndQuiz(currentCount);
      renderQuestion(currentCount);
      resetSuccess();
      resetFailure();
      enableInputs();
      disableNext();
      });
    }

  function handleSubmitAnswerClick(currentCount) {
    $('#radio-selection').off().on('click', '.jsSubmitAnswerButton', event => {
      event.preventDefault();
      console.log('handleSubmitAnswerClick ran');
      let answerChoice = $('input[name=answer]:checked').val(); 
      handleAnswerChoice(answerChoice);
      getCurrentScore(score);
      disableInputs();
      disableSubmit();
      changeNextText(currentCount);
      enableNext();
    });
  };

  function handleAnswerChoice(answerChoice) {
    if(answerChoice === "correct") {
        score.push(1);
        let correct = 'true';
        handleCorrectAnswer(correct);
      } 
        else{
          let incorrect = 'true';
          handleIncorrectAnswer(incorrect);
        }
  }

  function enableInputs() {
    $('input').prop('disabled', false);
    $('input').prop('checked', false);
  }

  function disableInputs() {
    $('input').prop('disabled', true);
  }

  function inputClicked() {
    $('fieldset').on('click', '.jsChoices', event => {
      enableSubmit();
    });
  } 

  function selectedAnswers() {


  function selectedAnswerSub1() {
    $('.choices').on('click', '.jsAnswerDiv1', event => {
      $('.jsAnswerDiv1').addClass('clicked-input');
      $('.jsAnswerDiv2').removeClass('clicked-input');
      $('.jsAnswerDiv3').removeClass('clicked-input');
      $('.jsAnswerDiv4').removeClass('clicked-input');
    });
  }

  function selectedAnswerSub2() {
    $('.choices').on('click', '.jsAnswerDiv2', event => {
      $('.jsAnswerDiv2').addClass('clicked-input');
      $('.jsAnswerDiv1').removeClass('clicked-input');
      $('.jsAnswerDiv3').removeClass('clicked-input');
      $('.jsAnswerDiv4').removeClass('clicked-input');
    });
  }

  function selectedAnswerSub3() {
    $('.choices').on('click', '.jsAnswerDiv3', event => {
      $('.jsAnswerDiv3').addClass('clicked-input');
      $('.jsAnswerDiv2').removeClass('clicked-input');
      $('.jsAnswerDiv1').removeClass('clicked-input');
      $('.jsAnswerDiv4').removeClass('clicked-input');
    });
  }

  function selectedAnswerSub4() {
    $('.choices').on('click', '.jsAnswerDiv4', event => {
      $('.jsAnswerDiv4').addClass('clicked-input');
      $('.jsAnswerDiv3').removeClass('clicked-input');
      $('.jsAnswerDiv2').removeClass('clicked-input');
      $('.jsAnswerDiv1').removeClass('clicked-input');
    });
  }

    selectedAnswerSub1();
    selectedAnswerSub2();
    selectedAnswerSub3();
    selectedAnswerSub4();
}

  function enableSubmit() {
    $('.jsSubmitAnswerButton').removeClass('disabled').addClass('button').removeClass('disabled:hover').addClass('button:hover').prop('disabled', false);
  }

  function disableSubmit() {
    $('.jsSubmitAnswerButton').addClass('disabled').addClass('disabled:hover').prop('disabled', true); 
  }

  function enableNext() {
    $('.jsNextQuestionButton').removeClass('disabled').addClass('button').removeClass('disabled:hover').addClass('button:hover').prop('disabled', false);
  }

  function disableNext() {
    $('.jsNextQuestionButton').addClass('disabled').addClass('disabled:hover').prop('disabled', true);
  }

  function handleCorrectAnswer() {
    const checkMark1 =`<i class="fa fa-check" aria-hidden="true"></i>`;
    $('.jsCorrectChoice').addClass('correct-answer');
    $('.jsCorrectChoice').append(checkMark1);
    console.log('handleCorrectAnswer ran');
  }

  function handleIncorrectAnswer() {
    const ban = `<i class="fa fa-ban" aria-hidden="true"></i>`;
    const checkMark2 =`<i class="fa fa-check" aria-hidden="true"></i>`;
    $('.jsCorrectChoice').addClass('correct-answer');
    $('.jsCorrectChoice').append(checkMark2);
    console.log('handleIncorrectAnswer ran');
    if($('.jsAnswerDiv1').hasClass('clicked-input')) {
      $('.jsAnswerDiv1').append(ban);
    }

    if($('.jsAnswerDiv2').hasClass('clicked-input')) {
      $('.jsAnswerDiv2').append(ban);
    }

    if($('.jsAnswerDiv3').hasClass('clicked-input')) {
      $('.jsAnswerDiv3').append(ban);
    }

    if($('.jsAnswerDiv4').hasClass('clicked-input')) {
      $('.jsAnswerDiv4').append(ban);
    }
  }

  function resetSuccess() {
    $('.jsCorrectMessage').css({"display":"none"});
    }

  function resetFailure() {
    $('.jsFailureMessage').css({"display":"none"});
  }

  function getCurrentScore() {
    console.log('getCurrentScore ran');
    let currentScore = score.reduce(function(sum, value) {
    return sum + value;
  }, 0); 
  $('#jsCurrentScore').empty().append(currentScore +` / 10`);
  getFinalScore(currentScore);
  }

  function initializeScore() {
  $('#jsCurrentScore').empty().append(`0 / 10`);
  console.log('score initialized');
  }

  function initializeCount() {
    $('#jsCurrentQuestion').empty().append(`1 / 10`);
    console.log('count initialized');
    let currentCount = 0;
    renderQuestion(currentCount);
  }

  function updateCount(currentCount) {
    count.push(1); 
    $('#jsCurrentQuestion').empty().append(currentCount + `/ 10`); 
    console.log('updateCount ran');
    currentCount = count.reduce(function(sum, value) {
    return sum + value;
  }, 0); 
      handleNextButtonClick(currentCount);
      handleSubmitAnswerClick(currentCount);
      updateQuestionTracker(currentCount);
    };

  function updateCountAfterReset(currentCount) {
      renderQuestion(currentCount);
      handleNextButtonClick(currentCount);
      handleSubmitAnswerClick(currentCount);
      updateQuestionTracker(currentCount);
    };


  function updateQuestionTracker(currentCount) {
    $('#jsCurrentQuestion').empty().append(currentCount);
  }

  function displayEndQuiz(currentCount) {
    if(currentCount === 10) {
    $('.question-answer-section').fadeOut('fast');
    setTimeout(function() {
    $('.finished-section').fadeIn('fast');
    }, 350);
  }
  }

  function getFinalScore(currentScore) {
    $('#jsFinalScore').empty().append(currentScore+"/ 10");
  }

  function resetScoreCount(currentCount) {
    count.splice(0, count.length);
    score.splice(0, score.length);
    currentCount = 0;
    getCurrentScore(score);
    updateCountAfterReset(currentCount);
    changeNextText(currentCount);
  }

  function changeNextText(currentCount) {
    if(currentCount === 10){
      $('span.next').text('Finish');
    } else {
      $('span.next').text('Next');
    }
    console.log('changedNextText ran');
    console.log(currentCount);
  }

  function restartQuiz(currentCount) {
    $('.ending-statement-container').off().on('click', '.jsRestartButton', event => {
      $('.finished-section').fadeOut('fast');
      resetScoreCount(currentCount);
      console.log(score);
      setTimeout(function() {
      $('.question-answer-section').fadeIn();
    }, 350);
    });
  }

  
  function handleQuiz() {
  shuffleQuestions();
  handleStartClicks();
  initializeCount();
  initializeScore();
  }
  
  $(handleQuiz);
  