import { useState } from "react";
import "./profile.scss"
import TeacherProfileForm from "../../Component/Forms/edit/EditForm";
import { profileMenu } from "../../data";
import WorkAndEducation from "../../Component/Card/workEducation/weCard";
import Details from "../../Component/Card/details/details";
import Idcard from "../../Component/Card/idcard/idcard";
import { convertDataToSpecificFormat } from "./data";

const educationData = [
  {
    id: 1,
    title: "Bachelor's Degree in Computer Science",
    name: "University of ABC",
    startYear: 2015,
    endYear: 2019,
  },
  {
    id: 2,
    title: "Master's Degree in Business Administration",
    name: "XYZ University",
    startYear: 2020,
    endYear: 2022,
  },
];
const workExperienceData = [
  {
    id: 1,
    title: "Software Developer",
    name: "Tech Solutions Inc.",
    startYear: 2019,
    endYear: 2021,
    description: "Developed web applications using modern technologies.",
  },
  {
    id: 2,
    title: "Product Manager",
    name: "InnovateTech Labs",
    startYear: 2021,
    endYear: 2023,
    description: "Led product development and strategy initiatives.",
  },
];

const Profile = (props) => {
  const [sectionShow, setSection] = useState("/details");
  const [open, setOpen] = useState(false);
  const [degination, setDegination] = useState("School");
  const menuItems = profileMenu.find((menu) => menu.title === "school");
  const converteddata = convertDataToSpecificFormat(props.data);
  const handleChangeSection = (section) => {
      setSection(section);
  }
  const formOpen = () => { 
      setOpen(true);
  }
  return (
    <div className="header__wrapper">
      <header></header>
      <div className="cols__container">
        <div className="left__col">
          <div className="img__container">
            <img src={props.data.photoUrl} alt="Anna Smith" />
            <span></span>
          </div>
          <h2>{ props.userId }</h2>
          <p>{degination}</p>

          <ul className="about">
            <li>
              <span>233</span>Total Attendance
            </li>
            <li>
              <span>221</span>Present
            </li>
            <li>
              <span>71%</span>Percentage
            </li>
          </ul>

          <div className="content">
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Aliquam erat volutpat. Morbi imperdiet, mauris ac auctor dictum,
              nisl ligula egestas nulla.
            </p>
          </div>
        </div>
        <div className="right__col">
          <nav>
            <ul className="nav-ul">
              {menuItems &&
                menuItems.listItems.map((menuItem) => (
                  <li
                    key={menuItem.id}
                    onClick={() => handleChangeSection(menuItem.url)}
                  >
                    <span className="me-1">
                      <i className={menuItem.icon}></i>
                    </span>
                    <span>{menuItem.title}</span>
                  </li>
                ))}
            </ul>
            <button onClick={formOpen}>Edit</button>
          </nav>

          <div className="photos">
          {sectionShow === "/details" && <Details details={ converteddata } />}
          {sectionShow === "/education" && <WorkAndEducation contents = {educationData} setdesc = {false}/>}
          {sectionShow === "/work" && <WorkAndEducation contents={workExperienceData} setdesc={ true } />}
          {sectionShow === "/idcard" && <Idcard />}
          </div>
        </div>
      </div>
      {open && <TeacherProfileForm setOpen={setOpen} />}
    </div>
  );
}

export default Profile;