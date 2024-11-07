import "./style.css";
import React from "react";
import InstaIcon from "assets/icons/insta-icon.svg?react";
import YoutubeIcon from "assets/icons/youtube-Icon.svg?react";
import FbIcon from "assets/icons/fb-icon.svg?react";
import Tiktok from "assets/icons/tiktok-icon.svg?react";
import saddle_logo from "assets/icons/saddleLogo.svg";
import { useLoggedIn } from "context/LoggedInContext";

export const Footer = () => {
  const { show } = useLoggedIn();
  return (
    <>
      <footer className={`footer_main !text-white relative z-10`}>
        <div className="flex justify-center items-center"> </div>
        <div className="footer_container">
          <div className="footer_wrapper">
            <div className="footer_logo_main">
              <div className="mb-10 w-full mx-auto lg:mx-0 :!ml-0">
                <a href="/#" className="footer_logo">
                  <img
                    src={saddle_logo}
                    alt="saddle_logo"
                    width="254"
                    height="100"
                  />
                </a>

                <p className="desc_text">SCAN. FIT. PERFORM.</p>
              </div>
            </div>
            <div className="footer_links_main">
              <LinkGroup header="About">
                {/* <NavLink link="/#" label="Our Story" /> */}
                {/* <NavLink link="/#" label="Contact us" /> */}
                <NavLink link="/#" label="Site Map" />
              </LinkGroup>
              {/* <div>
                <LinkGroup header="Partners">
                  <NavLink link="/partner" label="Become a partner" />
                </LinkGroup>
              </div> */}
              <LinkGroup header="Company">
                <NavLink
                  link="/terms-and-conditions"
                  label="Terms and Conditions"
                />
                <NavLink link="/privacy-policy" label="Privacy Policy" />
                {/* <NavLink link="/#" label="Careers" /> */}
              </LinkGroup>
            </div>
            <div className="mob_footer_logo_main">
              <div className="mob_footer_logo">
                <a href="/#" className="mb-6 inline-block mx-auto">
                  <img
                    src={saddle_logo}
                    alt="saddle_logo"
                    width="154"
                    height="55"
                  />
                </a>
                <p className="desc_text">SCAN. FIT. PERFORM.</p>
              </div>
            </div>
            <div className="footer_icons_main">
              <div className="footer_icons">
                <div className="footer_social_icons">
                  <a
                    target="_blank"
                    href="https://www.instagram.com/saddlefit.io/"
                  >
                    <InstaIcon />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.youtube.com/channel/UCUj-9ml6dOitzXY-H515cmQ"
                  >
                    <YoutubeIcon />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.facebook.com/profile.php?id=61555381395666"
                  >
                    <FbIcon />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.tiktok.com/@saddlefit.io"
                  >
                    <Tiktok />
                  </a>
                </div>
                <p className="regards_text">
                  SaddleFit 2024. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

const LinkGroup = ({ children, header }) => {
  return (
    <>
      <div className="w-full px-4">
        <div className="mb-10 w-full">
          <h4 className="nav_links_head">{header}</h4>
          <ul className="ftr_nav_links">{children}</ul>
        </div>
      </div>
    </>
  );
};

const NavLink = ({ link, label }) => {
  return (
    <li>
      <a href={link} className="anchor_links">
        {label}
      </a>
    </li>
  );
};
