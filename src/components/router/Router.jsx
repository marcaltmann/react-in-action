import React, { Component } from 'react';
import PropTypes from 'prop-types';
import enroute from 'enroute';
import invariant from 'invariant';

class Router extends Component {
  constructor(props) {
    super(props);

    this.routes = {};
    this.addRoutes(props.children);
    this.router = enroute(this.routes);
  }

  cleanPath(path) {
    return path.replace(/\/\//g, '/');
  }

  normalizeRoute(path, parent) {
    if (path[0] === '/') {
      return path;
    }

    if (parent == null) {
      return path;
    }

    return `${parent.route}/${path}`;
  }

  addRoutes(routes, parent) {
    React.children.forEach(routes, route => this.addRoute(route, parent));
  }

  addRoute(element, parent) {
    const { component, path, children } = element.props;

    invariant(component, `Route ${path} is missing the "path" property`);
    invariant(typeof path === 'string', `Route ${path} is not a string`);

    const render = (params, renderProps) => {
      const finalProps = Object.assign({ params }, this.props, renderProps);

      const hasIndexRoute = index && path === finalProps.location;

      const children = hasIndexRoute
        ? React.createElement(component, finalProps, React.createElement(index, finalProps))
        : React.createElement(component, finalProps);

      return parent
        ? parent.render(params, { children })
        : children;
    };

    const route = this.normalizeRoute(path, parent);

    if (children) {
      this.addRoutes(children, { route, render });
    }

    this.routes[this.cleanPath(route)] = render;
  }

  render() {
    const { location } = this.props;
    invariant(location, '<Router/> needs a location to work');
    return this.router(location);
  }
}

Router.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.string.isRequired,
};

export default Router;
