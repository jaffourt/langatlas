import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import React, {Component} from "react";
import {Container, Tabs, Tab} from "react-bootstrap";
import SubjectsGraph from "./SubjectsGraph"
import SubjectsActivations from "./SubjectsActivations"
import ImageSlider from "./ImageSlider";

// custom CSS for this page
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';


// documentation for react-bootstrap-table2-filter
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html

type selectTypes = {
    [key: string]: string;
    'left-lat': string;
    'bi-lat': string;
    'right-lat': string;
};

interface Props {
}

interface State {
    selectOptions: selectTypes;
    data: any;
}

class SubjectsTable extends Component<Props, State> {

    lateralFilter: any;
    node: any;
    componentDidMount() {
        fetch('http://localhost:8000/api/products')
            .then((response) => response.json())
            .then(data => {
                this.setState({ data: data });
            });
    }

    handleClick = () => {
        this.lateralFilter(0);
    };

    handleGetSelectedData = (node: any) =>
    {
        return (this.node.selectionContext.selected);
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            selectOptions: {
                'left-lat': 'left-lat',
                'bi-lat': 'bi-lat',
                'right-lat': 'right-lat'
            },
            data: []
        };
    };

    render() {

        return (
            <Container>
                {/*image slider with clicks*/}
                {/*<ImageSlider*/}
                {/*    data={this.state.data}*/}
                {/*    callback={this.handleGetSelectedData}*/}
                {/*/>*/}
                <br/>
                <Tabs defaultActiveKey="histogram" transition={false}>
                    <Tab eventKey="histogram" title="Histogram">
                        <SubjectsGraph
                            data={this.state.data}
                            callback={this.handleGetSelectedData}
                        />
                    </Tab>
                    <Tab eventKey="activations" title="Activations">
                        <SubjectsActivations
                            data={this.state.data}
                            callback={this.handleGetSelectedData}
                        />
                    </Tab>
                </Tabs>
                {/*<SubjectsGraph*/}
                {/*    data={this.state.data}*/}
                {/*    callback={this.handleGetSelectedData}*/}
                {/*/>*/}

                <BootstrapTable
                    ref={ n => this.node = n }
                    keyField='id'
                    data={ this.state.data }
                    columns={[{
                        dataField: 'subjID',
                        text: 'Subject'
                    }, {
                        dataField: 'downloads',
                        text: 'Downloads'
                    }, {
                        //     dataField: 'individual_stats.LH_SN_ES',
                        //     text: 'LH_SN_ES'
                        // }, {
                        //     dataField: 'individual_stats.LH_SN_spcorr',
                        //     text: 'LH_SN_spcorr',
                        // }, {
                        //     dataField: 'individual_stats.LH_SN_volume',
                        //     text: 'LH_SN_volume'
                        // }, {
                        dataField: 'individual_stats.Lateralization',
                        text: 'Lateralization',
                        formatter: cell => this.state.selectOptions[cell],
                        filter: selectFilter({
                            options: this.state.selectOptions,
                            getFilter: (filter) => {
                                this.lateralFilter = filter;
                            }
                        })

                    }]}
                    selectRow={ {mode: 'checkbox', clickToSelect: true} }
                    pagination={ paginationFactory({
                        paginationSize: 4,
                        pageStartIndex: 0,
                        showTotal: true,
                        sizePerPageList: [{
                            text: '5', value: 5
                        }, {
                            text: '10', value: 10
                        }, {
                            text: '25', value: 25
                        }, {
                            text: '50', value: 50
                        }, {
                            text: 'All', value: this.state.data.length
                        }]}
                    ) }
                    filter={ filterFactory() }
                />
            </Container>

        );
    }
}
export default SubjectsTable;
