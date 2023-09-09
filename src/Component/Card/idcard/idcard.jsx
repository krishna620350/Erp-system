import QRCode from "qrcode.react";
import "./idcard.scss";
const Idcard = () => {
  return (
    <div className="idcard">
      <div className="card">
        <div className="imgbx">
          <img src="noavatar.png" alt="#" />
        </div>
        <div className="content">
          <div className="details">
            <h2>
              Krishna <br />
              <span>Senior UX/UI Designer</span>
            </h2>
            <div className="data">
              <QRCode size={150} className="qrcode" />
            </div>
            <div className="contact">
              <h3>
                krishna966120@gmail.com <br /> <span>Email Id</span>
              </h3>
              <h3>
                +91 620-3506-439 <br /> <span>Phone Number</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Idcard;
