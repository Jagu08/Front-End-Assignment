import React, { useEffect, useState } from "react";
import Layout from "../Sameforall/Layout";
import { collection, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [searchKey, setSearchkey] = useState("");
  const [filterType, setFilterType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getdata();
  }, []);

  async function getdata() {
    console.log('calling')
    try {
      setLoading(true);
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
        setLoading(false);
      });
      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  return (
    <Layout loading={loading}>
      <div className="cointainer">
        <div className="d-flex w-50 my-2 justify-content-center mx-auto">
          <select
            className="form-control"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
            }}>
            <option value="">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Women Clothes">Women Clothes</option>
            <option value="Man Clothes">Man Clothes</option>
            <option value="Cosmetics">Cosmetics</option>
            <option value="Shoes">Shoes</option>
          </select>
          <input
            type="text"
            value={searchKey}
            onChange={(e) => {
              setSearchkey(e.target.value);
            }}
            className="form-control mx-2"
            placeholder="search"
          />
        </div>

        <div className="row">
          {products
            .filter((obj) => obj.name.toLowerCase().includes(searchKey))
            .filter((obj) => obj.category.includes(filterType))
            .map((product) => {
              return (
                <div className="col-md-4">
                  <div className="m-2 p-1 product position-relative">
                    <div className="product-content">
                      <p>{product.name}</p>
                      <div>
                        <h6>{product.price} Rs/-</h6>
                      </div>
                      <div className="text-center">
                        <img
                          src={product.imageURL}
                          alt=""
                          className="product-img"
                        />
                      </div>
                    </div>
                    <div className="product-actions">
                      <div className="d-flex">
                        <button
                          className="mx-2"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => {
                            navigate(`/productinformation/${product.id}`);
                          }}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
