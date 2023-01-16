import React, { Component } from 'react';
import { Image } from 'react-native';

export default class ProgressiveImage extends Component {
    state = { showDefault: true, error: false };

    render() {
        let image = this.state.showDefault || this.state.error || this.props.uri==null ? this.props.defaultSource : ({ uri: this.props.uri });
        return (
            <Image style={this.props.style}
                   source={image}
                   onLoadEnd={() => this.setState({showDefault: false})}
                   onError={() => this.setState({error: true})}
                   resizeMode={this.props.resizeMode}/>
        );
    }
}