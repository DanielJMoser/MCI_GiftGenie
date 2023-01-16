import { StyleSheet, Image, View } from "react-native";

const LogoTitle = (props) => {
  return (
    <View style={styles.screen}>
      <Image style={styles.image} source={require("../assets/giftgenie.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 12,
    marginLeft: 30,
    width: 220,
    height: 50,
  },
});

export default LogoTitle;
