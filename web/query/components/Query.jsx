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
        let url = e.currentTarget.value;
        this.setState({ url });
    }

    onSubmit(e) {
        e.preventDefault();
        http.get([{ url: this.state.url }])
            .then((res) => {
                this.props.error("");
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
                        className="form-control"
                        value={ this.state.url }
                        onChange={ this.onChangeUrl }
                        placeholder="URL" />
                </div>
                <div className="form-group text-center">
                    <button type="submit" onClick={ this.onSubmit } className="btn btn-primary">Submit</button>
                </div>
            </form>
        )
    }
}