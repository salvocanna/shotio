import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
//import Socket from '../../../clientSocket'


export const HomeView = (p) => (
// var canvas = document.getElementById('canvas');
// var context = canvas.getContext('2d');
// var img = new Image();
//
// img.onload = function() {
//     context.drawImage(this, 0, 0, canvas.width, canvas.height);
// }
//
// img.src = "data:image/gif;base64,R0lGODlhDwAPAKECAAAAzMzM/////wAAACwAAAAADwAPAAACIISPeQHsrZ5ModrLlN48CXF8m2iQ3YmmKqVlRtW4MLwWACH+H09wdGltaXplZCBieSBVbGVhZCBTbWFydFNhdmVyIQAAOw==";
// <canvas id="canvas" width="50" height="50"></canvas>
//

  return <div>
    <h4>Welcome!</h4>
    <img alt='This is a duck, because Redux!' className='duck' src={DuckImage} />
  </div>
)

export default HomeView
