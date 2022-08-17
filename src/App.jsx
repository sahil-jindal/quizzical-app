import React from "react";

function App() {
  
  const [quizQuestions, setQuizQuestions] = React.useState([]);
  const [quizStarted, setQuizStarted] = React.useState(false);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  React.useEffect(() => {
    
    async function getQuizQuestions() {
      const response = await fetch('https://opentdb.com/api.php?amount=5')
      const data = await response.json();
      return data.results.map((question) => ({
        question: question.question,
        answer: question.correct_answer,
        options: shuffleArray(question.incorrect_answers.concat(question.correct_answer))
      }))
    }

    getQuizQuestions().then((questions) => {
      setQuizQuestions(questions);
    });

  }, []);
  
  return (
    <div className="container">
      {!quizStarted 
        ? 
        <div className="quiz-intro-page">
          <div className="heading"> Quizzical</div>
          <div className="sub-heading">Some description if needed</div>
          <button 
            className="start-button" 
            onClick={() => setQuizStarted(true)}>
              Start
          </button>
        </div> 
        :
        <div className="quiz-page">
          {quizQuestions.map((question, i) => (
            <div key={i}>
              <h3>{question.question}</h3>
              <ul>
                {question.options.map((option, j) => (
                  <li key={j}>{option}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      }
    </div>
  );
}

export default App;
