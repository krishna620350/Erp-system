import { useEffect, useMemo, useState, lazy, Suspense } from "react";
import Class from "../class/class";
import { ClassApi } from "../../Api/Classapi";
import "./classes.scss";
import { Link, Route, Routes, useNavigate } from "react-router-dom";


const LazyComponent = {
  CreateClass: lazy(() => import("../class/CreateClass")),
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
  const [reloadComponent, setReloadComponent] = useState(false);

  const navigate = useNavigate();

  const navigatePage = () => {
    return navigate("");
  }
  const handleClick = () => {
    setReloadComponent(false);
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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="createclass"
            element={
              <LazyComponent.CreateClass
                columns={columns}
                navigate={navigatePage}
                setReloadComponent={setReloadComponent}
              />
            }
          />
        </Routes>
      </Suspense>
      <div className="display-g">
        <div className="button-container">
          <Link to="createclass" onClick={handleClick}>
            <button className="btn btn-dark w-100 h-100 opacity-25 btn-border">
              <span className="fs-1">
                <i className="fa-solid fa-plus"></i>
              </span>
            </button>
          </Link>
        </div>
        {classArray.length > 0 &&
          classArray.map((value, index) => (
            <div className="button-container" key={index}>
              <Class
                {...value}
                deleteClass={handleDeleteClass}
                setClassDetails={props.setClassDetails}
                setActiveContent={props.setActiveContent}
              />
            </div>
          ))}
      </div>
    </>
  );
}

export default Classes;