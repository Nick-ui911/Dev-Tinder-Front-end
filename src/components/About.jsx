import React from "react";
import { useNavigate } from "react-router-dom";
import owner from "../assets/owner.png";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 my-16">
      {/* Hero Section */}
      <section className="text-center py-12 px-6 bg-gray-800 text-white">
        <h1 className="text-4xl font-bold mb-4">About DevWorld</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Connecting developers worldwide to collaborate, innovate, and build
          together.
        </p>
      </section>

      {/* Mission and Vision */}
      <section className="max-w-5xl mx-auto py-12 px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Mission & Vision</h2>
          <p className="text-lg text-gray-700 mb-4">
            DevTinder is built to help developers find like-minded peers for
            projects, networking, and career growth. Whether you're looking for
            a coding buddy, a startup team, or just tech discussions, we’re here
            to bridge the gap.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-12 px-6">
        <h2 className="text-center text-3xl font-semibold mb-6">
          Meet Our Team
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-gray-200 p-6 rounded-lg text-center shadow-md w-60">
            <div className="h-24 w-24 bg-gray-400 rounded-full mx-auto mb-4 overflow-hidden">
              <img
                src={owner}
                alt="Nikhil Singh"
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-lg font-semibold">Nikhil Singh</h3>
            <p className="text-sm text-gray-600">
              Founder, Developer & Designer
            </p>
          </div>
  
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 bg-gray-800 text-white">
        <h2 className="text-2xl font-semibold mb-4">Join DevWorld Today!</h2>
        <p className="max-w-xl mx-auto text-lg mb-6">
          Whether you're a beginner or an experienced developer, find your
          perfect match for projects, hackathons, and learning.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Get Started
        </button>
      </section>
    </div>
  );
};

export default About;
