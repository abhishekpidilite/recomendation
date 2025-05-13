import { Drawer, IconButton } from "@mui/material";
import React from "react";
import { ArrowBack, Close } from "@mui/icons-material";

const SideSheet = ({
  children,
  width,
  title,
  showBackButton = true,
  onClose,
  anchor = "right",
  ...props
}) => {
  return (
    <Drawer
      anchor={anchor}
      variant="temporary"
      ModalProps={{
        keepMounted: false,
      }}
      onClose={onClose}
      {...props}
      sx={{
        "& .MuiDrawer-paper": {
          borderRadius: "16px",
          right: anchor === "right" ? "20px" : "auto",
          left: anchor === "left" ? "20px" : "auto",
          height: "95%",
          top: "20px",
          maxWidth: width || 350,
          backgroundColor: "#FFFFFF",
        },
        "& .MuiDrawer-paper::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {title && (
        <div className="flex justify-between items-center sticky top-0 p-2 z-2 bg-white border-b border-gray-200">
          <div className="flex gap-2 items-center">
            {showBackButton && (
              <IconButton onClick={onClose}>
                <ArrowBack className="text-[--textSecondarySecondary]" />
              </IconButton>
            )}
            <p className="text-lg font-medium">{title}</p>
          </div>
          <IconButton onClick={onClose}>
            <Close className="text-[--textSecondarySecondary]" />
          </IconButton>
        </div>
      )}
      {children}
    </Drawer>
  );
};

export default SideSheet;
