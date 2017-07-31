import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Post from './post';
import CreatePost from './post/Create';

// CSS imports
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor() {
    super();
    this.fetchPosts = this.fetchPosts.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.state = {
      nPosts: 5,
      posts: [],
      loaded: false,
    };
  }

  handlePostSubmit(payload) {
    if (!payload.content) {
      return;
    }

    // Update the local posts state optimistically
    let oldPosts = this.state.posts;
    oldPosts.unshift(payload);

    this.setState({
      posts: oldPosts,
    });

    // Request options
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Send post to API
    fetch(`http://localhost:3500/posts`, requestOptions)
      .then(res => {
        if (res.ok === true) {
          this.fetchPosts();
        }
      });
  }

  componentDidMount() {
    this.fetchPosts()
      .then(() => this.setState({ loaded: true }))
      .catch(err => console.log(err));
  }

  fetchPosts(increment = false) {
    let limit = 5;
    let nPosts = increment ? this.state.nPosts + limit : this.state.nPosts;
    this.setState({ nPosts });

    return fetch(`http://localhost:3500/posts?_limit=${nPosts}&_sort=date&_order=DESC`)
      .then(res => res.json())
      .then(posts => this.setState({ posts }));
  }

  render() {
    return (
      <div>
        <CreatePost onSubmit={this.handlePostSubmit} />

        <div className="posts">
          {
            this.state.loaded ?
              this.state.posts.map(post => <Post key={post.id} post={post}/>) :
              <div className="loader">
                Loading…
              </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
