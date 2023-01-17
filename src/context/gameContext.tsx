import { createContext } from "react";
import { defaultGlobalState } from "./defaultGlobalState";

export const GameContext = createContext(defaultGlobalState)