import React from "react";
import "./styles.scss";
import Logo from "./assets/logo-otto.png";
import FormCard from "./components/form";

import { Col } from "antd";

const Giftcard = () => {
  return (
    <div className="container">
      <Col>
        <header className="header">
          <img src={Logo} alt="" />
          <p>Gift Card</p>
        </header>
        <div className="my-0 mx-auto min-h-full max-w-screen-sm">
          <div className="contentContainer">
            <FormCard />
          </div>
        </div>
      </Col>
    </div>
  );
};

export default Giftcard;
