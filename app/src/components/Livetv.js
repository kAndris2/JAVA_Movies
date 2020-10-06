import React, {Component} from 'react';

class Livetv extends Component {
    render() {
        return (
            <div>
                <video width="800px" height="600px" controls autoplay id="ext-gen3698" style={{visibility: "visible"}}>
                <source id="ext-gen3699" src="http://mradmin.hu:9981/stream/channel/175187478216bb9042221e84add7502b?profile=webtv-h264-aac-matroska"/>
                </video>
            </div>
        );
    }
}

export default Livetv;