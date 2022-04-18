import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { Card } from "../Card/Card";
import { FiCalendar } from "react-icons/fi";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import "./Barchart.css";
import { Button } from "../Buttons/Button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

export const BarOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: "#000",
        padding: 20,
        usePointStyle: true,
        pointStyle: "circle",
        font: {
          size: 18,
        },
      },
      display: true,
      position: "bottom",
    },
  },
};

export function Barchart(props) {
  const data = {
    labels: props.data[0].map((elt) => elt.date),
    datasets: [
      {
        label: "Income",
        data: props.data[0].map((elt) => elt.amount),
        backgroundColor: "green",
        barPercentage: 0.8,
        categoryPercentage: 0.6,
      },
      {
        label: "Expenses",
        data: props.data[1].map((elt) => elt.amount),
        backgroundColor: "#f76928",
        barPercentage: 0.8,
        categoryPercentage: 0.6,
      },
    ],
  };

  return (
    <Card class="barChart_card animate__slideInUp">
      <div className="btns">
        <div className="prev_next">
          <MdOutlineArrowBackIos onClick={() => props.changeRange(-1)} />
          <MdOutlineArrowForwardIos onClick={() => props.changeRange(1)} />
        </div>
        <div className="chart_variables">
          <Button
            class="btn-submit"
            title="W"
            onClick={() => props.value("weekly")}
          />
          <Button
            class="btn-submit"
            title="M"
            onClick={() => props.value("monthly")}
          />
          <Button
            class="btn-submit"
            title="Y"
            onClick={() => props.value("yearly")}
          />
        </div>
      </div>
      <Bar options={options} data={data} />
    </Card>
  );
}

export function PieChart(props) {
  const LightenDarkenColor = (col, amt) => {
    var usePound = false;

    if (col[0] === "#") {
      col = col.slice(1);
      usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00ff) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000ff) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  };

  const data = {
    labels: props.data.map((elt) => elt.category),
    datasets: [
      {
        label: "Category",
        data: props.data.map((elt) => elt.amount),
        backgroundColor: props.data.map((elt, index) =>
          LightenDarkenColor(`${props.color}`, (index + 1) * 30)
        ),
        borderColor: `#f3f3f3`,
        borderWidth: 3,
      },
    ],
  };
  return <Pie options={BarOptions} data={data} />;
}

export function PieCharts(props) {
  return (
    <Card class="pieChart_card animate__slideInUp">
      <div className="btns">
        <div className="pieChart_date">
          <FiCalendar style={{ marginRight: ".5rem" }} />
          {props.date}
        </div>

        <div className="prev_next">
          <MdOutlineArrowBackIos onClick={() => props.changeRange(-1)} />
          <MdOutlineArrowForwardIos onClick={() => props.changeRange(1)} />
        </div>

        <div className="chart_variables">
          <Button
            class="btn-submit"
            title="D"
            onClick={() => props.value("daily")}
          />
          <Button
            class="btn-submit"
            title="M"
            onClick={() => props.value("monthly")}
          />
          <Button
            class="btn-submit"
            title="Y"
            onClick={() => props.value("yearly")}
          />
        </div>
      </div>
      <div className="pies">
        <div className="income_pie">
          <h3>Income</h3>

          <PieChart data={props.data[0]} color="#008B00" />
        </div>
        <div className="expense_pie">
          <h3>Expense</h3>

          <PieChart data={props.data[1]} color="#DF4600" />
        </div>
      </div>
    </Card>
  );
}
