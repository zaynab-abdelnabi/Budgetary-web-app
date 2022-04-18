import React from "react";
import "animate.css";
import "./Card.css";

export function Card(props) {
  return (
    <div
      className={`card ${props.class} animate__animated`}
      style={{ animationDuration: "1.5s" }}
    >
      {props.children}
    </div>
  );
}

export function AmountCard(props) {
  return (
    <div className="card total" style={{ color: `${props.color}` }}>
      <p className="amount_title">{props.title}</p>
      <p className="card_amount">
        <b>{props.amount} $ </b>
      </p>
    </div>
  );
}

export function Cards(props) {
  const total = () => {
    if (props.income - props.expense <= 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div
      className="cards animate__animated animate__zoomIn"
      style={{ animationDuration: "1.5s" }}
    >
      <AmountCard
        title="Income"
        amount={`+ ${Number(props.income).toLocaleString()}`}
        color="green"
      />
      <AmountCard
        title="Expense"
        amount={`- ${Number(props.expense).toLocaleString()}`}
        color="red"
      />
      <AmountCard
        title="Total"
        amount={`${total() ? "+" : ""} ${Number(
          props.income - props.expense
        ).toLocaleString()}`}
        color={`${total() ? "green" : "red"}`}
      />
    </div>
  );
}
