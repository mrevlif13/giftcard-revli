import React, { useState } from "react";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Modal, Form, Input, Button } from "antd";
import html2canvas from "html2canvas";
import "./styles.scss";

const FormCard = () => {
  const [file, setFile] = useState();
  const handleChangeU = (e) => {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const [msg, setMsg] = useState({
    dear: "",
    msg: "",
    to: "",
  });

  const handleInput = (event) => {
    const value = event.target.value;
    setMsg({
      ...msg,
      [event.target.name]: value,
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { TextArea } = Input;

  const onFinish = (values) => {
    console.log("Success:", values);
    setIsModalOpen(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDownloadImage = async () => {
    const element = document.getElementById("print"),
      canvas = await html2canvas(element),
      data = canvas.toDataURL("image/jpg"),
      link = document.createElement("a");

    link.href = data;
    link.download = "MyGiftCard.jpg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsModalOpen(false);
  };

  return (
    <>
      <center>
        <Form
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <label for="uploadImageBackground" className="inputUploadImage">
            <div className="buttonInputFile">
              <img className="imgView" src={file} alt="" />
              <CloudUploadOutlined className="iconUpload" />
              <div
                style={{
                  marginTop: 10,
                }}
              >
                <h3>Browse Files</h3>
                <p>Drag and drop files here</p>
              </div>
            </div>
            <Input
              className="inputUpload"
              type="file"
              id="uploadImageBackground"
              name="upload"
              onChange={handleChangeU}
              size="large"
              placeholder="..."
              accept="image/png , image/jpeg, image/webp, image/jpg"
            />
          </label>

          <Form.Item
            name="dear"
            label="Dear :"
            rules={[
              {
                required: true,
                message: "Kamu belum memasukkan nama yang dituju!",
              },
            ]}
          >
            <Input
              type="text"
              id="dear"
              name="dear"
              onChange={handleInput}
              value={msg.dear}
              size="large"
              placeholder="..."
              maxLength={16}
            />
          </Form.Item>

          <Form.Item
            name="message"
            label="Message :"
            rules={[
              {
                required: true,
                message: "Kamu belum memasukkan pesan!",
              },
            ]}
          >
            <TextArea
              type="text"
              id="msg"
              name="msg"
              onChange={handleInput}
              value={msg.msg}
              rows={4}
              placeholder="..."
              maxLength={60}
            />
          </Form.Item>

          <Form.Item
            name="from"
            label="From :"
            rules={[
              {
                required: true,
                message: "Kamu belum memasukkan nama pengirim!",
              },
            ]}
          >
            <Input
              type="text"
              id="me"
              name="me"
              onChange={handleInput}
              value={msg.me}
              size="large"
              placeholder="..."
              maxLength={16}
            />
          </Form.Item>

          <Form.Item>
            <center>
              <Button
                type="primary"
                htmlType="submit"
                className="buttonPreview"
              >
                Preview
              </Button>
              <Modal
                title="Your Gift Card"
                open={isModalOpen}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: "none" } }}
                okButtonProps={{ style: { display: "none" } }}
              >
                <div id="print">
                  <p className="txtDear">{msg.dear}</p>
                  <p className="txtMsg">{msg.msg}</p>
                  <p className="txtFrom">{msg.me}</p>
                  <img className="imgViewModal" src={file} alt="" />
                </div>
                <center>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={handleDownloadImage}
                    className="buttonDownload"
                  >
                    Download
                  </Button>
                </center>
              </Modal>
            </center>
          </Form.Item>
        </Form>
      </center>
    </>
  );
};

export default FormCard;
