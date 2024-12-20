"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Home: React.FC = () => {
  interface Item {
    _id: string;
    name: string;
    description: string;
  }

  const [items, setItems] = useState<Item[]>([]);
  const router = useRouter();

  const handleItemClick = (_id: string) => {
    router.push(`/items/${_id}`);
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/items")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => console.error("error fetching items:", error));
  }, []);

  const Additems = () => {
    router.push("/add-item");
  };

  const deleteItem = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/items/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error(`Failed to delete item with ID ${id}:`, error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Items
        </h1>

        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item._id || Math.random()}
              className="flex justify-between items-center py-2 border-b"
            >
              <span
                onClick={() => handleItemClick(item._id)}
                className="cursor-pointer text-indigo-600 hover:text-indigo-800 text-lg font-medium"
              >
                {item.name}
              </span>
              <button
                onClick={() => deleteItem(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={Additems}
          className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add more items
        </button>
      </div>
    </div>
  );
};

export default Home;
