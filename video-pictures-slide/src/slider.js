import React from 'react';
import ReactDOM from 'react-dom';
import './slider.css';

const mediaUrls = ["https://sophosnews.files.wordpress.com/2019/01/shutterstock_719314501-1-compressor.jpg?w=780&h=408&crop=1",
"https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
"https://www.it.miami.edu/_assets/images/adobecc.png",
"https://www.bleepstatic.com/images/news/u/986406/Logos/Adobe_Logo.png"];

const isImg = [true, false, true, true];

export class Slider extends React.Component {
	constructor (props) {
    super(props);

    this.state = {
      currentMediaIndex: 0
    };
    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
  }
  
  cropIndex(i) {
	if(i >= mediaUrls.length){
		return 0;
	}else if(i < 0){
		return mediaUrls.length-1;
	}
	
	return i;
  }
  
  previousSlide() {
	const prevIndex = this.cropIndex((this.state.currentMediaIndex - 1));
	this.setState({currentMediaIndex: prevIndex,});
  }
  
  nextSlide() {
	const nextIndex = this.cropIndex((this.state.currentMediaIndex + 1));
	this.setState({currentMediaIndex: nextIndex,});
  }

  render () {
	const currentIsImg = isImg[this.state.currentMediaIndex];
    return (
      <div className="slider">
        <Arrow
          direction="left"
          clickFunction={ this.previousSlide }
          glyph="&#9664;" />

        <Container image={isImg[this.state.currentMediaIndex] } url= {mediaUrls[this.state.currentMediaIndex]}   />

        <Arrow
          direction="right"
          clickFunction={ this.nextSlide }
          glyph="&#9654;" />
      </div>
    );
  }
}

export default Slider;


const Container = ({ url, image }) => {
	if(image){
		const styles = {
		backgroundImage: `url(${url})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	  };
		
	  return (
		<div className="container" style={styles}>
		</div>
	  );
  }
	return (
		<div className="container">
            <video id="video" loop autoPlay>
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
           </div>
        )
  
}

const Arrow = ({ direction, clickFunction, glyph }) => (
  <div
    className={ `slide-arrow ${direction}` }
    onClick={ clickFunction }>
    { glyph }
  </div>
);

