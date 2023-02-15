import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllSongs from "./components/Songs/AllSongs/AllSongs.js";
import SongShow from "./components/Songs/SongShow/SongShow.js";
import UploadPage from "./components/Navigation/Upload/UploadPage/UploadPage.js"
import UserPage from "./components/UserPage/UserPage";
import SplashPage from "./components/SplashPage/SplashPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
              <SplashPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/songs/:songId">
            <SongShow />
          </Route>
          <Route path="/songs">
            <AllSongs />
          </Route>
          <Route path="/upload">
            <UploadPage />
          </Route>
          <Route path="/users/:userId">
            <UserPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
