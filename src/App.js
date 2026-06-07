import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    requestType: '',
    priority: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.requestType) newErrors.requestType = 'Request type is required';
    if (!formData.priority) newErrors.priority = 'Priority is required';
    if (!formData.description) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="container">
        <div className="header-bar">
          <h1>AI Support Operations Portal</h1>
          <span>CX Expert</span>
        </div>
        <div className="success">
          <h2>Request Submitted</h2>
          <p>Thank you, {formData.fullName}. Your request has been received and will be reviewed shortly.</p>
          <button onClick={() => { setSubmitted(false); setFormData({ fullName: '', email: '', requestType: '', priority: '', description: '' }); }}>
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header-bar">
        <h1>AI Support Operations Portal</h1>
        <span>CX Expert</span>
      </div>
      <p>Submit a support or project request below.</p>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </div>
        <div className="field">
          <label>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="field">
          <label>Request Type</label>
          <select name="requestType" value={formData.requestType} onChange={handleChange}>
            <option value="">-- Select --</option>
            <option value="support">Support</option>
            <option value="project">Project</option>
            <option value="bug">Bug Report</option>
            <option value="other">Other</option>
          </select>
          {errors.requestType && <span className="error">{errors.requestType}</span>}
        </div>
        <div className="field">
          <label>Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="">-- Select --</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
          {errors.priority && <span className="error">{errors.priority}</span>}
        </div>
        <div className="field">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="5" />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

export default App;