import React from 'react';
import IQuestion from "../types/question";
import he from "he";

interface IProps {
    question: IQuestion;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, answer: string) => void;
}

interface IButtonProps {
    answer: string;    
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, answer: string) => void;
}


const AnswerButton = (props: IButtonProps) => {
    const answer = props.answer;
    return (
        <button className="bg-white p-4 text-purple-800 font-semibold rounded shadow"
            onClick={ (e) => props.onClick(e, answer) }> 
            { he.decode(answer) } 
        </button>
    );    
};

const Questionnaire = (props: IProps) => {
    const {question} = props;
    const q = he.decode(question.question);

    const shuffle = (arr: string[]) => {
        for(let i=0; i<arr.length; i++) {
            const ndx1 = Math.floor(Math.random()*arr.length);
            const ndx2 = Math.floor(Math.random()*arr.length);
            [ arr[ndx1], arr[ndx2] ] = [ arr[ndx2], arr[ndx1] ];
        }
        return arr;
    };
    const shuffled = shuffle([question.correct_answer, ...question.incorrect_answers]);
     
    return (
          <div className="container">
            <div className="bg-white text-purple-800 p-10 rounded-lg shadow-md">
              <h2 className="text-2xl">
                {q}
              </h2>          
            </div>
            <div className="grid grid-cols-2 gap-6 mt-4">          
                {
                    shuffled.map( (a,ndx) => 
                       (<AnswerButton key={ndx} answer={a} onClick={(e)=>props.onClick(e, a)}/>) 
                    )
                }
            </div>        
          </div>
    );
}

export default Questionnaire;
