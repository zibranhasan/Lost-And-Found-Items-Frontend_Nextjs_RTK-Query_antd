"use client";
import React from "react";
import {
  useGetMyFoundItemsQuery,
  useGetMyLostItemsQuery,
} from "@/redux/api/Api";
import { useGetMyClaimsQuery } from "@/redux/api/ClaimApi";
import { Col, Row, Spin } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";
import { Table, Card, Tabs } from "antd";

const { TabPane } = Tabs;

const DashboardPage = () => {
  const { data: claimsRes, isLoading: isClaimsLoading } = useGetMyClaimsQuery(
    {}
  );
  const { data: myFoundT, isLoading: isFoundItemsLoading } =
    useGetMyFoundItemsQuery({});
  const { data: myLostI, isLoading: isLostItemsLoading } =
    useGetMyLostItemsQuery({});

  const claimsCount = claimsRes?.response?.length || 0;
  const foundItemsCount = myFoundT?.response?.length || 0;
  const lostItemsCount = myLostI?.response?.length || 0;

  const data = [
    { name: "Claims", count: claimsCount },
    { name: "Found Items", count: foundItemsCount },
    { name: "Lost Items", count: lostItemsCount },
  ];

  if (isClaimsLoading || isFoundItemsLoading || isLostItemsLoading) {
    return <Spin size="large" />;
  }

  const claimsData = claimsRes?.response || [];
  const foundItemsData = myFoundT?.response || [];
  const lostItemsData = myLostI?.response || [];

  // Columns configuration for tables
  const claimsColumns = [
    {
      title: "Item Name",
      dataIndex: ["foundItem", "foundItemName"],
      key: "foundItemName",
    },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Distinguishing Features",
      dataIndex: "distinguishingFeatures",
      key: "distinguishingFeatures",
    },
    { title: "Lost Date", dataIndex: "lostDate", key: "lostDate" },
    {
      title: "Verification",
      dataIndex: "verificationMethod",
      key: "verificationMethod",
      render: (text: any) => (
        <Image alt="Image" width={50} height={50} src={text} />
      ),
    },
    {
      title: "Contact",
      dataIndex: "contactInformation",
      key: "contactInformation",
    },
  ];

  const foundItemsColumns = [
    { title: "Item Name", dataIndex: "foundItemName", key: "foundItemName" },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (text: any) => (
        <Image alt="Image" width={50} height={50} src={text} />
      ),
    },
    { title: "Description", dataIndex: "description", key: "description" },
  ];

  const lostItemsColumns = [
    { title: "Item Name", dataIndex: "name", key: "name" },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (text: any) => (
        <Image alt="Image" width={50} height={50} src={text} />
      ),
    },
    { title: "Description", dataIndex: "description", key: "description" },
  ];

  return (
    <div className="p-6 bg-gradient-to-r from-[#001529] to-[#004d80] min-h-screen">
      <Row gutter={16} className="mb-10">
        {[
          { title: "Claims", count: claimsCount },
          { title: "Found Items", count: foundItemsCount },
          { title: "Lost Items", count: lostItemsCount },
        ].map((item, index) => (
          <Col span={8} key={index}>
            <Card
              title={item.title}
              bordered={false}
              className="bg-white text-black rounded-lg shadow-md p-6 text-center"
            >
              <h2 className="text-4xl font-bold">{item.count}</h2>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-10">
        <Col span={24}>
          <Card
            title="Data Overview"
            bordered={false}
            className="bg-white rounded-lg shadow-md"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#004d80" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <div className="p-6 bg-gray-50 rounded-lg mt-10 shadow-lg">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Claims" key="1">
            <Card
              title="Claims Table"
              bordered={false}
              className="bg-white rounded-lg shadow-md"
            >
              <Table
                columns={claimsColumns}
                dataSource={claimsData}
                loading={isClaimsLoading}
                rowKey="id"
              />
            </Card>
          </TabPane>
          <TabPane tab="Found Items" key="2">
            <Card
              title="Found Items Table"
              bordered={false}
              className="bg-white rounded-lg shadow-md"
            >
              <Table
                columns={foundItemsColumns}
                dataSource={foundItemsData}
                loading={isFoundItemsLoading}
                rowKey="id"
              />
            </Card>
          </TabPane>
          <TabPane tab="Lost Items" key="3">
            <Card
              title="Lost Items Table"
              bordered={false}
              className="bg-white rounded-lg shadow-md"
            >
              <Table
                columns={lostItemsColumns}
                dataSource={lostItemsData}
                loading={isLostItemsLoading}
                rowKey="id"
              />
            </Card>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;
