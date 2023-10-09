import React from "react";
import { Link } from "react-router-dom";

const Class = (props) => {
  const data = props.data;
  const handleClick = () => {
    props.setActiveContent("classes");
  }
  if (!data) {
    return <div>No class available</div>
  }
    return (
      <div className="card bg-transparent">
        <h5 className="card-header text-white">
          <div className="d-flex justify-content-between">
            <span>Class Details</span>
            <span onClick={() => props.setClassDetails(data) }>
              <Link to="details" className="btn p-0" onClick={()=>handleClick()}>
                <i className="fa-solid fa-expand"></i>
              </Link>
            </span>
          </div>
          <p class="fs-6 mt-2 mb-0 text-secondary">
            CTid - # {data.classTeacherId}
          </p>
        </h5>
        <div className="card-body">
          <h5 className="card-title">
            {data.className} ( <span>{data.classSectionName}</span> )
          </h5>
          <p className="card-text">
            Number of Students: {data.classStudentNumber}
          </p>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <button className="btn btn-primary">
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            className="btn btn-danger"
            onClick={() => props.deleteClass(props.id)}
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
      </div>
    );
};

export default Class;
