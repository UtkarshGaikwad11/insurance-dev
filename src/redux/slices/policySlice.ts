import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Policy {
  id: string;
  holderName: string;
  type: string;
  premium: number;
  status: "Active" | "Expired" | "Pending";
}

interface PolicyState {
  list: Policy[];
}

const initialState: PolicyState = {
  list: [
    { id: "P001", holderName: "John Doe", type: "Health", premium: 4500, status: "Active" },
    { id: "P002", holderName: "Jane Smith", type: "Life", premium: 8000, status: "Pending" },
  ],
};

const policySlice = createSlice({
  name: "policies",
  initialState,
  reducers: {
    addPolicy: (state, action: PayloadAction<Policy>) => {
      state.list.push(action.payload);
    },
    removePolicy: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
    },
    updatePolicy: (state, action: PayloadAction<Policy>) => {
  const index = state.list.findIndex((p) => p.id === action.payload.id);
  if (index !== -1) state.list[index] = action.payload;
  },

  },
});



export const { addPolicy, removePolicy, updatePolicy } = policySlice.actions;

export default policySlice.reducer;
