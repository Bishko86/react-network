import React from 'react';
import style from './ProfInfo.module.css';
import { setStatus } from '../../Durax/ProfileReducer/profile-reducer'

class ProfileStatus extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            statusText: this.props.status
        }
        this.editStatus = this.editStatus.bind(this);
        this.editStatusText = this.editStatusText.bind(this);
        this.saveStatus = this.saveStatus.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                statusText: this.props.status
            })
        }
    }
    editStatus() {
        this.setState({ editMode: true });
    }

    saveStatus() {
        this.setState({ editMode: false });
        this.props.setStatus(this.state.statusText);
        setStatus(this.state.statusText);
    }
    editStatusText(e) {
        this.setState({ statusText: e.target.value });


    }

    render() {
        return (
            <>
                {!this.state.editMode &&
                    <div onDoubleClick={this.editStatus} className={style.status}>
                        <span >{this.props.status}</span>
                    </div>}
                {this.state.editMode &&
                    <div  >
                        <input autoFocus={true} onBlur={this.saveStatus} type="text" onChange={this.editStatusText} value={this.state.statusText} />
                    </div>
                }
            </>

        )
    }
}
export default ProfileStatus;