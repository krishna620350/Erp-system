import React from "react";

const Class = (props) => {
    const data = props.data;
    
    return (
      <div className="card bg-transparent">
        <h5 className="card-header text-white">
          <div className="d-flex justify-content-between">
            <span>Class Details</span>
            <span>
              <button className="btn p-0" onClick={() => props.setOpenClass(data)}>
                <i className="fa-solid fa-expand"></i>
              </button>
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
