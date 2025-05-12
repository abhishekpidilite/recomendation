import React from "react";
import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SideSheet from "../../../utils/components/Sidesheet";

export default function Navbar1({
  isSidebarOpen,
  setIsSidebarOpen,
  isCartOpen,
  setIsCartOpen,
}) {
  return (
    <div className="flex justify-between">
      <LunchDiningOutlinedIcon
        className="text-white !w-8 !h-8 cursor-pointer"
        onClick={() => setIsSidebarOpen(true)}
      />

      <ShoppingCartOutlinedIcon
        className="text-white  !w-8 !h-8 cursor-pointer"
        onClick={() => setIsCartOpen(true)}
      />
      <SideSheet
        anchor="left"
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      >
        <div className="flex flex-col justify-end w-[300px] p-2 min-h-full">
          <p>Cart</p>
        </div>
      </SideSheet>

      <SideSheet
        anchor="right"
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      >
        <div className="flex justify-between w-[300px]">
          <p>LOGO</p>
          <p>Cart</p>
        </div>
      </SideSheet>
    </div>
  );
}
