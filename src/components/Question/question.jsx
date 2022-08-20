import './question.css'

function Question(props) {
  return (
    <div>
      <div className="question">{window.atob(props.question)}</div>
      <ul className="flex-container longhand">
        {props.options.map((option, j) => (
          <li className="flex-item" key={`question-${props.index}-option-${j}`} >
            <input 
              id={`question-${props.index}-option-${j}`}
              type="radio" 
              name={`question-${props.index}`} 
              value={option}
              checked={props.submittedAnswer === option} 
              onChange={props.handleAnswers} />
            <label htmlFor={`question-${props.index}-option-${j}`}>
              {window.atob(option)}
            </label>
          </li>
        ))}
      </ul>
      <hr style={{
        border: "0.794239px solid #DBDEF0"
      }}/>
    </div>
  )
}

export default Question;