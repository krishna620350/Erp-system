import { useEffect, useMemo, useState } from "react";
import "./teachers.scss";
import DataTable from "../../Component/Table/dataTable/DataTable";
import Add from "../../Component/Forms/add/Add";
import { TeacherApiObject } from "../../Api/TeacherApi";
const columns = [
  { field: "id", headerName: "ID", width: 130 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "full name",
    type: "string",
    headerName: "Full Name",
    name: "name",
    width: 200,
  },
  {
    field: "date of birth",
    type: "date",
    headerName: "Date of Birth",
    name: "dateOfBirth",
    width: 120,
  },
  {
    field: "email id",
    type: "email",
    headerName: "Email ID",
    name: "email",
    width: 200,
  },
  {
    field: "phone number",
    type: "tel",
    headerName: "Phone Number",
    name: "phoneNumber",
    width: 150,
  },
  {
    field: "gender",
    type: "string",
    headerName: "Gender",
    name: "gender",
    width: 90,
  },
  {
    field: "status",
    headerName: "Status",
    width: 90,
    type: "boolean",
  },
];

const Teachers = (props) => {
  const [open, setOpen] = useState(false);
  const [Teachers, setTeachers] = useState([]);
  const [reload, setReload] = useState(true);
  const data = useMemo(() => {
    return { userId: props.userId };
  }, [props.userId]);

  useEffect(() => {
    if (reload) { 
      const fetchTeacher = async() => {
        const response = await TeacherApiObject.getData(data);
        const newResponse = response.map((teacher) => ({
          ...teacher,
          'date of birth': new Date(teacher['date of birth']),
        }));
        setTeachers(newResponse);
      }
      fetchTeacher();
    }
    setReload(false)
  }, [reload, data])
  return (
    <div className="products">
      <div className="info">
        <h1>Teachers</h1>
        <button onClick={() => setOpen(true)}>Add New Teachers</button>
      </div>
      {Teachers.length < 0 ? <p>no record found</p> : (<DataTable
        slug="Teacher"
        columns={columns}
        rows={Teachers}
      />)}
      {open && <Add slug="Teacher" columns={columns} setOpen={setOpen} userId={props.userId} setReload={ setReload } />}
    </div>
  );
};

export default Teachers;
