import moment from "moment";
import { useRouter } from "next/router";
import Timer from "../../src/components/timer";
import useCountDown from "../../src/hooks/useCountDown";
import { user_response } from "../../src/lib/constants";
import CustomError from "../customError";



const Response = ({query}) => {
    const nextQuizTime = moment().add(1, "day").format("MM/DD/YYYY") + " " + "09:30:00"
    const next_intial = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      active: false,
    };
    const nextQuiz = useCountDown(nextQuizTime, next_intial);
    const response = user_response[query.response] || user_response["not_found"]

    return(
        response !=user_response["not_found"] ? <>
        <div className="countDown_type_indicator">
            {response}
        </div>
        <Timer countDown={nextQuiz} />
        </>
        : <CustomError />
        
    )
}
Response.getInitialProps = ({query}) => {
    return {query}
  }


export default Response