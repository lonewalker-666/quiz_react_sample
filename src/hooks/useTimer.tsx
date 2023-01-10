import { useEffect, useState } from "react";
import { u } from "../lib/util";


const useTimer = (state:any,setState:any) => {
    let {count} = state
    useEffect(() => {
        const interval = setInterval(() => getTime(), 1000);
        return () => clearInterval(interval);
      }, []);
      
      const {preceedZero} = u
      const getTime = () => {
setState({...state,count:--count})
      }
     return preceedZero(count,2)
}

export default useTimer