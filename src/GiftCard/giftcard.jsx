import React from "react";
import "./styles.scss";
import Logo from "./assets/logo-otto.png";
import FormCard from "./components/form";
import { Button } from "antd";
import html2canvas from "html2canvas";

const Giftcard = () => {
  const handleDownloadImage = async () => {
    const element = document.getElementById("print"),
      canvas = await html2canvas(element),
      data = canvas.toDataURL("image/jpg"),
      link = document.createElement("a");

    link.href = data;
    link.download = "downloaded-image.jpg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="container">
      <header className="header">
        <img src={Logo} alt="" />
        <p>Gift Card</p>
      </header>
      <div className="my-0 mx-auto min-h-full max-w-screen-sm">
        <div id="print">
          <div className="contentContainer">
            <FormCard />
          </div>
        </div>
        <center>
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleDownloadImage}
          >
            Downloads
          </Button>
        </center>
      </div>
    </div>
  );
};

export default Giftcard;
