import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  role: string;
}

const initialState: UserState = {
  name: "Admin",
  role: "Insurance Manager",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
