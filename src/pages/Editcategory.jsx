import React from "react";
import { useState,useEffect} from "react";
import { Link } from "react-router-dom";
import Footer from "../common_component/Footer";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Editcategory() {
  const params = useParams();
  const [fetchedData, setFetchedData] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();

  const fetchRecords = async () => {
    return await axios.get(`http://localhost:3001/fetch_category_by_id/${params.id}`);
  };
  useEffect(() => {
    const records = fetchRecords();
    records.then((allitems) => {
      setFetchedData(allitems.data.result);
      setName(allitems.data.result.name);
    });
  },[]);
  const validateForm = async (e) => {
    e.preventDefault();
    console.log(name);
    if (name.length > 0) {
      try {
        if (name.length > 0) {
          const response = await axios.post(
            "http://localhost:3001/update_category",
            { id:params.id,name: name },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            swal({
              title: "Good job!",
              text: "Category updated successfully",
              icon: "success",
              button: "Okay",
            }).then((item) => {
              if (item) {
                Navigate("/category");
              }
            });
          }
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    } else {
      setError("Please add category name");
    }
  };
  const removeError = () => {
    setError("");
  };
  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title"> Edit Category Form </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="#">Forms</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
              Edit Category Form
              </li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">EDIT NEW CATEGORY</h4>
                <p className="card-description">EDIT NEW CATEGORY</p>
                <form className="forms-sample">
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyUp={removeError}
                    />
                    <span>{error}</span>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mr-2"
                    onClick={validateForm}
                  >
                    Update
                  </button>
                  <button className="btn btn-light">Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* content-wrapper ends */}
      {/* partial:../../partials/_footer.html */}
      <Footer />
      {/* partial */}
    </div>
  );
}
