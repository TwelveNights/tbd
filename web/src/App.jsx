import Query from './query/components/Query';

export default class App extends React.Component {
    render() {
        return (
            <div className="container mt-5">
                <h1 className="text-center">Product Parser</h1>
                <Query />
            </div>
        );
    }
}
