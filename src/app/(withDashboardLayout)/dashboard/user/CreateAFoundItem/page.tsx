"use client"; // This directive marks the file as a Client Component

import React, { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import {
  useCreateFoundItemMutation,
  useGetAllCategoryQuery,
} from "@/redux/api/userApi";
import { jwtDecode } from "jwt-decode"; // Correct usage without destructuring
import { useForm, FormProvider, Controller } from "react-hook-form"; // Import form methods
import axios from "axios";

const FoundItemForm = () => {
  const router = useRouter();
  const { data: categoriesResponse, isLoading: categoriesLoading } =
    useGetAllCategoryQuery({});
  const [createFoundItem] = useCreateFoundItemMutation();

  const methods = useForm(); // Initialize useForm
  const { control, handleSubmit, setValue, reset } = methods;

  const [isNewCategory, setIsNewCategory] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token); // Decode JWT token
      setUserId(decoded.userId);
    }
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "new") {
      setIsNewCategory(true);
      setValue("categoryName", "");
    } else {
      setIsNewCategory(false);
      setValue("categoryName", value);
    }
  };

  const onSubmit = async (data: any) => {
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

      await createFoundItem({
        ...data,
        userId,
        photo: imageUrl,
      }).unwrap();

      alert("Found item created successfully");
      reset({
        categoryName: "",
        foundItemName: "",
        description: "",
        location: "",
      });
      setImage(null);
      setIsNewCategory(false);
    } catch (error: any) {
      alert("Error creating found item: " + error.message);
    }
  };

  const categories = categoriesResponse?.response || [];

  if (categoriesLoading) return <div>Loading categories...</div>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Report Found Item</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category:
              <Controller
                name="categoryName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select
                    {...field}
                    value={isNewCategory ? "new" : field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      handleCategoryChange(e);
                    }}
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
                )}
              />
            </label>
          </div>
          {isNewCategory && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Category Name:
                <Controller
                  name="newCategoryName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  )}
                />
              </label>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Found Item Name:
              <Controller
                name="foundItemName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                )}
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image:
              <input
                type="file"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description:
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                )}
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location:
              <Controller
                name="location"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                )}
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
      </FormProvider>
    </div>
  );
};

export default FoundItemForm;
