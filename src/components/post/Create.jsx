import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Filter from 'bad-words';

let filter = new Filter();

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePostChange = this.handlePostChange.bind(this);

    this.state = {
      content: '',
      valid: true,
    };
  }

  handlePostChange(event) {
    let content = filter.clean(event.target.value);
    this.setState({
      content,
      valid: content.length <= 300,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.valid) {
      return;
    }

    let newPost = {
      date: Date.now(),
      // Assign a temporary key to the post; the API will create a real one for us
      id: Date.now(),
      content: this.state.content,
    };

    this.props.onSubmit(newPost);

    this.setState({
      content: '',
      valid: true,
    });
  }

  render() {
    return (
      <form
        className="create-post"
        onSubmit={this.handleSubmit}>
        <textarea
          value={this.state.content}
          onChange={this.handlePostChange}
          placeholder="What's on your mind?">
        </textarea>
        {
          this.state.valid ?
            null :
            <div>your post is too long! :(</div>
        }
        <input
          disabled={!this.state.valid}
          type="submit"
          placeholder="Post"
          className="btn btn-default"/>
      </form>
    );
  }
}

CreatePost.propTypes = {
};

export default CreatePost;
