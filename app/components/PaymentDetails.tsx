import React, { useState } from "react";

const PaymentDetails = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Detail Pembayaran</h2>
        <button
          onClick={toggleDetails}
          className="text-blue-500 font-semibold focus:outline-none"
        >
          {isExpanded ? "Sembunyikan" : "Selengkapnya"}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-2 mt-4">
          <div className="flex justify-between">
            <p>Harga</p>
            <p className="font-semibold">Rp 150.000</p>
          </div>
          <div className="flex justify-between">
            <p>Admin</p>
            <p className="font-semibold">Rp 5.000</p>
          </div>
          <hr className="border"/>
          <div className="flex justify-between">
            <p>Total</p>
            <p className="text-blue-500 font-semibold">Rp 155.000</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
