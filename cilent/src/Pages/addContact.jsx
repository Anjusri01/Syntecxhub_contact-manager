import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddContact = () => {
  const [values, setValues] = useState({ name: '', email: '', phone: '', address: '' });
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios.post('http://localhost:3000/add-contact', values, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.success) {
        toast.success("Contact Saved Successfully!");
        navigate('/dashboard');
      }
    })
    .catch(err => {
      const errorMsg = err.response?.data?.errors?.[0]?.msg || "Failed to add contact.";
      toast.error(errorMsg);
    });
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>ADD NEW CONTACT</h2>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" placeholder="Enter Contact Name" className="form-control" onChange={handleInput} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="Enter Contact Email" className="form-control" onChange={handleInput} required />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="text" name="phone" placeholder="Enter Phone Number" className="form-control" onChange={handleInput} required />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" name="address" placeholder="Enter Address" className="form-control" onChange={handleInput} />
        </div>
        <button className="form-button">Save Contact</button>
      </form>
    </div>
  );
};

export default AddContact;
