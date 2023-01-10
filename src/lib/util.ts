import moment from "moment";

export const u ={
    preceedZero :(num:number, targetLength:number) =>{
        return num.toString().padStart(targetLength, '0');
      },
}