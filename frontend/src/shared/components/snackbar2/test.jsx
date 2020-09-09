// import React, { useRef } from 'react';
// import Snackbar from './snackbar.component';

// const Test = () => {
//   const snackbarRef = useRef(null);

//   const _showSnackbarHandler = (e) => {
//     e.preventDefault();
//     // console.log(snackbarRef.current)
//     // this.snackbarRef.current.openSnackBar('Button Pressed...');
//   }

//   return (
//     <div>
//       <div onClick={_showSnackbarHandler}>Click</div>
//       <Snackbar ref={snackbarRef}/> 
//     </div>
//   )
// }

// export default Test;


import React, { Component } from 'react';
import Snackbar from './snackbar.component';


class Test extends Component {
  snackbarRef = React.createRef();

  _showSnackbarHandler = (e) => {
    e.preventDefault();
    // console.log(this.snackbarRef.current)
    this.snackbarRef.current.openSnackBar('Button Pressed...');
  }
  
  render() {
    return (
      <div>
        <div onClick={this._showSnackbarHandler}>Click</div>
        <Snackbar ref={this.snackbarRef}/>

      </div>
    )
  }
}

export default Test;