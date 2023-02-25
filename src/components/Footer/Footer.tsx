import "./Footer.css";

import { IoLogoFreebsdDevil } from "react-icons/io";
import { IoLogoTwitter } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io";
import { IoLogoSnapchat } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="d-flex justify-content-between px-5 py-3 mt-5 bg-dark">
      <div className="d-flex flex-column justify-content-center text-white font-monospace">
        <span>Agreement</span>
        <span>Contacts</span>
        <span>Size grid</span>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <IoLogoFreebsdDevil color="white" size="1.5em" />
        <span className="font-monospace text-white">Custom Stories 2023</span>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-column footer-social">
        <IoLogoTwitter color="white" size="1.5em" />
        <IoLogoYoutube color="white" size="1.5em" />
        <IoLogoSnapchat color="white" size="1.5em" />
      </div>
    </footer>
  );
};

export default Footer;
