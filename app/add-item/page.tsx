"use client"

import React, { useState } from 'react'
import axios from 'axios';
const AddItem :React.FC = () => {

    const [name,setName]=useState<string>('');
    const [description, setDescription]=useState<string>('');
    const [error,setError]=useState<string>('');
  const[message,setMessage]=useState<string>('')


    const addItem= async(e:React.FormEvent)=>{

        e.preventDefault();

        if(name){
            try{
                const res= await axios.post('http://localhost:8080/api/items',{ name, description})
                setDescription("");
                setName("");
                console.log(res.data);
                setMessage('item successfuly added')


                
    
            }
            catch{
                console.error("Error adding item")
    
            }
        }
        else{
            setError("name is required")
        }

        
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Items Here</h1>

                <form onSubmit={addItem} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name:</label>
                        <input
                            type='text'
                            placeholder='Enter an item name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    {error ? <p className='text-red-500'>{error}</p>:<></>}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description:</label>
                        <input
                            type='text'
                            placeholder='Add description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <button
                        type='submit'
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Add
                    </button>
                    {message &&<p className='text-green-500'>{message}</p>}

                </form>
            </div>
        </div>
  )
}

export default AddItem;
