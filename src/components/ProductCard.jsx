import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";

export default function ProductCard({
  product,
  onDeleteProduct,
  onDeleteVariant,
  onAddVariant,
}) {
  const [newVariant, setNewVariant] = useState(null);

  const convertToBaseUnit = (variant) => {
    const qty = Number(variant.qty);

    switch (variant.unit) {
      case "kg":
        return qty * 1000;
      case "gm":
        return qty;
      case "L":
        return qty * 1000;
      case "ml":
        return qty;
      default:
        return qty;
    }
  };

  const sortedVariants = [...product.variants].sort(
    (a, b) => convertToBaseUnit(a) - convertToBaseUnit(b)
  );

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden relative">

      {/* Delete Product */}
      <button
        onClick={onDeleteProduct}
        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
      >
        <Trash2 size={16} className="text-red-500" />
      </button>

      {/* Image */}
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-3">
          {product.name}
        </h3>

        {/* Existing Variants */}
        {sortedVariants.map((variant, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm mb-2"
          >
            <span>
              {variant.qty} {variant.unit}
            </span>

            <div className="flex items-center gap-3">
              <span className="text-green-600 font-medium">
                ₹{variant.price}
              </span>

              <button
                onClick={() => onDeleteVariant(index)}
                className="text-red-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}

        {/* New Variant Input Row */}
        {newVariant && (
          <div className="flex gap-2 mt-3">
            <input
              type="number"
              placeholder="Qty"
              className="border px-2 py-1 rounded w-1/3"
              onChange={(e) =>
                setNewVariant({
                  ...newVariant,
                  qty: e.target.value,
                })
              }
            />

            <select
              className="border px-2 py-1 rounded w-1/3"
              onChange={(e) =>
                setNewVariant({
                  ...newVariant,
                  unit: e.target.value,
                })
              }
            >
              <option value="kg">kg</option>
              <option value="gm">gm</option>
              <option value="L">L</option>
              <option value="ml">ml</option>
              <option value="pack">pack</option>
              <option value="piece">piece</option>
            </select>

            <input
              type="number"
              placeholder="Price"
              className="border px-2 py-1 rounded w-1/3"
              onChange={(e) =>
                setNewVariant({
                  ...newVariant,
                  price: e.target.value,
                })
              }
            />
          </div>
        )}

        {/* Add Button */}
        <button
          onClick={() => {
            if (!newVariant) {
              setNewVariant({ qty: "", unit: "kg", price: "" });
            } else {
              if (
                newVariant.qty &&
                newVariant.price
              ) {
                onAddVariant(newVariant);
                setNewVariant(null);
              }
            }
          }}
          className="mt-4 w-full border border-green-600 text-green-600 py-2 rounded-lg flex justify-center items-center gap-2"
        >
          <Plus size={16} />
          {newVariant ? "Save Quantity" : "Add Quantity"}
        </button>
      </div>
    </div>
  );
}