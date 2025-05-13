import React, { useEffect } from "react";
import { useComparePrice } from "../../api/comparePrice";
import { CircularProgress } from "@mui/material";
import CascadeLoader from "./loader";

export default function ComparePrices({ productName }) {
  const {
    mutate: getComparePrice,
    data: comparePriceData,
    isPending: isComparePriceLoading,
  } = useComparePrice();

  useEffect(() => {
    getComparePrice({ productName });
  }, []);

  return (
    <>
      {isComparePriceLoading ? (
        <CascadeLoader />
      ) : (
        <>
          <div className="flex justify-between items-center ">
            <span className="text-xs font-semibold  text-gray-500">
              {comparePriceData?.data?.vendor?.split(" ").slice(0, 2).join(" ")}
              {/* {comparePriceData?.data?.vendor} */}
            </span>
            <span className="text-sm font-bold text-[#000000d9]">
              ₹{comparePriceData?.data?.competitorMaxPrice}
            </span>
          </div>

          <div className="flex justify-between items-center ">
            <span className="text-sm font-semibold text-green-800">
              You save
            </span>
            <span className="text-sm font-bold text-[#000000d9] flex items-center gap-1">
              🔥 ₹{comparePriceData?.data?.savings}
            </span>
          </div>
        </>
      )}
    </>
  );
}
