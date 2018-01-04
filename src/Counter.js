import React, { Component } from 'react';

export default class Counter extends Component {
  constructor(p) {
    super(p);

    this.state = {
      name: '',
      result: '',
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.name !== '') {
      let hash = new Date().getFullYear();
      const { name } = this.state;
      for (let i = 0; i < name.length; i++) {
        const char = name.charCodeAt(i);
        hash = ((hash << 5) - hash) + char; // eslint-disable-line
        hash &= hash; // eslint-disable-line
      }

      this.setState({
        result: hash,
      });
    }
  }

  onInputChange = (e) => {
    const { target } = e;
    this.setState({
      [target.name]: target.value,
    });
  }

  renderResult = () => {
    if (this.state.result !== '') {
      if (this.state.result > 0) {
        return (<h3>Onpas sitä oltu kilttejä tänä vuonna!</h3>);
      }
      return (<h3>Risuja tulee tänä vuonna.</h3>);
    }
    return null;
  }

  render() {
    return (
      <div style={{ margin: '40px' }}>
        <form onSubmit={this.onFormSubmit}>
          Nimi : <input name="name" onChange={this.onInputChange} value={this.state.name} type="text" /> <input type="submit" />
        </form>
        {this.renderResult()}
      </div>);
  }
}
