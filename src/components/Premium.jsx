import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import SuccessPage from "./SuccessPage";

const Premium = () => {
  const [premium, setPremium] = useState(false);
  const [membershipType, setMembershipType] = useState(null);

  const verifyPremium = async () => {
    const response = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });
    if (response.data.isPremium) {
      setPremium(true);
      setMembershipType(response.data.membershipType);
    }
  };
  useEffect(() => {
    verifyPremium();
  }, [premium]);

  const handleClick = async (type) => {
    if (premium) {
      return; // Prevent payment if already premium
    }
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );
      console.log(order);
      const { amount, keyId, currency, notes, orderId } = order.data;
      var options = {
        key: keyId,
        amount,
        currency,
        name: "DevWorld", //your business name
        description: "Transaction",
        order_id: orderId,
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          name: notes.name, //your customer's name
          email: notes.email,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        handler: verifyPremium,
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
    }
  };

  if(premium){
   return <SuccessPage membershipType={membershipType}/>
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-6">
        {/* Silver Plan */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform">
          <h2 className="text-2xl font-bold text-gray-300">Silver Plan</h2>
          <p className="text-gray-400 mt-2">
            Basic access with essential features.
          </p>
          <p className="text-3xl font-bold text-blue-400 mt-4">$0.1/month</p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center gap-2">
              ✅ Access to standard features
            </li>
            <li className="flex items-center gap-2">✅ Get a Blue Tick</li>
            <li className="flex items-center gap-2">✅ Monthly updates</li>
          </ul>
          <button
            onClick={() => handleClick("silver")}
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-lg"
          >
            Choose Silver
          </button>
        </div>

        {/* Gold Plan */}
        <div className="bg-yellow-500 rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform text-gray-900">
          <h2 className="text-2xl font-bold">Gold Plan</h2>
          <p className="mt-2">Premium access with exclusive features.</p>
          <p className="text-3xl font-bold mt-4">$0.5/month</p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center gap-2">
              ✅ All Silver Plan benefits
            </li>
            <li className="flex items-center gap-2">
              ✅ Unlimited Chat With Connection
            </li>
            <li className="flex items-center gap-2">
              ✅ Early access to new features
            </li>
          </ul>
          <button
            onClick={() => handleClick("gold")}
            className="mt-6 w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg text-lg"
          >
            Choose Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
