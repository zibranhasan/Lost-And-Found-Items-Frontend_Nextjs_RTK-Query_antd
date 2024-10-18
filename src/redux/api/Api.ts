import { baseApi } from "./baseApi";
import { tagTypes } from "./tag-types";

export const AllApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createLostItem: build.mutation({
      query: (data) => ({
        url: "/lost-items",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.foundItem],
    }),
    createFoundItem: build.mutation({
      query: (data) => ({
        url: "/found-items",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.lostItem],
    }),

    getAllCategory: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/found-item-categories",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any) => {
        return {
          response,
        };
      },
      providesTags: [tagTypes.foundItem, tagTypes.lostItem],
    }),

    getMyLostItems: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/my-lost-items",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any) => {
        return {
          response,
        };
      },
      providesTags: [tagTypes.lostItem],
    }),
    getMyFoundItems: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/myFound-items",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any) => {
        return {
          response,
        };
      },
      providesTags: [tagTypes.foundItem, tagTypes.claim],
    }),
    getMyProfile: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/my-profile",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any) => {
        return {
          response,
        };
      },
      providesTags: [tagTypes.user],
    }),
    updateMyProfile: build.mutation({
      query: (data) => ({
        url: "/UpdateMy-profile",
        method: "PUT",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    changePassword: build.mutation({
      query: (data) => ({
        url: "/change-password",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    getAllLostItems: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/lost-items/recent",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any) => {
        return {
          response,
        };
      },
      providesTags: [tagTypes.lostItem],
    }),

    //get single doctor
    getLostItemsById: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/lost-items/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return {
          response,
        };
      },
      providesTags: [tagTypes.lostItem],
    }),
    getFoundItemsById: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/found-items/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return {
          response,
        };
      },
      providesTags: [tagTypes.foundItem, tagTypes.claim],
    }),
    // update a doctor

    getLostItemsWithFiltering: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/lost-itemsWithFiltering",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any) => {
        return {
          response,
        };
      },
      providesTags: [tagTypes.lostItem],
    }),

    getFoundItemsWithFiltering: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/found-itemsWithFiltering",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any) => {
        return {
          response,
        };
      },
      providesTags: [tagTypes.foundItem, tagTypes.claim],
    }),
    getAllUsersData: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/users",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any) => {
        return {
          response,
        };
      },
      providesTags: [tagTypes.user],
    }),
    updateUserStatus: build.mutation({
      query: (data) => ({
        url: `/users/status/${data.userId}`,
        method: "PUT",
        data: data.status,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useCreateLostItemMutation,
  useGetAllCategoryQuery,
  useGetAllLostItemsQuery,
  useGetLostItemsByIdQuery,
  useCreateFoundItemMutation,

  useGetMyLostItemsQuery,
  useGetMyFoundItemsQuery,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useChangePasswordMutation,
  useGetLostItemsWithFilteringQuery,
  useGetFoundItemsWithFilteringQuery,
  useUpdateUserStatusMutation,
  useGetAllUsersDataQuery,
  useGetFoundItemsByIdQuery,
} = AllApi;
