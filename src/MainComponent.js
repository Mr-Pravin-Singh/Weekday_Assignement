import React, { useEffect, useState } from "react";
import JobCard from "./Jobcard";
import "./Jobcard.css";

const MainComponent = () => {
  const [card, setCard] = useState([]);
  const [page, setPage] = useState(0);

  const getCardData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 10,
      offset: page,
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
    const data = await response.json();
    setCard((prevData) => [...prevData, ...data.jdList]);
    console.log("get data is", JSON.stringify(data));
  };

  useEffect(() => {
    getCardData();
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

  return (
    <div>
      <div className="job-cards-container">
        {card.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
};

export default MainComponent;
