import React, { PureComponent } from 'react';

import { SnackbarContainer, SnackbarContent, SnackbarClose } from './snackbar.styles'


class Snackbar extends PureComponent {
  message = ''

  state = {
    isActive: false,
  }



  openSnackBar = (message = 'Something went wrong...', delay = 5000) => {
    this.message = message;
    this.setState({ isActive: true }, () => {
      setTimeout(() => {
        this.setState({ isActive: false });
      }, delay);
    });
  }

  render() {
    const { isActive } = this.state;
    const { color } = this.props;

    return isActive ? (
      <SnackbarContainer color={color} isActive={isActive}>
        <SnackbarContent>{this.message}</SnackbarContent>
        <SnackbarClose onClick={() => this.setState({ isActive: false })}>&times;</SnackbarClose>
      </SnackbarContainer>
    ) : null
  }
}

export default Snackbar;





// import React, { useEffect } from 'react';
// // import { useState } from 'react';
// // import { useEffect } from 'react';


// const Snackbar = ({ innerRef, ...rest }) => {
//   console.log('rest', rest);
//   console.log('innerRef', innerRef);
  
//   // const [isActive, setIsActive] = useState(false);

//   // const openSnackBar = () => {
//   //   setIsActive(true);
//   //   setTimeout(() => {
//   //     setIsActive(false);
//   //   }, [delay]);
//   // }

//   useEffect(() => {
//     // innerRef.current.getAlert()
//   }, []);

//   return (
//     <div ref={innerRef}>
//       Snackbar
//     </div>
//   )
// }

// export default React.forwardRef((props, ref) => {
//   React.useImperativeHandle(({ref, props}), () => {
//     console.log('props!@', props)
//     return {
//       getAlert() {
//         // console.log('props@@', props)
//         // alert("getAlert from Child");
//       }
//     }

//     // ({

  
//     // })
//   });
//   return <Snackbar innerRef={ref} {...props} />
// });