import React, { useEffect, useState } from "react";
import "./add.scss";
import { TeacherApiObject } from "../../../Api/TeacherApi";

const Add = (props) => {
  
  const [formData, setFormData] = useState({
    schoolId: props.userId,
    name: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    gender: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (props.slug === "Teacher") {
      try {
        const response = await TeacherApiObject.postData(formData);
        if (response.success) {
          props.setOpen(false);
          props.setReload(true);
        }
      } catch (e) {
        console.error(e.message);
      }
    }
  };
  return (
    <div className="add">
      <div className="model">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img" && item.field !== "status")
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                <input type={column.type} name={column.name} value={formData[column.name]} onChange={handleChange} placeholder={column.field} />
              </div>
            ))}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
