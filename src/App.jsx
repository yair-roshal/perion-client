import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { WeatherPage } from "pages/WeatherPage";
import { LoginPage } from "pages/LoginPage";
import { ThemeProvider } from "@mui/system";
import theme from "styles/theme";

export const MyContext = createContext();

function App() {
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <>
      <ThemeProvider theme={theme}>
        <MyContext.Provider
          value={{
            email,
            setEmail,
            users,
            setUsers,
            user,
            setUser,
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/weather" element={<WeatherPage />} />
            </Routes>
          </BrowserRouter>
        </MyContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
