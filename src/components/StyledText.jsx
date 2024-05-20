import React from "react";
import { StyleSheet, Text } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
    text: {
        color: theme.colors.black
    },
    colorBlue: {
        color: theme.colors.blue
    },
    colorRed: {
        color: theme.colors.red
    },
    bold: {
        fontWeight: theme.fontWeights.bold
    },
    subheading: {
        fontSize: theme.fontSizes.subheading
    },
    title: {
        fontSize: theme.fontSizes.title
    }
})

export default function StyledText ({children, color, fontSize, fontWeight, style, ...restOfProps})
{
    const textStyle = [
        styles.text,
        color === 'primary' && styles.colorPrimary,
        color === 'secondary' && styles.colorSecondary,
        fontSize === 'subheading' && styles.subheading,
        fontSize === 'title' && styles.title,
        fontWeight === 'bold' && styles.bold,
        style
    ]

    return (
        <Text style={textStyle} {...restOfProps}>{children}</Text>
    )
}