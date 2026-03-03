import React, { useState } from "react";
import { Package, IndianRupee, TrendingUp } from "lucide-react";

export default function OrdersPage() {
  const [orderStatus, setOrderStatus] = useState("Pending");

  const products = [
    {
      name: "Fresh Tomatoes",
      variants: [
        { qty: 1, unit: "kg", price: 40 },
        { qty: 500, unit: "gm", price: 25 },
      ],
    },
    {
      name: "Basmati Rice",
      variants: [
        { qty: 5, unit: "kg", price: 450 },
        { qty: 1, unit: "kg", price: 120 },
      ],
    },
    {
      name: "Organic Spinach",
      variants: [
        { qty: 250, unit: "gm", price: 20 },
        { qty: 500, unit: "gm", price: 30 },
      ],
    },
    {
      name: "Toned Milk",
      variants: [
        { qty: 1, unit: "L", price: 58 },
        { qty: 500, unit: "ml", price: 30 },
      ],
    },
  ];

  // 🔹 Convert units to base unit for correct sorting
  const convertToBaseUnit = (variant) => {
    switch (variant.unit) {
      case "kg":
        return variant.qty * 1000;
      case "gm":
        return variant.qty;
      case "L":
        return variant.qty * 1000;
      case "ml":
        return variant.qty;
      default:
        return variant.qty;
    }
  };

  // 🔹 Calculate total amount
  const totalAmount = products.reduce((acc, product) => {
    return (
      acc +
      product.variants.reduce(
        (sum, v) => sum + Number(v.price),
        0
      )
    );
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white shadow-sm px-10 py-4">
        <h1 className="text-xl font-semibold text-green-700">
          FreshMart{" "}
          <span className="text-gray-500 text-sm">
            Seller Dashboard
          </span>
        </h1>
      </div>

      {/* Hero */}
      <div
        className="h-56 bg-cover bg-center flex items-center px-12 text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1610832958506-aa56368176cf')",
        }}
      >
        <div>
          <h2 className="text-4xl font-bold">
            Order Summary
          </h2>
          <p className="mt-2 text-lg">
            Dealer order invoice & product overview
          </p>
          <p className="mt-2 text-sm bg-white/20 inline-block px-3 py-1 rounded">
            Status: {orderStatus}
          </p>
        </div>
      </div>

      <div className="px-10 -mt-10 pb-10">

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Products"
            value={products.length}
            icon={Package}
          />
          <StatCard
            title="Catalog Value"
            value={`₹${totalAmount}`}
            icon={IndianRupee}
          />
          <StatCard
            title="Active Listings"
            value={products.length}
            icon={TrendingUp}
          />
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {products.map((product, index) => {
            const sortedVariants = [...product.variants].sort(
              (a, b) =>
                convertToBaseUnit(a) -
                convertToBaseUnit(b)
            );

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow overflow-hidden"
              >
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  <Package size={40} className="text-gray-300" />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-3">
                    {product.name}
                  </h3>

                  {sortedVariants.map((variant, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm text-gray-600 mb-2"
                    >
                      <span>
                        {variant.qty} {variant.unit}
                      </span>
                      <span className="text-green-600 font-medium">
                        ₹{variant.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 🔥 Accept / Reject Section (Above Total) */}
        <div className="mt-10 flex justify-end gap-4">
          <button
            onClick={() => setOrderStatus("Rejected")}
            className="px-6 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-50"
          >
            Reject
          </button>

          <button
            onClick={() => setOrderStatus("Accepted")}
            className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            Accept
          </button>
        </div>

        {/* Total Section */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-6 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 text-white p-3 rounded-lg">
              <IndianRupee size={20} />
            </div>

            <div>
              <p className="text-gray-600 text-sm">
                Total Order Amount
              </p>
              <h2 className="text-2xl font-bold text-gray-800">
                ₹{totalAmount}
              </h2>
            </div>
          </div>

          <div className="text-gray-500 text-sm">
            {products.length} items
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
      <div className="bg-green-100 text-green-600 p-3 rounded-lg">
        <Icon size={22} />
      </div>

      <div>
        <p className="text-gray-500 text-sm">
          {title}
        </p>
        <h2 className="text-xl font-bold">
          {value}
        </h2>
      </div>
    </div>
  );
}