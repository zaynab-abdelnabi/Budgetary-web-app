import React, { Component } from "react";
import axios from "axios";
import { CategoriesTable } from "../../components/CategoryTable/CategoryTable";
import * as alert from "../../components/Alerts/Alert";
import LoadingComponent from "../../components/Loading/Loading";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addView: false,
      Categories: [],
      Category: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  /**
   * get all categories
   * add them to "categories" state
   */

  getAllData = async () => {
    try {
      await axios
        .get(`https://financial-app-api.herokuapp.com/api/categories`)
        .then((res) => {
          this.setState({
            Categories: res.data.data,
            loading: false,
          });
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * get category by id to edit
   *
   * @param {*} id
   */

  getById = async (id) => {
    try {
      await axios
        .get(`https://financial-app-api.herokuapp.com/api/categories/${id}`)
        .then((res) => {
          this.setState({
            Category: res.data.data,
          });
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * add new category
   *
   * @param {name, type} data
   * exit add view
   */

  addNew = async (data) => {
    await axios
      .post(`https://financial-app-api.herokuapp.com/api/categories`, data)
      .then((res) => {
        if (res.data.status === 401) {
          alert.error(res.data.message);
        } else {
          alert.success(res.data.message);
          this.setState({ loading: true, formView: false });
          this.getAllData();
        }
      })
      .catch((err) => console.log(err.message));
  };

  /**
   * edit category
   *
   * @param {name, type} data
   * @param {*} id
   */

  edit = async (data, id) => {
    await axios
      .put(
        `https://financial-app-api.herokuapp.com/api/categories/edit/${id}`,
        data
      )
      .then((res) => {
        if (res.data.status === 401) {
          alert.error(res.data.message);
        } else {
          alert.success(res.data.message);
          this.setState({ loading: true });
          this.getAllData();
        }
      })
      .catch((err) => console.log(err.message));
  };

  /**
   * delete category by id
   *
   * @param {*} id
   */

  delete = async (id) => {
    alert.confirmDelete().then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://financial-app-api.herokuapp.com/api/categories/${id}`
          )
          .then((res) => {
            alert.success(res.data.message);
            this.setState({ loading: true });
            this.getAllData();
          })
          .catch((err) => console.log(err.message));
      }
    });
  };

  render() {
    if (this.state.loading) {
      return <LoadingComponent />;
    } else {
      return (
        <div>
          <div className="page-heading">
            <h1>Categories</h1>
          </div>
          <CategoriesTable
            data={this.state.Categories}
            addView={this.state.addView}
            showDetails={(id) => this.getById(id)}
            onSubmitHandler={(data) => this.addNew(data)}
            onEdit={(data, id) => this.edit(data, id)}
            onChangeHandlerdelete={(id) => this.delete(id)}
          />
        </div>
      );
    }
  }
}
export default Categories;
