import { useEffect, useState } from "react";
import { u } from "../lib/util";

interface initial_data {
  days: string
  hours: string
  minutes: string
  seconds: string
  active: boolean
}

const useCountDown= (deadLine:string,initial_data:initial_data) => {
 
  const reset ={
    days:"00",
    hours:"00",
    minutes:"00",
    seconds:"00",
    active:false
  }
    useEffect(() => {
        const interval = setInterval(() => getTime(), 1000);
        return () => clearInterval(interval);
      }, []);
      
    const [countDown, setCountDown] = useState(initial_data);
    const {preceedZero} = u    
    const getTime = () => {
      const time = Date.parse(deadLine) - Date.now();
    let days = Math.floor(time / (1000 * 60 * 60 * 24))
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24)
    let minutes = Math.floor((time / 1000 / 60) % 60)
    let seconsds = Math.floor((time / 1000) % 60)
    if(time <= 0){
      setCountDown(reset)
    }
    else{
      setCountDown({...countDown,days:preceedZero(days,2),hours:preceedZero(hours,2),minutes:preceedZero(minutes,2),seconds:preceedZero(seconsds,2),active:true})
    }
    }
    return countDown
}

export default useCountDown