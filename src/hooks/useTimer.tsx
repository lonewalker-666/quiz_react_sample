import { useState, useRef, useEffect } from 'react'
import { u } from '../lib/util';
  
  
const UseTimer = (initial:string,limit:string) => {
    const Ref : any = useRef(null);
  const {preceedZero} = u
    const [timer, setTimer] = useState(initial);
  
    const getTimeRemaining = (e:Date) => {
        const total = Date.parse(e.toString()) - Date.parse(new Date().toString());
        const seconds = Math.floor((total / 1000) % 60);
        return {
            total, seconds
        };
    }
  
  
    const startTimer = (e:Date) => {
        let { total, seconds } 
                    = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(preceedZero(seconds,2))
        }
    }
  
  
    const clearTimer = (e:Date) => { 
        setTimer(limit);
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
  
    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + (+limit));
        return deadline;
    }
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);
    const onClickReset = () => {
        clearTimer(getDeadTime());
    }
    return {timer,onClickReset}
}
  
export default UseTimer;