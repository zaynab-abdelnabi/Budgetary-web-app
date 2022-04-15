import React, { useState } from "react";
import { SearchInput } from "../Inputs/Input";
import { Button } from "../Buttons/Button";
import { AiOutlinePlus } from "react-icons/ai";
import "./Head.css";

export default function ClickHead(props) {
  return (
    <h3
      className={props.active ? "card_title active" : "card_title"}
      onClick={() => props.onClick()}
    >
      {props.title}
    </h3>
  );
}

export function Head(props) {
  return (
    <h3 className={props.active ? "card_title active" : "card_title"}>
      {props.title}
    </h3>
  );
}

export function Heads(props) {
  return (
    <div className="card_head">
      <div className="card_titles">{props.children}</div>
    </div>
  );
}

export function EditAdminHead(props) {
  return (
    <Heads>
      <ClickHead
        title="Edit Info"
        active={props.active}
        onClick={props.status}
      />
      <ClickHead
        title="Edit Password"
        active={!props.active}
        onClick={props.status}
      />
    </Heads>
  );
}

export function AddAdminHead() {
  return (
    <Heads>
      <Head title="Add Admin" active={true} />
    </Heads>
  );
}

export function TransactionTableHead(props) {

  return (
    <Heads>
      <ClickHead
        title="All"
        active={props.filter === "all"}
        onClick={() => {
          props.status("all");
        }}
      />
      <ClickHead
        title="Income"
        active={props.filter === "income"}
        onClick={() => {
          props.status("income");
        }}
      />
      <ClickHead
        title="Expenses"
        active={props.filter === "expense"}
        onClick={() => {
          props.status("expense");
        }}
      />
    </Heads>
  );
}

export function AdminsTableHead(props) {
  return (
    <Heads>
      <Head title="Admins" active={true} />
      <SearchInput {...props} />
    </Heads>
  );
}

export function TransactionFormHead(props) {
  return (
    <Heads>
      <ClickHead title="Income" active={props.active} onClick={props.status} />
      <ClickHead
        title="Expense"
        active={!props.active}
        onClick={props.status}
      />
    </Heads>
  );
}

export function CategoriesTableHead(props) {
  const [activity, setActivity] = useState("all");

  return (
    <Heads>
      <div className="grp_category">
        <ClickHead
          title="All"
          active={activity === "all"}
          onClick={() => {
            setActivity("all");
            props.status("all");
          }}
        />
        <ClickHead
          title="Income"
          active={activity === "income"}
          onClick={() => {
            setActivity("income");
            props.status("income");
          }}
        />
        <ClickHead
          title="Expenses"
          active={activity === "expense"}
          onClick={() => {
            setActivity("expense");
            props.status("expense");
          }}
        />
      </div>
      <Button
        class="btn-category"
        icon={<AiOutlinePlus />}
        title="Add Category"
        onClick={() => props.onAddClick()}
      />
    </Heads>
  );
}

export function LatestTransactionHead() {
  return (
    <Heads>
      <Head title="Latest Transaction" active={true} />
    </Heads>
  );
}
