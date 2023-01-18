import moment from "moment";
import useCountDown from "../../hooks/useCountDown";
import Timer from "../common/timer";
import { useShowHide } from "../../hooks/useShowHide";
import { Modal } from "../common/modal";
import Rules from "./rules";
import {u} from '../../lib/util'


const Home = () => {
  const { visible, onShow, onHide } = useShowHide({ info_modal: false });
  const started = (moment().format("HH:mm:ss") > "09:30:00") && (moment().format("HH:mm:ss") < "18:30:00")
  const deadLine = started
    ? moment().format("MM/DD/YYYY") + " " + "18:30:00"
    : moment().add(u.time_diff,'hours').format("MM/DD/YYYY") + " " + "09:30:00";
  const initial = {
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    active: false,
  };
  const countDown = useCountDown(deadLine, initial);
  const onConfirm= () => {
    onHide();
   window.open("/start","_self")
  }
 
  const header = "Rules of this Quiz";
  const footer = (
    <>
      <button className="cancel" onClick={()=>onHide()}>Exit Quiz</button>
      <button className="confirm" onClick={()=>onConfirm()}>Continue</button>
    </>
  );
  return (
      <div>
        <div className="countDown_type_indicator">
          {started ? "Ends in" : "Starts in"}
        </div>
        <Timer countDown={countDown} />
        {started && <div className="starter">
          <button className="button" onClick={() => onShow("info_modal")}>
            Start
          </button>
        </div>}
        {visible.info_modal && (
          <Modal body={<Rules/>} header={header} footer={footer}/>
        )}
      </div>
  );
};

export default Home;
