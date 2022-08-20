import { nanoid } from "nanoid";
import React from "react";
import Intropage from "./components/Intropage/intropage.jsx";
import Question from "./components/Question/question.jsx";

function App() {
  
  const [quizQuestions, setQuizQuestions] = React.useState([]);
  const [quizStarted, setQuizStarted] = React.useState(false);
  const [scoreChecked, setScoreChecked] = React.useState(false);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function getSubmittedAnswer(event, question_id) {
    setQuizQuestions(prevQuizQuestions => prevQuizQuestions.map(question => {
        return (question.id === question_id) 
          ? {...question, submittedAnswer: event.target.value} 
          : question
    }))
  }

  function calculateScore(questions) {
    let score = 0;

    for(let question of questions) {
      if(question.answer === question.submittedAnswer) {
        ++score;
      }
    }

    return score;
  }

  function handleState() {
    if(!scoreChecked) {
      setScoreChecked(true)
    } else {
      setQuizStarted(false)
      setScoreChecked(false)
    }
  }

  React.useEffect(() => {
    
    async function getQuizQuestions() {
      const response = await fetch('https://opentdb.com/api.php?amount=5&encode=base64')
      const data = await response.json();
      return data.results.map((question) => ({
        id: nanoid(),
        question: question.question,
        answer: question.correct_answer,
        options: shuffleArray(question.incorrect_answers.concat(question.correct_answer)),
        submittedAnswer: null
      }))
    }

    getQuizQuestions().then((questions) => {
      setQuizQuestions(questions);
    });

  }, []);

  React.useEffect(() => {
    console.log(calculateScore(quizQuestions));
  }, [quizQuestions])
  
  return (
    <div className="container">
      {!quizStarted 
        ?
        <Intropage 
          handleGameState={() => setQuizStarted(true)}
        /> 
        :
        <div className="quiz-page">
          {quizQuestions.map((question, i) => (
            <Question 
              key={i} 
              index={i} 
              question={question.question} 
              options={question.options}
              submittedAnswer={question.submittedAnswer}
              handleAnswers={(event) => getSubmittedAnswer(event, question.id)}
            />
          ))}
          <div className="footer">
            {scoreChecked && 
              <div className="score-result">
                You scored {calculateScore(quizQuestions)} / {quizQuestions.length} correct answers 
              </div>
            }
            <button 
              className="score-button"
              onClick={() => handleState()}>
                {!scoreChecked ? "Check Answers" : "Play again"}
            </button>
          </div>
        </div>
      }
    </div>
  );
}

export default App;  