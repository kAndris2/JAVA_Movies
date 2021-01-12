import React, {Component} from 'react';
import moment from 'moment';

class Livetv extends Component {
    constructor(props) {
        super(props);

        this.state = {
            channels: [],
            epg:[],
            selectedEpg:[],

            activeItem: 7,
            isLoading: true,
            selectedChannel:'175187478216bb9042221e84add7502b'
        }
        this.changeChannel=this.changeChannel.bind(this);
        this.getEPG=this.getEPG.bind(this);
        this.handleItemClick=this.handleItemClick.bind(this);
    }

    async componentDidMount() {
        //GET THE CHANNELS
        const response = await fetch("http://mradmin.hu:9981/api/channel/list",{
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Basic '+btoa('user:pass'),
                })}
        );

        const list = await response.json();

        //GET THE EPG
        /*const response2 = await fetch("http://mradmin.hu:9981/api/epg/events/grid?limit=100",{
            method: 'get',
                headers: new Headers({
                'Authorization': 'Basic '+btoa('user:pass'),
            })}
        );
        const epg = await response2.json();*/


        await this.getEPG();
        this.setState({channels:list.entries, isLoading:false});

    }

    async changeChannel(channelId){
        this.setState({selectedChannel:channelId}, () => {
            this.getEPG();
        });
    }

    async getEPG(){
        let channel = this.state.selectedChannel;

        const response = await fetch('http://mradmin.hu:9981/api/epg/events/grid?channel='+channel+'&sort=start&limit=4',{
            method: 'get',
            headers: new Headers({
                'Authorization': 'Basic '+btoa('test:123qweAsD'),
            })
        });
        const channelEpg = await response.json();
        this.setState({selectedEpg: channelEpg.entries});

    }

    handleItemClick(index) {
        this.setState({
            activeItem: index,
        })
    }

    render() {
        if (this.state.isLoading && (this.state.selectedEpg.length === 0)){
            return (<div>Loading...</div>)
        }
        return (

                <section className="main_content search_results">
                    <div className="column-wrapper reverse">
                        <div className="content-wrapper">
                            <div className="grey_column">
                                <div className="settings_panel no_margin">
                                    <h3 className="background_color light_blue">Channels</h3>
                                    <div id="search_menu_scroller">
                                        <ul className="settings panel with_counts scroller">
                                            {this.state.channels.map((channel,index) =>
                                                <li key={channel.key} className={this.state.activeItem === index ? 'selected' : ''}
                                                    onClick={() => this.handleItemClick(index)}>
                                                    <a href={"/livetv/#"} onClick={() => {this.changeChannel(channel.key); }}
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
                                            <video preload="auto" key={"http://mradmin.hu:9981/stream/channel/"+this.state.selectedChannel+"?profile=webtv-h264-aac-matroska"} width="100%" autoPlay controls style={{visibility: "visible",borderRadius: "8px",borderBottomLeftRadius: "0",
                                                borderBottomRightRadius: "0"}}>
                                                <source id="ext-gen3699" src={"http://mradmin.hu:9981/stream/channel/"+this.state.selectedChannel+"?profile=webtv-h264-aac-matroska"}/>
                                            </video>
                                        </div>
                                        {this.state.selectedEpg.map((epg,index) =>
                                            <div key={index} className="card v4 tight" style={(index === 0) ? {backgroundColor:"rgb(30,213,169)",borderTopLeftRadius:"0",borderTopRightRadius:"0"}:{backgroundColor:"white"}}>
                                                <div className="wrapper">
                                                    <div className="details">
                                                        <div className="wrapper">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col-sm-10">
                                                                        <div className="title">
                                                                            <a>
                                                                                <h2>{epg.title}</h2>
                                                                            </a>
                                                                            <span className="release_date">
                                                                            {moment.unix(epg.start).format("HH:mm")} - {moment.unix(epg.stop).format("HH:mm")}
                                                                        </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-2">
                                                                        <p style={{fontStyle:"italic"}}>
                                                                            {index > 0 &&
                                                                                "Next Up"
                                                                            }
                                                                            {index === 0 &&
                                                                                "Currently Playing"
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="overview">
                                                            <p>{epg.summary}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>

        );
    }
}

export default Livetv;
