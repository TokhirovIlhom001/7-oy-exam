"use client";

import Hero from "../public/image/Hero.svg";
import BG from "../public/image/Features.svg";
import Mobile from "../public/image/Mobile.svg";
import Resturent from "../public/image/Resturent.svg";
import Star from "../public/image/Star.svg";
import Control from "../public/image/Control.svg";
import Reviews from "../public/image/Reviews.svg";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "./components/header/page";
import Footer from "./components/footer/page";

const apiUrl = "http://207.154.221.44:4002";

const apiDishes = `${apiUrl}/api/dishes?page=1&page_size=10`;

const Home = () => {
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
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartDish = async (data) => {
    cart = [...cart, data];
    await localStorage.setItem("cart", JSON.stringify(cart));
  };
  return (
    <>
      <Header/>
      <div className="header_bottom">
        <div className="container">
          <div className="h_b-l">
            <p className="h_b-l-p">————— OVER 1000 USERS</p>
            <h1 className="h_b-l-h1">
              Enjoy Foods All Over The <span>World</span>
            </h1>
            <p className="h_b-l-p">
              EatLy help you set saving goals, earn cash back offers, Go to
              disclaimer for more details and get paychecks up to two days early.
              Get a <span>$20 bonus.</span>
            </p>
            <Link href={"/dishes"}>
              <button className="h_b-l-btn">Get Started</button>
            </Link>
          </div>
          <div className="h_b-r">
            <Image className="h_b-r" src={Hero} alt="Hero" />
          </div>
        </div>
        <Image className="BG" src={BG} alt="BG" />
        <div className="container">
          <div className="f-t_l">
            <Image className="f-t_l-img" src={Mobile} alt="Mobile" />
          </div>
          <div className="f-t_r">
            <h2 className="f-t_r-h2">
              Premium <span>Quality</span> For Your Health
            </h2>
            <p className="f-t_r-p">
              {" "}
              • Premium quality food is made with ingredients that are packed with
              essential vitamins, minerals.
            </p>
            <p className="f-t_r-p">
              {" "}
              • These foods promote overall wellness by support healthy digestion
              and boosting immunity
            </p>
            <button className="f-t_r-btn">Download ⇾</button>
          </div>
        </div>
        <div className="container">
          <Image className="rtt" src={Resturent} alt="Resturent" />
        </div>
        <section className="Dishes">
          <div className="containe mx-auto topDishes__container">
            <div className="card_style">
              <h2 className="card_style-h2">
                Our Top <span>Dishes</span>
              </h2>
              <div className="card-container">
                {dishes.length
                  ? dishes.slice(0, 5).map((dish) => (
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
            </div>
          </div>
        </section>
        <div>
          <Image className="control" src={Control} alt="Control" />
        </div>
        <div>
          <Image className="" src={Reviews} alt="Reviews"/>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Home;
