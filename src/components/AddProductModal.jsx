import React, { useState } from "react";

export default function AddProductModal({ close, addProduct }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [variants, setVariants] = useState([
    { qty: "", unit: "kg", price: "" },
  ]);

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, { qty: "", unit: "kg", price: "" }]);
  };

  const removeVariant = (index) => {
    const updated = variants.filter((_, i) => i !== index);
    setVariants(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      image: image ? URL.createObjectURL(image) : "",
      name,
      variants,
    };

    addProduct(newProduct);
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[520px] rounded-2xl shadow-2xl p-8 relative">

        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Upload Box */}
<div>
  <p className="text-sm font-medium mb-2">Product Image</p>

  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl h-40 cursor-pointer hover:border-green-500 transition relative overflow-hidden">

    {image ? (
      <img
        src={URL.createObjectURL(image)}
        alt="preview"
        className="h-full w-full object-cover"
      />
    ) : (
      <>
        <span className="text-gray-400 text-sm">
          Click to upload image
        </span>
        <span className="text-xs text-gray-400">
          PNG, JPG up to 5MB
        </span>
      </>
    )}

    <input
      type="file"
      className="hidden"
      onChange={(e) => setImage(e.target.files[0])}
      required
    />
  </label>
</div>

          {/* Product Name */}
          <div>
            <p className="text-sm font-medium mb-2">Product Name</p>
            <input
              type="text"
              placeholder="e.g. Fresh Tomatoes"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Quantity Section */}
          <div>
            <p className="text-sm font-medium mb-3">Quantity & Pricing</p>

            {variants.map((variant, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg mb-3"
              >
                <input
                  type="number"
                  placeholder="Qty"
                  className="w-1/4 border rounded-lg px-3 py-2"
                  value={variant.qty}
                  onChange={(e) =>
                    handleVariantChange(index, "qty", e.target.value)
                  }
                  required
                />

                <select
                  className="w-1/4 border rounded-lg px-3 py-2"
                  value={variant.unit}
                  onChange={(e) =>
                    handleVariantChange(index, "unit", e.target.value)
                  }
                >
                  <option value="kg">kg</option>
                  <option value="gm">gm</option>
                  <option value="L">L</option>
                  <option value="ml">ml</option>

                   {/* Count */}
  <option value="piece">piece</option>
  <option value="pack">pack</option>
  <option value="box">box</option>
  <option value="tub">tub</option>
                </select>

                <input
                  type="number"
                  placeholder="Price (₹)"
                  className="w-1/3 border rounded-lg px-3 py-2"
                  value={variant.price}
                  onChange={(e) =>
                    handleVariantChange(index, "price", e.target.value)
                  }
                  required
                />

                {variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="text-red-500 text-lg"
                  >
                    🗑
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addVariant}
              className="text-green-600 text-sm font-medium"
            >
              + Add Another Quantity
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}