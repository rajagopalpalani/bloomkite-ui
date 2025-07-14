import React from 'react';
import ProfileHeader from '../../profileHeader';
import AdvisorLeftbar from '../advisorLeftbar';

import { maxLength } from '../../../constants/commonRules';

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            advId: '',
            videos: [
                {
                    aboutVideo: '',
                    title: '',
                    video: ''
                }
            ]
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleVideo = (e) => {
        e.preventDefault();
        let options = {
            //   "advId": this.state.advId,
            videos: [
                {
                    aboutVideo: this.state.aboutVideo,
                    title: this.state.title,
                    video: this.state.video
                }
            ]
        };
    };

    render() {
        const { advisorDetails } = this.props;
        const { userName } = advisorDetails || {};
        return (
            <div>
                <div className="col-12">
                    <ProfileHeader
                        name={this.props.advisorDetails.displayName || (this.props.advisorDetails && this.props.advisorDetails.name)}
                        location={this.props.advisorDetails && this.props.advisorDetails.city}
                        designation={this.props.advisorDetails.designation}
                        handleSave={this.handleVideo}
                        showSaveButton={true}
                        onPublish={this.props.onPublish}
                        advisorDetails={this.props.advisorDetails}
                    />
                </div>
                <div className="row col-12 advisor-gap">
                    <AdvisorLeftbar userName={userName} handleTabChange={this.props.handleTabChange} currentTab={this.props.currentTab} showBrandTag={this.props.showBrandTag} />
                    <div className="col-10 nopaddding">
                        <div className="col-12 center-page row" style={{ paddingRight: '0px' }}>
                            <div className="page-center bg-white">
                                <form className="video-form">
                                    <div className="row">
                                        <div className="col-3 form-group">
                                            <label>Video Title</label>
                                            <input className="text-border" name="title" id="title" type="text" maxLength={maxLength.content} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="videoFont">
                                        <label>About Video</label>
                                    </div>
                                    <textarea
                                        className="video-text"
                                        name="aboutVideo"
                                        id="aboutVideo"
                                        type="text"
                                        rows="5"
                                        cols="70"
                                        maxLength={maxLength.about}
                                        onChange={this.handleChange}>
                                        {this.state.aboutme}
                                    </textarea>
                                </form>
                                <div>
                                    <span className="upload-video">
                                        <img src="/images/upload.svg" alt="upload video" />
                                        UPLOAD VIDEO{' '}
                                    </span>
                                </div>
                                <div className="video-upload">
                                    <iframe width="150" height="120" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
                                </div>
                                <div className="video-btn">{/* <button className="save-btn2" onClick={(e) => this.handleVideo(e)}>SAVE</button> */}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Video;
