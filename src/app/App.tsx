import React, {
  PropsWithChildren,
  Suspense,
  useContext,
  useEffect,
  useMemo,
} from "react";
// import { fetchBrands } from '@/store/brands';
import Router from "../router/Router";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import { darkTheme, lightTheme } from "./config/mui/theme";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { ThemeProvider } from "@mui/material";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useDarkMode } from "usehooks-ts";
const stylisPlugins = [prefixer];
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const htmlDir = document.querySelector("html");
if (htmlDir?.dir === "rtl") {
  stylisPlugins.push(rtlPlugin);
}

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins,
});
function RTL(props: any) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}

function App() {
  const { isDarkMode } = useDarkMode(true);

  const activeTheme = useMemo(
    () => (isDarkMode ? darkTheme : lightTheme),
    [isDarkMode]
  );

  return (
    <div className="app tw-w-full">
      <ThemeProvider theme={activeTheme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <QueryClientProvider client={queryClient}>
            <RTL>
              <CssBaseline />
              <BrowserRouter>
                <main className="tw-block">
                  <Router />
                </main>
              </BrowserRouter>
            </RTL>
            <ToastContainer />
          </QueryClientProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
