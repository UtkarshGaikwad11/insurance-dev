"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, UserCheck } from "lucide-react";

export default function CustomersPage() {
  const policies = useSelector((state: RootState) => state.policies.list);

  // Get unique customers
  const customers = Array.from(
    new Map(policies.map((p) => [p.holderName, p])).values()
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Customers</h1>
          <p className="text-blue-100">Manage and view all registered customers</p>
        </div>
        <div className="p-3 bg-white/20 rounded-lg">
          <Users className="h-8 w-8" />
        </div>
      </div>

      {/* Stats Card */}
      <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Customers</CardTitle>
          <div className="p-2 bg-purple-100 rounded-lg">
            <UserCheck className="h-5 w-5 text-purple-600" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-gray-900">{customers.length}</p>
          <p className="text-xs text-gray-500 mt-2">Unique policy holders</p>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-xl font-semibold text-gray-800">Customer Directory</CardTitle>
          <p className="text-sm text-gray-500 mt-1">List of all customers and their policies</p>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer Name</th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Policy Type</th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Premium</th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {customers.map((c) => (
                  <tr key={c.holderName} className="hover:bg-blue-50 transition-colors">
                    <td className="p-4 text-sm font-medium text-gray-900">{c.holderName}</td>
                    <td className="p-4 text-sm text-gray-700">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {c.type}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-semibold text-gray-900">₹{c.premium.toLocaleString()}</td>
                    <td className="p-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        c.status.toLowerCase() === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : c.status.toLowerCase() === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {c.status}
                      </span>
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