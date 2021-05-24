import React from "react";
import {Pretty_plots} from "./Pretty_plots";
import {Button} from "react-native";


class Dynamically_add_plots extends React.Component{
  state = {
    numChildren: 0
  }


  render () {
    const children_plots = [];

    // const SpecialButton = props => (
    //     <div className="special-button">
    //       <Button title="Submit" onPress={() => props.addChild(props.this_many) }> </Button>
    //       <div id="children-pane">
    //         {props.children}
    //       </div>
    //     </div>
    //   );
    
    for (var i = 0; i < this.state.numChildren; i += 1) {
      children_plots.push(<Pretty_plots key={i} number={i} />);
    };

    return (
      <SpecialButton addChild={this.onAddChild} this_many={3}>
        {children_plots}
      </SpecialButton>
    );
  }

  onAddChild = (this_many: any) => {
    this.setState({
      numChildren: this_many
    });
  }
}

const SpecialButton = props => (
  <div className="special-button">
    <Button title="Submit" onPress={() => props.addChild(props.this_many) }> </Button>
    <div id="children-pane">
      {props.children}
    </div>
  </div>
);

export default Dynamically_add_plots;