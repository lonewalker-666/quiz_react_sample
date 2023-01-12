import moment from "moment";
import { useEffect, useState } from "react";
import { response } from "../mock/response";
import { Modal } from "../src/components/common/modal";
import useCountDown from "../src/hooks/useCountDown";
import { isEmpty } from "lodash";

export default function Start() {
  const [state, setState] = useState({
    question: 0,
    deadLine: moment().add(21, "seconds").format("MM/DD/YYYY HH:mm:ss"),
    completed:false,
    answer: ''
  });

  const options = response.options.filter((r) => r.Q_id == +state.question + 1);
  const initial = {
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "20",
    active: false,
  };

  const countDown = useCountDown(state.deadLine, initial);


  useEffect(() => {
    countDown.seconds == "00" && window.open("/user_response?response=time_up","_self")
  }, [countDown.seconds])

  const header = (
    <>
      <div>Quiz Game</div>
      <div
        className={`time-reminder ${+countDown.seconds <= 5 ? "danger" : ""}`}
      >{`Time: ${countDown.seconds}`}</div>
    </>
  );
  const body = (
    <>
      <div>{`${state.question + 1}).  ${
        response.question[state.question].question
      }`}</div>
      <div className="options-container">
        <ol type="A" className="options">
          {!isEmpty(options) ? (
            options.map((r) => {
              return <li className="options-li" key={r.id}>
                 <input type="radio" value={r.id} key={r.id} name="drone" onClick={(e)=>setState({...state,answer:e.currentTarget.defaultValue})}/>
                 <label >{r.option}</label>
              </li>;
            })
          ) : (
            <></>
          )}
        </ol>
      </div>
    </>
  );

  const onSubmit = () => {
    const correct_value = options.find((r)=>r.answer == true)
    if(!state.answer){
     alert("Please select a option")
    }
   else if(correct_value?.id == +state.answer){
        window.open("/user_response?response=win","_self")
    }
    else{
        window.open("/user_response?response=lose","_self")
    }
  }

  const footer = (
    <button className="confirm" onClick={() => onSubmit()}>Continue</button>
  )
  return (
    
           
        <Modal header={header} body={body} footer={footer}/>
     
    
  );
}
