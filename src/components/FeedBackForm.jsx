import React, { useState } from 'react'

const FeedBackForm = () => {
    const [formData, setFormData] = useState({
      fname: "",
      lname: "",
      email: "",
      phone: "",
      message: "",
    });
const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData({...formData,[name]:value});
}
const handleSubmit = (e) => {
e.preventDefault();
console.log("Form Submitted",formData);
alert("Feedback Form Submitted Successfully");
setFormData({fname:"",lname:"",email:"",phone:"",message:""})
}

  return (
    <div style={styles.container}>
      <h2>FeedBack Form </h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="fname"
          placeholder="Enter Your FirstName"
          onChange={handleChange}
          value={formData.fname}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="lname"
          placeholder="Enter Your LastName"
          onChange={handleChange}
          value={formData.lname}
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Your EmailId"
          onChange={handleChange}
          value={formData.email}
          style={styles.input}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Enter Your Phoneno"
          onChange={handleChange}
          value={formData.phone}
          style={styles.input}
          required
        />
        <textarea
          name="message"
          value={formData.message}
          placeholder="Your Message"
          onChange={handleChange}
          style={{ ...styles.input, height: "100px" }}
          required
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
}
const styles = {
  container: {
    width: "400px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f7f7f7",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  
};
export default FeedBackForm
