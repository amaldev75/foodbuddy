import React from "react";
import { useNavigate, useLocation,useParams } from "react-router-dom";
import { useCartContext } from "./hooks/CartContext";

const CardPage = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCartContext();

  const { id } = useParams(); // Extract the 'id' from the route params
  const card = data.find((item) => item._id === id);

  //const card = data.find((item) => item._id === location.pathname.split("/")[2]);
  const handleAddToCart = () => {
    if (card) {
      addToCart(card);
      console.log("Adding to cart:", card);
    }
    navigate("/cart")
  };

  return (
    <div className="cardpage">
      <h1>{card?.title}</h1>
      <img src={card?.imgsrc} alt={card?.title} />
      <p>Price: ₹ {card?.price}</p>
      <p>{card?.content}</p>
      <button onClick={() => navigate(location.state?.from || "/")}>Back</button>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default CardPage;
