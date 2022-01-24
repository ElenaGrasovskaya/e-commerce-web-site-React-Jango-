import { LiqPayPay, LiqPaySubscribe } from "react-liqpay";
import React from "react";

function LiqPayButton({amount, currency = "UAH", title, orderId}) {


  const ButtonComponent = () => (
    <button
      style={{
        backgroundColor: "#337ab7",
        color: "#fff",
        borderColor: "#2e6da4",
        border: "1px solid transparent",
        borderRadius: "4px",
        padding: "6px 12px",
        cursor: "pointer",
      }}
    >
      {`${title} ${amount} ${currency}`}
    </button>
  );

  return (
    <LiqPayPay
      publicKey={"sandbox_i65872401265"}
      privateKey={"sandbox_79UGlbhgwK02jqzanvOBQ5LfRJksM6i1Qb0L55Hb"}
      amount={amount}
      description={title}
      currency="UAH"
      orderId={orderId}
      result_url={`/orders/${orderId}`}
      server_url="http://server.domain.com/liqpay"
      product_description="Thank you for choosing LeSport Shop"
      style={{ margin: "8px" }}
      disabled={false}
    />
  );
}

export default LiqPayButton;
