import React, { useEffect } from "react";
import { useComparePrice } from "../../api/comparePrice";
import { CircularProgress } from "@mui/material";

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
        <CircularProgress className="text-white" />
      ) : (
        <>
          <div className="flex justify-between items-center ">
            <span className="text-sm font-bold text-gray-500">
              {comparePriceData?.data?.vendor}
            </span>
            <span className="text-sm font-bold text-[#000000d9]">
              {comparePriceData?.data?.competitorMaxPrice}
            </span>
          </div>
        </>
      )}
      {isComparePriceLoading ? (
        <CircularProgress className="text-white" />
      ) : (
        <div className="flex justify-between items-center ">
          <span className="text-sm font-bold text-gray-500">Savings</span>
          <span className="text-sm font-bold text-[#000000d9]">
            {comparePriceData?.data?.savings}
          </span>
        </div>
      )}
    </>
  );
}
