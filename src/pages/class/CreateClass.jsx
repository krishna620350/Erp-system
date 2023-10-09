import { useState } from "react";
import { ClassApi } from "../../Api/Classapi";
import "./createClass.scss";
const CreateClass = (props) => {
    const [errors, setError] = useState(null);
    const [classData, setClassData] = useState({
        schoolId: props.userId,
        className: "",
        classSectionName: "",
        classTeacherId: "",
        classStudentNumber: ""
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setClassData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await ClassApi.postClass(classData);
        if (response.message === true) {
            props.setReloadComponent(true);
        } else {
            setError(response);
        }
    }
    
    return (
      <div className="add">
        <div className="model">
          <span className="close" onClick={props.navigate}>
            X
          </span>
          <h1>Add new Class</h1>
          {errors && (
            <div class="alert alert-danger" role="alert">
              {errors.length > 1 && errors.map((error) => (
                  <p>{ error}</p>
              ))}
              <p>{errors.message}</p>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {props.columns.map((column) => (
              <div className="item" key={column.id}>
                <label>{column.label}</label>
                <input
                  type={column.type}
                  name={column.name}
                  placeholder={column.placeholder}
                  value={classData[column.name]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <button type="submit">
              <i class="fa-solid fa-arrow-right-to-bracket"></i> Create Class
            </button>
          </form>
        </div>
      </div>
    );
}

export default CreateClass;