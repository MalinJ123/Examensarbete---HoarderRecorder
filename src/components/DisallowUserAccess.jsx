import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import { AppContext } from "../ContextRoot";

export const DisallowUserAccess = () => {
    const navigate = useNavigate();

    const { changeButtonsOnView, isUserLoggedIn, stateUserNotLoggedInDialog } = useContext(AppContext);

    const disallowUserAccessCheck = (view) => {
        if (view !== 'authentication') {
            if (!isUserLoggedIn) {
                navigate('/');
                stateUserNotLoggedInDialog(true);
            }
        }
    }

    useEffect(() => {
        disallowUserAccessCheck(changeButtonsOnView);
    });

    return null;
}