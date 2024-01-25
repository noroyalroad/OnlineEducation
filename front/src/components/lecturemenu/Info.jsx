import React from "react";
import "./lecturemenu.scss";

const Info = ({ info }) => {
  const { title, StartDate, EndDate, Description, Email, InstructorName } = info.props.info[0];
  console.log(Description);
  return (
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
  );
};

export default Info;
