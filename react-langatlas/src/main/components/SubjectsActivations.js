import React, {Component} from "react";
import gifshot from 'gifshot';


// TODO:
// clean up
// add buttons to select/stop/reset etc
// display subject next to image
class SubjectsActivations extends Component {

    constructor(props) {
        super(props);
        this.index = 0;
        this.values = [];
        this.oldLogFunction = console.warn;
        console.warn = function(){};
    }

    componentWillUnmount() {
        console.warn = this.oldLogFunction; // reset console.warn
    }

    createGifComponent() {
        gifshot.createGIF({
            'images': this.values,
            'interval': 0.3,
            'gifWidth': 210,
            'gifHeight': 305,
            'sampleInterval': 10, //default
            'progressCallback': function(captureProgress) {console.log(captureProgress)},

        }, function (obj) {
            if (!obj.error) {
                const image = obj.image, animatedImage = document.createElement('img');
                animatedImage.src = image;
                const component=document.getElementById('activationsComponent')
                // this assumes that there at most a single child node
                if (component.childNodes.length > 0) {
                    component.replaceChild(animatedImage,component.childNodes[0])
                } else {
                    document.getElementById('activationsComponent').appendChild(animatedImage);
                }
            }

        });
    }

    bufferImages() {

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        for (let value of this.values) {
            const image = new Image(210, 305);
            image.onload = drawImageActualSize;
            image.src = value;
        }

        function drawImageActualSize() {

            canvas.width = this.width;
            canvas.height = this.height;

            ctx.drawImage(this, 0, 0, this.width, this.height);
        }
    }

    executeTestCallback = (callback) => {
        const subjects = callback()
        // reset values
        this.values = []
        // populate values
        this.values = subjects.map( (id) => (process.env.PUBLIC_URL + '/' + this.props.data[id-1]['SPM_activations']))
        this.bufferImages()
    }

    renderLoadingNode() {
        const component=document.getElementById('activationsComponent')
        const node = document.createElement('div')
        node.className="spinner-border"
        if (component.childNodes.length > 0) {
            component.replaceChild(node, component.childNodes[0])
        } else {
            document.getElementById('activationsComponent').appendChild(node);
        }
    }

    validateCallback = (type) => {
        if (!this.props.data.length > 0)
        {
            return null;
        }
        switch (type) {
            case 'all':
                this.renderLoadingNode()
                this.executeAllCallback(this.props.callback);
                break;
            case 'selected':
                this.executeSelectedCallback(this.props.callback);
                break;
            case 'test':
                this.executeTestCallback(this.props.callback);
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
        this.values = subjects.map( (id) => (process.env.PUBLIC_URL + '/' + this.props.data[id-1]['SPM_activations']))

        if (this.values.length > 0) {
            this.renderLoadingNode()
            this.createGifComponent()
        } else {
            console.warn('No data is selected.')
        }
    }

    executeAllCallback = () => {
        // type casting as a number seems inefficient since we are manually creating the SQL DB
        // primary keys range from 1 to data.length, subtracting 1 for indices
        this.values = []
        this.values = process.env.PUBLIC_URL + "/SPM_images/811.gif";
        const animatedImage = document.createElement('img');
        animatedImage.src = this.values;
        const component=document.getElementById('activationsComponent')
        // this assumes that there at most a single child node
        if (component.childNodes.length > 0) {
            component.replaceChild(animatedImage,component.childNodes[0])
        } else {
            document.getElementById('activationsComponent').appendChild(animatedImage);
        }

    }

    render() {
        return (
            <>
                {/*<canvas id={'canvas'}/>*/}
                {/*<div className="btn btn-sm btn-outline-secondary" onClick={() => this.validateCallback('test')}>Test</div>*/}
                <div id={'activationsComponent'}/>
                <div className="btn btn-sm btn-outline-secondary" onClick={() => this.validateCallback('selected')}>View Selected</div>
                <div className="btn btn-sm btn-outline-secondary" onClick={() => this.validateCallback('all')}>View All</div>
            </>
        );
    }
}
export default SubjectsActivations;

