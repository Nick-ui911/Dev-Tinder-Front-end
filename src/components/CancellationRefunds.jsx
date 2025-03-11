import React from "react";

const CancellationRefund = () => {
  return (
    <div className=" my-18 max-w-3xl mx-auto p-6 bg-gray-800 text-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold mb-4">Cancellation and Refund Policy</h1>
      <p className="mb-4">
        At DevWorld, we strive to provide the best experience for our users. This policy outlines the conditions for cancellations and refunds.
      </p>
      
      <h2 className="text-2xl font-semibold mt-4">Cancellation Policy</h2>
      <p>
        Users may request a cancellation of services within 7 days of purchase. If the request is made within this period, the service will be discontinued, and a refund may be initiated based on our refund policy.
      </p>
      
      <h2 className="text-2xl font-semibold mt-4">Refund Policy</h2>
      <p>
        Refunds will be processed under the following conditions:
      </p>
      <ul className="list-disc ml-6">
        <li>Full refunds are available for cancellations within 7 days of purchase.</li>
        <li>Partial refunds may be issued depending on service usage.</li>
        <li>No refunds will be provided for cancellations after 7 days.</li>
        <li>Refunds may take 5-10 business days to process.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mt-4">Exceptions</h2>
      <p>
        Certain services may not be eligible for refunds due to their nature. These will be clearly mentioned at the time of purchase.
      </p>
      
      <h2 className="text-2xl font-semibold mt-4">Contact Us</h2>
      <p>
        If you have any questions regarding cancellations or refunds, please contact us at nbaghel392@gmail.com.
      </p>
    </div>
  );
};

export default CancellationRefund;
