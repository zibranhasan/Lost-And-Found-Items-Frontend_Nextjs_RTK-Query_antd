// components/ReviewSection.tsx
import React from "react";
import { Card, Rate, Typography, Avatar, Row, Col } from "antd";

const { Text, Title } = Typography;

// Dummy review data
const reviews = [
  {
    id: "1",
    name: "John Doe",
    photo: "https://i.pravatar.cc/100?img=1",
    star: 4,
    comment:
      "Great experience using the lost and found service! I found my missing item within a day.",
  },
  {
    id: "2",
    name: "Jane Smith",
    photo: "https://i.pravatar.cc/100?img=2",
    star: 5,
    comment:
      "Absolutely fantastic! The platform made it easy for me to report my lost item, and the support was top-notch.",
  },
  {
    id: "3",
    name: "Alice Johnson",
    photo: "https://i.pravatar.cc/100?img=3",
    star: 3,
    comment:
      "Good service, but it took a bit longer to get my item back. Overall, I would recommend it.",
  },
  {
    id: "4",
    name: "Michael Brown",
    photo: "https://i.pravatar.cc/100?img=4",
    star: 5,
    comment:
      "Quick and efficient! I found my lost wallet within hours. Great service!",
  },
];

const ReviewSection: React.FC = () => {
  return (
    <div
      style={{
        background: "linear-gradient(90deg, #001529 0%, #004d80 100%)",
        color: "white",
        padding: "25px",
      }}
    >
      <Title
        level={2}
        style={{
          textAlign: "center",
          marginBottom: "10px",
          color: "white",
          fontSize: "2.5rem", // Increased font size
          marginTop: 0,
          padding: "5px", // Padding around the text
          position: "relative", // To position the shadow
          background: "linear-gradient(90deg, #001529 0%, #004d80 100%)",
          borderRadius: "5px", // Rounded corners
        }}
      >
        User Reviews
      </Title>

      <Row gutter={[16, 16]}>
        {reviews.map((review) => (
          <Col xs={24} sm={12} md={8} lg={6} key={review.id}>
            <Card bordered hoverable style={{ height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <Avatar
                  src={review.photo}
                  size={64}
                  style={{ marginRight: "16px" }}
                />
                <div>
                  <Text strong>{review.name}</Text>
                  <div>
                    <Rate
                      value={review.star}
                      disabled
                      style={{ fontSize: "16px" }}
                    />
                  </div>
                </div>
              </div>
              <Text>{review.comment}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ReviewSection;
