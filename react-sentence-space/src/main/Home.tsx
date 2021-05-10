import React from 'react';
import NavBarWrapper from "./components/NavBarWrapper";
import { Button, TextInput, StyleSheet, View, Text } from "react-native";

const Home = () => {

    const maximumCharacters = 500;

    const [textValue, setTextValue] = React.useState('Enter a sentence here.');
    const [disabledValue, setDisabledValue] = React.useState(true);
    const handleTextEntered = (text: any) => {
        setTextValue(text);
        if (disabledValue == true) {
            setDisabledValue(false);
            // else do nothing
        }
    }

    const onButtonPress = () => {
        console.log(textValue)
    }

    return (
        <NavBarWrapper>
        <View
            style={{
                flexDirection: "row",
                height: 200,
                padding: 50
            }}
        >
        <View style={{ flex: 0.9 }}>
            <TextInput
                            multiline
                            numberOfLines={4}
                            onChangeText={text => handleTextEntered(text)}
                            value={textValue}
                            editable
                            maxLength={maximumCharacters}
                            style={styles.input}
                        />
        </View>
        <View style={{ flex: 0.1 }}>
            <Text> { textValue.length + "/" + maximumCharacters} </Text>
        </View>
        </View>
        <View style={{
                top: 0,
                flexDirection: "row"
        }}>
        <View style={{ flex: 0.33 }}/>
        <View style={{ flex: 0.33 }}>
            <Button disabled={disabledValue} title="Submit" onPress={onButtonPress} />
        </View>
        <View style={{ flex: 0.33 }}/>

        </View>
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