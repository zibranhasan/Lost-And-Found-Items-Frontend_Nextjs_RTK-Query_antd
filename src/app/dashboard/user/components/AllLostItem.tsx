import React, { useState, useEffect } from "react";
import { useGetAllLostItemsQuery } from "@/redux/api/Api";
import LostItemCard from "./LostItemCard";
import { Spin, Input, Pagination, Select } from "antd";

const { Search } = Input;
const { Option } = Select;
interface LostItem {
  id: string;
  name: string;
  description: string;
  location: string;
  photo: string;
  // Add any other fields returned by your API
}

const AllLostItem = () => {
  const { data, isLoading, error } = useGetAllLostItemsQuery({});
  const [filteredItems, setFilteredItems] = useState<LostItem[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  useEffect(() => {
    if (data?.response) {
      let items: LostItem[] = data.response; // Type the items here as LostItem[]

      if (searchTerm) {
        items = items.filter(
          (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (filterLocation) {
        items = items.filter((item) => item.location === filterLocation);
      }

      setFilteredItems(items);
      setPage(1); // Reset to the first page whenever filters change
    }
  }, [data, searchTerm, filterLocation]);

  if (isLoading) {
    return (
      <div style={{ padding: "10px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) return <div>Error loading items</div>;

  // Calculate items for the current page
  const paginatedItems = filteredItems.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div>
      {/* Filter section */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <Search
          placeholder="Search items"
          onSearch={(value) => setSearchTerm(value)}
          style={{ width: "200px" }}
        />
        <Select
          placeholder="Filter by location"
          onChange={(value) => setFilterLocation(value)}
          style={{ width: "200px" }}
          allowClear
        >
          <Option value="New York">New York</Option>
          <Option value="Los Angeles">Los Angeles</Option>
          <Option value="Chicago">Chicago</Option>
          <Option value="Bangladesh">Bangladesh</Option>
          {/* Add more locations as needed */}
        </Select>
      </div>

      {/* Display lost items */}
      <div>
        {paginatedItems.map((item: LostItem) => (
          <LostItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        current={page}
        pageSize={pageSize}
        total={filteredItems.length}
        onChange={(page) => setPage(page)}
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    </div>
  );
};

export default AllLostItem;
