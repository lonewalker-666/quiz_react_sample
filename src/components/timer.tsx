
interface Props{
  countDown:{
    days:string,
    hours:string,
    minutes:string,
    seconds:string,
  }
}
 const Timer = (props:Props) => {
    const {countDown} = props
    const { days, hours, minutes, seconds } = countDown;

    return (
       <div className="container_timer">
         <div className="timer">{days}</div> :
        <div className="timer">{hours}</div> : 
        <div className="timer">{minutes}</div> :
        <div className="timer">{seconds}</div>
      </div>
    );
}

export default Timer