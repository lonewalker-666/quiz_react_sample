import "../styles/globals.css";
import React, { useReducer } from "react";
import type { AppProps } from "next/app";
import SiteLayout from "../src/layout/siteLayout";
import Header from "../src/layout/head";
import reducer from "../src/context/reducer";
import { defaultGlobalState } from "../src/context/defaultGlobalState";
import { GameContext } from "../src/context/gameContext";

export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, defaultGlobalState);

  const values:any = {
    state,
    dispatch,
  };
  return (
    <SiteLayout>
      <GameContext.Provider value={values}>
        <Header />
        <Component {...pageProps} />
      </GameContext.Provider>
    </SiteLayout>
  );
}
