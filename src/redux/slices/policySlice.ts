"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { auth } from "@/firebase/firebase.config";
import {
  subscribeToPolicies,
  addPolicyToFirestore,
  updatePolicyInFirestore,
  deletePolicyFromFirestore,
} from "@/lib/firestore/policies";

export interface Policy {
  id: string;
  holderName: string;
  type: string;
  premium: number;
  status: "Active" | "Expired" | "Pending";
}

interface PolicyState {
  items: Policy[];
  loading: boolean;
  error: string | null;
}

const initialState: PolicyState = {
  items: [],
  loading: false,
  error: null,
};

// Keep unsubscribe OUTSIDE Redux
let unsubscribeFn: (() => void) | null = null;

// ✅ Load all policies (with real-time updates)
export const loadPolicies = createAsyncThunk(
  "policies/load",
  async (_, { dispatch, rejectWithValue }) => {
    const user = auth.currentUser;
    if (!user) return rejectWithValue("User not authenticated");

    // Clean up previous listener if exists
    if (unsubscribeFn) {
      unsubscribeFn();
      unsubscribeFn = null;
    }

    // Set up real-time listener
    unsubscribeFn = subscribeToPolicies(user.uid, (policies) => {
      dispatch(setPolicies(policies as Policy[]));
    });

    return true;
  }
);

// ✅ Stop listening (optional helper)
export const stopListeningPolicies = createAsyncThunk(
  "policies/stopListening",
  async () => {
    if (unsubscribeFn) {
      unsubscribeFn();
      unsubscribeFn = null;
    }
  }
);

// ✅ Create new policy
export const createPolicy = createAsyncThunk(
  "policies/create",
  async (policyData: Omit<Policy, "id">, { rejectWithValue }) => {
    const user = auth.currentUser;
    if (!user) return rejectWithValue("User not authenticated");
    await addPolicyToFirestore(user.uid, policyData);
  }
);

// ✅ Edit policy
export const editPolicy = createAsyncThunk(
  "policies/edit",
  async (
    { id, ...policyData }: Omit<Policy, "id"> & { id: string },
    { rejectWithValue }
  ) => {
    const user = auth.currentUser;
    if (!user) return rejectWithValue("User not authenticated");
    await updatePolicyInFirestore(user.uid, id, policyData);
  }
);

// ✅ Delete policy
export const removePolicy = createAsyncThunk(
  "policies/remove",
  async (id: string, { rejectWithValue }) => {
    const user = auth.currentUser;
    if (!user) return rejectWithValue("User not authenticated");
    await deletePolicyFromFirestore(user.uid, id);
  }
);

const policiesSlice = createSlice({
  name: "policies",
  initialState,
  reducers: {
    setPolicies: (state, action: PayloadAction<Policy[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPolicies.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadPolicies.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loadPolicies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createPolicy.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPolicy.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createPolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editPolicy.pending, (state) => {
        state.loading = true;
      })
      .addCase(editPolicy.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editPolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removePolicy.pending, (state) => {
        state.loading = true;
      })
      .addCase(removePolicy.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removePolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPolicies } = policiesSlice.actions;
export const selectPolicies = (state: { policies: PolicyState }) =>
  state.policies.items;

export default policiesSlice.reducer;
