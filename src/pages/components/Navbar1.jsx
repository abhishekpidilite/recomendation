import React from "react";
import { useNavigate } from "react-router-dom";
import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Cart from "./Cart";
import SideSheet from "../../utils/components/Sidesheet";
import { useCart } from "../../context/CartContext";

import logo from "../../assets/logo.png";

export default function Navbar1({
  isSidebarOpen,
  setIsSidebarOpen,
  isCartOpen,
  setIsCartOpen,
}) {
  const navigate = useNavigate();
  const { getCartCount } = useCart();

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center sticky top-0 bg-gray-100  z-50 shadow-md -mx-4 px-4">
      <LunchDiningOutlinedIcon
        className="text-gray-800 !w-8 !h-8 cursor-pointer"
        onClick={() => setIsSidebarOpen(true)}
      />

      <img src={logo} alt="logo" className="w-[200px]" />

      <div className="relative">
        <ShoppingCartOutlinedIcon
          className="text-gray-800  !w-8 !h-8 cursor-pointer"
          onClick={() => setIsCartOpen(true)}
        />
        {getCartCount() > 0 && (
          <div className="absolute top-[-7px] right-[-7px] bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            {getCartCount()}
          </div>
        )}
      </div>
      <SideSheet
        anchor="left"
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      >
        <div className="flex flex-col justify-end w-[300px] p-2 min-h-full">
          <button
            onClick={handleLogout}
            className="mt-4 w-full py-2 px-3 bg-[#360133] text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </SideSheet>

      <SideSheet
        anchor="right"
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        title="Cart"
        showBackButton={false}
      >
        <Cart onClose={() => setIsCartOpen(false)} />
      </SideSheet>
    </div>
  );
}
