import moment from "moment";
import axios from "axios";
import { useEffect, useState } from "react";
import useCountDown from "../hooks/useCountDown";
import Timer from "./timer";
import SiteLayout from "../layout/siteLayout";
import { useShowHide } from "../hooks/useShoeHide";
import { Modal } from "./common/modal";

const Home = () => {
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/customers")
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
  }, []);

  const { visible, onShow, onHide } = useShowHide({ info_modal: false });
  const started = (moment().format("HH:mm:ss") > "09:30:00") && (moment().format("HH:mm:ss") < "18:00:00")
  const deadLine = started
    ? moment().format("MM/DD/YYYY") + " " + "18:00:00"
    : moment().add(1,'day').format("MM/DD/YYYY") + " " + "09:30:00";
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
  const modal_body = (
    <>
      <div>
        1. You will have only{" "}
        <span style={{ color: "rgb(15, 150, 192)" }}>20 seconds</span> per each
        question.
      </div>
      <div>2. Once you select your answer, it can't be undone.</div>
      <div>3. You can't select any option once time goes off.</div>
      <div>4. You can't exit from the Quiz while you're playing.</div>
      <div>5. You'll get points on the basis of your correct answers.</div>
    </>
  );
  const header = "Rules of this Quiz";
  const footer = (
    <>
      <button className="cancel" onClick={()=>onHide()}>Exit Quiz</button>
      <button className="confirm" onClick={()=>onConfirm()}>Continue</button>
    </>
  );
  return (
    <SiteLayout>
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
          <Modal body={modal_body} header={header} footer={footer}/>
        )}
      </div>
    </SiteLayout>
  );
};

export default Home;
