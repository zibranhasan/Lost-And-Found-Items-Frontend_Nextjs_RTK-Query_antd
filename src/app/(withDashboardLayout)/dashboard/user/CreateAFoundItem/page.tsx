"use client"; // This directive marks the file as a Client Component

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import {
  useCreateFoundItemMutation,
  useGetAllCategoryQuery,
} from "@/redux/api/userApi";
import { jwtDecode } from "jwt-decode"; // Use this without destructuring

const FoundItemForm = () => {
  const router = useRouter();
  const { data: categoriesResponse, isLoading: categoriesLoading } =
    useGetAllCategoryQuery({});
  const [createFoundItem] = useCreateFoundItemMutation();

  const [formData, setFormData] = useState({
    categoryName: "",
    foundItemName: "",
    description: "",
    location: "",
  });

  const [isNewCategory, setIsNewCategory] = useState(false);

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

  const handleNewCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, categoryName: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const bodyData = { ...formData };
    try {
      console.log("formData", bodyData);

      await createFoundItem(formData).unwrap();
      alert("Found item reported successfully");
      // router.push("/success"); // Redirect to success page
    } catch (error: any) {
      alert("Error reporting found item: " + error.message);
    }
  };

  const categories = categoriesResponse?.response || [];

  if (categoriesLoading) return <div>Loading categories...</div>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Report Found Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category:
            <select
              name="categoryName"
              value={isNewCategory ? "new" : formData.categoryName}
              onChange={handleCategoryChange}
              required={!isNewCategory}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={isNewCategory}
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
                onChange={handleNewCategoryChange}
                required={isNewCategory}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Found Item Name:
            <input
              type="text"
              name="foundItemName"
              value={formData.foundItemName}
              onChange={handleChange}
              required
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
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

export default FoundItemForm;
