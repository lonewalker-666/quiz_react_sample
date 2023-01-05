import moment from "moment"
import { useEffect, useState } from "react";



const Home = () =>{
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const deadline = "Jan, 5, 2023 16:40:00";

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  function leftFillNum(num:number, targetLength:number) {
    return num.toString().padStart(targetLength, '0');
  }

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);

    return <h1>{`${days} : ${hours} : ${leftFillNum(minutes,2)} : ${leftFillNum(seconds,2)}`}</h1>
        
       
}

export default Home