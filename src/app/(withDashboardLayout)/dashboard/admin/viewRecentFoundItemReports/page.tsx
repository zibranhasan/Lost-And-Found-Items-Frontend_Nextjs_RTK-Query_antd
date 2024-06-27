"use client";

import React, { useState } from "react";
import { useGetFoundItemsWithFilteringQuery } from "@/redux/api/userApi"; // Adjust import as per your actual hook location
import Image from "next/image";

const Page = () => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [keyword, setKeyword] = useState("");

  const { data, isLoading, error, refetch } =
    useGetFoundItemsWithFilteringQuery({
      category,
      location,
      keyword,
    });

  const handleSearch = () => {
    refetch();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        View Recent Found Item Reports
      </h1>
      <div className="flex space-x-4 mb-4 items-end">
        <div className="flex-1">
          <label className="block text-sm mb-1">Category:</label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm mb-1">Location:</label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm mb-1">Keyword:</label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="flex-none">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      {data && (
        <ul className="mt-6">
          {data.response.map((item: any) => (
            <li key={item.id} className="border p-4 rounded-md mb-4 flex">
              {item.photo && (
                <div className="mr-4 flex-shrink-0">
                  <Image
                    src={item.photo}
                    alt={item.name}
                    width={150}
                    height={150}
                    className="rounded-md"
                  />
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="mt-2">Description: {item.description}</p>
                <p>Category: {item?.category?.name}</p>
                <p>Location: {item.location}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
