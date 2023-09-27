import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/image/Logo.svg";
import EatlyLogo from "../../../public/image/eatly.svg";
import Shop from "../../../public/image/Shop.svg";
import "../../style/style.scss";

const Header = () => {
  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="header_left">
            <div className="siteName">
              <Image src={Logo} alt="Logo" />
              <Image src={EatlyLogo} alt="Eatly Logo" />
            </div>
            <div className="siteMenu">
              <Link href={"/"}>
                <p>Home</p>
              </Link>
              <Link href={"/dishes"}>
                <p>Dishes</p>
              </Link>
            </div>
          </div>
          <div className="header_right">
            <Link href="/cart">
              <Image src={Shop} />
            </Link>
            <Link href={"/login"}>
              <p>Login</p>
            </Link>
            <Link href="/register">
              <button className="header_btn">Sign Up</button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
