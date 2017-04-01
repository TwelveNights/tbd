import SpecificationEntry from './SpecificationEntry';

export default class SpecificationList extends React.Component {
    renderSpecifications() {
        return this.props.specifications.map((s) => {
            let key = Object.keys(s)[0];
            return <SpecificationEntry data={s} key={ key } />
        })
    }

    render() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    { this.renderSpecifications() }
                </tbody>
            </table>
        );
    }
}