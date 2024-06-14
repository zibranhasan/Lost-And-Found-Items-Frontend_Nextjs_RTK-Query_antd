import { baseApi } from "./baseApi";
import { tagTypes } from "./tag-types";

export const doctorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createLostItem: build.mutation({
      query: (data) => ({
        url: "/lost-items",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      // invalidatesTags: [tagTypes.doctor],
    }),
    createFoundItem: build.mutation({
      query: (data) => ({
        url: "/found-items",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      // invalidatesTags: [tagTypes.doctor],
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
      providesTags: [tagTypes.doctor],
    }),
    getMyClaims: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/myClaims",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any) => {
        return {
          response,
        };
      },
      providesTags: [tagTypes.doctor],
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
      providesTags: [tagTypes.doctor],
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
      providesTags: [tagTypes.doctor],
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
      providesTags: [tagTypes.doctor],
    }),
    updateMyProfile: build.mutation({
      query: (data) => ({
        url: "/UpdateMy-profile",
        method: "PUT",
        data: data,
      }),
      invalidatesTags: [tagTypes.doctor, tagTypes.user],
    }),

    changePassword: build.mutation({
      query: (data) => ({
        url: "/change-password",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.doctor],
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
      providesTags: [tagTypes.doctor],
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
      providesTags: [tagTypes.doctor],
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
      providesTags: [tagTypes.doctor],
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
      providesTags: [tagTypes.doctor],
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
      providesTags: [tagTypes.doctor],
    }),
    updateUserStatus: build.mutation({
      query: (data) => ({
        url: `/users/status/${data.userId}`,
        method: "PUT",
        data: data.status,
      }),
      invalidatesTags: [tagTypes.doctor, tagTypes.user],
    }),
  }),
});

export const {
  useCreateLostItemMutation,
  useGetAllCategoryQuery,
  useGetAllLostItemsQuery,
  useGetLostItemsByIdQuery,

  useCreateFoundItemMutation,
  useGetMyClaimsQuery,
  useGetMyLostItemsQuery,
  useGetMyFoundItemsQuery,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useChangePasswordMutation,
  useGetLostItemsWithFilteringQuery,
  useGetFoundItemsWithFilteringQuery,
  useUpdateUserStatusMutation,
  useGetAllUsersDataQuery,
} = doctorApi;
