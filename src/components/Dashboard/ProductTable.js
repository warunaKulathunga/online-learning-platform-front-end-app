import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="container p-4 mx-auto overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Model</th>
            <th className="px-4 py-2 border-b">Brand</th>
            <th className="px-4 py-2 border-b">Price</th>
            <th className="px-4 py-2 border-b">Storage</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-2 text-center border-b">{product._id}</td>
              <td className="px-4 py-2 text-center border-b">
                {product.model}
              </td>
              <td className="px-4 py-2 text-center border-b">
                {product.brand}
              </td>
              <td className="px-4 py-2 text-center border-b">
                {product.price}
              </td>
              <td className="px-4 py-2 text-center border-b">
                {product.storage}
              </td>
              <td className="px-4 py-2 text-center border-b">
                <button
                  onClick={() => onEdit(product)}
                  className="mx-2 text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(product._id)}
                  className="mx-2 text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
