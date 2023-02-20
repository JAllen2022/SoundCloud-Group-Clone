import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllSongs from "./components/Songs/AllSongs/AllSongs.js";
import SongShow from "./components/Songs/SongShow/SongShow.js";
import UploadPage from "./components/Navigation/Upload/UploadPage/UploadPage.js"
import UserPage from "./components/UserPage/UserPage";
import SplashPage from "./components/SplashPage/SplashPage";
import SongPlayer from "./components/SongPlayer/SongPlayer";
import AllUserLikes from "./components/UserPage/AllUserLikes/AllUserLikes";
import AllUserPageComments from "./components/Comments/AllUserPageComments/AllUserPageComments";
import AllSongLikes from './components/Songs/AllSongLikes/AllSongLikes'
import PageNotFound from './components/PageNotFound/PageNotFound'
// import Footer from "./components/Footer/Footer";


function App() {
  const currentUser = useSelector(state=> state.session.user)
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      { !currentUser?.id ?
         <Route path="/">
              <SplashPage isLoaded={isLoaded}/>
        </Route> :
        <>
          <div className="main-body">

      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route path="/upload">
            <UploadPage />
          </Route>
          <Route path="/songs/:songId/likes">
            <AllSongLikes />
          </Route>
          <Route path="/songs/:songId">
            <SongShow />
          </Route>
          <Route path="/songs">
            <AllSongs />
          </Route>
          <Route path="/users/:userId/likes">
            <AllUserLikes />
          </Route>
          <Route path="/users/:userId/comments">
            <AllUserPageComments />
          </Route>
          <Route path="/users/:userId">
            <UserPage />
          </Route>
          <Route path="/404" >
            <PageNotFound /> </Route >
          <Route path="*">
          <Redirect to='/404' />

          </Route>
        </Switch>
      )}
        {/* <Footer /> */}
        <SongPlayer />
          </div>
        </>
      }
    </>
  );
}

export default App;
