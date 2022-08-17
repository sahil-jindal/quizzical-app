import React from "react";

function App() {
  
  const [quizQuestions, setQuizQuestions] = React.useState([]);

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
      {quizQuestions.map((question, index) => (
        <div key={index}>
          <h3>{question.question}</h3>
          <ul>
            {question.options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </div>
      ))} 
    </div>
  );
}

export default App;
