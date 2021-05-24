import React from 'react';
import NavBarWrapper from "./components/NavBarWrapper";
import {Button, TextInput, StyleSheet, View, Text, ImageBackground } from "react-native";

// import {Accessible} from "./components/Accessible";
import {Accessible} from "./components/Accessible_accordion";
import {Container, Modal} from 'react-bootstrap';
import {Button as Button2} from 'react-bootstrap';
import {Pretty_plots} from "./components/Pretty_plots";
import Dynamically_add_plots from "./components/Dynamically_add_plots";

import fetch, { Response } from 'node-fetch';

import $ from 'jquery'; 

const Home = () => {

    // For modal (aka fancy alert) pop-up 
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // For text field
    const maximumCharacters = 1000;
    const [textValue, setTextValue] = React.useState('Please enter your sentences here, seperated by new lines.');
    const [disabledValue, setDisabledValue] = React.useState(true);

    // For plotting data
    let [number_of_plot_tabs, set_number_of_plot_tabs] = React.useState(0);
    let [number_of_word_plots, set_number_of_word_plots] = React.useState(0);
    let [number_of_syntax_plots, set_number_of_syntax_plots] = React.useState(0);
    let [number_of_semantic_plots, set_number_of_semantic_plots] = React.useState(0);
    let [number_of_multiword_plots, set_number_of_multiword_plots] = React.useState(0);

    // For sending data to backend
    const send_data_to_backend = async (sentence_data: any, props: any, checkbox_boxes: any) => {
            const response = await fetch('http://localhost:8000/api/products/sentence_space/', {
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            'sentence_data' : sentence_data,
                            'checked_boxes': checkbox_boxes
                            })
                    }).catch(e => console.error(e))

                const processed_data = await response.json()
                console.log(response)
                console.log(processed_data)
                return processed_data
        }

    const handleTextEntered = (text: any) => {
        setTextValue(text);
        if (disabledValue == true) {
            setDisabledValue(false);
            // else do nothing
        }
    }

    const isASCII = (text:string) => {
        return /^[\x00-\x7F]*$/.test(text);
    }

    const validate_text = (text:any) => {
        if (!isASCII(text) ) {
            //handleShow()
            alert('You have entered non-ASCII characters. Please only use US-ASCII characters (00-127).\n\nhttps://theasciicode.com.ar/')
            return false
        }
        if (text.split(/\r\n|\r|\n/).length>10) {
            handleShow()
            return false
            //alert('Each sentence is delimited by a new line. You have entered too many sentences.')
        }
        return true
    }

    const grab_check_box_names = (all_checked) => {
        let all_checked_names = []
        for (var i = 0; i < all_checked.length; i++) {
            //console.log(all_checked[i].name)
            all_checked_names.push(all_checked[i].name)
        }
        return all_checked_names
    }


    const grab_check_box_values = () => {
        const word_checked = $('.word_features:checkbox:checked')
        const syntax_checked = $('.syntactic_features:checkbox:checked')
        const semantic_checked = $('.semantic_features:checkbox:checked')
        const multi_word_checked = $('.multi_word_features:checkbox:checked')
        const corpora_checked = $('.comparison_corpora:checkbox:checked')

        const word_checked_names = grab_check_box_names(word_checked)
        const syntax_checked_names = grab_check_box_names(syntax_checked)
        const semantic_checked_names = grab_check_box_names(semantic_checked)
        const multi_word_checked_names = grab_check_box_names(multi_word_checked)
        const corpora_checked_names =grab_check_box_names(corpora_checked)

        const all_checked = {'word_checked': word_checked_names,
                            'syntax_checked':syntax_checked_names,
                            'semantic_checked':semantic_checked_names,
                             'multi_word_checked':multi_word_checked_names,
                             'corpora_checked':corpora_checked_names,
                            }

        //console.log(all_checked)
        return all_checked
    }

    let number_of_graphs = 0
    let number_of_tabs = 0
    const onButtonPress = () => {
        let checkboxed_boxes = grab_check_box_values()
        let props = {}
        if (validate_text(textValue)) {
            let sentences = textValue.split(/\r?\n/)
            send_data_to_backend(sentences, props, checkboxed_boxes)
            .then((data) => { console.log(data)
                            // Based on users checkboxed selections, make
                            // 1) The number of tabs equal to the number of copora selected
                            // 2) The number of plots per corpora equal to the number of features they selected
                            // 3) Pass the copora and feature data to the plotting data

                            let render_this_many_tabs = 0
                            let render_this_many_plots_per_tab = 0

                            // Set the number of graphs = to 1 or the length of selected corpora 
                            let number_of_selected_corpora = data.checked_boxes.corpora_checked.length
                            if (number_of_selected_corpora == 0) {
                                render_this_many_tabs = 1
                            } else {
                                render_this_many_tabs = number_of_selected_corpora
                            }

                            //console.log(data.checked_boxes)
                            // Set the number of plots per tab equal to the sum of number of features checked
                            render_this_many_plots_per_tab = data.checked_boxes.multi_word_checked.length +
                                                             data.checked_boxes.semantic_checked.length +
                                                             data.checked_boxes.syntax_checked.length +
                                                             data.checked_boxes.word_checked.length
                                                             
                            console.log(render_this_many_tabs)
                            console.log(render_this_many_plots_per_tab)

                            set_number_of_plot_tabs(render_this_many_tabs)
                            set_number_of_word_plots(render_this_many_plots_per_tab)

                            console.log(number_of_plot_tabs)
                            console.log(number_of_word_plots)

            })
        }



    }

    const word_features = ["Lexical connectivity", "Word frequency ", "Orthography-semantics consistency",
                 "Number of orthographic neighbors", "Age of acquisition", "Word length",
                 "Lexical decision data","Valence","Arousal","Dominance","Prevalence",
                 "N-gram surprisal","Contextual diversity","Number of morphemes",
                 "Concreteness","Polysemy", "Pronoun ratio",
                 "Zipf information"];

    const syntactic_features = ["Function word ratio"];

    const semantic_features = ["GloVe","Semantic diversity"];

    const multi_word_features = ["PMI", "GPT2-sentence probability", "SLOR", "BERT sentiment",
                 "BERT genre"];

    const comparison_corpora = ["Universal Dependencies","Business Contracts","Wall Street Journal","Medical Journals"];
    const comparison_corpora_bool = [true, false, false, false]

        //      <p>Or upload a csv</p>
        //  <View>
        //      <input type="file" accept=".csv" />
        //    </View>
        // 

     // const SpecialButton = props => (
     //      <div className="special-button">
     //        <Button title="Submit" onPress={() => props.addChild(props.this_many) }> </Button>
     //        <div id="children-pane">
     //          {props.children}
     //        </div>
     //      </div>
     //    );

    return (
        <NavBarWrapper>

        <h1>Sentence Space Comparison</h1>

        <img src="https://i.pinimg.com/originals/b6/cb/bd/b6cbbd8d4c4d58c337cd3afdf01d9532.gif" alt="error with image"  width="300" />

        <View
            style={{
                flexDirection: "row",
                height: 300,
                padding: 50
            }}
        >
        <View style={{ flex: 1 }}>
            <TextInput
                            multiline
                            numberOfLines={10}
                            onChangeText={text => handleTextEntered(text)}
                            value={textValue}
                            editable
                            maxLength={maximumCharacters}
                            style={styles.input}
                        />
        <View style={{ flex: 0.1 }}>
            <Text> { textValue.length + "/" + maximumCharacters} </Text>
        </View>
        </View>
        </View>

       <Container>
            <View>
                <Accessible which_checkboxes={word_features}
                            ID='word_features'
                            Title='Word Level Features'
                            default_vals={true}
                            eventKey='0' />
            </View>

            <View>
                <Accessible which_checkboxes={syntactic_features}
                            ID='syntactic_features'
                            Title='Syntactic Features'
                            default_vals={true}
                            eventKey='1'  />
            </View>

            <View>
                <Accessible which_checkboxes={semantic_features}
                            ID='semantic_features'
                            Title='Semantic Features'
                            default_vals={false} 
                            eventKey='1' />
            </View>

            <View>
                <Accessible which_checkboxes={multi_word_features}
                            ID='multi_word_features'
                            Title='Multi-Word Features'
                            default_vals={false}
                            eventKey='1'  />
            </View>

            <View>
                <Accessible which_checkboxes={comparison_corpora}
                            ID='comparison_corpora'
                            Title='Comparison Corpora'
                            default_vals={comparison_corpora_bool}
                            eventKey='1'  />
            </View>

        <View style={{
                padding: 40
            }}>
        <h3>Limitations & Requirements</h3>
        <ul id="limits">
          <li>List a maximum of 10 sentences.</li>
          <li>Each sentence should have a minimum of 5 words and a max of 50 words.</li>
          <li>US-ASCII characters 00-127</li>
        </ul> 
        </View>

        

        <View style={{
                top: 0,
                flexDirection: "row"
        }}>
        
        <View style={{ flex: 0.33 }}/>
        <View style={{ flex: 0.33 , padding: 50}}>
            <Button disabled={disabledValue} title="Submit" onPress={() => onButtonPress()} > </Button>
          
        </View>
        

        </View>
      </Container>


      {/*This block is for fancy alert box that links to github and docker*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>You've entered too many sentences.</Modal.Title>
        </Modal.Header>
        <Modal.Body>If you would like to analyze more sentences please follow this github and install on your local machine or high performance cluster(docker install recommended). <a href="https://www.github.com" target="_blank">github.com</a> </Modal.Body>
        <Modal.Footer>
          <Button2 variant='primary' onClick={handleClose}>
            Close
          </Button2>
        </Modal.Footer>
      </Modal>


       {/*<Dynamically_add_plots /> */}

        </NavBarWrapper>
    );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 5,
    borderWidth: 0.5,
    flex: 1,
    alignItems: 'stretch',
  },
});

export default Home;