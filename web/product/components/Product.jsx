import Specification from './Specification';

export default class Product extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newSpec: ""
        };

        this.modifyNewSpec = this.modifyNewSpec.bind(this);
        this.addSpec = this.addSpec.bind(this);
    }

    addSpec(e) {
        e.preventDefault();
        this.props.addSpec(this.state.newSpec);
        this.setState({ newSpec: "" });
    }

    modifyNewSpec(e) {
        this.setState({ newSpec: e.currentTarget.value });
    }

    changeSpec(k, e) {
        this.props.changeSpec(k, e);
    }

    removeSpec(k) {
        this.props.removeSpec(k);
    }

    renderSpecs() {
        return this.props.product.specifications.map((spec, k) => {
            return <Specification changeSpec={ this.changeSpec.bind(this, k) } removeSpec={ this.removeSpec.bind(this, k) } key={ k } data={ spec } />
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">{ this.props.product.name }</h2>
                <form>
                    { this.renderSpecs() }
                    <div className="form-group row text-center">
                        <div className="input-group">
                            <label className="col-form-label col-3" htmlFor="newSpec">Add New Specification</label>
                            <input
                                className="form-control col-8"
                                id="newSpec"
                                type="text"
                                value={ this.state.newSpec }
                                onChange={ this.modifyNewSpec }/>
                                <button onClick={ this.addSpec } className="btn btn-info col-1" disabled={ !this.state.newSpec }>Add New</button>
                        </div>
                    </div>
                    <div className="form-group text-center">
                        <button className="btn btn-primary btn-lg form-control" onClick={ this.props.confirm }>Confirm</button>
                    </div>
                </form>
            </div>
        );
    }
}