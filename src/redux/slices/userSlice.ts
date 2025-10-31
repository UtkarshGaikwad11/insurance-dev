import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  role: string;
  email?: string;
  uid?: string;
}

const initialState: UserState = {
  name: "",
  role: "",
  email: "",
  uid: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
  },
});

export const { updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
