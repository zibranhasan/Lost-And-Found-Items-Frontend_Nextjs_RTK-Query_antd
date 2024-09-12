import { baseApi } from "./baseApi";
import { tagTypes } from "./tag-types";

export const AllApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createClaim: build.mutation({
      query: (data) => ({
        url: "/claims",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.claim],
    }),

    getAllClaim: build.query({
      query: () => ({
        url: "/claims",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return {
          response,
        };
      },
      providesTags: [tagTypes.claim],
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
      providesTags: [tagTypes.claim],
    }),

    updateClaims: build.mutation({
      query: (data) => ({
        url: `/claims/${data.id}`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: [tagTypes.claim],
    }),
    deleteClaims: build.mutation({
      query: (id) => ({
        url: `/claims/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.claim],
    }),
  }),
});

export const {
  useCreateClaimMutation,
  useGetAllClaimQuery,
  useGetMyClaimsQuery,
  useUpdateClaimsMutation,
  useDeleteClaimsMutation,
} = AllApi;
