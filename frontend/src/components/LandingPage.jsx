// import { MapPin, Clock, CreditCard } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { methods } from "../utils/methods";
// export default function LandingPage() {
//   const navigate = useNavigate();
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [reviews, setReviews] = useState([]);
//   const [showAllReviews, setShowAllReviews] = useState(false);
//   const user = methods.getUserByFromLS();
//   const services = [
//     {
//       name: "Multiple Locations",
//       icon: MapPin,
//       description: "Convenient pickup points across the city",
//     },
//     {
//       name: "24/7 Availability",
//       icon: Clock,
//       description: "Rent a vehicle any time, day or night",
//     },
//     {
//       name: "Easy Payment",
//       icon: CreditCard,
//       description: "Secure and quick payment options",
//     },
//   ];

//   useEffect(() => {
//     fetchReviewsFromDB();
//   }, []);

//   const handleRentNow = () => {
//     navigate("/bikes");
//   };

//   const handleSubmitReview = async (e) => {
//     e.preventDefault();
//     const userName = localStorage.getItem("userName");

//     if (rating && comment && userName) {
//       const response = await axios.post("http://localhost:4000/api/reviews", {
//         userName,
//         rating,
//         comment,
//       });

//       if (response.status === 201)
//         setReviews((prevReviews) => [
//           ...prevReviews,
//           { userName: userName, rating, comment },
//         ]);
//       setRating(0);
//       setComment("");
//     }
//   };

//   const fetchReviewsFromDB = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/api/reviews");
//       if (response.status === 200) {
//         setReviews(response.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const renderReviews = () => {
//     // Ensure that 'reviews' is always an array
//     const reviewsToShow = Array.isArray(reviews)
//       ? showAllReviews
//         ? reviews
//         : reviews.slice(0, 2)
//       : [];

//     return reviewsToShow.map((review, index) => (
//       <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
//         <p className="text-gray-800 font-bold">{review.userName}</p>
//         <p className="text-yellow-500 text-lg font-semibold">
//           {"★".repeat(review.rating)}
//           {"☆".repeat(5 - review.rating)}
//         </p>
//         <p className="text-gray-800 mt-2">{review.comment}</p>
//       </div>
//     ));
//   };

//   // const uploadBikeButton = user ? (
//   //   <button
//   //     onClick={() => navigate("/add-bike")}
//   //     className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white py-3 px-6 rounded-full shadow-lg transform transition duration-300 hover:scale-105"
//   //   >
//   //     Upload bikes
//   //   </button>
//   // ) : null;

//   const uploadBikeButton = user && typeof user === "object" && user.userName ? (
//     <button
//       onClick={() => navigate("/add-bike")}
//       className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white py-3 px-6 rounded-full shadow-lg transform transition duration-300 hover:scale-105"
//     >
//       Upload bikes
//     </button>
//   ) : null;

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-200">
//       <section
//         className="relative h-[90vh] bg-cover bg-center flex justify-center items-center"
//         style={{
//           backgroundImage: 'url("/images/cool-motorcycle-outdoors.jpg")',
//           backgroundAttachment: "fixed",
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
//         <div className="relative z-10 text-center text-white px-6">
//           <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in">
//             Explore the City on Two Wheels
//           </h1>
//           <p className="mb-6 text-lg animate-fade-in delay-200">
//             Rent a bike and discover the freedom of the open road. Easy,
//             affordable, and eco-friendly.
//           </p>
//           <div className="flex gap-x-4 mx-auto justify-center items-center ">
//             <button
//               onClick={handleRentNow}
//               className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white py-3 px-6 rounded-full shadow-lg transform transition duration-300 hover:scale-105"
//             >
//               Rent Now
//             </button>
//             {uploadBikeButton}
//           </div>
//         </div>
//       </section>

//       <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
//         <div className="container mx-auto text-center px-6">
//           <h2 className="text-3xl font-bold mb-12 text-gray-700">
//             Our Services
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {services.map((service) => (
//               <div
//                 key={service.name}
//                 className="bg-gradient-to-b from-white to-gray-50 p-8 rounded-xl shadow-xl transition transform hover:scale-105 hover:shadow-2xl"
//               >
//                 <service.icon className="w-12 h-12 mx-auto mb-4 text-blue-500" />
//                 <h3 className="text-xl font-semibold mb-2 text-gray-800">
//                   {service.name}
//                 </h3>
//                 <p className="text-gray-600">{service.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">
//             User Reviews
//           </h2>
//           <form
//             onSubmit={handleSubmitReview}
//             className="max-w-lg mx-auto mb-12 bg-white p-8 rounded-lg shadow-lg transition transform hover:scale-105"
//           >
//             <div className="mb-4">
//               <label className="block text-lg font-medium mb-2 text-gray-700">
//                 Rate us:
//               </label>
//               <div className="flex justify-center space-x-1">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <button
//                     key={star}
//                     type="button"
//                     className={`text-2xl ${
//                       star <= rating ? "text-yellow-400" : "text-gray-300"
//                     }`}
//                     onClick={() => setRating(star)}
//                   >
//                     ★
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="mb-4">
//               <textarea
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 rows="4"
//                 placeholder="Leave your comment here..."
//                 className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white py-2 px-4 rounded-full w-full shadow-lg transform transition duration-300 hover:scale-105"
//             >
//               Submit Review
//             </button>
//           </form>

//           <div className="max-w-lg mx-auto">
//             {renderReviews()}
//             {reviews.length > 2 && (
//               <button
//                 onClick={() => setShowAllReviews(!showAllReviews)}
//                 className="bg-gray-200 text-blue-500 py-2 px-4 rounded-lg mt-4 shadow transform transition hover:scale-105"
//               >
//                 {showAllReviews ? "Show Less" : "See More"}
//               </button>
//             )}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import { MapPin, Clock, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { methods } from "../utils/methods";

export default function LandingPage() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const user = methods.getUserByFromLS();

  // Assume `user.isAdmin` is a boolean indicating if the user is an admin

  const services = [
    {
      name: "Multiple Locations",
      icon: MapPin,
      description: "Convenient pickup points across the city",
    },
    {
      name: "24/7 Availability",
      icon: Clock,
      description: "Rent a vehicle any time, day or night",
    },
    {
      name: "customer service",
      icon: CreditCard,
      description: "24/7 customer support and assistance",
    },
  ];

  useEffect(() => {
    fetchReviewsFromDB();
  }, []);

  const handleRentNow = () => {
    navigate("/bikes");
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const userName = localStorage.getItem("userName");

    if (rating && comment && userName) {
      const response = await axios.post("http://localhost:4000/api/reviews", {
        userName,
        rating,
        comment,
      });

      if (response.status === 201) {
        // Add the new review at the top of the array
        setReviews((prevReviews) => [
          { userName, rating, comment },
          ...prevReviews, // Add new review at the start
        ]);
      }
      setRating(0);
      setComment("");
    }
  };

  const fetchReviewsFromDB = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/reviews");
      if (response.status === 200) {
        setReviews(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderReviews = () => {
    // Ensure that 'reviews' is always an array
    const reviewsToShow = Array.isArray(reviews)
      ? showAllReviews
        ? reviews
        : reviews.slice(0, 2)
      : [];

    return reviewsToShow.map((review, index) => (
      <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
        <p className="text-gray-800 font-bold">{review.userName}</p>
        <p className="text-yellow-500 text-lg font-semibold">
          {"★".repeat(review.rating)}
          {"☆".repeat(5 - review.rating)}
        </p>
        <p className="text-gray-800 mt-2">{review.comment}</p>
      </div>
    ));
  };

  const uploadBikeButton = user ? (
    <button
      onClick={() => navigate("/add-bike")}
      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white py-3 px-6 rounded-full shadow-lg transform transition duration-300 hover:scale-105"
    >
      Upload bikes
    </button>
  ) : null;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-200">
      <section
        className="relative z-[0] h-[90vh] bg-cover bg-center flex justify-center items-center"
        style={{
          backgroundImage: 'url("/images/cool-motorcycle-outdoors.jpg")',
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in">
            Explore the City on Two Wheels
          </h1>
          <p className="mb-6 text-lg animate-fade-in delay-200">
            Rent a bike and discover the freedom of the open road. Easy,
            affordable, and eco-friendly.
          </p>
          {user && (
            <div className="flex gap-x-4 mx-auto justify-center items-center ">
              <button
                onClick={handleRentNow}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white py-3 px-6 rounded-full shadow-lg transform transition duration-300 hover:scale-105"
              >
                Rent Now
              </button>
              {uploadBikeButton}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-12 text-gray-700">
            Our Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {services.map((service) => (
              <div
                key={service.name}
                className="bg-gradient-to-b from-white to-gray-50 p-8 rounded-xl shadow-xl transition transform hover:scale-105 hover:shadow-2xl"
              >
                <service.icon className="w-12 h-12 mx-auto mb-4 text-blue-500 " />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {service.name}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">
            User Reviews
          </h2>
          {user && (
            <form
              onSubmit={handleSubmitReview}
              className="max-w-lg mx-auto mb-12 bg-white p-8 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2 text-gray-700">
                  Rate us:
                </label>
                <div className="flex justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`text-2xl ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="4"
                  placeholder="Leave your comment here..."
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white py-2 px-4 rounded-full w-full shadow-lg transform transition duration-300 hover:scale-105"
              >
                Submit Review
              </button>
            </form>
          )}

          <div className="max-w-lg mx-auto">
            {renderReviews()}
            {reviews.length > 2 && (
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="bg-gray-200 text-blue-500 py-2 px-4 rounded-lg mt-4 shadow transform transition hover:scale-105"
              >
                {showAllReviews ? "Show Less" : "See More"}
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
