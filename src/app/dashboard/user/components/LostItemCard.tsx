import Link from "next/link";
import Image from "next/image";

const LostItemCard = ({ item }: any) => {
  return (
    <div style={cardStyle as React.CSSProperties}>
      <div style={contentStyle as React.CSSProperties}>
        <Image
          src={item.photo}
          height={150}
          width={150}
          alt="item's photo"
          style={imageStyle as React.CSSProperties}
        />
        <div style={infoStyle as React.CSSProperties}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>Location: {item.location}</p>
          <Link
            href={`/dashboard/user/components/edit/${item.id}`}
            style={linkStyle as React.CSSProperties}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "16px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s",
};

const contentStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const imageStyle: React.CSSProperties = {
  width: "150px",
  height: "150px",
  objectFit: "cover",
  borderRadius: "8px",
  marginRight: "16px",
};

const infoStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const linkStyle: React.CSSProperties = {
  marginTop: "10px",
  color: "#007bff",
  textDecoration: "none",
  fontWeight: "bold",
  transition: "color 0.2s",
};

export default LostItemCard;
