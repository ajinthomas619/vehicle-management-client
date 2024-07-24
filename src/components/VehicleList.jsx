import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  const getVehicles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/vehicle/get-vehicle",
        { withCredentials: true }
      );
      console.log("teh response is ",response)
      if (response && response.data) {
        setVehicles(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching vehicles", error);
    }
  };

  useEffect(() => {
    getVehicles();
  }, []);

  const updateVehicle = (id) => {
    navigate(`/update-vehicle/${id}`);
  };

  const deleteVehicle = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/vehicle/delete-vehicle/${id}`);
      toast.success("Vehicle deleted successfully");
      getVehicles();
    } catch (error) {
      toast.error("Error deleting vehicle");
      console.error("Error deleting vehicle", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vehicle List</h1>
      <table className="table w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Model</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Manufacture</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{vehicle.name}</td>
              <td className="border border-gray-300 p-2">{vehicle.model}</td>
              <td className="border border-gray-300 p-2">{vehicle.description}</td>
              <td className="border border-gray-300 p-2">{vehicle.price}</td>
              <td className="border border-gray-300 p-2">{vehicle.manufacture}</td>
              <td className="border border-gray-300 p-2">
                <button 
                  className="btn btn-primary mr-2"
                  onClick={() => updateVehicle(vehicle._id)}
                >
                  Update
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => deleteVehicle(vehicle._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleList;
