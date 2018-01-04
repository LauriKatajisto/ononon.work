import React, { Component } from 'react';

export default class TDEE extends Component {
  constructor(p) {
    super(p);

    this.state = {
      age: '',
      gender: 0,
      height: '',
      weight: '',
      activity: 1,
      result: null,
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    if (this.state.age !== '' && this.state.height !== '' && this.state.weight !== '') {
      const {
        weight, height, age, gender, activity,
      } = this.state;
      let result;
      /*
      Men: 10 x weight (kg) + 6.25 x height (cm) - 5 x age (y) + 5
      Women: 10 x weight (kg) + 6.25 x height (cm) - 5 x age (y) - 161
      */

      if (gender === 0) {
        result = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
      } else {
        result = 665 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
      }

      console.log('bmr', result);

      // 1.2 1.55 1.725 1.9
      switch (activity) {
      case 1:
        result *= 1.2;
        break;
      case 2:
        result *= 1.55;
        break;
      case 3:
        result *= 1.725;
        break;
      case 4:
        result *= 1.9;
        break;
      default:
        result *= 1.2;
      }

      this.setState({
        result: Math.floor(result),
      });
    }
  }

  onFieldChange = (e) => {
    const value = parseInt(e.target.value, 10);

    if (typeof value === 'number' && Math.floor(value) === value) {
      this.setState({
        [e.target.name]: value,
      });
    }
  }

  renderResult = () => {
    if (this.state.result) {
      return (
        <div>
          Päivittäinen kalorien kulutus: <b>{this.state.result}</b>.<br />
          Vähennä tästä 200-500 riippuen kuinka nopeaa pudotusta haluat.
        </div>);
    }
    return null;
  }

  render() {
    return (
      <div>
        <p>Vuodenvaihtessa kaikki lehdet on täynnä toinen toistaan paskempia vinkkejä painonhallintaan ym.</p>
        <p>Tämän laskurin tuloksella onnistuu paljon suuremmalla todennäköisyydellä.</p>

        <form onSubmit={this.onFormSubmit}>
          Ikä: <input onChange={this.onFieldChange} name="age" value={this.state.age} /><br /><br />
          Sukupuoli:{ '  ' }<br />
          <input onChange={this.onFieldChange} type="radio" checked={this.state.gender === 0} value="0" name="gender" />
          Mies<br />
          <input onChange={this.onFieldChange} type="radio" value="1" name="gender" checked={this.state.gender === 1} />
          Nainen
          <br /><br />
          Pituus: <input placeholder="cm" onChange={this.onFieldChange} name="height" value={this.state.height} /><br /><br />
          Paino: <input placeholder="kg" onChange={this.onFieldChange} name="weight" value={this.state.weight} /><br /><br />

          Aktiivisuus:{ '  ' }<br />
          <input onChange={this.onFieldChange} type="radio" checked={this.state.activity === 1} value="1" name="activity" />
          1 (Kevyt liikunta ja istumatyö)<br />
          <input onChange={this.onFieldChange} type="radio" checked={this.state.activity === 2} value="2" name="activity" />
          2 (Liikuntaa 3-5 kertaa/viikko ja istumatyö)<br />
          <input onChange={this.onFieldChange} type="radio" checked={this.state.activity === 3} value="3" name="activity" />
          3 (Kevyt liikunta ja fyysinen työ)<br />
          <input onChange={this.onFieldChange} type="radio" checked={this.state.activity === 4} value="4" name="activity" />
          4 (Liikuntaa 3-5 kertaa/viikko ja fyysinen työ)<br />
          <input type="submit" />

        </form>

        {this.renderResult()}
      </div>
    );
  }
}
