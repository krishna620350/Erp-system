import { useEffect, useMemo, useState, lazy, Suspense } from "react";
import Class from "../class/class";
import { ClassApi } from "../../Api/Classapi";
import "./classes.scss";
import ClassDetail from "./ClassDetail";


const LazyComponent = {
  CreateClass: lazy(() => import("../class/CreateClass")),
  ClassDetail: lazy(() => import("./ClassDetail")),
};
const columns = [
  {
    id: 1,
    label: "Class Name",
    type: "number",
    name: "className",
    placeholder: "Enter Class Name",
  },
  {
    id: 2,
    label: "Section Name",
    type: "text",
    name: "classSectionName",
    placeholder: "Enter Section Name",
  },
  {
    id: 3,
    label: "Class Teacher Id",
    type: "number",
    name: "classTeacherId",
    placeholder: "Enter Class Teacher Id",
  },
  {
    id: 4,
    label: "Number of Students",
    type: "number",
    name: "classStudentNumber",
    placeholder: "Enter Number of Student",
  },
  // Add more columns as needed
];

const Classes = (props) => {
  const [classArray, setClassArray] = useState([]);
  const [createClass, setCreateClass] = useState(false);
  const [openClass, setOpenClass] = useState(null);
  const [reloadComponent, setReloadComponent] = useState(false);

  const handleClick = () => {
    setReloadComponent(false);
    setCreateClass(true);
  };
  
  const data = useMemo(() => {
    return { userId: props.userId };
  }, [props.userId]);

  useEffect(() => {
    if (data) {
      const fetchData = async () => {
        try {
          const response = await ClassApi.getClass(data);
          setClassArray(response);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData(); 
    }
  }, [data]);

  useEffect(() => {
    if (reloadComponent) {
      // Reload the component
      const fetchData = async () => {
        try {
          const response = await ClassApi.getClass(data);
          setClassArray(response);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
      setReloadComponent(false); // Reset reloadComponent state
    }
  }, [reloadComponent, data]);

  const handleDeleteClass = async(id) => {
    const response = await ClassApi.deleteClass({ id, userId: props.userId });
    if (response.message === true) {
      setReloadComponent(true);
    }
  }

  return (
    <>
      {openClass ? (<ClassDetail setOpenClass={setOpenClass} openClass={ openClass } />) : (
        <div className="display-g">
          <div className="button-container" >
            <button className="btn btn-dark w-100 h-100 opacity-25 btn-border" onClick={handleClick}>
              <span className="fs-1">
                <i className="fa-solid fa-plus"></i>
              </span>
            </button>
          </div>
          {classArray.length > 0 && classArray.map((value, index) => (
            <div className="button-container" key={index}>
              <Class {...value} deleteClass={handleDeleteClass} setOpenClass={ setOpenClass } />
            </div>
          ))}
          {createClass &&
            <Suspense fallback={<div>Loading...</div>}>
              <LazyComponent.CreateClass columns={columns} setCreateClass={setCreateClass} userId={props.userId} setReloadComponent={setReloadComponent} />
            </Suspense>
          }
        </div>
      )}
    </>
  );
}

export default Classes;