import "../styles/user.css";
import { NavLink } from "react-router-dom";
import image from "../images/image.png";
function User() {
  return (
    <>
      <div className="background">
        <div className="user-wrapper">
          <div className="title-logout">
            <NavLink to="/" className="back-button">
              <span className="material-symbols-outlined">chevron_left</span>
            </NavLink>
            <div></div>
            <h1 className="title">Hej Norfe!</h1> <div></div>
            <span className="material-symbols-outlined">logout</span>
          </div>

          <div className="label-container">
            <label className="user-label" htmlFor="username">
              Användarnamn
            </label>
            <span className="user-input">Victor</span>

            {/* <input className='label'
        type="text"
        id="username"
        placeholder="Victor"
      /> */}
          </div>

          <div className="label-container">
            <label className="user-label" htmlFor="username">
              Kontobild
            </label>
            <span className="user-input">
              example-site.com/example-avatar-image.png
            </span>
          </div>

          <div className="image-container">
            <img className="user-img" src={image} alt="" />
          </div>
          <div className="userbtn-container">
            <button className="userbtn">Ta bort konto</button>
            <button className="userbtn">Slutför</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default User;
