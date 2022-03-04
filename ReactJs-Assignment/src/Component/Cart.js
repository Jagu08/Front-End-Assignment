import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Sameforall/Layout";
import { Modal } from "react-bootstrap";
import { addDoc, collection, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { toast } from "react-toastify";
import "../css-design/address.css";

function Cart() {
  const [total, setTotal] = useState(0);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  

  const [show, setShow] = useState(false);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  async function getdata() {
    try {
      setLoading(true);
      const orders = await getDocs(collection(fireDB, "orders"));
      const addressArr = [];
      orders.forEach((doc) => {
        const obj = {
          id: doc.id,
          pincode: doc.data().addressInfo.pincode,
          address: doc.data().addressInfo.address,
        };
        addressArr.push(obj);
        setAddresses(addressArr);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  }
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const deleteFromCart = (product) => {
    console.log(product);
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    let temp = 0;
    cartItems.map((item) => {
      temp = temp + item.price;
    });
    setTotal(temp);
  }, [cartItems]);

  const [val, setVal] = useState({});
  console.log("add", address);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVal({
      [name]: value,
    });
  };
  const placeOrder = async () => {
    const addressInfo = {
      name,
      address: Object.values(val) && !address ? Object.values(val)[0] : address,
      pincode,
      phoneNumber,
    };
    console.log("final", addressInfo);

    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,
    };

    try {
      setLoading(true);
      const result = await addDoc(collection(fireDB, "orders"), orderInfo);
      setLoading(false);
      toast.success("order placed successfully");
      setSuccess(true);
       handleClose();
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      toast.error("order failed");
    }
  };

 
  return (
    <Layout loading={loading}>
      <table className="table mt-3">
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
        <tbody>
          {cartItems.map((item) => {
            return (
              <tr>
                <td>
                  <img width="80" height="80" src={item.imageURL} />
                </td>
                <td>
                  <p>{item.name}</p>
                </td>
                <td>{item.price}</td>
                <td>
                  <FaTrash onClick={() => deleteFromCart(item)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-end mt-5">
        <h3 className="total">Total Amount: {total} rs.</h3>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button className="total" onClick={handleShow}>
          PLACE ORDER
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        {!success ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Add Your Address</Modal.Title>
            </Modal.Header>
            <div className="container">
              <div className="row">
                <div className="col-md-8 offset-md-2 align-center pastaddress">
                  <h5 className="ms-5">Select Saved Address: </h5>
                  {addresses.map((item) => {
                    return (
                      <label>
                        <input
                          className="radio-inline ms-3"
                          type="radio"
                          value={item.address + item.pincode}
                          onChange={(e) => handleChange(e)}
                          name="group"
                        />
                        {`${item.address},${item.pincode}`}
                      </label>
                    );
                  })}
                </div>
                <Modal.Body>
                  <div className="col-md-10 ">
                    <div className="register-form">
                      <h1>Details</h1>
                      <hr />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <textarea
                        className="form-control"
                        rows={3}
                        name="Address"
                        placeholder="address"
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <input
                        className="form-control"
                        name="pincode"
                        placeholder="pincode"
                        type="number"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                      />

                      <input
                        className="form-control"
                        placeholder="phonenumber"
                        name="phoneNumber"
                        type="number"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button onClick={handleClose}>Close</button>
                  <button onClick={placeOrder}>Order</button>
                </Modal.Footer>{" "}
              </div>
            </div>
          </>
        ) : (
          <div className="success">
            <Modal.Header closeButton>
              <Modal.Title>THANK YOU :)</Modal.Title>
            </Modal.Header>
            <hr />
            <h2>Order placed successfully.</h2>
            <br /> <br />
            <div className="check">
              <i className="bx bx-check-circle bx-burst"></i>
            </div>
            <br />
            <hr />
            <h2>You can check your order from orders page.</h2>
          </div>
        )}
      </Modal>
    </Layout>
  );
}

export default Cart;
