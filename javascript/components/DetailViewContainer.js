import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

// import '../messages/DetailViewContainer';

export default class DetailViewContainer extends Component {
  render () {
    return (
      <div className='main-container'>
        <FormattedMessage
          id="components.DetailViewContainer.hello"
          defaultMessage="Hello world"
          description="Welcome message"
        />

        <FormattedMessage
          id="components.DetailViewContainer.lipsum"
          description="Big block of text"
          defaultMessage={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam varius quam enim, non viverra odio mollis eget. Morbi tincidunt leo ut ipsum auctor, eget fringilla risus tempus. Maecenas sapien est, egestas sit amet quam quis, vulputate ultrices urna. Nunc pulvinar rhoncus tempus. Etiam euismod erat in mollis rhoncus. In at erat dictum, hendrerit erat ac, ultricies arcu. Nullam convallis ullamcorper mollis. Nulla in quam tempus, auctor nisl sed, vehicula libero. Integer consectetur pulvinar nisl mollis vulputate. Fusce aliquam a nibh in suscipit. Duis aliquet eros et rhoncus varius.

Nam quis nunc nisi. Nunc vel dolor et risus sodales mattis. Cras faucibus bibendum tortor, ultrices porttitor dui. Aliquam congue, nibh efficitur dictum auctor, lacus erat tristique est, a auctor nibh purus eget sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae scelerisque turpis, porta ultrices nunc. Duis dolor tellus, tristique a tincidunt ac, dictum non sapien. Nunc volutpat lorem sit amet urna sollicitudin fringilla laoreet eget nibh. Integer pharetra sagittis velit, eget tempor lorem sodales at. Integer viverra et purus in interdum.

Pellentesque vitae dictum leo. Sed ut purus ut risus sodales vulputate ac eget tortor. Proin et fringilla ante, at vulputate arcu. Phasellus posuere leo enim, eget dignissim velit eleifend ut. Morbi maximus porta mattis. Donec ultrices magna at nisl semper eleifend. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed efficitur vulputate commodo. Nam id aliquet odio.`}
        />
      </div>
    );
  }
}
