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
      const response = await fetch('https://opentdb.com/api.php?amount=5&encode=base64')
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
          <div 
            className="start-button" 
            onClick={() => setQuizStarted(true)}>
              Start Quiz
          </div>
        </div> 
        :
        <div className="quiz-page">
          {quizQuestions.map((question, i) => (
            <div key={i}>
              <div className="question">{window.atob(question.question)}</div>
              <ul className="flex-container longhand">
                {question.options.map((option, j) => (
                  <li className="flex-item" key={`question-${i}-option-${j}`} >
                    <input 
                      id={`question-${i}-option-${j}`}
                      type="radio" 
                      name={`question-${i}`} 
                      value={option} />
                    <label htmlFor={`question-${i}-option-${j}`}>
                      {window.atob(option)}
                    </label>
                  </li>
                ))}
              </ul>
              <hr style={{
                border: "0.794239px solid #DBDEF0"
              }}/>
            </div>
          ))}
        </div>
      }
    </div>
  );
}

export default App;
