import React from 'react'
import { connect } from 'react-redux'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import { buttonClicked } from '../../../store/main'
//import Socket from '../../../clientSocket'

class HomeView extends React.Component {
    render() {
        console.log('home ppp', this.props.main, this);
        const { dispatch } = this.props;
        return <div>
            <h4 onClick={()=> {
                dispatch(buttonClicked());
            }}>Welcome!</h4>
            <img alt='This is a duck, because Redux!' className='duck' src={DuckImage} />
        </div>;
    }
}


//
// export const HomeView = (p,p1,p2,p3) => {
// // var canvas = document.getElementById('canvas');
// // var context = canvas.getContext('2d');
// // var img = new Image();
// //
// // img.onload = function() {
// //     context.drawImage(this, 0, 0, canvas.width, canvas.height);
// // }
// //
// // img.src = "data:image/gif;base64,R0lGODlhDwAPAKECAAAAzMzM/////wAAACwAAAAADwAPAAACIISPeQHsrZ5ModrLlN48CXF8m2iQ3YmmKqVlRtW4MLwWACH+H09wdGltaXplZCBieSBVbGVhZCBTbWFydFNhdmVyIQAAOw==";
// // <canvas id="canvas" width="50" height="50"></canvas>
// //
//     console.log('home ppp', p, p1,p2,p3);
//   return <div>
//     <h4>Welcome!</h4>
//     <img alt='This is a duck, because Redux!' className='duck' src={DuckImage} />
//   </div>;
// }


export default connect(store => store)(HomeView)

