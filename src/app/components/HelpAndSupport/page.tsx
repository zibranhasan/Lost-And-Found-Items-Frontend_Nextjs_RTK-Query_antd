"use client";
import { Form, Input, Button, Collapse } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import styles from "./HelpAndSupport.module.css";
import Header from "../Header/Header";

const { Panel } = Collapse;

const HelpAndSupport: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className={styles.helpAndSupport}>
        <div className={styles.header}>
          <h1>Help & Support</h1>
        </div>

        <div className={styles.faqSection}>
          <h2>Frequently Asked Questions</h2>
          <Collapse accordion>
            <Panel header="How do I report a lost item?" key="1">
              <p>
                To report a lost item, go to the &apos;Report Lost Item&apos;
                section and fill out the form with the necessary details.
              </p>
            </Panel>
            <Panel header="How do I report a found item?" key="2">
              <p>
                If you&apos;ve found an item, please go to the &apos;Report
                Found Item&apos; section and provide the details to help us
                reunite it with its owner.
              </p>
            </Panel>
            <Panel header="How can I contact support?" key="3">
              <p>
                You can contact our support team via the contact form below, or
                use the provided email and phone number.
              </p>
            </Panel>
          </Collapse>
        </div>

        <div className={styles.contactSection}>
          <h2>Contact Us</h2>
          <div className={styles.contactDetails}>
            <p>
              <MailOutlined /> Email: support@lostandfound.com
            </p>
            <p>
              <PhoneOutlined /> Phone: +1 234 567 890
            </p>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>Need Further Assistance?</h2>
          <Form
            name="support"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "The input is not valid email!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Message"
              name="message"
              rules={[
                { required: true, message: "Please input your message!" },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupport;
