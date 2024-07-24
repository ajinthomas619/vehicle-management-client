import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateVehicle = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  console.log("the id is",id)
  const [vehicleData, setVehicleData] = useState({
    name: '',
    model: '',
    description: '',
    price: '',
    manufacture: '',
    image: null,
  });

 
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/vehicle/get-vehicle/${id}`, { withCredentials: true });
        console.log("the response is ",response)
        setVehicleData({
          name: response.data.data.name,
          model: response.data.data.model,
          description: response.data.data.description,
          price: response.data.data.price,
          manufacture: response.data.data.manufacture,
          image: null, 
        });
      } catch (error) {
        console.log("Error fetching vehicle data:", error);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(vehicleData).forEach(key => {
      formData.append(key, vehicleData[key]);
    });

    try {
      await axios.put(`http://localhost:3000/api/vehicle/update-vehicle/${id}`, formData, { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.log("Error updating vehicle data:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Update Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={vehicleData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">
            Model
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={vehicleData.model}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={vehicleData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={vehicleData.price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="manufacture" className="block text-sm font-medium text-gray-700">
            Manufacture Date
          </label>
          <input
            type="date"
            id="manufacture"
            name="manufacture"
            value={vehicleData.manufacture}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateVehicle;
