import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes, useNavigate } from "react-router-dom";
import "../scss/main.scss";
import { Main } from "./Main";
import { PatientMain } from "./Components-App/Patient/PatientMain";
import { AppointmentsList } from "./Components-App/Patient/AppointmentsList";
import { Login } from "./Components-App/Login/Login";
import { SingleAppointment } from "./Components-App/Patient/SingleAppointment";
import { SettingsDashboard } from "./Components-App/Patient/SettingsDashboard";
import { SearchDashboard } from "./Components-App/Patient/SearchDashboard";
import { LoaderCircleEmpty } from "./Utilities/LoaderCircle";
import { FireBaseTesting } from "./APICommunication/FireBaseTesting";
import { useStateManager } from "react-select";
import { addLel } from "./APICommunication/createFirestoreAppos";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firestore";
import { AuthProvider } from "./config/AuthContext";
import PrivateRoute from "./Components-App/PrivateRoute";
import { AuthContext } from "./config/AuthContext";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(
  //   JSON.parse(localStorage.getItem("is_authenticated"))
  // );

  // useEffect(()=>{
  // const [user, setUser] = auth.currentUser;
  // },[userCredential])

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const uid = user.uid;
  //       console.log(uid);
  //       return user;
  //     } else {
  //       return null;
  //     }
  //   });
  // }, [userCredential]);

  // const [userCredential, setUserCredential] = useState(
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const uid = user.uid;
  //       console.log(uid);
  //       return user;
  //     } else {
  //       return null;
  //     }
  //   })
  // );

  const [currentUser, setCurrentUser] = useState(
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("CONTEXT: ", uid);
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        console.log("User is not logged it, displaying login screen");
      }
    })
  );

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const uid = user.uid;
  //       console.log("CONTEXT: ", uid);
  //       setCurrentUser(user);
  //     } else {
  //       console.log("Coś poszło nie tak");
  //     }
  //   });
  // }, []);

  const [isAuthenticated, setIsAuthenticated] = useState();

  return (
    <>
      {/* <AuthProvider> */}

      {currentUser === undefined ? (
        <LoaderCircleEmpty />
      ) : (
        <HashRouter>
          <Routes>
            {currentUser ? (
              <Route
                path="/"
                element={<Main setCurrentUser={setCurrentUser} />}
              >
                <Route path="/portal" element={<PatientMain />} />
                <Route path="/app-list" element={<AppointmentsList />} />
                <Route
                  path="/single-apointment"
                  element={<SingleAppointment />}
                />
                <Route path="/user-settings" element={<SettingsDashboard />} />
                <Route path="/search" element={<SearchDashboard />} />
                <Route path="/test" element={<FireBaseTesting />} />
              </Route>
            ) : (
              <Route
                path="/portal"
                element={<Login setIsAuthenticated={setIsAuthenticated} />}
              ></Route>
            )}
          </Routes>
        </HashRouter>
      )}

      {/* </AuthProvider> */}
    </>
  );
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);

// EVENING BACKUP
{
  /* <>
      <AuthProvider>
        <HashRouter>
          <Routes>
            {isAuthenticated ? (
              <Route
                path="/"
                element={<Main setIsAuthenticated={setIsAuthenticated} />}
              >
                <Route path="/portal" element={<PatientMain />} />
                <Route path="/app-list" element={<AppointmentsList />} />
                <Route
                  path="/single-apointment"
                  element={<SingleAppointment />}
                />
                <Route path="/user-settings" element={<SettingsDashboard />} />
                <Route path="/search" element={<SearchDashboard />} />
                <Route path="/test" element={<FireBaseTesting />} />
              </Route>
            ) : (
              <Route
                path="/portal"
                element={<Login setIsAuthenticated={setIsAuthenticated} />}
              ></Route>
            )}
          </Routes>
        </HashRouter>
      </AuthProvider>
    </> */
}
