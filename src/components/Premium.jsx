import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import SuccessPage from "./SuccessPage";
import Loader from "./Loader"; // Import Loader

const Premium = () => {
  const [premium, setPremium] = useState(false);
  const [membershipType, setMembershipType] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  const verifyPremium = async () => {
    try {
      const response = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });
      if (response.data.isPremium) {
        setPremium(true);
        setMembershipType(response.data.membershipType);
      }
    } catch (error) {
      console.error("Error verifying premium:", error);
    } finally {
      setLoading(false); // Hide loader after verification
    }
  };

  useEffect(() => {
    verifyPremium();
  }, []);

  const handleClick = async (type) => {
    if (premium) return; // Prevent payment if already premium

    setLoading(true); // Show loader during payment
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = order.data;
      var options = {
        key: keyId,
        amount,
        currency,
        name: "DevWorld",
        description: "Transaction",
        order_id: orderId,
        prefill: {
          name: notes.name,
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
      console.error("Payment error:", error);
    } finally {
      setLoading(false); // Hide loader after payment process
    }
  };

  if (loading) {
    return <Loader />; // Show Loader when verifying or processing payment
  }

  if (premium) {
    return <SuccessPage membershipType={membershipType} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-6">
{/* Silver Plan */}
<div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition-transform border border-gray-700">
  <h2 className="text-2xl font-bold text-gray-200">Silver Plan</h2>
  <p className="text-gray-400 mt-2">Basic access with essential features.</p>
  <p className="text-4xl font-bold text-blue-400 mt-4">$0.1/month</p>
  
  <ul className="mt-4 space-y-2 text-gray-300">
    <li className="flex items-center gap-2">✅ Access to standard features</li>
    <li className="flex items-center gap-2">✅ Get a Blue Tick</li>
    <li className="flex items-center gap-2">✅ Monthly updates</li>
    <li className="flex items-center gap-2">✅ Unlimited Chat With Connection</li>
  </ul>

  <button
    onClick={() => handleClick("silver")}
    className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold transition-all shadow-md hover:shadow-xl"
  >
    Choose Silver
  </button>
</div>

{/* Gold Plan */}
<div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600
 rounded-2xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition-transform border border-yellow-500 text-gray-900">
  <h2 className="text-2xl font-bold">Gold Plan</h2>
  <p className="mt-2 text-gray-800">Premium access with exclusive features.</p>
  <p className="text-4xl font-bold mt-4 text-gray-900">$0.5/month</p>
  
  <ul className="mt-4 space-y-2 text-gray-900 font-medium">
    <li className="flex items-center gap-2">✅ All Silver Plan benefits</li>
    <li className="flex items-center gap-2">✅ Unlimited Chat With Connection</li>
    <li className="flex items-center gap-2">✅ Unlimited Call With Connection</li>
    <li className="flex items-center gap-2">✅ Early access to new features</li>
  </ul>

  <button
    onClick={() => handleClick("gold")}
    className="mt-6 w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg text-lg font-semibold transition-all shadow-md hover:shadow-xl"
  >
    Choose Gold
  </button>
</div>

      </div>
    </div>
  );
};

export default Premium;
