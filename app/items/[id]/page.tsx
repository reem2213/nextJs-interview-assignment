"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const ItemDetails = () => {
    const { id } = useParams(); 

    interface Item {
        _id: string;
        name: string;
        description: string;
    }

    const [item, setItem] = useState<Item | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:8080/api/items/${id}`)
                .then((response) => {
                    setItem(response.data);
                })
                .catch(() => {
                    setError("Failed to fetch item details");
                });
        }
    }, [id]);

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
            {item ? (
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{item.name}</h1>
                    <p className="text-gray-700 text-base">{item.description}</p>
                </div>
            ) : (
                <p className="text-indigo-600 text-lg font-medium text-center">Loading...</p>
            )}
        </div>
    </div>
    );
};

export default ItemDetails;
