"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import Logo from '../../public/image/Logo.svg'
import Hero from '../../public/image/Hero.svg'

import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import '../style/style.scss'
import Link from "next/link";

const host = "http://207.154.221.44:4002";

const Register = () => {
  const router = useRouter();

  const initialVal = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required!")
      .min(2, "Name 2 tadan ko'p bo'lishi lozim!"),
    email: Yup.string()
      .required("Email is required!")
      .email("Incorrect email!"),
    password: Yup.string().required("Password is required!"),
  });

  const onSubmit = async (values) => {
    const res = await fetch(host + "/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    console.log(data);

    if (data.status == 400) {
      data.message == "user already exists"
        ? toast.error("Bu foydalanuvchi avval ro'yxatdan o'tgan!")
        : toast.error(data.message);
    }

    if (data.status == 201) {
      localStorage.setItem('token', data.data)
      toast.success("Ro'yxatdan o'tish muvaffaqiyatli yakunlandi!");
      router.push("/");
    }
  };

  return (
    <section className="register">
      <div className="containerss">
          <Image className="register_img" src={Logo} alt="Logo"/>
        <div className="register_right">
          <div className="">
            <h2 className="form_h2">Sign Up To eatly</h2>
            <Formik initialValues={initialVal} validationSchema={validationSchema} onSubmit={onSubmit}>
              <Form className="form">
                <Field className="form_name" placeholder="FULL NAME" name="name" type="text" />
                <ErrorMessage name="name" />
                <Field className="form_name" placeholder="EMAIL" name="email" type="text" />
                <ErrorMessage name="email" />
                <Field className="form_name" placeholder="PASSWORD" name="password" type="password" />
                <ErrorMessage name="password" />
                <button className="form_btn" type="submit">SIGN UP</button>
                <p className="form_p">Already Have An Account? <Link href={'/login'}><span>Log In</span></Link></p>
              </Form>
            </Formik>
          </div>
        </div>
        <div className="register_left">
          <Image className="register_left-img" src={Hero} alt="Hero" />
          <h2 className="register_left-h2">Find Foods With Love </h2>
          <p className="register_left-p">Eatly Is The Food Delivery Dashboard And Having More Than 2K+ Dishes Including Asian, Chinese, Italians And Many More. Our Dashboard Helps You To Manage Orders And Money.</p>
        </div>
      </div>
    </section>
  );
};

export default Register;
