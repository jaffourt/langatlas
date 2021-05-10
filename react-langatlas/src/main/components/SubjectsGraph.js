import { Histogram,BarSeries, withParentSize, XAxis, YAxis } from '@data-ui/histogram';
import React, {Component} from "react";
import {Form} from "react-bootstrap";

const ResponsiveHistogram = withParentSize(({ parentWidth, parentHeight, ...rest}) => (
    <Histogram
        width={parentWidth}
        height={400}
        {...rest}
    />
));


// TODO:
// Clean up formatting
// Display a default graph?

class SubjectsGraph extends Component {

    constructor(props) {
        super(props);
        this.values = [];
        this.oldLogFunction = console.warn;
        console.warn = function(){};
    }

    componentWillUnmount() {
        console.warn = this.oldLogFunction; // reset console.warn
    }

    validateCallback = (type) => {
        if (!this.props.data.length > 0)
        {
            return null;
        }
        if (this.stat == null)
        {
            // the first option, by defaults
            this.stat = 'LH_SN_ES'
        }
        switch (type) {
            case 'all':
                this.executeAllCallback(this.props.callback);
                break;
            case 'selected':
                this.executeSelectedCallback(this.props.callback);
                break;
            default:
                return null;
        }
    }

    executeSelectedCallback = (callback) => {
        const subjects = callback()

        // type casting as a number seems inefficient since we are manually creating the SQL DB
        // primary keys range from 1 to data.length, subtracting 1 for indices
        this.values = []
        this.values = subjects.map( (id) => Number(this.props.data[id-1].individual_stats[this.stat]))

        if (this.values.length > 0) {
            this.forceUpdate()
        }
        else {
            console.warn('No data is selected.')
        }
    }

    executeAllCallback = () => {

        // type casting as a number seems inefficient since we are manually creating the DB
        // primary keys range from 1 to data.length, subtracting 1 for indices
        this.values = []
        this.values = this.props.data.map( (entry) => Number(entry.individual_stats[this.stat]))

        if (this.values.length > 0) {
            this.forceUpdate()
        }
        else {
            console.warn('No data is selected.')
        }
    }

    setMeasureState = ({target:{value}}) => {
        this.stat = value;
    }

    render() {
        return (
            <>
                { (this.values.length > 0) &&
                <ResponsiveHistogram
                    ariaLabel="My histogram of ..."
                    orientation="vertical"
                    cumulative={false}
                    normalized={false}
                    binCount={25}
                    valueAccessor={datum => datum}
                    binType="numeric"
                    renderTooltip={({ datum, color}) => (
                        <div>
                            <strong style={{color}}>{datum.bin0} to {datum.bin1}</strong>
                            <div><strong>count </strong>{datum.count}</div>
                        </div>
                    )}
                >
                    <BarSeries
                        animated
                        stroke={"#000000"}
                        fill={"#db3300"}
                        rawData={this.values}
                    />
                    <XAxis label={this.stat}/>
                    <YAxis label={"count"}/>
                </ResponsiveHistogram>
                }

                <Form>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Measure</Form.Label>
                        <Form.Control as="select" onChange={this.setMeasureState}>
                            <option>LH_SN_ES</option>
                            <option>RH_SN_ES</option>
                            <option>LH_SN_spcorr</option>
                            <option>RH_SN_spcorr</option>
                            <option>LH_SN_volume</option>
                            <option>RH_SN_volume</option>
                            <option>Lateralization_volume</option>
                            <option>Lateralization_ES</option>
                        </Form.Control>
                    </Form.Group>
                </Form>

                <div className="btn btn-sm btn-outline-secondary" onClick={() => this.validateCallback('selected')}>Plot Selected</div>
                <div className="btn btn-sm btn-outline-secondary" onClick={() => this.validateCallback('all')}>Plot All</div>
            </>
        );
    }
}

export default SubjectsGraph;