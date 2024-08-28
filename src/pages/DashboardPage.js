import React, { useEffect, useState } from "react";
import Navbar from "../components/Dashboard/Navbar";
import ProductTable from "../components/Dashboard/ProductTable";
import EditProductPopup from "../components/Dashboard/EditProductPopup";
import DeleteProductModal from "../components/Dashboard/DeleteProductModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../store/reducers/productSlice";
import { toast } from "react-toastify";
import APPString from "../APPString";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  const [editProduct, setEditProduct] = useState(null);
  const [deleteProductId, setDeleteProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleDelete = (id) => {
    setIsModalVisible(true);
    setDeleteProduct(id);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleDeleteProduct = async () => {
    try {
      await dispatch(deleteProduct(deleteProductId)).unwrap();
      toast.success(APPString.tostMessage.success.productDeleteSuccess);
    } catch (err) {
      toast.error(`Failed to delete product: ${err.message}`);
    }
    setIsModalVisible(false);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div>
      <Navbar userName={user.email} />
      <div>
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {editProduct && (
          <EditProductPopup
            product={editProduct}
            onClose={() => setEditProduct(null)}
          />
        )}
        {deleteProductId && (
          <DeleteProductModal
            show={isModalVisible}
            onClose={handleCloseModal}
            onSubmit={handleDeleteProduct}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
