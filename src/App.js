// JobSearchForm.js
import React, { useState, useEffect } from "react";
import MainComponent from "./MainComponent";
import "./Jobcard.css";
import JobCard from "./Jobcard";

const App = ({ onSearch }) => {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [remote, setRemote] = useState("");
  const [location, setLocation] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [allCardData, setAllCardData] = useState([]);
  const [page, setPage] = useState(0);
  var uniqueJobRole = [];
  var uniqueLocation = [];
  var uniqueExperience = [];
  var uniqueSearchResult = [];
  var filteredDataArray = [];
  var uniqueBasePay = [];
  const getAllCardData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 970,
      offset: 0,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };
    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    setAllCardData((prevData) => [...prevData, ...data.jdList]);
    console.log(
      "get results data is",
      allCardData.length,
      "jkdsaf",
      JSON.stringify(data),
    );
  };

  useEffect(() => {
    getAllCardData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollInfinite);
    return () => window.removeEventListener("scroll", handleScrollInfinite);
  }, []);
  const handleScrollInfinite = async () => {
    // console.log("scroll height", document.documentElement.scrollHeight);
    // console.log("window height", window.innerHeight);
    // console.log("scroll height top", document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.log("geting errr", err);
    }
  };

  const onRoleSelect = (e) => {
    setRole(e.target.value);
  };
  const onMinExperience = (e) => {
    setExperience(e.target.value);
  };

  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li>
            <select id="role" value={role} onChange={onRoleSelect}>
              <option value="">Role</option>
              {
                (uniqueJobRole = [
                  ...new Set(allCardData.map((item) => item.jobRole)),
                ])
              }
              ;
              {uniqueJobRole.map((employee) => (
                <option value={employee}>{employee}</option>
              ))}
            </select>
          </li>

          <li>
            <select
              id="experience"
              value={experience}
              onChange={onMinExperience}
            >
              <option value="">Min Experience</option>
              {
                (uniqueExperience = [
                  ...new Set(allCardData.map((item) => item.minExp)),
                ]
                  .filter((val) => val)
                  .sort((a, b) => a - b))
              }
              ;
              {uniqueExperience.map((employee) => (
                <option value={employee}>{employee}</option>
              ))}
            </select>
          </li>
          <li>
            <select
              id="remote"
              value={remote}
              onChange={(e) => setRemote(e.target.value)}
            >
              <option value="">Remote/on-site</option>
              <option value="remote">Remote</option>
              <option value="on-site">on-site</option>
            </select>
          </li>
          <li>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Location</option>
              {
                (uniqueLocation = [
                  ...new Set(allCardData.map((item) => item.location)),
                ])
              }
              ;
              {uniqueLocation.map((employee) => (
                <option value={employee}>{employee}</option>
              ))}
            </select>
          </li>
          <li>
            <select
              id="minSalary"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
            >
              <option value="">Min Base Pay</option>
              {
                (uniqueBasePay = [
                  ...new Set(allCardData.map((item) => item.minJdSalary)),
                ]
                  .filter((val) => val)
                  .sort((a, b) => a - b))
              }
              ;
              {uniqueBasePay.map((employee) => (
                <option value={employee}>{employee} USD</option>
              ))}
            </select>
          </li>
          <li>
            <input
              type="text"
              id="companyName"
              value={companyName}
              placeholder="compny Name"
              onChange={(e) => setCompanyName(e.target.value)}
            />
            {/* <button onClick={handleSearch}>Search</button> */}
          </li>
        </ul>
      </nav>
      {console.log("all data issidfd", allCardData)}
      {allCardData.forEach((el) => {
        if (
          el.jobRole === role ||
          el.maxJdSalary === minSalary ||
          el.location === location ||
          el.location == remote ||
          el.minJdSalary == minSalary ||
          el.minExp == experience
        ) {
          filteredDataArray.push(el);
          console.log("filterd arrya", el, companyName);
        }
        if (
          companyName.trim() !== "" &&
          el.companyName.toLowerCase().includes(companyName.toLowerCase())
        ) {
          filteredDataArray.push(el);
          // Filter the data based on the search query
          console.log("now filtering", companyName);
        }
      })}

      {console.log("new unique array", uniqueSearchResult, filteredDataArray)}
      <div className="job-cards-container">
        {filteredDataArray.length != 0 ? (
          filteredDataArray.map((job, index) => (
            <JobCard key={index} job={job} />
          ))
        ) : (
          <div>
            <MainComponent />
          </div>
        )}
      </div>
    </header>
  );
};

export default App;
