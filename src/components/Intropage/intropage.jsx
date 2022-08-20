import './intropage.css';

export default function Intropage(props) {
  return (
    <div className="quiz-intro-page">
      <div className="heading"> Quizzical</div>
      <div className="sub-heading">Some description if needed</div>
      <div 
        className="start-button" 
        onClick={props.handleGameState}>
          Start Quiz
      </div>
    </div>
  )
}
