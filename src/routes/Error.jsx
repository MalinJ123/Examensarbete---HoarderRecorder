import React, { useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '../ContextRoot';

import "../styles/error.css";
import lost from "../images/man-lost.gif";

export const Error = () => {

    const navigate = useNavigate();

    const { setChangeButtonsOnView } = useContext(AppContext);

    useEffect(() => {
        setChangeButtonsOnView('error');
    });

    return (
        <section className="error__section">
            
            <h1 className="standard__title">Felkod 404</h1>

            <img className="error__animation" src={lost} alt="Fundersam man" />

            <p className="standard__text">Vyn, resursen eller vyns innehåll kunde inte hittas!</p>

            <p className="standard__text">Vänligen navigera tillbaka till startsidan. Om du har navigerat dig rätt, kan det vara så att vi har problem med servern eller har vi tagit bort en specific resurs eller vy. Det kan även vara så att vi har fel i våran kod.</p>

            <button type="button" className="primary__button" onClick={() => navigate("/start")}>Tillbaka till startsidan</button>

            <button type="button" className="fixed__button" title="Kontakta kundsupporten"> 
                <span className="material-symbols-outlined">send</span>
            </button>

        </section>
    )
}