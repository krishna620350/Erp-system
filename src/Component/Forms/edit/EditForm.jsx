import React, { useState } from "react";
import "./edit.scss"
import data from "../../../Json/degree.json";

const columns = {
  "basic": [
    { field: "Full Name", type: "text", value: "Krishna" },
    { field: "Gender", type: "text", value: "Male" },
    { field: "Email Id", type: "email", value: "Krishna@gmail.com" },
    { field: "Phone Number", type: "tel", value: "+916203506439" },
    { field: "Date Of Birth", type: "date", value: "2023-01-02" },
    { field: "Address", type: "text", value: "213 ganganagar" },
    { field: "Upload Photo (*png, *jpg, *jpeg only)", type: "file" },
  ]
}
const TeacherProfileForm = (props) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        education: [{ degree: "", university: "", year: "" }],
        workExperience: [{ company: "", position: "", year: "" }],
    });

    const [currentSection, setCurrentSection] = useState("basic");
    const [expandedEducationIndex, setExpandedEducationIndex] = useState(-1);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);


    const handleChange = (e, index, field, subField) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setPreviewImage(e.target.result);
          };
          reader.readAsDataURL(file);
        }
        // const updatedData = { ...formData };
        // if (subField) {
        // updatedData[field][index][subField] = e.target.value;
        // } else {
        // updatedData[field][index] = e.target.value;
        // }
        // setFormData(updatedData);
    };

    const addField = (field) => {
        const updatedData = { ...formData };
        updatedData[field].push({});
        setFormData(updatedData);
        setExpandedEducationIndex(updatedData[field].length - 1);
    };

    const handleNext = () => {
        if (currentSection === "basic") {
            setCurrentSection("education");
        } else if (currentSection === "education") {
            setCurrentSection("work");
        }
    };

    const handlePrevious = () => {
        if (currentSection === "education") {
            setCurrentSection("basic");
        } else if (currentSection === "work") {
            setCurrentSection("education");
        }
    };

    const removeField = (field, index) => {
        const updatedData = { ...formData };
        updatedData[field].splice(index, 1);
        setFormData(updatedData);
    };

    return (
      <div className="add">
        <div className="model">
          <span className="close" onClick={() => props.setOpen(false)}>
            X
          </span>
          <h1>Edit Teacher Profile</h1>
          <form>
            {/* Personal Details */}
            {currentSection === "basic" && (
              <div className="">
                <h3>Basic Details</h3>
                <div className="row">
                  {columns.basic.map((column, index) => (
                    <div className="col-md-6">
                      <div className="item" key={index}>
                        <label>{column.field}</label>
                        {column.type === "file" ? (
                          <input
                            type={column.type}
                            value={column.value}
                            onChange={
                              column.type === "file"
                                ? (e) => handleChange(e)
                                : null
                            }
                          />
                        ) : (
                          <input type={column.type} value={column.value} />
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="col-md-6">
                    {selectedFile && (
                      <div className="userimgdiv">
                        <img
                          src={previewImage}
                          className="userimg"
                          alt="Preview"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {currentSection === "education" && (
              <div className="w-100">
                <h3>Education</h3>
                {formData.education.map((edu, index) => (
                  <div key={index}>
                    {expandedEducationIndex === index ? (
                      <>
                        <div className="item w-100">
                          <label htmlFor="">Select you Education</label>
                          <select name="" id="" class="form-select">
                            <option value="">Select Degree</option>
                            {Object.keys(data.degrees).map((shortForm, idx) => (
                              <option key={idx} value={shortForm}>
                                {data.degrees[shortForm]}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="">School/Institute name</label>
                          <input
                            type="text"
                            value="sagar institute of science and technology"
                          />
                          <div className="d-flex gap-2">
                            <div className="item">
                              <label htmlFor="">Start Date</label>
                              <input type="Date" value="08-08-2008" />
                            </div>
                            <div className="item">
                              <label htmlFor="">End Date</label>
                              <input type="Date" value="08-08-2012" />
                            </div>
                          </div>
                          <div className="item">
                            <label htmlFor="">
                              Upload Supported Document (*pdf only)
                            </label>
                            <input type="file" />
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn"
                          onClick={() => removeField("education", index)}
                        >
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </>
                    ) : (
                      // Collapsed Form
                      <div>
                        <select
                          name=""
                          id=""
                          className="form-select"
                          value=""
                          onChange={() => setExpandedEducationIndex(index)}
                        >
                          <option value="">Select Degree</option>
                          {Object.keys(data.degrees).map((shortForm, idx) => (
                            <option key={idx} value={shortForm}>
                              {data.degrees[shortForm]}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          className="btn btn-secondary my-2"
                          onClick={() => setExpandedEducationIndex(index)}
                        >
                          <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-success mb-2"
                  onClick={() => addField("education")}
                >
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            )}
            {currentSection === "work" && (
              <div className="w-100">
                <h3>Work Experience</h3>
                {formData.workExperience.map((edu, index) => (
                  <div key={index}>
                    {expandedEducationIndex === index ? (
                      <>
                        <div className="item w-100">
                          <label htmlFor="">Position</label>
                          <input type="text" value="ss van" />
                          <label htmlFor="">School/Institute name</label>
                          <input
                            type="text"
                            value="sagar institute of science and technology"
                          />
                          <div className="d-flex gap-2">
                            <div className="item">
                              <label htmlFor="">Start Date</label>
                              <input type="Date" value="08-08-2008" />
                            </div>
                            <div className="item">
                              <label htmlFor="">End Date</label>
                              <input type="Date" value="08-08-2012" />
                            </div>
                          </div>
                          <div className="item">
                            <label htmlFor="">
                              Upload Supported Document (*pdf only)
                            </label>
                            <input type="file" />
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn"
                          onClick={() => removeField("workExperience", index)}
                        >
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </>
                    ) : (
                      // Collapsed Form
                      <div className="item w-100">
                        <input type="text" value="ss van" disabled />
                        <button
                          type="button"
                          className="btn btn-secondary my-2"
                          onClick={() => setExpandedEducationIndex(index)}
                        >
                          <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-success mb-2"
                  onClick={() => addField("workExperience")}
                >
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            )}
            <div className="d-flex justify-content-between w-100 gap-2">
              {currentSection !== "basic" && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
              )}
              {currentSection !== "work" && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Next
                </button>
              )}
            </div>
            <button type="submit" className="btn btn-info mt-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
};

export default TeacherProfileForm;
