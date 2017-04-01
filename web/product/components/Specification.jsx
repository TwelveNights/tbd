export default class Specification extends React.Component {
    render() {
        const displayName = Object.keys(this.props.data)[0];
        return (
            <div className="form-group">
                <label htmlFor={ displayName }>{ displayName }</label>
                <input
                    id={ displayName }
                    className="form-control"
                    type="text"
                    value={ this.props.data[displayName] }/>
            </div>
        )
    }
}