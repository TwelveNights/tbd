export default class Specification extends React.Component {
    render() {
        const displayName = Object.keys(this.props.data)[0];
        return (
            <div className="form-group">
                <button type="button" className="close" onClick={ this.props.removeSpec } aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <label htmlFor={ displayName }>{ displayName }</label>
                <input
                    id={ displayName }
                    className="form-control"
                    type="text"
                    value={ this.props.data[displayName] }
                    onChange={ this.props.changeSpec }/>
            </div>
        )
    }
}