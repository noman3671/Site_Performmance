import React, { useState } from "react";
import "../style.css";
import Button from "components/Buttons";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { createToast } from "utils/Toast";

const Toast = createToast();

const GetDemo = () => {
  const [disabled, setDisabled] = useState(false);
  let location = useLocation();
  const methods = useForm({
    defaultValues: {
      email: "",
    },
  });
  const { errors } = methods.formState;

  const onSubmit = async (data) => {
    setDisabled(true);
    const email = methods.getValues("email");
    try {
      const response = await fetch(
        "https://wriil2sbhk.execute-api.us-east-1.amazonaws.com/dev/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, type: "BETA_TESTING" }),
        }
      );
      if (response.status === 409) {
        Toast.fire({
          icon: "warning",
          title: "Email already subscribed",
        });
      } else if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Subscribed successfully",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "This email is not verified",
        });
      }
      setDisabled(false);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Error in fetching data",
      });
      setDisabled(false);
    }

    methods.setValue("email", "");
  };

  return (
    <>
      {location.pathname === "/user/horses" ||
      location.pathname === "/user/sell-saddle" ||
      location.pathname === "/user/my-saddle" ||
      location.pathname === "/buy" ||
      location.pathname === "/saddledetails" ||
      location.pathname === "/favorite" ||
      location.pathname === "/cart" ||
      location.pathname === "/event" ||
      location.pathname === "/user/my-saddle/edit" ||
      location.pathname === "/user/sell-saddle/edit" ||
      location.pathname === "/user/sell-saddle/create" ||
      location.pathname === "/user/my-saddle/create" ||
      location.pathname === "/client-profile" ? (
        ""
      ) : (
        <div className="main_banner">
          <h1 className="footer_banner_text">Join our beta program</h1>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="flex justify-center pb-[39px] md:pb-[60px] md:flex-row flex-col gap-[20px] mt-[32px]">
                <div>
                  <input
                    className={"footer_input rounded-[56px] text-white"}
                    {...methods.register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    aria-invalid={errors.email ? "true" : "false"}
                    name="email"
                    placeholder={"Your best email address"}
                    autoComplete={"off"}
                    aria-autocomplete={"none"}
                    readOnly={disabled}
                  />
                  {errors.email ? (
                    <p className="mt-[8px] text-white">
                      {errors.email.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <Button
                  size
                  transparent
                  className={`footer_btn`}
                  disabled={disabled}
                >
                  Get a demo
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      )}
    </>
  );
};

export default GetDemo;
