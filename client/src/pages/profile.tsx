import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth/firebase.auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Define the type for the history item
interface HistoryItem {
  caption: string;
  imageUrl: string;
  createdAt: string; // Assuming createdAt is a string, adjust if necessary
}

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (user?.uid) {
          const response = await axios.get(
            `http://localhost:8000/api/v1/users/history/${user.uid}`
          );
          // console.log("User History Response:", response.data);
          setHistory(response.data.history);
        }
      } catch (error) {
        console.error("Error fetching user history:", error);
      }
    };

    if (user?.uid) {
      fetchHistory();
    }
  }, [user]);

  return (
    <div className="container mx-auto py-10">
      {/* Profile Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>

      {/* Profile Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Section (Top Left) */}
        <div className="w-full md:w-1/3">
          <div className="bg-white shadow-lg rounded-lg p-6">
            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <img
                src={
                  user?.photoURL
                    ? user.photoURL
                    : "https://github.com/shadcn.png"
                }
                alt="User Avatar"
                className="w-32 h-32 rounded-full border-4 border-blue-500"
              />
            </div>

            {/* User Information */}
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                {user?.displayName}
              </h2>
            </div>
          </div>
        </div>

        {/* Profile Details Section (Email, Username, etc.) */}
        <div className="w-full md:w-2/3">
          <div className="bg-white shadow-lg rounded-lg p-6">
            {/* User Details */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Name:</span>
                <span className="text-gray-800">{user?.displayName}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="text-gray-800">{user?.email}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Password</span>
                <span className="text-gray-800">********</span>
              </div>
              <Button
                onClick={() => navigate("/forgot-password")}
                className="text-white bg-blue-500 mx-auto flex justify-center"
              >
                Update Password
              </Button>
            </div>
          </div>

          {/* History Section */}
          <section id="history">
            <div className="mt-8">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  History
                </h3>

                {/* Display User History */}
                {history ? (
                  <div className="space-y-4">
                    {history.map((item, index) => (
                      <div key={index} className="border-b py-4">
                        <img
                          className="text-gray-600"
                          src={item.imageUrl}
                        ></img>
                        <p className="text-gray-600 text-xl mt-5">
                          {item.caption}
                        </p>
                        <p className="text-gray-400 text-sm mt-3">
                          Created at:{" "}
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No history available.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
