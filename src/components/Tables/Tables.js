import React from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Buttons, Button } from "../Buttons/Button";
import { FiCalendar } from "react-icons/fi";
import "./Tables.css";

function nFormatter(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
}

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

export function LatestTransactionItem(props) {
  const { title, amount, date, category, currency } = props.data;
  return (
    <div className="table_item">
      <div className="table_item_details">
        <div className="title_category">
          <h4 className="transaction_title">{title}</h4>
          <p className="transaction_category">{category.name}</p>
        </div>
        <div className="price_date">
          <p
            className="transaction_price"
            style={{
              color: `${category.type === "expense" ? "red" : "green"}`,
            }}
          >
            {category.type === "expense" ? "- " : "+ "}
            {nFormatter(amount)} {currency}
          </p>
          <p className="transaction_date">
            <FiCalendar style={{ marginRight: ".5rem" }} />
            <i>{dateFormatter(date)}</i>
          </p>
        </div>
      </div>
    </div>
  );
}

export function TransactionItem(props) {
  const { title, amount, date, category, currency } = props.data;

  return (
    <div
      className="table_item"
      onClick={() => {
        props.showItem();
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }}
    >
      <div className="table_item_details">
        <div className="title_category">
          <h4 className="transaction_title">{title}</h4>
          <p className="transaction_category">{category.name}</p>
        </div>
        <div className="price_date">
          <p
            className="transaction_price"
            style={{
              color: `${category.type === "expense" ? "red" : "green"}`,
            }}
          >
            {category.type === "expense" ? "- " : "+ "}
            {nFormatter(amount)} {currency}
          </p>
          <p className="transaction_date">
            <i>{dateFormatter(date)}</i>
            <FiCalendar style={{ marginLeft: ".5rem", fontSize: ".8rem" }} />
          </p>
        </div>
      </div>
    </div>
  );
}

export function AdminItem(props) {
  return (
    <div className="table_item">
      <div className="table_item_details admin_item">
        <div className="admin_avatar">
          <HiOutlineUserCircle size={"3rem"} style={{ marginRight: "20px" }} />
        </div>
        <div className="adexport function AdminItem(props) {return (min_info">
          <p className="admin-name">{props.name}</p>
          <p className="admin-email">{props.email}</p>
        </div>
      </div>

      <Buttons>
        <Button
          title=""
          class="btn-edit"
          icon={<MdModeEditOutline />}
          onClick={() => {
            props.edit();
            window.scroll({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
        />
        <Button
          title=""
          class="btn-delete"
          icon={<MdDelete />}
          onClick={() => props.delete()}
        />
      </Buttons>
    </div>
  );
}

export function CategoryItem(props) {
  const { id, name, type } = props.data;
  return (
    <>
      <div className="table_item">
        <div className="table_item_details category_item">
          <div className="category-item">
            <p className="category-name">
              <b>{name}</b>
            </p>
            <p className="type">{type}</p>
          </div>
        </div>

        <Buttons>
          <Button
            title=""
            class="btn-edit"
            icon={<MdModeEditOutline />}
            onClick={() => props.onEdit(id)}
          />
          <Button
            title=""
            class="btn-delete"
            onClick={() => props.onDelete()}
            icon={<MdDelete />}
          />
        </Buttons>
      </div>
    </>
  );
}
