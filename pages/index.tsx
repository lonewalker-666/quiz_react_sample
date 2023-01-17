import axios from "axios";
import { useEffect } from "react";
import Home from "../src/components/home/home";

interface user_response {
  [key: string]: number | undefined
}

export default function HomePages() { 
  var object :user_response = {"0":5,"1":7,"2":4,"3":6,"4":7,"5":8,"6":12,"7":11,"8":2}

var covert = Object.entries(object).flat()

  return <Home/>
}
