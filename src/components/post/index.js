import { useRef } from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Image from "./image";
import Actions from "./actions";
import Footer from "./footer";
import Comments from "./comments";

export default function Post({ content, toggleOverlay }) {
  const commentInput = useRef(null);

  const handleFocus = () => commentInput.current.focus();

  //components
  //-> header, image, actions (like and comment icons), footer, comments

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-8">
      <Header username={content.author} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={content.caption} author={content.author} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
        photo={content}
        toggleOverlay={toggleOverlay}
      />
    </div>
  );
}

Post.propTypes = {
  content: PropTypes.shape({
    author: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }),
};
