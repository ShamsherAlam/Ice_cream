import React, { PureComponent } from 'react';
import Carousel from 'react-elastic-carousel';
import Dialog from '@material-ui/core/Dialog';
import logo from './ice_cream.jpeg';
import './App.css';

var dataFetch = require('./data.json');

const breakPoints = [
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];

export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: dataFetch,
      detailsOpen: false,
      selectedObj: {},
    };
  }

  openDetails = (item) => {
    console.log(item);
    this.setState({
      ...this.state,
      detailsOpen: true,
      selectedObj: item,
    });
  }
  saveDetails = () => {
    const smallCt = document.getElementById('small').value;
    const mediumCt = document.getElementById('medium').value;
    const largeCt = document.getElementById('large').value;
    console.log(smallCt, mediumCt, largeCt);
    let newData = this.state.data;
    const ind = newData.indexOf(this.state.selectedObj);
    newData[ind].smallQty -= smallCt;
    newData[ind].mediumQty -= mediumCt;
    newData[ind].largeQty -= largeCt;
    this.setState({
      data: newData,
      detailsOpen: false,
    })
  }
  closeDetails = () => {
    this.setState({
      ...this.state,
      detailsOpen: false,
    });
  }
  addItem = () => {
    const val = Math.max(1, this.state.data.length + 1);
    const nextItem = { key: val, smallQty: 20, mediumQty: 20, largeQty: 20 }
    this.setState({
      data: [...this.state.data, nextItem],
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.detailsOpen === true && <Dialog
          open={this.state.detailsOpen}
        >
          <div className="dialog-box">
            <div className="inner-ice-box">
              <img src={logo} alt="img" width="150" height="150" />
              <p className="text-inner-ice-box">Flavour {this.state.selectedObj.key}</p>
            </div>
            <div className="text-inner-ice-box">A rich, sweet, creamy frozen food made from variously flavored cream and milk products churned or stirred to a smooth consistency during the freezing process and often containing gelatin, eggs, fruits, nuts, etc.</div>
            <table border="5">
              <tbody>
              <tr>
                <td>Small 5$</td>
                <td>Quantity : {this.state.selectedObj.smallQty}</td>
                <td style={{ width: '200px' }}>Sell : <input type="number" id="small" min="0" max={this.state.selectedObj.smallQty} /></td>
              </tr>
              <tr>
                <td>Medium 10$</td>
                <td>Quantity : {this.state.selectedObj.mediumQty}</td>
                <td>Sell : <input type="number" id="medium" min="0" max={this.state.selectedObj.mediumQty} /></td>
              </tr>
              <tr>
                <td>Large 15$</td>
                <td>Quantity : {this.state.selectedObj.largeQty}</td>
                <td>Sell : <input type="number" id="large" min="0" max={this.state.selectedObj.largeQty} /></td>
              </tr>
              </tbody>
            </table>
            <div className="action-button">
              <button className="save" onClick={this.saveDetails}>Sell</button>
              <button className="close" onClick={this.closeDetails}>Close</button>
            </div>
          </div>
        </Dialog>}
        <header className="App-header">
          <p>
            Ice Queen
          </p>
        </header>
        <div className="carousel-wrapper">
          <Carousel breakPoints={breakPoints}>
            {this.state.data.map((item) => (
              <div onClick={() => this.openDetails(item)} className={(item.smallQty === 0 && item.mediumQty === 0 &&item.largeQty === 0) ? "disabled-ice-box" : "ice-box"}>
                <img src={logo} alt="img" width="200" height="300" />
                {(item.smallQty === 0 && item.mediumQty === 0 &&item.largeQty === 0) && <p className="out-of-stock">Out of Stock</p>}
                <p>Flavour {item.key}</p>
              </div>
            ))}
          </Carousel>
          <div className="controls-wrapper">
            <button className="add-btn" onClick={this.addItem}>+</button>
          </div>
        </div>
        <footer className="App-footer">
          <p>
            Copyright &copy; 2021 Ice Queen Pvt. Ltd.
          </p>
        </footer>
      </div>
    );
  }
}

App.propTypes = {
};

export default App;
