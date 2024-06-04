import axios from "axios";
import "./Product.css";
import React, { useEffect, useState } from "react";
import Apiurl from "./Constant";
import { Error, Success } from "./String";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [err, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(true);

  async function getProductList() {
    axios
      .get(Apiurl)
      .then((response) => {
        // kept simple message but can show the message from server if i know the response format
        if (response.status != 200) {
          handeleError(`HTTP error! status: ${response.status}`);
        } else {
          setSuccess(Success);
          setProducts(response.data);
          setLoading(false);
        }
      })
      .catch(() => {
        handeleError(Error);
      });
  }
  useEffect(() => {
    getProductList();
  });

  function handeleError(message) {
    setError(message);
    setLoading(false);
  }

  //Data is Loading
  if (loading) {
    return <div>....loading</div>;
  }

  //Error detected
  if (err) {
    return <div>{err}</div>;
  }

  //Got success
  return (
    <div>
      <h1>Products</h1>

      {/* if data fetched successfully  */}
      <p>{success}</p>

      {/* If product not found or not rendered */}
      {products.length == 0 ? (
        <p>Products not found</p>
      ) : (
        // if product found then below code run
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
          </tr>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  style={{ height: "100px", width: "100px" }}
                  src={product.image}
                ></img>
              </td>
              <td>{product.title}</td>
              <td>{product.price} &#8377;</td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}
