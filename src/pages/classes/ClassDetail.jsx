import { useLocation } from "react-router-dom";
import DataTable from "../../Component/Table/dataTable/DataTable";
import { products } from "../../data";
import { useEffect, useState } from "react";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "Full Name",
    type: "string",
    headerName: "Full Name",
    width: 150,
  },
  {
    field: "Date of Birth",
    type: "date",
    headerName: "Date of Birth",
    width: 120,
  },
  {
    field: "Email ID",
    type: "email",
    headerName: "Email ID",
    width: 250,
  },
  {
    field: "Phone Number",
    headerName: "Phone Number",
    type: "tel",
    width: 150,
  },
  {
    field: "Gender",
    headerName: "Gender",
    type: "string",
    width: 100,
  },
  {
    field: "Status",
    headerName: "Status",
    width: 100,
    type: "boolean",
  },
];

const ClassDetail = (props) => {
  const [selectedRadio, setSelectedRadio] = useState("student");

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
  };
  const { teacherId } = props.classDetails;

  useEffect(() => {
    const fetchTeacher = () => {
      if (teacherId) {
        
      }
    }
    fetchTeacher()
  }, [teacherId]);
  return (
    <div className="products">
      <div className="info d-flex justify-content-between align-item-centre mb-2">
        <h1>
          Class - {props.classDetails.className} (
          {props.classDetails.classSectionName})
        </h1>
        <div className="">
          <button className="btn btn-success">
            <i class="fa-solid fa-user-plus"></i>
          </button>
        </div>
      </div>
      <div>
        <p>
          <b>Class Teacher Id :</b> {props.classDetails.classTeacherId}
        </p>
        <p>
          <b>Total Student :</b> {props.classDetails.classStudentNumber}
        </p>
      </div>
      <div className="d-flex gap-2 mb-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="role"
            id="teacherRadio"
            value="teacher"
            checked={selectedRadio === "teacher"}
            onChange={handleRadioChange}
          />
          <label className="form-check-label" htmlFor="teacherRadio">
            Teachers
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="role"
            id="studentRadio"
            value="student"
            checked={selectedRadio === "student"}
            onChange={handleRadioChange}
          />
          <label className="form-check-label" htmlFor="studentRadio">
            Students
          </label>
        </div>
      </div>
      {selectedRadio === "teacher" ? (
        <DataTable slug="product" columns={columns} rows={products} />
      ) : (
        <DataTable slug="product" columns={columns} rows={products} />
      )}
    </div>
  );
};

export default ClassDetail;
