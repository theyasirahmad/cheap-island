import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, StatusBar, ImageBackground } from 'react-native';
import GlobalHeader from '../../Components/GlobalHeader';
import { Colors } from '../../constants/theme'

const TermsConditions = () => {
    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor={Colors.LinearBlue1} /> */}
            <GlobalHeader
                backgroundColor="blue"
                headingText="ABOUT US"
                headingMargin={1}
                fontSize={18}
                color="#fff"
            />
            <ScrollView style={{ paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>
                <Text style={styles.txtHeading1}>About Us</Text>
                <Text style={{ color: "rgba(0,0,0,0.5)", marginTop: 10 }}>
                    Welcome to www.lorem-ipsum.info. This site is provided as a service to our
                    visitors and may be used for informational purposes only. Because the
                    Terms and Conditions contain legal obligations, please read them carefully.
                </Text>
                <Text style={styles.txtHeading1}>Terms & Conditions</Text>
                <Text style={{ color: "rgba(0,0,0,0.5)", marginTop: 10 }}>
                    Welcome to www.lorem-ipsum.info. This site is provided as a service to our visitors and may be used for informational purposes only. Because the Terms and Conditions contain legal obligations, please read them carefully.

                    1. YOUR AGREEMENT
                    By using this Site, you agree to be bound by, and to comply with, these Terms and Conditions. If you do not agree to these Terms and Conditions, please do not use this site.

                    PLEASE NOTE: We reserve the right, at our sole discretion, to change, modify or otherwise alter these Terms and Conditions at any time. Unless otherwise indicated, amendments will become effective immediately. Please review these Terms and Conditions periodically. Your continued use of the Site following the posting of changes and/or modifications will constitute your acceptance of the revised Terms and Conditions and the reasonableness of these standards for notice of changes. For your information, this page was last updated as of the date at the top of these terms and conditions.
                    2. PRIVACY
                    Please review our Privacy Policy, which also governs your visit to this Site, to understand our practices.

                    3. LINKED SITES
                    This Site may contain links to other independent third-party Web sites ("Linked Sites”). These Linked Sites are provided solely as a convenience to our visitors. Such Linked Sites are not under our control, and we are not responsible for and does not endorse the content of such Linked Sites, including any information or materials contained on such Linked Sites. You will need to make your own independent judgment regarding your interaction with these Linked Sites.

                    4. FORWARD LOOKING STATEMENTS
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
