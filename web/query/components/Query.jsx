import http from '../../common/http';

export default class Query extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: ""
        };

        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUrl(e) {
        this.setState({ url: e.currentTarget.value });
    }

    onSubmit(e) {
        e.preventDefault();

        http.post("/parse", { urls: [this.state.url] })
            .then((res) => {
                this.setState({ url: "" });
                this.props.success("Successfully parsed!");
                this.props.error("");
                this.props.update(res.data);
            })
            .catch((res) => {
                this.props.error(res.message);
            });
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="url">Enter a url:</label>
                    <input
                        id="url"
                        className="form-control"
                        value={ this.state.url }
                        onChange={ this.onChangeUrl }
                        placeholder="URL" />
                </div>
                <div className="form-group text-center">
                    <button type="submit" disabled={ !this.state.url } onClick={ this.onSubmit } className="btn btn-primary">Submit</button>
                </div>
            </form>
        )
    }
}
