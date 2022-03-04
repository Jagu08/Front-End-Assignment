import React, {useEffect,useState} from "react";
import Layout from "../Sameforall/Layout";
import {getDoc,doc} from "firebase/firestore"; 
import fireDB from "../fireConfig";
import {useParams} from "react-router";
import { useDispatch, useSelector } from "react-redux";

function Productinformation() {
    const dispatch = useDispatch();
    const[product,setProduct] = useState();
    const params = useParams();
    useEffect(()  =>{
        getdata()
    },[])

    async function getdata(){
        try{
       const productTemp = await getDoc(doc(fireDB,"products",params.productid));

        console.log(productTemp)
      setProduct(productTemp.data());
        } catch(error){
            console.log(error)
        }
    }
    const addToCart = (product) => {
        dispatch({ type: "ADD_TO_CART", payload: product });
      };
    return (
        <Layout>
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8">
            {product && (<div>
                <p><b>{product.name}</b></p>
                <img src={product.imageURL} className="product-img-info" alt="" />
                <hr/>
                <p>{product.description}</p>
                <div className="d-flex justify-content-end my-3">
                <button onClick={() => addToCart(product)}>Add to cart</button>
                </div>
            </div>)}
            </div>
            </div>
            </div>
        </Layout>
    );
}

export default Productinformation;