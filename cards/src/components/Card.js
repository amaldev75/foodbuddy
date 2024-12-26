import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ data }) {
  return (
    <div className="container">
      {data.map((card) => (
        <div key={card._id} className="card">
          <h1>{card.title}</h1>
          <img src={card.imgsrc} alt="img" />
          <p>Price: ₹ {card.price}</p>
          <p>{card.content}</p>
          <Link to={`/card/${card._id}`}>
            <button>details</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
