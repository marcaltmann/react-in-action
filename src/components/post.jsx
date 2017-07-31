import React from 'react';
import PropTypes from 'prop-types';

const Post = (props) => {
  return (
    <div className="post">
      <p className="content">
        {props.post.content}
      </p>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
