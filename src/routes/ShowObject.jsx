import "../styles/showObject.css";
import heir from "../images/eld.png";
import { useContext, useEffect } from "react";
import { AppContext } from "../ContextRoot";

export const ShowObject = () => {

    const { setChangeButtonsOnView } = useContext(AppContext);

    useEffect(() => {
        setChangeButtonsOnView("show-object");
      });
  return (
    <>
      <section className="show-object-wrapper">
        <div className="object-title-p">
          <h2 className="standard__title">Heir of Fire</h2>
          <p className="standard__text ">Författare: Sara J maas</p>
          <p className="standard__text ">Pris: 200 kr </p>
        </div>
        <div className="images">
          <img src={heir} alt="" />
          <img src={heir} alt="" />
          <img src={heir} alt="" />
        </div>
        <div className="description-content">
          <h5>Anteckning</h5>
          <p className="standard__text ">
            Detta är en skit bra bok. Om jag hittar en liknande bok så borde jag
            köpa den eftersom den här är trasig i bokryggen.
          </p>
        </div>
      </section>
    </>
  );
};
