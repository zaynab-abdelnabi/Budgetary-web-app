import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./Input.css";

export default function Input(props) {
  return (
    <>
      <label className="input_label">
        <span className="input_title">{props.title}</span>
        <input className="input" {...props} required />
      </label>
    </>
  );
}

export function SearchInput(props) {
  return (
    <>
      <label className="search_label">
        <AiOutlineSearch />
        <input
          type="text"
          name="search"
          className="search"
          placeholder="Search an admin"
          {...props}
        />
      </label>
    </>
  );
}

export function TextArea(props) {
  return (
    <>
      <label className="input_label" style={{ alignItems: "start" }}>
        <span className="input_title">{props.title}</span>
        <textarea className="input textArea" {...props}></textarea>
      </label>
    </>
  );
}

export function DropDown(props) {
  return (
    <>
      <label className="input_label">
        <span className="input_title">{props.title}</span>
        <select className="input" required {...props}>
          <option value="" >
            Select a {props.title}...
          </option>
          {props.children}
        </select>
      </label>
    </>
  );
}

export function CheckBoxInput(props) {
  const [fixedClicked, setFixedClicked] = useState(true);

  return (
    <>
      <label className="input_label">
        <span className="input_title">{props.title}</span>
        <div className="checkbox_inputs">
          <label>
            <input
              type="checkbox"
              name="type"
              value="fixed"
              checked={fixedClicked}
              onChange={() => {
                setFixedClicked(true);
                props.change("fixed");
              }}
            />
            <span>Fixed</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="type"
              value="recurring"
              checked={!fixedClicked}
              onChange={() => {
                setFixedClicked(false);
                props.change("recurring");
              }}
            />
            <span>Recurring</span>
          </label>
        </div>
      </label>
    </>
  );
}

export function DurationInput(props) {
  return (
    <>
      <label className="input_label">
        <span className="input_title">Every</span>
        <div className="duration">
          <input
            type="number"
            name="duration"
            className="input"
            placeholder="times..."
            required
            defaultValue={props.duration}
            {...props}
          />
          <select
            className="input"
            name="interval"
            required
            defaultValue={props.interval || ""}
            {...props}
          >
            <option value="" disabled>
              Select an interval...
            </option>
            <option value="days">days</option>
            <option value="weeks">weeks</option>
            <option value="months">months</option>
            <option value="years">years</option>
          </select>
        </div>
      </label>
    </>
  );
}
