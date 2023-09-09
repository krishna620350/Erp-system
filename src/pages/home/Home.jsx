import { useState } from "react";
import BarChartBox from "../../Component/Card/barChartBox/BarChartBox";
import BigChartBox from "../../Component/Card/bigChartBox/BigChartBox";
import ChartBox from "../../Component/Card/chartBox/ChartBox";
import PieChartBox from "../../Component/Card/pieCartBox/PieChartBox";
import TopBox from "../../Component/Card/topBox/TopBox";
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../../data";
import "./home.scss";

const Home = (props) => {
  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox {...chartBoxUser} setActiveContent={props.setActiveContent} />
      </div>
      <div className="box box3">
        <ChartBox {...chartBoxProduct} setActiveContent={props.setActiveContent} />
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      <div className="box box5">
        <ChartBox {...chartBoxConversion} setActiveContent={props.setActiveContent} />
      </div>
      <div className="box box6">
        <ChartBox {...chartBoxRevenue} setActiveContent={props.setActiveContent} />
      </div>
      <div className="box box7">
        <BigChartBox />
      </div>
      <div className="box box8">
        <BarChartBox {...barChartBoxVisit} />
      </div>
      <div className="box box9">
        <BarChartBox {...barChartBoxRevenue} />
      </div>
    </div>
  );
};

export default Home;
