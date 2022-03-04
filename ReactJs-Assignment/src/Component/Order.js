import React, { useState, useEffect } from "react";
import Layout from "../Sameforall/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getdata();
  }, []);

  async function getdata() {
    try {
      setLoading(true);
      const results = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      results.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrders(ordersArray);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  }
  console.log("orders====", orders);

  return (
    <Layout loading={loading}>
      {orders.map((order) => {
        return (
          <table className="table mt-3 order">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
            <tbody>
              {order.cartItems.map((item) => {
                return (
                  <tr>
                    <td>
                      <img width="80" height="80" src={item.imageURL} />
                    </td>
                    <td>
                      <p>{item.name}</p>
                    </td>
                    <td>{item.price}</td>
                  </tr>
                );
              })}
              { order.addressInfo.address && <tr>Selected Address: {`${order.addressInfo.address},${order.addressInfo.pincode}`} </tr>}
            </tbody>
          </table>
        );
      })}
    </Layout>
  );
}

export default Order;
