import http from '../../common/http';

export default class Query extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: ""
        };
    }

    onChangeUrl(e) {
        let url = e.currentTarget.value;
        this.setState({ url });
    }

    onSubmit(e) {
        http.get();
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <input
                        className="form-control"
                        value={ this.state.url }
                        onChange={ this.onChangeUrl } />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary center-text">Submit</button>
                </div>
            </form>
        )
    }
}
