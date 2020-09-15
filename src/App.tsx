import React, {useState, useEffect} from 'react';
import "tailwindcss/dist/tailwind.min.css";
import IQuestion from "./types/question";
import Questionnaire from "./components/questionnaire";

const App = () => {
  const API_URL = "https://opentdb.com/api.php?amount=10&category=14&difficulty=easy&type=multiple";
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  useEffect( () => {
    fetch(API_URL)
        .then( (res)  => res.json() )
        .then( (data) => {
          setQuestions(data.results);
          setCurrentIndex(0);
        });
  }, []);

  const handleAnswer = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, answer: string) => {
    if(answer===questions[currentIndex].correct_answer) {
      setScore(score+1);
    } 
    const next = currentIndex+1;
    let gameEnded=true;
    console.log(`next=${next}`)
    if(next<questions.length) {
      setCurrentIndex(next);
      gameEnded=false;
    } 
    if(gameEnded) {
      setGameEnded(true);
    }
  };
  let ctr;
  if(gameEnded) {
    ctr = (
      <h1 className="text-3xl text-white font-bold">
        Your score is {score}
      </h1>
    );
  } else {
    if(questions && questions.length>0) {
      const q = questions[currentIndex];
      ctr = ( <Questionnaire 
                question={q} onClick={(e,a)=>handleAnswer(e,a)}
              />
      );
    } else {
      ctr = (<h2 className="text-2xl text-white">Loading....</h2>);
    }    
  }
  return (
    <div className="bg-purple-500 flex text-white justify-center items-center h-screen">
      {ctr}
    </div>  
  );
}

export default App;
