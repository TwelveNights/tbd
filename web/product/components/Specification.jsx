export default class Specification extends React.Component {
    render() {
        const displayName = this.props.spec.displayName;
        return (
            <div className="form-group">
                <label htmlFor={ displayName }>{ displayName }</label>
                <input
                    id={ displayName }
                    className="form-control"
                    type="text"
                    value={ this.props.spec.value }/>
            </div>
        )
    }
}