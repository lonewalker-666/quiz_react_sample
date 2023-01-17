import moment from "moment";

export const u ={
    preceedZero :(num:number, targetLength:number) =>{
        return num.toString().padStart(targetLength, '0');
      },
    time_diff : (moment().format("HH:mm:ss") > "09:30:00") ? 24 - (+moment().format("HH")) : 0
}