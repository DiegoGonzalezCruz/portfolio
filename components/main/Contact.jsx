import { Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { sendEmail } from "../../lib/sendEmail";
import emailSent from "../../public/animations/email-sent.json";
import coffee from "../../public/animations/coffee-is-ready.json";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import * as Yup from "yup";
import TextInput from "../form/TextInput";
import { contactFormAnimation } from "../animations/variants";

export const Contact = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const validate = Yup.object({
    firstName: Yup.string()
      .max(150, "Must be max 150 chars")
      .required("Required"),
    lastName: Yup.string()
      .max(150, "Must be max 150 chars")
      .required("Required"),
    customerEmail: Yup.string()
      .email("Please review your email format")
      .required("Required"),
  });

  const handleSubmit = (v) => {
    // console.log(v, 'v')
    toast.custom((v) => (
      <div className=" w-[50vh] h-[30vh] rounded-xl border border-primary bg-white my-auto flex flex-col items-center justify-center">
        <div className="w-3/4 h-full flex flex-col items-center justify-center">
          <p>Sending Email</p>
          <Lottie animationData={emailSent} loop={true} />
          <p className="text-base">An email will hit your inbox very soon...</p>
        </div>
      </div>
    ));
    if (v.email === undefined) {
      sendEmail({
        name: v.firstName + " " + v.lastName,
        email: v.customerEmail,
        date: new Date(),
      });
      setIsEmailSent(true);
    }
  };

  if (!isEmailSent)
    return (
      <motion.div
        variants={contactFormAnimation}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.8 }}
        exit="exit"
        className="w-screen h-full"
        id="contact"
      >
        <div className="px-5 md:w-3/4 mx-auto">
          <h2>Send me a message:</h2>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              customerEmail: "",
              email: undefined,
            }}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={validate}
          >
            <Form className="flex flex-col card bg-secondary items-center my-10 p-10">
              <div className="w-2/3 flex flex-col items-center">
                <TextInput label="First Name" name="firstName" type="text" />
                <TextInput label="Last Name" name="lastName" type="text" />
                <TextInput label="Email:" name="customerEmail" type="email" />

                <input name="email" style={{ display: "none" }} />
              </div>

              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      </motion.div>
    );
  else {
    return (
      <div className="w-screen h-fit">
        <div className="w-3/4  mx-auto flex flex-col card bg-secondary items-center my-10 p-10">
          <h2 className="text-white text-xl">
            I hope to get in touch soon. Now go grab some coffee.
          </h2>
          <Lottie
            animationData={coffee}
            loop={true}
            style={{ width: "20rem" }}
          />
        </div>
      </div>
    );
  }
};
