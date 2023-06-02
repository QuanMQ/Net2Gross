import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Pressable,
  Modal,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";

function DependentsSection() {
  const [dependentsInput, setDependentsInput] = useState("");
  const [minusPlus, setMinusPlus] = useState("");
  const [focus, setFocus] = useState(false);
  const [dependentsModalVisible, setDependentsModalVisible] = useState(false);
  const { dependentsSet } = useContext(GlobalContext);
  useEffect(() => {
    dependentsInput
      ? dependentsSet(parseInt(dependentsInput))
      : dependentsSet(0);
  }, [dependentsInput]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinusPlus("none");
    }, 20);
    return () => {
      clearTimeout(timer);
    };
  }, [minusPlus]);

  return (
    <View style={{ marginTop: 15, width: "90%" }}>
      <View style={styles.flexBox}>
        <Text style={{ fontSize: 20 }}>Number of dependents</Text>
        <Pressable onPress={() => setDependentsModalVisible(true)} hitSlop={10}>
          <Text style={{ fontSize: 17 }}>&#x2753;</Text>
        </Pressable>
      </View>
      <View
        style={[styles.flexBox, { marginTop: 5, columnGap: 10, width: "60%" }]}
      >
        <Pressable
          style={[
            styles.button,
            minusPlus === "minus" && styles.buttonPressed,
            !dependentsInput && styles.buttonDisabled,
          ]}
          onPressIn={() => setMinusPlus("minus")}
          onPress={() =>
            setDependentsInput((prev) => {
              const newValue = parseInt(prev) - 1;
              return newValue === 0 ? "" : newValue.toString();
            })
          }
          disabled={!dependentsInput ? true : false}
        >
          <Text
            style={[
              styles.buttonIcon,
              minusPlus === "minus" && styles.buttonIconPressed,
              !dependentsInput && styles.buttonIconDisabled,
            ]}
          >
            -
          </Text>
        </Pressable>
        <SafeAreaView style={{ width: "50%" }}>
          <TextInput
            value={dependentsInput}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
            onChangeText={(dependentsStr) => {
              const regex = /^[1-9][0-9]?$/;
              const dependentsNum = parseInt(dependentsStr);
              regex.test(dependentsStr)
                ? setDependentsInput(dependentsNum <= 20 ? dependentsStr : "20")
                : setDependentsInput((prev) =>
                    dependentsStr === "" ? "" : prev
                  );
            }}
            keyboardType="number-pad"
            placeholder="0"
            placeholderTextColor={"#000"}
            style={[styles.input, focus && styles.inputFocused]}
            textAlign="center"
          />
        </SafeAreaView>
        <Pressable
          style={[
            styles.button,
            minusPlus === "plus" && styles.buttonPressed,
            parseInt(dependentsInput) === 20 && styles.buttonDisabled,
          ]}
          onPress={() =>
            setDependentsInput((prev) => {
              setMinusPlus("plus");
              const newValue = (prev === "" ? 0 : parseInt(prev)) + 1;
              return newValue > 20 ? prev : newValue.toString();
            })
          }
          disabled={parseInt(dependentsInput) === 20 ? true : false}
        >
          <Text
            style={[
              styles.buttonIcon,
              minusPlus === "plus" && styles.buttonIconPressed,
              parseInt(dependentsInput) === 20 && styles.buttonIconDisabled,
            ]}
          >
            +
          </Text>
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={dependentsModalVisible}
        onRequestClose={() => {
          setDependentsModalVisible(!dependentsModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>NUMBER OF DEPENDENTS</Text>
            <Text style={styles.modalText}>
              Dependents are persons whom personal income taxpayers are
              responsible for nurturing.
            </Text>
            <Text style={styles.modalText}>Include:</Text>
            <Text style={[styles.modalText, { paddingLeft: 30 }]}>
              &#x25FE; Juvenile; children with disabilities, incapable of
              working;
            </Text>
            <Text style={[styles.modalText, { paddingLeft: 30 }]}>
              &#x25FE; Individuals having no income or having income not
              exceeding the prescribed level. Including adult children attending
              college, college, vocational secondary school, or national
              training; the spouse who is incapable of working; fathers or
              mothers who have exceeded the working age or are unable to work;
              others who have no one to rely on but the taxpayers must directly
              nurture.
            </Text>
            <Pressable
              style={styles.buttonClose}
              onPress={() => setDependentsModalVisible(!dependentsModalVisible)}
              hitSlop={10}
            >
              <Text style={styles.buttonCloseIcon}>&#x2715;</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  flexBox: {
    flexDirection: "row",
  },
  input: {
    borderColor: "#d9d9d9",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  inputFocused: {
    borderColor: "#00b14f",
  },
  button: {
    borderColor: "#d9d9d9",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderRadius: 5,
    width: 49,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPressed: {
    borderColor: "#ff7d55",
  },
  buttonDisabled: {
    borderColor: "#d9d9d9",
    backgroundColor: "#f6f8fb",
  },
  buttonIcon: {
    fontSize: 30,
    color: "#888",
  },
  buttonIconPressed: {
    color: "#ff7d55",
  },
  buttonIconDisabled: {
    color: "#d0d0d0",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  modalView: {
    height: "75%",
    padding: 15,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  buttonClose: {
    position: "absolute",
    right: 15,
    top: 10,
  },
  buttonCloseIcon: {
    fontSize: 20,
    color: "#bdbdbd",
  },
  modalTitle: {
    marginBottom: 30,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  modalText: {
    fontSize: 18,
    paddingHorizontal: 15,
  },
});

export default DependentsSection;
