"use client";

// import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
// import { toast } from "react-toastify";
import * as Yup from "yup";
import Logo from '../../public/image/Logo.svg'
import Hero from '../../public/image/Hero.svg'
import Image from "next/image";
import Link from "next/link";
import '../style/style.scss'

const host = "http://207.154.221.44:4002";

const Login = () => {
  const router = useRouter();

  const initialVal = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required!")
      .email("Incorrect email!"),
    password: Yup.string().required("Password is required!"),
  });

  const  onSubmit = async (values) => {
    // axios
      // .post(host + "/api/login")
      // .then((data) => {
        // if (data.status == 200) {
          // toast.success("Kirish muvaffaqiyatli yakunlandi!");
          // router.push("/");
        // }
      // })
      // .catch((err) =>
        // toast.error("Ups serverda qandaydur xatolik qaytadan urinib ko'ring!")
      // );
      const res = await fetch(host + "/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
  })

  const data = await res.json();
console.log(data);
  }
  return (
    <section className="register">
  <div className="containerss">
      <Image className="register_img" src={Logo} alt="Logo"/>
    <div className="register_right">
      <div className="">
        <h2 className="form_h2">Sign Up To eatly</h2>
        <Formik initialValues={initialVal} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form className="form">
            <Field className="form_name" placeholder="EMAIL" name="email" type="text" />
            <ErrorMessage name="email" />
            <Field className="form_name" placeholder="PASSWORD" name="password" type="password" />
            <ErrorMessage name="password" />
            <button className="form_btn" type="submit">SIGN UP</button>
            <p className="form_p">Create A New Account? <Link href={'/register'}><span>Sign Up</span></Link></p>
          </Form>
        </Formik>
      </div>
    </div>
    <div className="register_left">
      <Image className="register_left-img" src={Hero} alt="Hero" />
      <h2 className="register_left-h2">Find Foods With Love </h2>
      <p className="register_left-p">Eatly Is The Food Delivery Dashboard And Having More Than 2K+ Dishes Including Asian, Chinese, Italians</p>
    </div>
  </div>
</section>
  );
};

export default Login 
