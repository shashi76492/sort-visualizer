import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { CgMail } from "react-icons/cg";

function Footer() {
  return (
    <>
      <div className="footer">
        <div>
            <h5>Social Media: </h5>
            <span><FaLinkedin /> LinkedIn</span>
            <br />
            <span><RiInstagramFill /> Instagram</span>
        </div>
        <div>
        <h5>Contacts: </h5>
        <span><CgMail /> shashikanth872004@gmail.com</span>
        </div>
        <div style={{
            display:"flex",
            alignItems:"center",
            flexDirection:"column"
        }} >
          <h5>References: </h5>
          <span>
            <FaGithub /> GitHub
          </span>
        </div>
      </div>
    </>
  );
}

export default Footer;
