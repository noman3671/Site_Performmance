import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import Button from "components/Buttons";
import EmbedPost from "./HorsesAlbum";
import SaddlefitIcon from "assets/icons/instagram_header_logo.svg?react";
import InstagramIcon from "assets/images/instagram.svg?react";
import InstagramIconMobile from "assets/images/instagram.svg";
import { gql, useQuery } from "@apollo/client";
import { LIST_INSTAGRAM_POSTS } from "../../..//apollo/queries/instagramList";
import "./style.css";

const Count = ({ value, label }) => {
  const { ref, inView } = useInView();
  const controls = useAnimation();
  const [count, setCount] = useState(0);
  const targetCount = parseInt(value.replace(/[^\d]/g, ""), 10);

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        if (count < targetCount) {
          setCount((prevCount) => prevCount + Math.ceil(targetCount / 50));
        } else {
          clearInterval(interval);
        }
      }, 20);
      return () => clearInterval(interval);
    }
  }, [inView, count, targetCount]);

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
        },
      });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="count"
    >
      {count.toLocaleString()}
      <div className="reach">{label}</div>
    </motion.div>
  );
};

export const Gallery = () => {
  const { data } = useQuery(gql(LIST_INSTAGRAM_POSTS));

  return (
    <>
      <div className="w-full min-h-[88px] lg:min-h-[122px] flex-col flex flex-wrap gap-[23.24px] md:gap-x-[20px] md:!flex-row justify-center items-center bg-[#9C765B]">
        <div className="w-auto 2xl:max-w-[800px] md:flex flex-wrap gap-[23.24px] md:gap-[30px] items-center">
          <div className="flex justify-center items-center h-[100px] md:h-auto">
            <div className="justify-center items-center hidden lg:block">
              <InstagramIcon className="m-2 md:mr-2 xl:mr-0 md:m-0 w-[82px] h-[83px]" />
            </div>
            <div className="instagram_header_logo flex justify-center items-center md:ml-[68px] mr-[16px]">
              <SaddlefitIcon className="!w-[41px] !h-[41px] lg:!w-[83px] lg:!h-[82px]" />
            </div>
            <div className="h-[60px] flex">
              <div className="mt-3">
                <h1 className="main_heading">SADDLEFIT</h1>
                <p className="email_saddle">@saddlefit.io</p>
              </div>
              <div className="block lg:hidden">
                <img
                  src={InstagramIconMobile}
                  className="w-[18.411px] h-[18.411px] mt-3.5 ml-2"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center relative items-center mx-auto w-[300px] gap-x-[40px]">
            <div>
              <Count value={`${data?.listInstagramPost?.media_count}`} label="Post" />
            </div>
            <div>
              <Count value={`${data?.listInstagramPost?.followers_count}M`} label="Followers" />
            </div>
            <div>
              <Count value={`${data?.listInstagramPost?.follows_count}K`} label="Following" />
            </div>
          </div>
        </div>
        <div className="mt-[-25px] md:mt-0">
          <Button
            onClick={() =>
              window.open("https://www.instagram.com/saddlefit.io")
            }
            className="follow_btn mx-auto my-5 md:my-0 md:mx-0 !h-[40px] !w-[87px]"
          >
            Follow
          </Button>
        </div>
      </div>
      <EmbedPost media={data?.listInstagramPost?.media} />
    </>
  );
};
