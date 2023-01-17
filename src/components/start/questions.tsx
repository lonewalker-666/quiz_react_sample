import { useContext } from "react"
import { GameContext } from "../../context/gameContext"

const QuestionBody = (props:any) => {
    const {countDown,setValue,value,data} = props
    const {answer,locked} = value
    const {state}:any = useContext(GameContext)
    const lockOption = (val:string) => {
      if(!locked){
         setValue({...value,answer:val,locked:true})
      }
    }
    const lockAndAnswerClass=(val:string)=> {
      if(val == data?.answer && countDown.timer == "00") {
         return "correct-answer"
      }
      else if(answer == val){  
      if(val != data?.answer && countDown.timer == "00") {
         return "wrong-answer"
      }
      
      else if(locked){
         return "locked-answer"
      }
   }
     return ""
    }
    return(
        <>
        <div>{`${state.question}). ${data?.question}`}</div>
       {+countDown.timer <= 15 &&
          <ol type="A" className="options-container">
                 <li className={`options-li ${lockAndAnswerClass('A')}`} onClick={()=>lockOption("A")}>
                   <input type="radio" value={"A"} checked={answer == "A"} onChange={()=>lockOption("A")}/>
                   <label onClick={()=>lockOption("A")}>{data?.optionA}</label>
                </li>
                <li className={`options-li ${lockAndAnswerClass('B')}`} onClick={()=>lockOption("B")}>
                   <input type="radio" value={"B"} checked={answer == "B"} onChange={()=>lockOption("B")}/>
                   <label onClick={()=>lockOption("B")}>{data?.optionB}</label>
                </li>
                <li className={`options-li ${lockAndAnswerClass('C')}`} onClick={()=>lockOption("C")}>
                   <input type="radio" value={"C"} checked={answer == "C"} onChange={()=>lockOption("C")}/>
                   <label onClick={()=>lockOption("C")}>{data?.optionC}</label>
                </li>
                <li className={`options-li ${lockAndAnswerClass('D')}`} onClick={()=>lockOption("D")}>
                   <input type="radio" value={"D"} checked={answer == "D"} onChange={()=>lockOption("D")}/>
                   <label onClick={()=>lockOption("D")}>{data?.optionD}</label>
                </li>
          </ol>
      }
      </>
    )
}

export default QuestionBody