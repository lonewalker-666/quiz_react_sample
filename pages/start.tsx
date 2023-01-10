import moment from "moment";
import { useEffect, useState } from "react";
import { response } from "../mock/response";
import { Modal } from "../src/components/common/modal";
import useCountDown from "../src/hooks/useCountDown";
import SiteLayout from "../src/layout/siteLayout";
import { isEmpty } from "lodash";
import Timer from "../src/components/timer";

export default function Start() {
  const [state, setState] = useState({
    question: 0,
    deadLine: moment().add(21, "seconds").format("MM/DD/YYYY HH:mm:ss"),
    completed:false
  });
 
  const options = response.options.filter((r) => r.Q_id == +state.question + 1);
  const initial = {
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "20",
    active: false,
  };
  const nextQuizTime = moment().add(1, "day").format("MM/DD/YYYY") + " " + "09:30:00"
  const next_intial = {
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    active: false,
  };
  const countDown = useCountDown(state.deadLine, initial);
  const nextQuiz = useCountDown(nextQuizTime, next_intial);

  useEffect(() => {
    countDown.seconds == "00" && setState({...state,completed:true})
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
      <div>{`${+state.question + 1}).  ${
        response.question[state.question].question
      }`}</div>
      <div className="options-container">
        <ol type="A" className="options">
          {!isEmpty(options) ? (
            options.map((r) => {
              return <li className="options-li" key={r.id}>{r.option}</li>;
            })
          ) : (
            <></>
          )}
        </ol>
      </div>
    </>
  );

  const footer = (
    <button className="submit">Continue</button>
  )
  return (
    <SiteLayout>
      <div>
        {state.completed ?  <><div className="countDown_type_indicator">
                 Time Up !!! Next Quiz Starts in :
              </div><Timer countDown={nextQuiz} /></>
        :
        <Modal header={header} body={body} footer={footer}/>
    }
      </div>
    </SiteLayout>
  );
}
