import { StyleSheet, View } from "react-native";

const Paginator = ({ data, index, style }) => {
  if (data.length > 1) {
    return (
      <View style={[{ flexDirection: "row", height: 40 }, style]}>
        {data.map((_, i) => {
          const activeBackgroud = i === Math.ceil(index) ? "#fff" : "#555";
          return (
            <View
              style={[styles.dot, { backgroundColor: activeBackgroud }]}
              key={i.toString()}
            />
          );
        })}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  dot: {
    marginTop: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: "#ffffff",
    width: 10,
  },
});

export default Paginator;
