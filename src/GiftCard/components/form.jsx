import React, { useState } from "react";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Modal, Upload, Form, Input } from "antd";
import "./styles.scss";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const FormCard = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <CloudUploadOutlined className="iconUpload" />
      <div
        style={{
          marginTop: 8,
        }}
      >
        <h3>Browse Files</h3>
        <p>Drag and drop files here</p>
      </div>
    </div>
  );

  const { TextArea } = Input;
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
          <Form.Item
          >
            <Upload
              listType="picture-card"
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                  height: "auto",
                }}
                src={previewImage}
              />
            </Modal>
          </Form.Item>

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
            <Input size="large" placeholder="..." />
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
            <TextArea rows={4} placeholder="..." />
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
            <Input size="large" placeholder="..." />
          </Form.Item>
        </Form>
      </center>
    </>
  );
};

export default FormCard;

