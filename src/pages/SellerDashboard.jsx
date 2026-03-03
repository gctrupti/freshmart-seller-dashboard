import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import AddProductModal from "../components/AddProductModal";
import StatsCard from "../components/StatsCard";
import { Package, IndianRupee, TrendingUp } from "lucide-react";

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  // 🔹 Add New Product
  const addProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  // 🔹 Delete Full Product
  const deleteProduct = (productIndex) => {
    setProducts((prev) =>
      prev.filter((_, index) => index !== productIndex)
    );
  };

  // 🔹 Delete Variant
  const deleteVariant = (productIndex, variantIndex) => {
    const updated = [...products];

    updated[productIndex].variants.splice(variantIndex, 1);

    // If no variants left → remove product completely
    if (updated[productIndex].variants.length === 0) {
      updated.splice(productIndex, 1);
    }

    setProducts(updated);
  };

  // 🔹 Add Variant From Card
  const addVariant = (productIndex, variantData) => {
    const updated = [...products];
    updated[productIndex].variants.push(variantData);
    setProducts(updated);
  };

  // 🔹 Search Filter
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Calculate Catalog Value
  const totalValue = products.reduce((acc, product) => {
    const productTotal = product.variants.reduce(
      (sum, variant) => sum + Number(variant.price || 0),
      0
    );
    return acc + productTotal;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Header */}
      <div className="bg-white shadow-sm px-10 py-4">
        <h1 className="text-xl font-semibold text-green-700">
          FreshMart{" "}
          <span className="text-gray-500 text-sm">
            Seller Dashboard
          </span>
        </h1>
      </div>

      {/* Hero Section */}
      <div
        className="h-56 bg-cover bg-center flex items-center px-12 text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1610832958506-aa56368176cf')",
        }}
      >
        <div>
          <h2 className="text-4xl font-bold">
            Manage Your Products
          </h2>
          <p className="mt-2 text-lg">
            Add, view and organize your grocery catalog
          </p>
        </div>
      </div>

      <div className="px-10 -mt-10 pb-10">

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Products"
            value={products.length}
            icon={Package}
          />

          <StatsCard
            title="Catalog Value"
            value={`₹${totalValue}`}
            icon={IndianRupee}
          />

          <StatsCard
            title="Active Listings"
            value={products.length}
            icon={TrendingUp}
          />
        </div>

        {/* Search + Add Button */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-1/3 border rounded-lg px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-green-500 outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            + Add Product
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, productIndex) => (
              <ProductCard
                key={productIndex}
                product={product}
                onDeleteProduct={() =>
                  deleteProduct(productIndex)
                }
                onDeleteVariant={(variantIndex) =>
                  deleteVariant(productIndex, variantIndex)
                }
                onAddVariant={(variantData) =>
                  addVariant(productIndex, variantData)
                }
              />
            ))
          ) : (
            <div className="col-span-4 text-center py-20 text-gray-400">
              No products added yet.
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <AddProductModal
          close={() => setShowModal(false)}
          addProduct={addProduct}
        />
      )}
    </div>
  );
}