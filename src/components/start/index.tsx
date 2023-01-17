import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { QUESTION, RESULT } from "../../context/action";
import { GameContext } from "../../context/gameContext";
import UseTimer from "../../hooks/useTimer";
import Loading from "../common/loading";
import { Modal } from "../common/modal";
import QuestionBody from "./questions";

export default function Start() {
  const initial = {
    loading: true,
    result: [],
    answer: "",
    data: {},
    locked: false,
  };
  const [value, setValue] = useState(initial);
  const { loading, data, answer, result }: any = value;
  const { state, dispatch }: any = useContext(GameContext);
  const countDown = UseTimer("00", "20");
  useEffect(() => {
    if (countDown.timer == "00" && state.question == 5) {
      setValue({ ...value, result: data?.answer == answer ? result.push(true) : result.push(false) });
      setTimeout(routeResoponse, 2000);
    } else if (countDown.timer == "00" && state.question < 5) {
      const first_load = state.question == 0 ? 500 : 2000;
      setTimeout(check, first_load);
    }
  }, [countDown.timer]);

  const check = () => {
    if (state.question > 0) {
      setValue({ ...value, result: data?.answer == answer ? result.push(true) : result.push(false) });
    }
    setValue({ ...value, loading: true });
    dispatch({
      type: QUESTION,
      payload: state.question + 1,
    });
    setTimeout(getData, 1000);
  };

  const getData = () => {
    axios
      .post("https://uat.paym.site:5002/api/s1/QI/Questions", {
        groupRefID: "string",
        questionTypeRefID: "string",
        languageRefID: "string",
      })
      .then((r: AxiosResponse) => {
        setValue({
          ...value,
          data: r.data.data,
          answer: "",
          loading: false,
          locked: false,
        });
        countDown.onClickReset();
      })
      .catch((e) => console.log(e));
  };
  const routeResoponse = () => {
    setValue({ ...value, loading: true });
    dispatch({
      type: QUESTION,
      payload: 0,
    });
    const response = result.includes(false) ? "lose" : "win"
    window.open(`/user_response?response=${response}`, "_self");
  };
  const header = (
    <>
      <div>Quiz Game</div>
      <div
        className={`time-reminder ${+countDown.timer <= 5 ? "danger" : ""}`}
      >{`Time: ${countDown.timer}`}</div>
    </>
  );

  const onSubmit = () => {
    dispatch({
      type: QUESTION,
      payload: state.question + 1,
    });
  };

  const footer = (
    <button
      className="confirm"
      disabled={+countDown.timer > 15}
      onClick={() => onSubmit()}
    >
      Continue
    </button>
  );
  return !loading && state.question <= 5 ? (
    <Modal
      header={header}
      body={
        <QuestionBody
          countDown={countDown}
          data={data}
          setValue={setValue}
          value={value}
        />
      }
    />
  ) : (
    <Loading />
  );
}
