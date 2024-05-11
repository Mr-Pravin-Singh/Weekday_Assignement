// JobCard.js
import React, { useState } from "react";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import InsightsIcon from "@mui/icons-material/Insights";
import VpnKeyOffIcon from "@mui/icons-material/VpnKeyOff";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import Button from "@mui/material/Button";
import "./Jobcard.css";
import { colors } from "@mui/material";
import { red } from "@mui/material/colors";

const Jobcard = ({ job }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="job-card">
      {/* {console.log("setiing data", job)} */}
      <div className="job-listing">
        {/* <div className="job-image">
        <img src="path/to/your/image" alt="Job" />
      </div> */}
        <div className="image-container">
          <img
            src={job.logoUrl} // Replace with your image URL
            alt="Example Image"
            className="image"
          />
        </div>
        <div className="job-details">
          <h4>{job.companyName}</h4>
          <h5>{job.jobRole}</h5>
          <h4>{job.location}</h4>
        </div>
      </div>
      {job.minJdSalary ? (
        <h5>
          Estimated Salary {job.minJdSalary} - {job.maxJdSalary}{" "}
          {job.salaryCurrencyCode}
        </h5>
      ) : (
        <span></span>
      )}

      <p></p>
      <h5>About Company</h5>
      <h6>About us</h6>
      <p className={expanded ? "expanded" : "collapsed"}>
        {expanded
          ? job.jobDetailsFromCompany
          : job.jobDetailsFromCompany.slice(0, 230) + "..."}
        <span className="toggle-description" onClick={toggleDescription}>
          {expanded ? "Show less" : "Show more"}
        </span>
      </p>
      {job.minExp ? <p>Minimum Experience: {job.minExp}</p> : <span></span>}
      <Button variant="contained" fullWidth color="secondary">
        <InsightsIcon />
        Easy Apply
      </Button>
      <br />
      <br />
      <Button variant="contained" fullWidth fontsize>
        <VpnKeyOffIcon />
        <AssistantDirectionIcon />
        Unlock Refferals asks
      </Button>
    </div>
  );
};

export default Jobcard;
