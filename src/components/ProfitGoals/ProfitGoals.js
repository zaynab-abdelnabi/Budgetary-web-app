import React, { useState } from "react";
import Swal from "sweetalert2";
import "animate.css";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import Input from "../Inputs/Input";
import { Card } from "../Card/Card";
import Form from "../Forms/Form";
// import Submit from "../Buttons/Button";
import "./ProfitGoals.css";
import axios from "axios";

export function ProfitGoal(props) {
  // const [amnt, setAmnt] = useState('');

  // useEffect(async()=>{
  //   const fetch =  () => {
  //      setAmnt(props.profit[0].amount);
  //     console.log("amount",amnt);
  //   }
  // },[])

  // let indx = props.profit.map(pro=>{
  //   console.log(pro.amount);
  // })
  // let obj = props.profit[0];
  // console.log("amount2",obj);
  // let obj1 = props.profitId;
  // console.log("amountId",obj1);

  return (
    <Card class="profit_goal_card animate__slideInUp">
      <div className="profitGoal_heading">
        <div className="profitGoal_icons">
          <h3>Profit Goal</h3>
          <AiOutlineEdit
            style={{ margin: "0 10px", cursor: "pointer" }}
            onClick={() => props.editState()}
          />
        </div>
        <div className="profitGoal_amount">
          {/* <b>{obj && obj.amount ? obj.amount: "-"} $</b> */}
          <b>{Number(props.profit.amount).toLocaleString()} $</b>
        </div>
      </div>
      <div className="percentageBar">
        <div className="backgroundBar">
          <div
            className="upBar"
            style={{ width: `${props.percentage}%` }}
          ></div>
        </div>
        <div className="percentage">{props.percentage}%</div>
      </div>
    </Card>
  );
}

export function ProfitGoalForm(props) {
  const edit = async () => {
    let data = {
      amount: ProfitGoalEditForm,
    };
    console.log(data);
    axios
      .put(`https://financial-app-api.herokuapp.com/api/ProfitGoals/edit/1`, data)
      .then((res) => {
        if (res.data.status === 401) {
          Swal.fire({
            icon: "error",
            title: `${res.data.message}`,
            showConfirmButton: true,
            confirmButtonText: "Ok",
            confirmButtonColor: "#f76928",
            showClass: {
              popup: "animate__animated animate__zoomIn",
            },
            hideClass: {
              popup: "animate__animated animate__zoomOut",
            },
            timer: 3000,
          });
        } else {
          Swal.fire({
            title: `${res.data.message}`,
            showConfirmButton: true,
            confirmButtonText: "Ok",
            confirmButtonColor: "#f76928",
            showClass: {
              popup: "animate__animated animate__zoomIn",
            },
            hideClass: {
              popup: "animate__animated animate__zoomOut",
            },
            timer: 3000,
          });
          props.onSubmit();
        }
      })
      .catch((err) => console.log(err.message));
  };

  const [ProfitGoalEditForm, setProfitGoalEditForm] = useState(props.data);

  // const onChangeHandlerEdit = (e) => {
  //   const { name, value } = e.target;
  //   const editForm = ProfitGoalEditForm;
  //   console.log(e.target.value);
  //   editForm[`${name}`] = value;
  //   setProfitGoalEditForm(ProfitGoalEditForm);
  //   console.log("new ",ProfitGoalEditForm);
  // };
  return (
    <Card class="profit_goal_edit animate__slideInDown">
      <div className="profit_goal">
        <div className="editprofitGoal_icons">
          <h3>Edit profit Goal</h3>
          <AiOutlineClose
            style={{ margin: "0 10px", cursor: "pointer" }}
            onClick={() => props.closeState()}
          />
        </div>
        <div className="profit_goal_form">
          <Form onSubmit={edit}>
            <Input
              title="Amount"
              type="text"
              name="amount"
              defaultValue={ProfitGoalEditForm.amount}
              onChange={(e) => {
                setProfitGoalEditForm(e.target.value);
              }}
            />

            <button className="btn btn-submit">submit</button>
          </Form>
        </div>
      </div>
    </Card>
  );
}
