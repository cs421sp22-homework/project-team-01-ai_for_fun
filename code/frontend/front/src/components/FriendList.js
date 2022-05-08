import { motion } from 'framer-motion';
import React from 'react';
import "../style/Gallery.css";
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css";
import Widget from './Widget';
import Masonry from 'react-masonry-css';

const galleryAnimation = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      ease: 'easeOut',
      delayChildren: 1.5,
    },
  },
}

const Cardtransition = {
  type: "spring",
  damping: 10,
  stiffness: 100
}

function FriendList(probs) {

  const friends = probs.props

  const breakpointColumnsObj = {
  default: 3,
  1800: 3,
  1300: 2,
  1000: 1
};
  return (
    <>
    <motion.div
    initial="hide"
    animate="show"
    variants={galleryAnimation}
    >
    <Masonry
  breakpointCols={breakpointColumnsObj}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column"
>
{friends.map((item) => {
            { console.log(item) }
            return <motion.div
              key={item}
              animate={{ y: [-5, 5, 0] }}
              transition={Cardtransition}
              whileHover={{ scale: 1.05 }}
              className="gallery"
            >
              <Widget props={item}/>
            </motion.div>
          })}

</Masonry>
</motion.div>
    </>
  )
}

export default FriendList;