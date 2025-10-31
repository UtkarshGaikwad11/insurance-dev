// lib/firestore/policies.ts
import { db } from "@/firebase/firebase.config";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";

// Helper to get a user's policies collection reference
const getUserPoliciesRef = (uid: string) => collection(db, "users", uid, "policies");

// Fetch all policies for the current user (once)
export async function fetchAllPoliciesOnce(uid: string) {
  const q = query(getUserPoliciesRef(uid), orderBy("holderName"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Subscribe to real-time updates for a user's policies
export function subscribeToPolicies(uid: string, onChange: (policies: any[]) => void) {
  const q = query(getUserPoliciesRef(uid), orderBy("holderName"));
  return onSnapshot(q, (snapshot) => {
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    onChange(list);
  });
}

// Add a new policy for the current user
export async function addPolicyToFirestore(uid: string, data: any) {
  await addDoc(getUserPoliciesRef(uid), data);
}

// Update an existing policy
export async function updatePolicyInFirestore(uid: string, id: string, data: any) {
  await updateDoc(doc(db, "users", uid, "policies", id), data);
}

// Delete a policy
export async function deletePolicyFromFirestore(uid: string, id: string) {
  await deleteDoc(doc(db, "users", uid, "policies", id));
}
