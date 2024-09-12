"use client"; // This directive marks the file as a Client Component

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import axios from "axios"; // Import axios for image upload
import {
  useCreateLostItemMutation,
  useGetAllCategoryQuery,
} from "@/redux/api/Api";
import { jwtDecode } from "jwt-decode"; // Use this without destructuring

const LostItemForm = () => {
  const router = useRouter();
  const { data: categoriesResponse, isLoading: categoriesLoading } =
    useGetAllCategoryQuery({});
  const [createLostItem] = useCreateLostItemMutation();

  const [formData, setFormData] = useState({
    userId: "",
    categoryName: "",
    name: "",
    description: "",
    location: "",
  });
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [image, setImage] = useState<File | null>(null); // State for image

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token); // Decode JWT token
      setFormData((prevData) => ({ ...prevData, userId: decoded.userId }));
    }
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "new") {
      setIsNewCategory(true);
      setFormData((prevData) => ({
        ...prevData,
        categoryName: "",
      }));
    } else {
      setIsNewCategory(false);
      setFormData((prevData) => ({
        ...prevData,
        categoryName: value,
      }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (image) {
        const formDataToSend = new FormData();
        formDataToSend.append("image", image);

        const response = await axios.post(
          "https://api.imgbb.com/1/upload?key=963ca9297bc7cea248773301a33b8428",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        imageUrl = response.data.data.display_url;
      }

      await createLostItem({
        ...formData,
        photo: imageUrl,
      }).unwrap();

      alert("Lost item created successfully");
      // Reset form data
      setFormData({
        userId: formData.userId, // Preserve userId
        categoryName: "",
        name: "",
        description: "",
        location: "",
      });
      setImage(null);
      setIsNewCategory(false);
      // Optional: You can reset file input using a ref

      // router.push("/components/allLostItem"); // Redirect to success page
    } catch (error: any) {
      alert("Error creating lost item: " + error.message);
    }
  };

  const categories = categoriesResponse?.response || [];

  if (categoriesLoading) return <div>Loading categories...</div>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Report Lost Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category:
            <select
              name="categoryName"
              value={formData.categoryName}
              onChange={handleCategoryChange}
              // required
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              {categories.map((category: any) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
              <option value="new">New Category</option>
            </select>
          </label>
        </div>
        {isNewCategory && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Category Name:
              <input
                type="text"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleChange}
                required
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Lost Item Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
        </div>
        <div>
          Upload Image:
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LostItemForm;
