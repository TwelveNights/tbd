import Specification from './Specification';

export default class Product extends React.Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     specs: []
        // };
    }

    // update(k, e) {
    //     let newSpecs = this.state.specs;
    //     newSpecs[k].value = e.currentTarget.value;

    //     this.setState({ specs: newSpecs });
    // }

    renderSpecs() {
        return this.props.specs.map((spec, k) => {
            return <Specification key={ k } data={ spec } />
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">{ this.props.name }</h2>
                <form>
                    { this.renderSpecs() }
                    <button className="btn btn-primary text-center" onClick={ this.props.confirm }>Confirm</button>
                </form>
            </div>
        );
    }
}