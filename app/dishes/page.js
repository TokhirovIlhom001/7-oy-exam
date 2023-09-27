"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Star from "../../public/image/Star.svg";
import { toast } from "react-toastify";
import '../style/style.scss'
import Header from "../components/header/page";
import Footer from "../components/footer/page";
import {Pagination} from "@nextui-org/react";

const apiUrl = "http://207.154.221.44:4002";

const apiDishes = `${apiUrl}/api/dishes?page=1&page_size=10`;

const Dishes = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch(apiDishes)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          setDishes(data.data.data);
        }
      })
      .catch((err) =>
        toast.error(
          "Ups serverda qandaydur xatolik iltimos qaytadan urinib ko'ring"
        )
      );
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  useEffect(() => {

  const handleSearch = async (e) => {
  const term = e.target.value;

  setSearchTerm(term);

  if(term) {
    const res = await fetch(`http://207.154.221.44:4002/search?q=${term}`);
    const data = await res.json();

    setResults(data);
  }
  }
})

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartDish = async (data) => {
    cart = [...cart, data];
    await localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <section className="Dishes">
      <Header/>
      <div className=" mx-auto topDishes__container">

        <div className="card_style">
          <div className="card-container">
            {dishes.length
              ? dishes.map((dish) => (
                <div key={dish.id} id={dish.id} className="card">
                  <img
                    className="card_img"
                    src={`${apiUrl}/${dish.image}`}
                    alt={"asdljfhsadjklfh"}
                  />
                  <p
                    className="card_type"
                    style={{
                      backgroundColor:
                        dish.type.toLowerCase() == "trending"
                          ? "#F7C5BA"
                          : dish.type.toLowerCase() == "healthy"
                          ? "#F7EDD0"
                          : "#AFE1AF",
                      color:
                        dish.type.toLowerCase() == "trending"
                          ? "#FB471D"
                          : dish.type.toLowerCase() == "healthy"
                          ? "#DAA31A"
                          : "#309D5B",
                    }}
                  >
                    {dish.type}
                  </p>
                  <h3 className="card_h3">{dish.name}</h3>
                  <div className="card_div-one">
                    <p className="card_time">{dish.time} min •</p>
                    <p className="card_mark"> <Image src={Star} alt="Star" /> {dish.mark}</p>
                  </div>
                  <div className="card_div-two">
                    <p className="card_price">${dish.price}</p>
                    <button
                      className="card_btn"
                      onClick={(evt) => cartDish(dish)}
                      id={dish.id}>
                      +
                    </button>
                  </div>
                </div>
                ))
              : ""}
          </div>
          {/* <Pagination total={2} initialPage={1} /> */}
        </div>
        <div className="dishes_menu">
          <div className="container">
            <ul className="dishes_menu-ul">
              <li className="dishes_menu-li">
                <p className="dishes_menu-p">How long does delivery take?</p>
                <button className="dishes_menu-btn">+</button>
              </li>
              <li className="dishes_menu-li">
                <p>How long does delivery take?</p>
                <button className="dishes_menu-btn">+</button>
              </li>
              <li className="dishes_menu-li">
                <p>How long does delivery take?</p>
                <button className="dishes_menu-btn">+</button>
              </li>
              <li className="dishes_menu-li">
                <p>How long does delivery take?</p>
                <button className="dishes_menu-btn">+</button>
              </li>
              <li className="dishes_menu-li">
                <p>How long does delivery take?</p>
                <button className="dishes_menu-btn">+</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer/>
    </section>
  );
};

export default Dishes;
