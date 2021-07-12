import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input } from "antd";
import "antd/dist/antd.css";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";

const api = {
  key: "095b622490fb7d7ec06477c7711b7e54",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [Search, setSearch] = useState("");
  const [fetchWeather, setFetchWeather] = useState("");

  const SubmitSearch = async () => {
    const res = await axios(
      `${api.base}weather?q=${Search}&units=metric&appid=${api.key}`
    );
    console.log(res.data);
    if (res) {
      return setFetchWeather(res.data);
    }
  };

  const dateBuilder = (d) => {
    let day = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = day[d.getDay()];
    let months = month[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();

    return `${days} ${date} ${months} ${year}`;
  };

  useEffect(() => {
    SubmitSearch();
  }, []);

  return (
    <div>
      {fetchWeather ? (
        <>
          <Container>
            {/* <WeatherImage src="/images/default.jpg" /> */}
            <Wrap>
              {" "}
              <Input
                onKeyPress={SubmitSearch}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Search"
                prefix={<BiSearchAlt />}
              />
            </Wrap>
            <Mydate>{dateBuilder(new Date())}</Mydate>
            <Location>
              {fetchWeather.name}, {fetchWeather.sys.country}
            </Location>
            <Degree>{Math.round(fetchWeather.main.temp)}'C</Degree>
            <Condition>{fetchWeather.weather[0].description}</Condition>
          </Container>
        </>
      ) : (
        <Container>
          <Wrap>
            {" "}
            <Input
              onKeyPress={SubmitSearch}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search"
              prefix={<BiSearchAlt />}
            />
          </Wrap>
          <Mydate>{dateBuilder(new Date())}</Mydate>
          <Location>Default, null</Location>
          <Degree>0'C</Degree>
          <Condition>DESCRIPTION</Condition>
        </Container>
      )}
    </div>
  );
};

export default Weather;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("/images/cloud1.jpg") center center / cover fixed no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;

// const WeatherImage = styled.img`
//   width: 100vw;
//   height: 100vh;
//   position: absolute;

//   &:before {
//     content: "";
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     z-index: -1;
//   }
// `;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  Input {
    height: 40px;
    width: 150px;
    border-radius: 6px;
  }
`;

const Location = styled.div`
  font-size: 50px;
  font-weight: bold;
  color: white;
  font-family: poppins;
`;
const Degree = styled.div`
  width: 250px;
  height: 200px;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  font-size: 50px;
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: poppins;
`;
const Condition = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: white;
  font-family: poppins;
`;

const Mydate = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: white;
  font-family: poppins;
  margin-top: 20px;
`;
