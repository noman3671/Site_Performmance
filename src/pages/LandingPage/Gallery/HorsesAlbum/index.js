import React, { useEffect, useRef, useState } from "react";
import { InstagramEmbed } from "react-social-media-embed";
import "./style.css";

const HorsesAlbum = ({ media }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const modalRef = useRef();

  const openModal = (post) => {
    setSelectedPost(post); 
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setModalOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (modalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [modalOpen]);

  return (
    <div className="overflow-hidden h-auto grid grid-cols-2 items-end sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5">
      {media?.data?.map((post, index) => (
        <img
          key={index}
          src={post.mediaUrl}
          alt={post.caption}
          className={`instagramImages cursor-pointer w-[100%] object-contain transition-transform duration-300 ease-in-out ${
            index >= 4 ? "hidden md:block" : ""
          } hover:scale-[1.1]`}
          onClick={() => openModal(post)}
        />
      ))}

      {modalOpen && selectedPost && (
        <div className="modal fixed top-0 w-full h-full flex flex-col !justify-center items-center z-20 bg-[#000] bg-opacity-70">
          <div
            ref={modalRef}
            className="modal-content h-full w-auto md:w-full max-w-[600px] bg-white overflow-y-auto scrollbar_remove"
          >
            <InstagramEmbed url={selectedPost.permalink} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HorsesAlbum;
