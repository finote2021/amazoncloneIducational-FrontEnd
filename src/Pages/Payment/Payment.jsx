import React, { useContext, useState } from "react";
import "./Payment.css";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  console.log(user);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // 1. Backend / functions ---> contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      const { clientSecret } = response.data;

      // 2. Client-side (React side) confirmation
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log(paymentIntent);
      // 3. After the confirmation ---> order Firestore database save, clear basket
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      console.log(paymentIntent.amount);
      // empty the basket
      dispatch({ type: Type.EMPTY_BASKET });
      setProcessing(false);
    } catch (error) {
      console.error("Error in payment:", error);
      setProcessing(false);
    }
    navigate("/orders", { state: { msg: "You have a new order" } });
  };
  return (
    <LayOut>
      {/* header */}
      <div className="payment_header">check out ({totalItem}) items</div>
      {/* payment method */}
      <section className="payment">
        {/* address */}
        <div className="flex">
          <h3>Delivery Address</h3>
          {user && (
            <div>
              <div>{user?.email}</div>
              <div>123 react learn</div>
              <div>Chicago, IL</div>
            </div>
          )}
        </div>
        <hr />
        {/* product */}
        <div className="flex">
          <h3>Review items and Delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className="flex">
          <h3>Payment Methods</h3>
          <div className="payment_card_container">
            <div className="payment_details">
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className="payment_price">
                  <div>
                    <span style={{ display: "flex", gap: "15px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className="loading">
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;

// payment UI with out payment functionality

// import React, { useContext, useState } from "react";

// import LayOut from "../../components/LayOut/LayOut";
// import { DataContext } from "../../components/DataProvider/DataProvider";
// import ProductCard from "../../components/Product/ProductCard";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
// import {axiosInstance} from "../../Api/axios.js"
// function Payment() {
//   const [{ user, basket }] = useContext(DataContext);
//   console.log(user);

//   const totalItem = basket?.reduce((amount, item) => {
//     return item.amount + amount;
//   }, 0);

//   const total = basket.reduce((amount, item) => {
//     return item.price * item.amount + amount;
//   }, 0);

//   const [cardError, setCardError] = useState(null);
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleChange = (e) => {
//     console.log(e);
//     e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
//   };

//   return (
//     <LayOut>
//       {/* header */}
//       <div className="payment_header">Checkout ({totalItem}) items</div>
//       {/* payment method */}
//       <section className="payment">
//         {/* address */}
//         <div className="flex">
//           <h3>Delivery Address</h3>
//           <div>
//             <div>{user?.email}</div>
//             <div>123 React Lane</div>
//             <div>Chicago, IL</div>
//           </div>
//         </div>
//         <hr />
//         {/* product */}
//         <div>
//           <h3>Review items and delivery</h3>
//           <div>
//             {basket?.map((item) => (
//               <ProductCard product={item} flex={true} />
//             ))}
//           </div>
//         </div>
//         <hr />
//         {/* card form */}
//         <div className="flex">
//           <h3>Payment methods</h3>
//           <div className="payment_card_container">
//             <div className="payment_details">
//               <form action="">
//                 {/* error */}
//                 {cardError && (
//                   <small style={{ color: "red" }}>{cardError}</small>
//                 )}
//                 {/* card element */}
//                 <CardElement onChange={handleChange} />
//                 {/* price */}
//                 <div className="payment_price">
//                   <div>
//                     You
//                     <span style={{ display: "flex", gap: "10px" }}>
//                       | <p>Total Order |</p> <CurrencyFormat amount={total} />
//                     </span>
//                   </div>
//                   <button>Pay Now</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </LayOut>
//   );
// }

// export default Payment;
