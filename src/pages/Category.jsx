import React from "react";
import Footer from "../common_component/Footer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Category() {
  const [fetchedData, setFetchedData] = useState([]);
  const Navigate = useNavigate();
  const fetchRecords = async () => {
    return await axios.get("http://localhost:3001/fetch_category");
  };
  useEffect(() => {
    const records = fetchRecords();
    records.then((allitems) => {
      setFetchedData(allitems.data.result);
    });
  }, []);
  const deleteCategory = async (id) => {
    const deleteRecord = await axios.get(
      `http://localhost:3001/delete_category/${id}`
    );
    if (deleteRecord.data.success) {
      swal({
        title: "Good job!",
        text: "Category deleted successfully",
        icon: "success",
        button: "Okay",
      }).then((item) => {
        if (item) {
          Navigate("/category");
        }
      });
    }
  };
  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title"> Basic Tables </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="#">Tables</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Basic tables
              </li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Striped Table</h4>
                <Link
                  to="/add-category"
                  className="btn btn-outline-primary btn-fw"
                >
                  ADD NEW
                </Link>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th> ID </th>
                      <th>Category Name</th>
                      <th> Status </th>
                      <th> Created AT </th>
                      <th> Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetchedData.map((item, index) => (
                      <tr key={index}>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.status}</td>
                        <td>{item.created_at}</td>
                        <td>
                          <Link to={`/edit-category/${item._id}`}>
                            <i class="mdi mdi-tooltip-edit"></i>
                          </Link>
                          <Link
                            href="#"
                            onClick={() => deleteCategory(item._id)}
                          >
                            <i class="mdi mdi-delete"></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* partial */}
    </div>
  );
}
