import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import circleImg from "assets/images/circleImg.svg";
import { FormInput } from "components/Inputs";
import TextArea from "components/Inputs/TextArea";
import Button from "components/Buttons";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { createToast } from "utils/Toast";
import { useScrollContext } from "context/ScrollContext";

const Toast = createToast();

function ContactUsSection() {
  const { refs } = useScrollContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const methods = useForm({});

  const { ref: cardRef, inView: cardView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (cardView) {
      controls.start("visible");
    }
  }, [cardView, controls]);

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      const response = await fetch(
        "https://wriil2sbhk.execute-api.us-east-1.amazonaws.com/dev/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "ICNExLiUwH3c9AxGYXQXy73x34iiUWRC14qPJNYz",
          },
          body: JSON.stringify({
            fullName: data.firstName + " " + data.lastName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            message: data.message,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to send contact form");
      Toast.fire({
        icon: "success",
        title: "Email send successfully",
      });
      console.log("Form submitted successfully!");
      methods.reset();
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    }
  };

  return (
    <div
      ref={refs.sectionFourRef}
      className="w-full flex flex-wrap gap-y-10 justify-evenly items-center h-auto 2xl:h-[844.163px] bg-[#2B364B]"
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-[90%] 2xl:w-[1118.269px]"
        >
          <motion.div
            ref={textRef}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.2, delay: 0.3 }}
            className="text-center"
          >
            <h3 className="reach_out_heading">Reach out to us</h3>
            <p className="reach_out_second_heading pb-10">
              Please fill out the form to contact us.
            </p>
          </motion.div>
          <div className="md:flex justify-between">
            <FormInput
              label=""
              {...register("firstName", { required: "First name is required" })}
              validations={{
                required: true,
                pattern: {
                  message: "First Name is required",
                },
              }}
              className="w-full md:w-[45%] 2xl:!w-[514.629px] !h-[90.503px]"
              placeholder="First Name"
              error={errors.firstName?.message}
            />
            <FormInput
              label=""
              {...register("lastName", { required: "Last name is required" })}
              validations={{
                required: true,
                pattern: {
                  message: "Last Name is required",
                },
              }}
              className="w-full md:w-[45%] 2xl:!w-[514.629px] !h-[90.503px]"
              placeholder="Last Name"
              error={errors.lastName?.message}
            />
          </div>
          <div className="md:flex justify-between">
            <FormInput
              label=""
              {...register("email", {
                required: "Email is required",
              })}
              validations={{
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              }}
              className="w-full md:w-[45%] 2xl:!w-[514.629px] !h-[90.503px]"
              placeholder="Email"
              error={errors.email?.message}
            />

            <FormInput
              label=""
              type="number"
              className="w-full md:w-[45%] 2xl:!w-[514.629px] !h-[90.503px]"
              name="phone"
              {...register("phone", { required: "Phone number is required" })}
              validations={{
                required: true,
                pattern: {
                  message: "phone number is required",
                },
              }}
              placeholder={"Phone Number"}
            />
          </div>
          <TextArea
            {...register("message", { required: "Message is required" })}
            validations={{
              required: true,
              pattern: {
                message: "Message is required",
              },
            }}
            className="w-[100%] 2xl:w-[1118.269px] h-[167.582px] rounded-[30px] mx-auto !mt-[31px] lg:mt-[68px]"
            placeholder="Message"
            error={errors.message?.message}
          />
          <Button type="submit" className="submit_btn">
            Submit
          </Button>
        </form>
      </FormProvider>
      <div ref={cardRef} className="h-auto pb-10 2xl:h-[650px]">
        <motion.img
          animate={cardView ? { rotate: 360 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
          src={circleImg}
          alt="circleImg"
        />
      </div>
    </div>
  );
}

export default ContactUsSection;
