import React, {Component} from 'react';

class Livetv extends Component {
    constructor(props) {
        super(props);

        this.state={
            channels: [],
            isLoading: true,
            selectedChannel:'175187478216bb9042221e84add7502b'
        }
        this.changeChannel=this.changeChannel.bind(this);
    }

    async componentDidMount() {
        const response = await fetch("http://mradmin.hu:9981/api/channel/list",{
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Basic '+btoa('test:123qweAsD'),
                })}
            );

        const list = await response.json();
        this.setState({channels:list.entries, isLoading:false});
    }

    changeChannel(channelId){
        this.setState({selectedChannel:channelId});
    }

    render() {
        if (this.state.isLoading){
            return (<div>Loading...</div>)
        }
        return (
            <main id="main" className="smaller subtle show_search_true">
                <section className="main_content search_results">
                    <div className="column-wrapper reverse">
                        <div className="content-wrapper">
                            <div className="grey_column">
                                <div className="settings_panel no_margin">
                                    <h3 className="background_color light_blue">Channels</h3>
                                    <div id="search_menu_scroller">
                                        <ul className="settings panel with_counts scroller">
                                            {this.state.channels.map(channel =>
                                                <li key={channel.key} className="">
                                                    <a href={"/livetv/#"} onClick={() => this.changeChannel(channel.key)}
                                                       className="search_tab active" title="Channels"
                                                       alt="Channels">{channel.val}</a>
                                                    {/*<span>136</span>*/}
                                                </li>
                                            )}

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="white_column">
                                <section className="panel">
                                    <div className="search_results movie">
                                        <div className="results flex">
                                            <video key={"http://mradmin.hu:9981/stream/channel/"+this.state.selectedChannel+"?profile=webtv-h264-aac-matroska"} width="800px" autoPlay controls style={{visibility: "visible"}}>
                                                <source id="ext-gen3699" src={"http://mradmin.hu:9981/stream/channel/"+this.state.selectedChannel+"?profile=webtv-h264-aac-matroska"}/>
                                            </video>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
    }
}

export default Livetv;