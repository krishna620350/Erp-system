import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { useState } from "react";
import { TeacherApiObject } from "../../../Api/TeacherApi";

const DataTable = (props) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleDelete = (id) => {
    //delete the item
    // mutation.mutate(id)
  };

  const handleMenuItemClick = async(content) => {
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const fileData = {
          teacherId: content,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          fileData: reader.result.split(',')[1],  // Base64-encoded file data
        };
        const response = await TeacherApiObject.updateData(fileData);
      }
      reader.readAsDataURL(file);
    } catch (e) {
      console.log(e.message);
    }
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 90,
    renderCell: (params) => {
      return (
        <div className="action">
          <div key={params.row.id}>
            <i class="fa-solid fa-expand"></i>
          </div>
          <div
            className="listItem"
            key={params.row.id}
            onClick={() =>
              handleMenuItemClick(`${params.row.id}`)
            }
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </div>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <i class="fa-solid fa-trash"></i>
          </div>
        </div>
      );
    },
  };

  const getRowClassName = (params) => {
    return params.row.status ? "active-row" : "inactive-row";
  };
  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        getRowClassName={getRowClassName}
      />
      <form>
        <input type="file" onChange={handleFileChange} />
      </form>
    </div>
  );
};

export default DataTable;
