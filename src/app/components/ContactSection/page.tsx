import { Input, Button, Form } from "antd";
import React from "react";

const ContactPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    // You can process the form here (e.g., send to Formspree)
  };

  return (
    <section
      className="py-16 lg:section"
      id="contact"
      style={{
        background: "linear-gradient(90deg, #001529 0%, #004d80 100%)",
        color: "white",
      }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Text section */}
          <div className="flex-1 flex justify-start items-center">
            <div>
              <h4 className="text-xl uppercase text-white font-medium mb-2 tracking-wide">
                Get in touch
              </h4>
              <h2 className="text-[45px] lg:text-[90px] leading-none mb-12 text-white">
                Let's work <br /> together!
              </h2>
            </div>
          </div>

          {/* Form section */}
          <div
            className="flex-1 border rounded-2xl p-6"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <Form
              form={form}
              onFinish={onFinish}
              action="https://formspree.io/f/xrgvjbzb"
              method="POST"
              layout="vertical"
              className="w-full"
            >
              {/* Name input */}
              <Form.Item
                name="user_name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input
                  placeholder="Your name"
                  className="border-b bg-transparent text-white py-3 placeholder:text-white focus:border-accent transition-all"
                  style={{ borderColor: "white" }}
                />
              </Form.Item>

              {/* Email input */}
              <Form.Item
                name="user_email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  placeholder="Your email"
                  className="border-b bg-transparent text-white py-3 placeholder:text-white focus:border-accent transition-all"
                  style={{ borderColor: "white" }}
                />
              </Form.Item>

              {/* Message input */}
              <Form.Item
                name="message"
                rules={[{ required: true, message: "Please enter a message" }]}
              >
                <Input.TextArea
                  placeholder="Your message"
                  rows={5}
                  className="border-b bg-transparent text-white py-3 placeholder:text-white focus:border-accent transition-all resize-none"
                  style={{ borderColor: "white" }}
                />
              </Form.Item>

              {/* Submit button */}
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                className="w-full"
                style={{
                  background:
                    "linear-gradient(90deg, #001529 0%, #004d80 100%)",
                  borderColor: "#004d80",
                  color: "white",
                }}
              >
                Send
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
