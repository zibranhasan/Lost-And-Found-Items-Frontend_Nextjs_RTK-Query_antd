// pages/blog.tsx

import React, { useState } from "react";
import { Card, Typography, Row, Col, Button, Modal, Image } from "antd";

const { Title } = Typography;

// Dummy blog post data
const dummyBlogPosts = [
  {
    id: "1",
    title: "How to Claim Lost Items",
    content:
      "This guide will help you understand how to claim lost items. First, visit the lost items section and locate your item. You will need to provide details like the date, time, and any identifying marks such as scratches, engravings, or other unique features. Once you’ve located your item, click on the 'Claim' button and fill out the necessary form. Make sure to provide accurate information including where you lost the item, when you lost it, and any other relevant details. The item owner or the lost and found administrator will then verify your claim. You may also be required to provide proof of ownership, such as a purchase receipt or identification card. Once the claim is processed and verified, you will be notified, and arrangements will be made to return the item to you. Always remember to check the platform regularly for updates on your lost item status.",
    photo: "https://i.ibb.co/X4qjFkJ/coffee-7830087-1280.jpg",
  },
  {
    id: "2",
    title: "Tips to Avoid Losing Items",
    content:
      "To avoid losing items, it is important to stay organized. Always keep your personal belongings in designated areas, such as a bag, drawer, or locker. It's also a good idea to label your items with your name, phone number, or email address to ensure they can be returned to you if found. Develop the habit of checking your surroundings before leaving any place, whether it's your home, office, or a public area. Additionally, using keychains, lanyards, or brightly colored cases can make items like keys, wallets, and phones more noticeable and harder to misplace. For valuable items such as laptops and cameras, consider using tracking devices that can help you locate them through a smartphone app if they are lost. Staying mindful of where you place your belongings will minimize the chances of losing them.",
    photo: "https://i.ibb.co/g3n6RFQ/binoculars-7723093-1280.jpg",
  },
  {
    id: "3",
    title: "What to Do When You Find a Lost Item",
    content:
      "If you find a lost item, the first thing you should do is report it to the nearest authority or hand it over to the lost and found department. In case you're using a digital lost and found platform, you can submit details of the item you found. Include the date, time, and location where the item was discovered, as well as a brief description of the item. Always handle found items with care, as they may hold sentimental or financial value to the owner. Avoid tampering with or using the item, especially if it's something like a phone, wallet, or valuable personal item. When submitting the item, be sure to provide your contact details, in case further clarification is needed. It's also a good idea to keep a record of where and when you found the item, as this can help expedite the return process if the rightful owner comes forward.",
    photo: "https://i.ibb.co/S6B0Dxk/smartwatch-8300238-1280.jpg",
  },
  {
    id: "4",
    title: "The Benefits of Using Lost & Found Services",
    content:
      "Using lost and found services can save you time and money by helping you retrieve lost valuables. Many organizations, including public transport, airports, and shopping malls, offer these services for free, and they can greatly increase your chances of finding important items. These services also reduce stress by providing a reliable system to recover your belongings. For businesses, having a lost and found service adds a layer of trust and customer care, improving their reputation. Moreover, in certain cases, lost and found services help ensure that valuable or sensitive items, like passports or credit cards, are safely returned to their rightful owners. You can often access these services through online platforms, making it easier to report and track lost items. With technological advancements, some platforms even provide notifications and updates when there’s any progress with your lost item. This system increases the likelihood that lost items are returned, minimizing the inconvenience and potential loss for individuals.",
    photo: "https://i.ibb.co/Tb1h02P/apple-1282241-1280.jpg",
  },
];

const BlogPage: React.FC = () => {
  const [posts] = useState(dummyBlogPosts);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const showModal = (post: any) => {
    setSelectedPost(post);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedPost(null);
  };

  return (
    <div style={{ padding: "0px 20px" }}>
      <Title
        level={2}
        style={{
          fontSize: "2.5rem",
          marginBottom: "10px",
          textAlign: "center",
          color: "#212529",
          padding: "5px",
          position: "relative",
          borderRadius: "5px",
          backgroundColor: "#e9ecef",
        }}
      >
        Our Blog
      </Title>

      <Row gutter={[16, 16]}>
        {posts.map((post) => (
          <Col xs={24} sm={12} md={8} lg={6} key={post.id}>
            <Card
              hoverable
              style={{
                width: "100%",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginBottom: "0",
              }}
              cover={
                <img
                  alt={post.title}
                  src={post.photo}
                  style={{ height: "150px", objectFit: "cover" }}
                />
              }
            >
              <Title level={4} style={{ margin: "10px 0", height: "50px" }}>
                {post.title}
              </Title>
              <p style={{ flexGrow: 1 }}>{post.content.slice(0, 60)}...</p>
              <Button
                type="primary"
                onClick={() => showModal(post)}
                style={{
                  marginTop: "10px",
                  background:
                    "linear-gradient(90deg, #001529 0%, #004d80 100%)",
                }}
              >
                Read more
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for displaying full post */}
      <Modal
        title={selectedPost?.title}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={400}
      >
        {selectedPost && (
          <div>
            <Image
              src={selectedPost.photo}
              alt={selectedPost.title}
              style={{ width: "400px", height: "350px" }}
            />
            <p>{selectedPost.content}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BlogPage;
