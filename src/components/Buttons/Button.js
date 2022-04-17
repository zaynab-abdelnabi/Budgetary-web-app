import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import "./Button.css";

export default function Submit() {
  return (
    <div style={{ margin: "10px auto" }}>
      <button type="Submit" className="btn btn-submit">
        Submit
      </button>
    </div>
  );
}

export function Button(props) {
  return (
    <button className={`btn ${props.class}`} onClick={() => props.onClick()}>
      {props.icon}
      <span style={{ marginLeft: ".5rem" }}>{props.title}</span>
    </button>
  );
}

export function Buttons(props) {
  return <div className="btns">{props.children}</div>;
}

export function AddButton(props) {
  return (
    <Button
      class="btn-submit"
      icon={<AiOutlinePlus />}
      title={props.title}
      onClick={() => props.onClick()}
      {...props}
    />
  );
}
