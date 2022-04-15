import React, { useState } from "react";
import Input, {
  TextArea,
  DropDown,
  CheckBoxInput,
  DurationInput,
} from "../Inputs/Input";
import Submit from "../Buttons/Button";
import "./Form.css";
import { AiOutlineClose } from "react-icons/ai";

export default function Form(props) {
  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit();
      }}
      // {...props}
    >
      {props.children}
    </form>
  );
}

export function EditInfoForm(props) {
  const [data, setData] = useState(props.data);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Form onSubmit={() => props.onSubmitHandler(data)}>
      <Input
        title="Name"
        type="text"
        name="name"
        defaultValue={data.name}
        onChange={onChangeHandler}
      />
      <Input
        title="Email"
        type="email"
        name="email"
        defaultValue={data.email}
        onChange={onChangeHandler}
      />
      <Submit />
    </Form>
  );
}

export function EditPasswordForm(props) {
  const [data, setData] = useState(props.data);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    // console.log(data);
  };
  return (
    <Form onSubmit={() => props.onSubmitHandler(data)}>
      <Input
        title="Name"
        type="text"
        name="name"
        defaultValue={data.name}
        onChange={onChangeHandler}
        disabled
      />
      <Input
        title="Email"
        type="email"
        name="email"
        defaultValue={data.email}
        onChange={onChangeHandler}
        disabled
      />
      <Input
        title="Prev. Password"
        type="password"
        name="password"
        // defaultValue={}
        onChange={onChangeHandler}
      />
      <Input
        title="New Password"
        type="password"
        name="newPassword"
        // defaultValue={data.name}
        onChange={onChangeHandler}
      />
      <Submit />
    </Form>
  );
}

export function AddAdminForm(props) {
  const [admin, setAdmin] = useState({});

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  return (
    <Form onSubmit={() => props.onSubmit(admin)}>
      <Input title="Name" type="text" name="name" onChange={onChangeHandler} />
      <Input
        title="Email"
        type="email"
        name="email"
        onChange={onChangeHandler}
      />
      <Input
        title="Password"
        type="password"
        name="password"
        onChange={onChangeHandler}
      />
      <Submit />
    </Form>
  );
}

export function AddCategoryForm(props) {
  const [categoryForm, setcategoryForm] = useState({});

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setcategoryForm({ ...categoryForm, [name]: value });
    // console.log(categoryForm);
  };
  return (
    <Form
      className="FromAddCategory"
      onSubmit={() => props.onSubmitHandler(categoryForm)}
    >
      <AiOutlineClose
        className="AiOutlineClose"
        onClick={() => props.closecategory()}
      />
      <div className="submit-category">
        <Input
          title="Name"
          type="text"
          name="name"
          // className="input_add"
          onChange={onChangeHandler}
        />
        <div className="radio">
          <label>
            <input
              type="checkbox"
              name="type"
              value="income"
              checked={categoryForm.type === "income" ? true : false}
              onChange={onChangeHandler}
            />
            <span>income</span>
          </label>

          <label>
            <input
              type="checkbox"
              name="type"
              value="expense"
              checked={categoryForm.type === "expense" ? true : false}
              onChange={onChangeHandler}
            />
            <span>expense</span>
          </label>
        </div>
      </div>
      <Submit className="category-submit" />
    </Form>
  );
}

export function EditCategoryForm(props) {
  const [categoryEditForm, setcategoryEditForm] = useState(props.data);

  const onChangeHandlerEdit = (e) => {
    const { name, value } = e.target;
    setcategoryEditForm({ ...categoryEditForm, [name]: value });
  };
  return (
    <Form
      className="FromAddCategory"
      onSubmit={() => props.onChangeHandlerEdit(categoryEditForm)}
    >
      <AiOutlineClose
        className="AiOutlineClose"
        onClick={() => props.closeEditMode()}
      />
      <div className="submit-category">
        <Input
          title="Name"
          type="text"
          name="name"
          defaultValue={props.data.name}
          onChange={onChangeHandlerEdit}
        />

        <div className="radio">
          <label>
            <input
              type="checkbox"
              name="type"
              value="income"
              checked={categoryEditForm.type === "income" ? true : false}
              onChange={onChangeHandlerEdit}
            />
            <span>income</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="type"
              value="expense"
              checked={categoryEditForm.type === "expense" ? true : false}
              onChange={onChangeHandlerEdit}
            />
            <span>expense</span>
          </label>
        </div>
      </div>
      <Submit className="category-submit" />
    </Form>
  );
}

export function AddTransactionForm(props) {
  const [fixedClicked, setFixedClicked] = useState(true);
  const [fixedForm, setFixedForm] = useState({});
  

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFixedForm({ ...fixedForm, [name]: value });
    // console.log(fixedForm);
  };

  // var today = new Date();
  // console.log(
  //   `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  // );

  return (
    <Form onSubmit={() => props.onSubmitHandler(fixedForm)}>
      <Input
        title="Title"
        type="text"
        name="title"
        onChange={onChangeHandler}
      />
      <DropDown
        title="Category"
        name="category_id"
        defaultValue=""
        onChange={onChangeHandler}
      >
        {props.categories.map((category) => (
          <option value={category.id} key={category.id}>
            {category.name}
          </option>
        ))}
      </DropDown>
      <Input
        title="Amount"
        type="number"
        step="0.01"
        name="amount"
        onChange={onChangeHandler}
      />
      <DropDown title="Currency" name="currency" onChange={onChangeHandler}>
        <option value="$">$</option>
        <option value="L.L.">L.L.</option>
      </DropDown>
      <CheckBoxInput
        title="Type"
        change={(value) => {
          if (value === "fixed") {
            setFixedClicked(true);
            delete fixedForm.startDate;
            delete fixedForm.endDate;
            delete fixedForm.duration;
            delete fixedForm.interval;
            setFixedForm(fixedForm);
          } else if (value === "recurring") {
            setFixedClicked(false);
            delete fixedForm.date;
            setFixedForm(fixedForm);
          }
        }}
      />
      {fixedClicked ? (
        <Input
          title="Date"
          type="date"
          name="date"
          onChange={onChangeHandler}
          max={"2022-4-8"}
          // max={
          //   today.getFullYear() +
          //   "-" +
          //   (today.getMonth() + 1) +
          //   "-" +
          //   today.getDate()
          // }
        />
      ) : (
        <>
          <Input
            title="Start"
            type="date"
            name="start_date"
            onChange={onChangeHandler}
          />
          <Input
            title="End"
            type="date"
            name="end_date"
            onChange={onChangeHandler}
          />
          <DurationInput title="Duration" onChange={onChangeHandler} />
        </>
      )}

      <TextArea
        title="Description"
        name="description"
        onChange={onChangeHandler}
      />
      <Submit />
    </Form>
  );
}

export function EditTransactionForm(props) {
  const [fixedForm, setFixedForm] = useState({});
  const [transaction, setTransaction] = useState(props.transaction);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFixedForm({ ...fixedForm, [name]: value });
    setTransaction({ ...transaction, [name]: value });
  };

  return (
    <Form
      onSubmit={() => {
        props.onSubmitHandler(fixedForm);
      }}
    >
      <Input
        title="Title"
        type="text"
        name="title"
        defaultValue={transaction.title}
        onChange={onChangeHandler}
      />
      <DropDown
        title="Category"
        name="category_id"
        defaultValue={transaction.category_id || ""}
        onChange={onChangeHandler}
      >
        {props.categories.map((category) => (
          <option value={category.id} key={category.id}>
            {category.name}
          </option>
        ))}
      </DropDown>
      <Input
        title="Amount"
        type="number"
        step="0.01"
        name="amount"
        defaultValue={transaction.amount}
        onChange={onChangeHandler}
      />
      <DropDown
        title="Currency"
        name="currency"
        defaultValue={transaction.currency}
        onChange={onChangeHandler}
      >
        <option value="$">$</option>
        <option value="L.L.">L.L.</option>
      </DropDown>
      {props.type === "fixed" && (
        <Input
          title="Date"
          type="date"
          name="date"
          defaultValue={transaction.date}
          onChange={onChangeHandler}
        />
      )}
      {props.type === "recurring" && (
        <>
          <Input
            title="Start"
            type="date"
            name="start_date"
            defaultValue={transaction.recurring.start_date || ""}
            onChange={onChangeHandler}
          />
          <Input
            title="End"
            type="date"
            name="end_date"
            defaultValue={transaction.recurring.end_date || ""}
            onChange={onChangeHandler}
          />
          <DurationInput
            title="Duration"
            duration={transaction.recurring.duration.split(" ")[0]}
            interval={transaction.recurring.duration.split(" ")[1]}
            onChange={onChangeHandler}
          />
        </>
      )}

      <TextArea
        title="Description"
        name="description"
        onChange={onChangeHandler}
        defaultValue={transaction.description}
      />
      <Submit />
    </Form>
  );
}
