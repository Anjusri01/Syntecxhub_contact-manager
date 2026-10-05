import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assest/css/Contact.css'

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/contacts', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.success) {
        setContacts(res.data.contacts);
      }
    })
    .catch(err => console.log("Error loading contacts:", err));
  }, []);

  return (
    <div className="contacts-view">
      <h2>Your Saved Contacts</h2>
      {contacts.length === 0 ? <p>No contacts found. Click "Add Contact" to start collecting!</p> : (
        <table className="contacts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(c => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Contacts;
