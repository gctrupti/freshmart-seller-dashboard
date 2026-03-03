import { BrowserRouter, Routes, Route } from "react-router-dom";
import SellerDashboard from "./pages/SellerDashboard";
import OrdersPage from "./pages/OrdersPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SellerDashboard />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </BrowserRouter>
  );
}