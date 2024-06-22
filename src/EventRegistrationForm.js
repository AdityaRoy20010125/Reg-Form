import React, { useState } from 'react';

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: 'No',
    guestName: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? '' : 'Name is required';
    tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? '' : 'Email is not valid';
    tempErrors.age = formData.age > 0 ? '' : 'Age must be a number greater than 0';
    if (formData.attendingWithGuest === 'Yes') {
      tempErrors.guestName = formData.guestName ? '' : 'Guest name is required';
    }
    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => error === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="form-container">
      <h2>Event Registration Form</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div>
            <label>Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} />
            {errors.age && <p className="error">{errors.age}</p>}
          </div>
          <div>
            <label>Are you attending with a guest?</label>
            <select name="attendingWithGuest" value={formData.attendingWithGuest} onChange={handleChange}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          {formData.attendingWithGuest === 'Yes' && (
            <div>
              <label>Guest Name</label>
              <input type="text" name="guestName" value={formData.guestName} onChange={handleChange} />
              {errors.guestName && <p className="error">{errors.guestName}</p>}
            </div>
          )}
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h3>Registration Summary</h3>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
          <p>Age: {formData.age}</p>
          <p>Attending with Guest: {formData.attendingWithGuest}</p>
          {formData.attendingWithGuest === 'Yes' && <p>Guest Name: {formData.guestName}</p>}
        </div>
      )}
    </div>
  );
};

export default EventRegistrationForm;
