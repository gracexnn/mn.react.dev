class HelloMessage extends React.Component {
  render() {
<<<<<<< HEAD
    return <div>Сайн уу {this.props.name}</div>;
  }
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  document.getElementById('hello-example'),
);
=======
    return <div>Hello {this.props.name}</div>;
  }
}

root.render(<HelloMessage name="Taylor" />);
>>>>>>> 38bf76a4a7bec6072d086ce8efdeef9ebb7af227
