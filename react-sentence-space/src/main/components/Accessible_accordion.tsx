import React, {useState, useCallback} from 'react';
// import {Collapse} from 'react-collapse';

import Checkboxes from './Checkboxes'
import {Accordion, Card} from 'react-bootstrap'

import { StyleSheet, Button, View, SafeAreaView, Text } from 'react-native';


export function Accessible(props:any) {
  const height = 100;

  const accessibilityIds = {
    checkbox: 'accessible-marker-example1',
    button: 'accessible-marker-example2'
  };

  const [isCheckboxCollapseOpen, setIsCheckboxCollapseOpen] = useState(false);
  const [isButtonCollapseOpen, setIsButtonCollapseOpen] = useState(false);

  const onChange = useCallback(
    ({target: {checked}}) => setIsCheckboxCollapseOpen(checked),
    [setIsCheckboxCollapseOpen]
  );

  const onClick = useCallback(
    () => setIsButtonCollapseOpen(!isButtonCollapseOpen),
    [isButtonCollapseOpen]
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });

  return (
    <div className="accessible">
          <div>
           <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey={props.eventKey}>
                <h2> {props.Title} </h2>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={props.eventKey}>
                <Card.Body> 
                  <Checkboxes check_list={props.which_checkboxes} 
                              ID={props.ID} 
                              default_vals={props.default_vals}/>
                </Card.Body>
              </Accordion.Collapse>
            </Card>  
            </Accordion>            
          </div>
    </div>
  );
}