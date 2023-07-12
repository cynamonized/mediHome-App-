import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MainButton, SecondaryButton } from "./Buttons";
import {
  DashboardHeaderBig,
  DashboardHeaderWarning,
} from "../Components-App/Patient/DashboardLittleComps";
import { AppointmentDate, AppoDateFromSeconds } from "../Functions/convertTime";

export const PopUp = ({ actionProceed, closePopUp, chosenAppo, action }) => {
  return (
    <div className="pop-up pop-up--no-radius fade-in-object">
      <div className="pop-up__window">
        <DashboardHeaderBig title={"Confirm action"} />
        <div className="window__body">
          {action == "cancel" ? (
            <>
              <p className="body__message">
                Are you sure you want to cancel appointment:
              </p>
            </>
          ) : (
            <p className="body__message">
              Please confirm booking this appointment:
            </p>
          )}

          <p className="body__appointment-name">
            {chosenAppo.specialization}
            {", "}
            {AppoDateFromSeconds(chosenAppo.date.seconds)}
          </p>
          <div className="body__buttons">
            <MainButton callbackAction={actionProceed} wide={true}>
              Confirm
            </MainButton>
            <SecondaryButton callbackAction={closePopUp} wide={true}>
              Cancel
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PopUpDeny = ({
  specialization,
  refresh,
  reason,
  secondaryAction,
}) => {
  const closePopUp = () => {
    refresh(secondaryAction);
  };

  return (
    <>
      <div className="pop-up pop-up--no-radius">
        <div className="pop-up__window">
          <DashboardHeaderWarning title={"Booking issue"}>
            <span className="material-icons warning__header-icon">
              dangerous
            </span>
          </DashboardHeaderWarning>
          <div className="window__body window__body--centered">
            {reason == "UserAlreadyHaveAppo" ? (
              <>
                <p className="body__message">
                  You already have one<span> {`${specialization}`} </span>
                  appointment booked. You should either cancel that appointment
                  first or contact our hotline to book more appointments of the
                  same type.
                </p>
              </>
            ) : (
              <p className="body__message">
                Apologies, this appointment is not available anymore, try to
                look for another appointment
              </p>
            )}

            <div className="body__buttons">
              <MainButton callbackAction={closePopUp} wide={true}>
                Confirm
              </MainButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const SimpleErrorPopUp = ({ closePopUp, children, title }) => {
  return (
    <>
      <div className="pop-up">
        <div className="pop-up__window">
          <DashboardHeaderWarning title={title}>
            <span className="material-icons warning__header-icon">
              dangerous
            </span>
          </DashboardHeaderWarning>
          <div className="window__body window__body--centered">
            <p className="body__message">{children}</p>

            <div className="body__buttons">
              <MainButton callbackAction={closePopUp} wide={true}>
                Confirm
              </MainButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const PopUpLoading = () => {
  return (
    <div className="pop-up">
      <div className="pop-up__loader">
        <span className="material-icons loader__icon hourglass-animating">
          hourglass_empty
        </span>
      </div>
    </div>
  );
};

export const PopUpTiny = () => {
  return (
    <div className="pop-up--tiny">
      <div className="pop-up__loader">
        <span className="material-icons loader__icon hourglass-animating">
          hourglass_empty
        </span>
      </div>
    </div>
  );
};

export const ToolTip = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [fadingIn, setFadingIn] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  const handleMouseOver = () => {
    setFadingIn(true);
    setIsHovering(true);
  };

  const handleMouseOut = async () => {
    const result = await fadingOutPromise();
    setIsHovering(false);
  };

  // To be replaced with CSS Transition (1)

  const fadingOutPromise = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setFadingIn(false);
      }, 100);
    });
  };

  return (
    <div
      className="tooltip"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <span className="material-icons">info</span>
      {isHovering && (
        <div
          className={
            fadingIn == true
              ? "tooltip__hover-message tooltip__fade-in"
              : "tooltip__hover-message tooltip__fade-out"
          }
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const LoaderCircle = () => {
  return (
    <div className="loader-circle container ">
      <span className="material-icons popup-icon--big hourglass-animating">
        hourglass_empty
      </span>
      <p className="loader-circle__text">We are processing your request</p>
    </div>
  );
};
