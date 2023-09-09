import { useState } from "react";
import "./teachers.scss";
import DataTable from "../../Component/Table/dataTable/DataTable";
import Add from "../../Component/Forms/add/Add";
import { products } from "../../data";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
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
    width: 250,
  },
  {
    field: "Date of Birth",
    type: "date",
    headerName: "Date of Birth",
    width: 150,
  },
  {
    field: "Email ID",
    type: "email",
    headerName: "Email ID",
    width: 200,
  },
  {
    field: "Phone Number",
    headerName: "Phone Number",
    type: "tel",
    width: 200,
  },
  {
    field: "Gender",
    headerName: "Gender",
    width: 200,
    type: "string",
  },
  {
    field: "Status",
    headerName: "Status",
    width: 150,
    type: "boolean",
  },
];

const Teachers = ({ setActiveContent }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="products">
      <div className="info">
        <h1>Teachers</h1>
        <button onClick={() => setOpen(true)}>Add New Teachers</button>
      </div>
      <DataTable
        slug="product"
        columns={columns}
        rows={products}
        setActiveContent={setActiveContent}
      />
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Teachers;
