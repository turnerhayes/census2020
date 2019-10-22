import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import { FormattedMessage } from 'react-intl';
import { Carousel } from 'react-responsive-carousel';
import QRCode from 'qrcode.react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

const lifeAbundant = require('../images/lifeAbundant.jpg');
const sanJoseMural = require('../images/sanJoseMural.jpg');
const muralProject = require('../images/muralProject.jpg');
const sharksMural = require('../images/sharksMural.jpg');

const CarouselItem = ({ img }) => (
  <li style={{ width: '100%', height: '60vh', overflow: 'hidden', position: 'relative' }}>
    <img src={img} style={{
      position: 'absolute',
      top: '-9999px',
      right: '-9999px',
      bottom: '-9999px',
      left: '-9999px',
      margin: 'auto'
    }} />
  </li>
);

CarouselItem.propTypes = {
  img: PropTypes.string.isRequired
};

const Factoid = ({ title, message }) => (
  <li
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      width: '30vw',
      height: '30vw',
      backgroundColor: '#fdfeff',
      margin: '10px',
      border: 'solid 1px #005ea2',
      borderRadius: '8px',
      boxShadow: '0 0 8px 1px rgb(132, 134, 162)'
    }}>
    <h3>
      <FormattedMessage
        id="components.DetailViewContainer.factoid1.header"
        defaultMessage={title}
        description="Ready to take the Census?">
      </FormattedMessage>
    </h3>
    <p style={{ textAlign: 'center' }}>
      <FormattedMessage
        id="components.DetailViewContainer.factoid1.message"
        defaultMessage={message}
        description="describe me">
      </FormattedMessage>
    </p>
  </li>
);

Factoid.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.element.isRequired
  ]).isRequired,
  message: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.element.isRequired
  ]).isRequired
};

class YoutubeItem extends Component {
  constructor (props) {
    super(props);

    this.state = {
      ready: false
    };

    this.container_ref = React.createRef();
  }

  componentDidMount () {
    // force component to rerender once the DOM elements are mounted
    this.setState({
      ready: true
    });
  }

  render () {
    let opts;
    if (this.container_ref.current) {
      let parentWidth = this.container_ref.current.offsetWidth;
      // maintain a 16:9 aspect ratio based on the parent width
      let w = (parentWidth * 0.8).toString();
      let h = (parentWidth * 0.45).toString();
      opts = {
        height: h,
        width: w,
        playerVars: {
          autoplay: 1
        }
      };
    }

    return (
      <li
        ref={this.container_ref}
        style={{ display: 'flex', flexDirection: 'row-reverse', width: '50%' }}>
        { this.container_ref.current && (
          <YouTube
            videoId="pl4RO5EisCU"
            opts={opts}
          />
        )}
      </li>
    );
  }
}

// don't really need this to be a class based component but whatevs
export default class DetailViewContainer extends Component {
  render () {
    let messageString = `Ea irure pariatur aliqua minim cillum consectetur consequat reprehenderit sit aliqua sit eiusmod proident. Commodo ea pariatur in exercitation voluptate proident anim nisi minim. Nisi aliqua ipsum non elit nulla pariatur elit exercitation enim mollit commodo incididunt incididunt. Excepteur amet esse sunt velit ut nulla ipsum ea.
Adipisicing ullamco laboris cillum dolor eiusmod nulla Lorem sit quis velit fugiat dolor ullamco aute. Cupidatat cupidatat ullamco ullamco ea quis. Tempor laborum eu ea consequat.`;

    return (
      <main
        className='main-container'
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={7000}
          transitionTime={1000}>
          { [lifeAbundant, sanJoseMural, muralProject, sharksMural].map(img => (
            <CarouselItem key={img} img={img} />
          ))}
        </Carousel>
        <ul
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            padding: '2% 5% 2% 5%',
            listStyle: 'none'
          }}>
          <li
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
              marginRight: '30px'
            }}>
            <h4
              style={{
                margin: 0,
                fontFamily: 'Roboto',
                fontSize: '48px',
                fontWeight: 'bold',
                fontStyle: 'normal',
                fontStrech: 'normal',
                letterSpacing: 'normal'
              }}>
              <FormattedMessage
                id="components.DetailViewContainer.header"
                defaultMessage={'Everyone matters'}
                description="Home page title">
              </FormattedMessage>
            </h4>
            <h5
              style={{
                fontFamily: 'Roboto',
                fontSize: '18px',
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontStrech: 'normal',
                lineHeight: '1.56',
                letterSpacing: 'normal'
              }}>
              <FormattedMessage
                id="components.DetailViewContainer.message"
                defaultMessage={messageString}
                description="Home page message">
              </FormattedMessage>
            </h5>
          </li>
          <YoutubeItem />
        </ul>

        <ul
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%',
            padding: '0 5% 5% 5%'
          }}>
          <Factoid
            title={'Ready to take the census?'}
            message={'a whole bunch of text and things here'}>
          </Factoid>
          <Factoid
            title={<FormattedMessage
              id="components.Home.factoids.qr-code.title"
              defaultMessage="Learn About the Census From Your Phone"
            />}
            message={
              <QRCode value={document.location.origin} />
            }
          >
          </Factoid>
          <Factoid
            title={'Title 3'}
            message={'more text will go here'}>
          </Factoid>
        </ul>
      </main>
    );
  }
}
