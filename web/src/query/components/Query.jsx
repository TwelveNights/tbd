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
                    <label htmlFor="url">Enter a url:</label>
                    <input
                        className="form-control"
                        value={ this.state.url }
                        onChange={ this.onChangeUrl } 
                        placeholder="URL" />
                </div>
                <div className="form-group text-center">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        )
    }
}
