import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { init, filter } from '../../sagas/testSaga/saga';
import * as actions from '../../sagas/testSaga/actions';


const styles = {
  card: {
    maxWidth: 345,
    background: 'white',
    textAlign: 'left',
    float: 'left',
    padding: '20px',
  },
  productTitle: {
    paddingTop: 15
  },
  aside: {
    background: 'white',
    float: 'left',
    padding: '20px',
  },
  sidearea: {
    borderBottom: '1px solid #ccc',
    paddingBottom: '35px',
    "&:last-of-type": {
      border: 'none'
    },
  },
  callout: {
    padding: '30px 0',
    h4: {
      paddingBottom: '10px',
    }
  },
  label: {},
  span: {
    fontFamily: "'Barlow', sans-serif",
  },
  max: {
    fontSize: '12px',
    float: 'right',
    color: '#565656',
  },
  min: {
    float: 'left',
    fontSize: '12px',
    color: '#565656',
  },
}


class Sidebar extends React.Component {
	constructor(props) {
		super(props);

    this.state = {
      currentFilterPrice: '0'
    }

    this._onChange = this._onChange.bind(this);
	}

  _onChange(filterPrice) {
    this.setState({ currentFilterPrice: filterPrice });
    this.props.onFilter(parseFloat(filterPrice));
  }

  render() {
  	const { classes } = this.props;
    const { currentFilterPrice } = this.state;

    return (
    	<Card className={"filter-sidebar " + classes.card}>
        <div className={classes.sidearea  + " callout"}>
          <label 
            htmlFor="pricerange" 
            className={classes.label}
          >
            Current Price: <span>${currentFilterPrice}</span>
          </label>
          <input 
            className="slider" 
            id="pricerange" 
            type="range"
            min="min" 
            max="max" 
            step="0.1"
            value={ currentFilterPrice }
            onChange={(e) => this._onChange(e.target.value)}
          />
          <span className={classes.min}>0</span>
          <span className={classes.max}>100</span>
        </div>
        <div className={classes.sidearea + " callout"}>
          <h4>Special Sale!</h4>
          <p>Shop now because half our items are greatly reduced</p>
        </div>
        <div className={classes.sidearea + " callout"}>
          <h4>Contact Us</h4>
          <p>Questions? Call us at 1-888-555-SHOP, we're happy to be of service.</p>
        </div>
      </Card>
    )
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  onFilter: PropTypes.func.isRequired,
};

const mapStatetoProps = state => {
  console.log('state: ', state)
  return {
    testSaga: state.testSaga
  }
}

const mapDispatchToProps = dispatch => {
  return {
    filter: () => dispatch({ type: actions.FILTER })
  }
}


// const mapDispatchToProps = dispatch => {
//   return Object.assign(
//     { dispatch: dispatch },
//     bindActionCreators({getProducts}, dispatch)
//   );
// }


export default connect(mapStatetoProps, mapDispatchToProps)(withStyles(styles)(Sidebar));
