import moment from "moment";
import React from "react";
import Timer from "../../src/components/common/timer";
import useCountDown from "../../src/hooks/useCountDown";
import { user_response } from "../../src/lib/constants";
import { u } from "../../src/lib/util";
import CustomError from "../customError";

interface Props{
  query:{
    response:string
  }
}


const Response = (props:Props) => {
  const {query} = props
    const nextQuizTime = moment().add(u.time_diff,'hours').format("MM/DD/YYYY") + " " + "09:30:00"
    const next_intial = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      active: false,
    };
    const nextQuiz = useCountDown(nextQuizTime, next_intial);
    const response = user_response[query?.response] || user_response["not_found"]

    return(
        response != user_response["not_found"] ? <>
        <div className="countDown_type_indicator">
            {response}
        </div>
        <Timer countDown={nextQuiz} />
        </>
        : <CustomError />
        
    )
}
Response.getInitialProps = ({query}:Props) => {
    return {query}
  }


export default Response