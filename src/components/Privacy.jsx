import React from "react";

const Privacy = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 ">
      <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950  shadow-lg rounded-2xl my-18 mt-38">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4 text-white">
          Welcome to DevWorld! Your privacy is important to us. This policy
          explains how we collect, use, and protect your information.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Information We Collect</h2>
        <p className=" text-white">
          We may collect personal information such as your name, email, and
          interactions within the app to improve user experience.
        </p>

        <h2 className="text-2xl font-semibold mt-4">
          How We Use Your Information
        </h2>
        <p className=" text-white">
          We use your data to enhance app functionality, personalize content,
          and improve security. We do not sell your data to third parties.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Data Security</h2>
        <p className=" text-white">
          We implement security measures to protect your data but cannot
          guarantee complete security due to internet risks.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Your Rights</h2>
        <p className=" text-white">
          You have the right to request access, modification, or deletion of
          your personal data. Contact us for any concerns.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Changes to This Policy</h2>
        <p className=" text-white">
          We may update this policy periodically. Please check this page for any
          changes.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Contact Us</h2>
        <p className=" text-white">
          If you have any questions, feel free to reach out to us at
          nbaghel392@gmail.com.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
