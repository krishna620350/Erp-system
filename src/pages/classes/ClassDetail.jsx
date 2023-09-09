import { useState } from "react";
import DataTable from "../../Component/Table/dataTable/DataTable";
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

const ClassDetail = (props) => {
  return (
    <div className="products">
      <div className="info d-flex gap-5 mb-3">
        <button
          className="btn btn-danger px-4"
          onClick={() => props.setOpenClass(null)}
        >
          <i class="fa-solid fa-x"></i>
        </button>
        <h1>
          Class - {props.openClass.className} ({props.openClass.classSectionName})
        </h1>
      </div>
      <DataTable slug="product" columns={columns} rows={products} />
    </div>
  );
};

export default ClassDetail;
