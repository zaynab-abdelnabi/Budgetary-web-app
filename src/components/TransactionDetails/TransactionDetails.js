import React from "react";

import Swal from "sweetalert2";
import "animate.css";

import { Card } from "../Card/Card";
import { FiCalendar } from "react-icons/fi";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { Buttons, Button } from "../Buttons/Button";
import "./TransactionDetails.css";

function dateFormatter(date) {
  var mydate = new Date(date);
  var month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][mydate.getMonth()];
  return mydate.getDate() + " " + month + " " + mydate.getFullYear();
}

export default function TransactionDetails(props) {
  const toDigits = (num) => {
    return Number(num).toLocaleString();
  };

  const onDeleteHandler = () => {
    if (props.data.recurring_id) {
      Swal.fire({
        title: "Recurring Transaction",
        text: "Do you want to delete all related transaction or this transaction only?",
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "All Transactions",
        denyButtonText: `Only this one`,
        denyButtonColor: "#f76928",
        confirmButtonColor: "red",
        cancelButtonColor: "#555",
      }).then((result) => {
        if (result.isConfirmed) {
          props.onDelete(props.data.recurring_id, "recurring");
        } else if (result.isDenied) {
          props.onDelete(props.data.id, "fixed");
        }
      });
    } else {
      Swal.fire({
        text: "Are you sure you want to delete this transaction?",
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        confirmButtonColor: "#f76928",
        cancelButtonColor: "#555",
      }).then((result) => {
        if (result.isConfirmed) {
          props.onDelete(props.data.id, "fixed");
        }
      });
    }
  };

  const onEditHandler = () => {
    if (props.data.recurring_id) {
      Swal.fire({
        title: "Recurring Transaction",
        text: "Do you want to edit all related transaction, future transactions, or this transaction only?",
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "All Transactions",
        denyButtonText: `Future transactions`,
        cancelButtonText: "Only this one",
        denyButtonColor: "#f76928",
        confirmButtonColor: "green",
        cancelButtonColor: "#555",
      }).then((result) => {
        if (result.isConfirmed) {
          props.onEdit(props.data.recurring_id, "recurring");
        } else if (result.isDenied) {
          props.onEdit(props.data.recurring_id, "future");
        } else if (result.isDismissed) {
          props.onEdit(props.data.id, "fixed");
        }
      });
    } else {
      props.onEdit(props.data.id, "fixed");
    }
  };

  return (
    <Card class="transaction_details" id="details">
      <AiOutlineClose
        className="AiOutlineClose"
        onClick={() => props.close()}
      />
      <div className="table_item_details">
        <div className="title_category">
          <h2 className="transaction_title">{props.data.title}</h2>
          <p className="transaction_category">{props.data.category.name}</p>
        </div>
        <div className="price_date">
          <p className="transaction_date">
            <i>{dateFormatter(props.data.date)}</i>
            <FiCalendar style={{ marginLeft: ".5rem" }} />
          </p>
          <p className="transaction_price">
            {props.data.category.type === "income" ? "+ " : "- "}
            {toDigits(props.data.amount)} {props.data.currency}
          </p>
        </div>
      </div>
      <div className="description">
        <h4 className="desc_title">Decription</h4>
        <p className="desc_parg">{props.data.description}</p>
      </div>

      <Buttons>
        <Button
          title="Edit"
          class="btn-edit"
          icon={<MdModeEditOutline />}
          onClick={onEditHandler}
        />
        <Button
          title="Delete"
          class="btn-delete"
          icon={<MdDelete />}
          onClick={onDeleteHandler}
        />
      </Buttons>
    </Card>
  );
}
