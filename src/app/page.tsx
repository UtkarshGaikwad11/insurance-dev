"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { TrendingUp, Shield, Users as UsersIcon } from "lucide-react";

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.user);
  const policies = useSelector((state: RootState) => state.policies.list);

  const totalPremium = policies.reduce((sum, p) => sum + p.premium, 0);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}</h1>
        <p className="text-blue-100">Here's what's happening with your insurance portfolio today</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Policies</CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-gray-900">{policies.length}</p>
            <p className="text-xs text-gray-500 mt-2">Active insurance policies</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Premium</CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-gray-900">₹{totalPremium.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Annual premium value</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
            <div className="p-2 bg-purple-100 rounded-lg">
              <UsersIcon className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-gray-900">42</p>
            <p className="text-xs text-gray-500 mt-2">Registered customers</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Policies Table */}
      <Card className="shadow-lg">
        <CardHeader className=" border-b">
          <CardTitle className="text-xl font-semibold text-gray-800">Recent Policies</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Overview of your latest insurance policies</p>
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {policies.map((p, index) => (
                  <tr 
                    key={p.id} 
                    className="hover:bg-blue-50 transition-colors"
                  >
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