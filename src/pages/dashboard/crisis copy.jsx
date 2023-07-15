import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Chip,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
  Input,
  Textarea,
  Checkbox,
  
} from "@material-tailwind/react";


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Crisis = () => {
  const [crises, setCrises] = useState([]);
  
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    image: null,
    donation_goal: '',
    recived_amount: '',
    document: null,
  });

  useEffect(() => {
    fetchCrises();
  }, []);

  const fetchCrises = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/crisis_list/');
      setCrises(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFileInputChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: files[0] }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          if (key === 'document' && value.length === 0) {
            console.log("im in document if");
            throw new Error('Please select a document file.');
          }
          console.log("im in document else");

          data.append(key, value);
        }
      });
      console.log(formData);
      if (formData.id !== null) {
        
        formData.document = crises.document
        // If the crisis has an ID, it means it already exists and we should update it
        await axios.put(`http://127.0.0.1:8000/update_crisis/${formData.id}/`, data);
      } else {
        // If the crisis doesn't have an ID, it means it's a new crisis and we should add it
        await axios.post('http://127.0.0.1:8000/add_crisis/', data);
      }

      setFormData({
        id: null,
        title: '',
        description: '',
        image: null,
        donation_goal: '',
        recived_amount: '',
        document: null,
      });
      fetchCrises();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (crisisId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/update_crisis/${crisisId}/`);
      fetchCrises();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Crisis Management</h1>

      <h2>Add/Edit Crisis</h2>
      <form onSubmit={handleFormSubmit}>
        
          
          <Input
            type="text"
            name="title"
            label="Title:"
            value={formData.title}
            onChange={handleInputChange}
          />
        

       
          
          <Textarea
            name="description"
            label="Description:"
            value={formData.description}
            onChange={handleInputChange}
          />
        

        
          
          <Input
            type="file"
            name="image"
            label="Image"
            // value={formData.image}

            onChange={handleFileInputChange}
          />
        

        
          <Input
            type="text"
            name="donation_goal"
            label="doantion Goal"
            value={formData.donation_goal}
            onChange={handleInputChange}
          />
        

        
          
          <Input
            type="text"
            name="recived_amount"
            label="Received Amount:"
            value={formData.recived_amount}
            onChange={handleInputChange}
          />
        

        <label>
          Document:
          <input
            type="file"
            name="document"
            onChange={handleFileInputChange}
          />
        </label>

        <button type="submit">{formData.id ? 'Update Crisis' : 'Add Crisis'}</button>
      </form>

      <h2>Existing Crises</h2>
      <ul>
        {crises.map((crisis) => (
          <li key={crisis.id}>
            <h3>{crisis.title}</h3>
            <p>{crisis.description}</p>
            {/* Display other crisis details as needed */}
            <button onClick={() => {
              setFormData({ ...crisis, id: crisis.id });
            }}>Edit</button>
            <button onClick={() => handleDelete(crisis.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Crisis;


