import React, { Component } from "react";
import axios from "axios";
import { Barchart, PieCharts } from "../../components/Barchart/Barchart";
import { Cards } from "../../components/Card/Card";
import { LatestTransaction } from "../../components/LatestTransactions/LatestTransactions";
import {
  ProfitGoalForm,
  ProfitGoal,
} from "../../components/ProfitGoals/ProfitGoals";
import LoadingComponent from "../../components/Loading/Loading";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editProfitGoal: false,
      ProfitGoals: [],
      ProfitGoal: {},
      incomeAmount: "",
      expenseAmount: "",
      records: undefined,
      categoriesRecords: undefined,
      value: "monthly",
      categoryValue: "monthly",
      range: 0,
      categoryRange: 0,
      latestTransactions: undefined,
      loading: true,
    };
  }

  componentDidMount() {
    this.getAllData();
    this.getRecords();
    this.getCategoriesRecords();
    this.getIncome();
    this.getExpense();
    this.getLatestTransactions();
  }

  /**
   * Get profit goal from data base
   * add data to "ProfitGoal"
   * change "loading" state
   *
   */

  getAllData = async () => {
    try {
      await axios
        .get(`https://financial-app-api.herokuapp.com/api/ProfitGoals`)
        .then((res) => {
          this.setState({
            ProfitGoals: res.data.data,
            ProfitGoal: res.data.data[0],
            loading: false,
          });
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  getPercentage = () => {
    // calculate total amount
    let total = this.state.incomeAmount - this.state.expenseAmount;
    /** @type {number}
     * <=0 ----> 0%
     * >=profitgoal ---->100%
     * <=profitgoal ----->calc
     */
    if (total <= 0) {
      return 0;
    } else if (total >= this.state.ProfitGoal.amount) {
      return 100;
    } else {
      return Math.round((total / this.state.ProfitGoal.amount) * 100);
    }
  };

  /**
   * get Records for chart
   *
   * @param {monthly || weekly || yearly} value
   * @param {..., -3, -2, -1, 0, 1, 2, 3, 4, ...} range
   */
  getRecords = async (value = "monthly", range = 0) => {
    this.setState({ range: range, value: value });
    try {
      await axios
        .get(
          `https://financial-app-api.herokuapp.com/api/transactions/${value}?range=${range}`
        )
        .then((res) => {
          this.setState({ records: res.data.data });
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * get records for piechart
   * 
   * @param {monthly || daily || yearly} value 
   * @param {..., -3, -2, -1, 0, 1, 2, 3, 4, ...} range 
   */


  getCategoriesRecords = async (value = "monthly", range = 0) => {
    this.setState({ categoryRange: range, categoryValue: value });
    try {
      await axios
        .get(
          `https://financial-app-api.herokuapp.com/api/transactions/records/category/${value}?range=${range}`
        )
        .then((res) => {
          this.setState({ categoriesRecords: res.data });
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * get income amount
   */

  getIncome = async () => {
    try {
      await axios
        .get(`https://financial-app-api.herokuapp.com/api/transactions/incomes`)
        .then((res) => {
          this.setState({ incomeAmount: res.data.data });
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * get expense amount
   */

  getExpense = async () => {
    try {
      await axios
        .get(
          `https://financial-app-api.herokuapp.com/api/transactions/expenses`
        )
        .then((res) => {
          this.setState({ expenseAmount: res.data.data });
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

   /**
   * get expense amount
   */
  
  getLatestTransactions = async () => {
    try {
      axios
        .get(
          `https://financial-app-api.herokuapp.com/api/transactions/latest-transactions`
        )
        .then((res) => {
          this.setState({ latestTransactions: res.data.data.data });
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    if (this.state.loading) {
      return <LoadingComponent />;
    } else {
      return (
        <div>
          {this.state.ProfitGoal && (
            <ProfitGoal
              profit={this.state.ProfitGoal} //profit state in componrts profit goals
              percentage={this.getPercentage()}
              editState={() => this.setState({ editProfitGoal: true })}
            />
          )}

          {this.state.editProfitGoal ? (
            <ProfitGoalForm
              onSubmit={() => {
                this.setState({ loading: true, editProfitGoal: false });
                this.getAllData();
              }}
              data={this.state.ProfitGoal}
              closeState={() => this.setState({ editProfitGoal: false })}
            />
          ) : (
            ""
          )}
          <Cards
            income={this.state.incomeAmount}
            expense={this.state.expenseAmount}
          />
          {this.state.records && (
            <Barchart
              changeRange={(nb) =>
                this.getRecords(this.state.value, this.state.range + nb)
              }
              data={this.state.records}
              value={(value) => this.getRecords(value)}
            />
          )}
          {this.state.categoriesRecords && (
            <PieCharts
              data={this.state.categoriesRecords.data}
              date={this.state.categoriesRecords.date}
              changeRange={(nb) =>
                this.getCategoriesRecords(
                  this.state.categoryValue,
                  this.state.categoryRange + nb
                )
              }
              value={(value) => this.getCategoriesRecords(value)}
            />
          )}

          {this.state.latestTransactions && (
            <LatestTransaction data={this.state.latestTransactions} />
          )}
        </div>
      );
    }
  }
}

export default Home;
