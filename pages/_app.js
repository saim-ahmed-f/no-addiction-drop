import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../mui/theme";
import createEmotionCache from "../mui/createEmotionCache";

import Router from "next/router"

import LoadingSpinner from "../spinnerComponents/LoadingSpinner"



import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";


import { StylesProvider, createGenerateClassName } from "@mui/styles";
const generateClassName = createGenerateClassName({
  productionPrefix: "c",
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [loading , setLoading] = React.useState(false)

  Router.events.on("routeChangeStart" , (url)=>{
    
    setLoading(true)
  })

  Router.events.on("routeChangeComplete" , (url)=>{
    
    setLoading(false)
  })

  return (
    <StylesProvider generateClassName={generateClassName}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          { loading && <LoadingSpinner/> }
          <Component {...pageProps} />
          <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          pauseOnVisibilityChange
          closeOnClick
          pauseOnHover
        />
        </ThemeProvider>
      </CacheProvider>
    </StylesProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
