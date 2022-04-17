import React, { Component } from "react";
import axios from "axios";
import LoadingComponent from "../../components/Loading/Loading";
import { AddButton } from "../../components/Buttons/Button";
import { AdminsTable } from "../../components/AdminsTable/AdminsTable";
import AddAdmin from "../../components/Forms/AddAdmin";
import EditAdmin from "../../components/Forms/EditAdmin";
import * as alert from "../../components/Alerts/Alert";
import "./Admins.css";

export default class Admins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editView: false,
      addView: false,
      admins: undefined,
      admin: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  /**
   * Get all admins
   * store data in "admins" state
   */

  getAllData = async () => {
    try {
      await axios
        .get(`https://financial-app-api.herokuapp.com/api/admins`)
        .then((res) => {
          this.setState({
            admins: res.data.data,
            loading: false,
          });
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * Adding new admin
   *
   * @param {name, email, password} data
   * close add view
   */

  addNew = async (data) => {
    try {
      await axios
        .post(`https://financial-app-api.herokuapp.com/api/admins`, data)
        .then((res) => {
          if (res.data.status === 401) {
            alert.error(res.data.message);
          } else {
            alert.success(res.data.message);
            this.setState({ loading: true, addView: false });
            this.getAllData();
          }
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * get admin by id
   *
   * @param {*} id
   * add data to "admin" state
   * open edit view
   */

  getById = async (id) => {
    try {
      await axios
        .get(`https://financial-app-api.herokuapp.com/api/admins/${id}`)
        .then((res) => {
          this.setState({
            admin: res.data.data,
            editView: true,
            addView: false,
          });
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * Edit admin by id
   * @param {name, email} data
   */

  editById = async (data) => {
    await axios
      .put(
        `https://financial-app-api.herokuapp.com/api/admins/edit/${data.id}`,
        data
      )
      .then((res) => {
        if (res.data.status === 401) {
          alert.error(res.data.message);
        } else {
          alert.success(res.data.message);
          this.setState({ loading: true, editView: false, addView: false });
          this.getAllData();
        }
      })
      .catch((err) => console.log(err.message));
  };

  /**
   *
   * @param {name, email, password, confirmPassword} data
   */

  editPassword = async (data) => {
    await axios
      .put(`https://financial-app-api.herokuapp.com/api/admins/password`, data)
      .then((res) => {
        if (res.data.status === 401) {
          alert.error(res.data.message);
        } else {
          alert.success(res.data.message);
          this.setState({ loading: true, editView: false, addView: false });
          this.getAllData();
        }
      })
      .catch((err) => console.log(err.message));
  };

  /**
   * Delete admin by id
   *
   * @param {*} id
   */

  deleteById = async (id) => {
    try {
      await axios
        .delete(`https://financial-app-api.herokuapp.com/api/admins/${id}`)
        .then((res) => {
          alert.success(res.data.message);
          this.setState({ loading: true, editView: false, addView: false });
          this.getAllData();
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
          <div className="page-heading">
            <h1>Admins</h1>
            <AddButton
              title="Add Admin"
              onClick={() => {
                this.setState({ addView: true, editView: false });
              }}
            />
          </div>
          <div className="admin-content">
            {this.state.admins && (
              <AdminsTable
                data={this.state.admins}
                delete={(id) => this.deleteById(id)}
                edit={(id) => this.getById(id)}
              />
            )}

            {this.state.addView && (
              <AddAdmin
                onSubmit={(data) => this.addNew(data)}
                close={() => this.setState({ addView: false })}
              />
            )}
            {this.state.editView && (
              <EditAdmin
                close={() => this.setState({ editView: false })}
                data={this.state.admin}
                onSubmitInfo={(data) => this.editById(data)}
                onSubmitPassword={(data) => this.editPassword(data)}
              />
            )}
          </div>
        </div>
      );
    }
  }
}
