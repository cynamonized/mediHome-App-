import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import "../scss/main.scss";
import { Main } from "./Main";
import { PatientMain } from "./Components-App/Patient/PatientMain";
import { AppointmentsList } from "./Components-App/Patient/AppointmentsList";
import { Login } from "./Components-App/Login/Login";
import { SingleAppointment } from "./Components-App/Patient/SingleAppointment";
import { SettingsDashboard } from "./Components-App/Patient/SettingsDashboard";
import { SearchDashboard } from "./Components-App/Patient/SearchDashboard";
import { FireBaseTesting } from "./APICommunication/FireBaseTesting";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          {/* <Route path="test" element={<PopUp />}></Route> */}
          <Route path="/portal" element={<Main />}>
            <Route path="/portal/start" element={<PatientMain />} />
            <Route path="/portal/app-list" element={<AppointmentsList />} />
            <Route
              path="/portal/single-apointment"
              element={<SingleAppointment />}
            />
            <Route
              path="/portal/user-settings"
              element={<SettingsDashboard />}
            />
            <Route path="/portal/search" element={<SearchDashboard />} />
            <Route path="/portal/test" element={<FireBaseTesting />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
