import React from "react";
import "./lecturemenu.scss";

const Info = ({ info }) => {
  console.log(info);
  const { title, StartDate, EndDate, Description, Email, InstructorName, Qualifications } = info.props.info[0];
  console.log(Description);
  return (
    <div>
      <div className="lecture-info">
        <div className="info-header">
          <h2 className="lecture-title">{title}</h2>
          <p className="lecture-dates">
            <strong>Start Date:</strong> {StartDate} <br />
            <strong>End Date:</strong> {EndDate}
          </p>
        </div>
        <p className="lecture-description">{Description}</p>
      </div>
      <div className="lecture-info">
        <div className="info-header">
          <h2 className="lecture-title">{InstructorName}</h2>
          <p className="lecture-dates">
            <strong>instructor Email:</strong> {Email} <br />
          </p>
        </div>
        <p className="lecture-description">{Qualifications}</p>
      </div>
    </div>
  );
};

export default Info;
