"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { addPolicy, removePolicy, updatePolicy } from "@/redux/slices/policySlice";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Edit2, Trash2, Shield } from "lucide-react";

interface FormData {
  id?: string;
  holderName: string;
  type: string;
  premium: string;
  status: "Active" | "Expired" | "Pending";
}

export default function PoliciesPage() {
  const dispatch = useDispatch();
  const policies = useSelector((state: RootState) => state.policies.list);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    holderName: "",
    type: "",
    premium: "",
    status: "Active",
  });

  // Handle Save or Update
  const handleSubmit = () => {
    if (!formData.holderName || !formData.type || !formData.premium) return;

    if (editing) {
      dispatch(
        updatePolicy({
          id: formData.id!,
          holderName: formData.holderName,
          type: formData.type,
          premium: Number(formData.premium),
          status: formData.status,
        })
      );
    } else {
      dispatch(
        addPolicy({
          id: `P${Math.floor(Math.random() * 10000)}`,
          holderName: formData.holderName,
          type: formData.type,
          premium: Number(formData.premium),
          status: formData.status,
        })
      );
    }

    setFormData({ holderName: "", type: "", premium: "", status: "Active" });
    setEditing(false);
    setOpen(false);
  };

  // Handle Edit button click
  const handleEdit = (policy: any) => {
    setFormData({
      id: policy.id,
      holderName: policy.holderName,
      type: policy.type,
      premium: String(policy.premium),
      status: policy.status,
    });
    setEditing(true);
    setOpen(true);
  };

  // Handle Delete
  const handleDelete = (id: string) => {
    dispatch(removePolicy(id));
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Policies Management</h1>
        </div>
        <p className="text-blue-100">Manage and monitor all insurance policies</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className=" border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-800">All Policies</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Total: {policies.length} policies</p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                  onClick={() => {
                    setEditing(false);
                    setFormData({
                      holderName: "",
                      type: "",
                      premium: "",
                      status: "Active",
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Policy
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold text-gray-800">
                    {editing ? "Edit Policy" : "Add New Policy"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Policy Holder Name
                    </label>
                    <Input
                      placeholder="Enter holder name"
                      value={formData.holderName}
                      onChange={(e) =>
                        setFormData({ ...formData, holderName: e.target.value })
                      }
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Policy Type
                    </label>
                    <Input
                      placeholder="e.g. Health, Life, Auto"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Premium Amount
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={formData.premium}
                      onChange={(e) =>
                        setFormData({ ...formData, premium: e.target.value })
                      }
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Status
                    </label>
                    <select
                      className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as "Active" | "Expired" | "Pending",
                        })
                      }
                    >
                      <option value="Active">Active</option>
                      <option value="Expired">Expired</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                  <Button 
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {editing ? "Update Policy" : "Save Policy"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Policy ID</th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Holder Name</th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Premium</th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {policies.map((p) => (
                  <tr key={p.id} className="hover:bg-blue-50 transition-colors">
                    <td className="p-4 text-sm font-medium text-gray-900">{p.id}</td>
                    <td className="p-4 text-sm text-gray-700">{p.holderName}</td>
                    <td className="p-4 text-sm text-gray-700">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {p.type}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-semibold text-gray-900">₹{p.premium.toLocaleString()}</td>
                    <td className="p-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        p.status.toLowerCase() === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : p.status.toLowerCase() === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(p)}
                          className="border-blue-300 text-blue-700 hover:bg-blue-50"
                        >
                          <Edit2 className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(p.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}