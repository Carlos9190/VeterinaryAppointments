import { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import Form from "./src/components/Form";

const App = () => {

  const [visibleModal, setVisibleModal] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.boldtitle}>Veterinary {''}
        <Text style={styles.title}>Appointment Manager</Text>
      </Text>

      <Pressable
        style={styles.btnNewAppointment}
        onPress={() => setVisibleModal(!visibleModal)}
      >
        <Text style={styles.btnNewAppointmentText}>New appointment</Text>
      </Pressable>

      <Form
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: '#F3F4F6',
    flex: 1
  },
  title: {
    color: '#374151',
    fontWeight: '600'
  },
  boldtitle: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '900',
    color: '#6D28D9'
  },
  btnNewAppointment: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10
  },
  btnNewAppointmentText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase'
  }
})

export default App;
