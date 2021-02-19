import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, StatusBar, ImageBackground } from 'react-native';
import GlobalHeader from '../../Components/GlobalHeader';
import { Colors } from '../../constants/theme'

const TermsConditions = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor={Colors.LinearBlue1} /> */}
            <GlobalHeader
                backgroundColor="blue"
                headingText="ABOUT US"
                headingMargin={1}
                fontSize={18}
                color="#fff"
                arrow={true}
                BackIconColor='#fff'
                navigation={navigation}
            />
            <StatusBar backgroundColor={'transparent'} translucent={true} />

            <ScrollView style={{ paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>
                <Text style={styles.txtHeading1}>About Us</Text>
                <Text style={{ color: "rgba(0,0,0,0.5)", marginTop: 10 }}>
                Cheap Iceland is an app for tourists in Iceland

We at Cheap Iceland have one main target, let tourists traveling to Iceland enjoy the country and all the things it has to offer. We have all the best offers in Iceland in one place, our app. Iceland can be expensive so we try our best to let travelers enjoy the country without the bank account being emptied. We also have information about the most interesting places in Iceland and you can see where they are and read about them. We have a map in our app where you can find every gas station in Iceland and see their prices. You can see the menus of every restaurant in Iceland, read about them, and see their location on a map.
                </Text>
                <Text style={styles.txtHeading1}>Terms & Conditions</Text>
                <Text style={{ color: "rgba(0,0,0,0.5)", marginTop: 10 }}>
                    1. Acceptance of the terms

                    i. The Cheap Iceland app allows you to use offers from companies from all over Iceland. You can read about interesting places in Iceland and see the lowest gas prices in the country. By downloading this app you accept our terms and any changes made to the terms.

                    ii. The Cheap Iceland directors reserve the right to change the terms and conditions unilaterally. If the changes are not for the benefit of the user then he shall be notified securely, through the website, or with a text message or email. Continued use of the service includes an acceptance of any changes made to the terms and conditions.

                    iii. Users can always approach these terms in the Cheap Iceland application. These terms are published in English.

                    2. Usage and responsibilities

                    i. Users are not allowed to use the Cheap Iceland offers unless they are registered users of the app. This includes that users are not allowed to download data through the app and provide data to third parties.

                    ii. In general, the discounts that are provided are based on the full price. No discount is offered on other offers unless otherwise is stated.

                    iii. Offers in the app shall be shown on arrival at the place where the offer is to be used. Cheap Iceland does not guarantee that offers are valid as agreements with partners may change due to changes of ownership that happens with partnerships.

                    iv. If a discount is offered from the total bill, then the discount applies to everything that is bought and the offer is valid for one or two persons unless other is stated. Two for one applies to the buyer and one other person. It is not possible to get for example four for two or six for three.

                    3. Laws and venue

                    Business connection with members and these terms go by the Icelandic laws, so any issues that may arise from the use of the app, unless otherwise agreed. A case that arises for breach of these terms shall be subject to the district court of Reykjavík.
                </Text>
            </ScrollView>
            <ImageBackground
                style={{ width: 100, height: 130, position: "absolute", alignSelf: "center", bottom: 10, zIndex: -1000000 }}
                source={require('../../assets/images/inback.png')}
                resizeMode="cover"
            />
        </View>
    );
};

export default TermsConditions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundBlueColor,
        paddingBottom: 30
    },
    txtHeading1: {
        color: Colors.LinearBlue1, fontSize: 24, fontWeight: 'bold'
    },
});
