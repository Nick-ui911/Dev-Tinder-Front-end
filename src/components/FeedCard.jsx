import React from 'react';

const FeedCard = ({ name, gender, age, PhotoUrl, skills }) => {
  return (
    <div className="flex justify-center items-center p-4 my-20">
      <div className="card bg-white w-96 shadow-2xl rounded-2xl overflow-hidden">
        <figure>
          <img
            src={PhotoUrl || "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="}
            alt={name}
            className="w-full h-64 object-cover"
          />
        </figure>
        <div className="card-body p-4">
          <h2 className="text-2xl font-bold text-gray-800">{name}, {age}</h2>
          <p className="text-gray-600">{gender}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {skills?.map((skill, index) => (
              <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
          <div className="card-actions justify-between mt-4">
            <button className="btn bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">❌ Dislike</button>
            <button className="btn bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">❤️ Like</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
