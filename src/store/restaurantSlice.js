import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchRestaurants: (state) => {
      state.loading = true;
      state.error = null; 
    },
fetchRestaurantsSuccess: (state, action) => {
  state.loading = false;
  state.error = null;

  state.list = action.payload.map((restaurant) => ({
    info: {
      id: restaurant.id,
      name: restaurant.name,
      cloudinaryImageId: restaurant.imageUrl,
      avgRating: restaurant.rating,
      cuisines: restaurant.cuisines || [],
      costForTwo: restaurant.costForTwo,
      veg: restaurant?.veg || false,
      sla: {
        slaString: restaurant.deliveryTime
          ? `${restaurant.deliveryTime} mins`
          : "N/A",
      },
    },
  }));
},


    fetchRestaurantsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchRestaurants,
  fetchRestaurantsSuccess,
  fetchRestaurantsFailure,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
