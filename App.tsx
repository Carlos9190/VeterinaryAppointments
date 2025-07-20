import { useState } from "react";
import { Text, View, StyleSheet, Pressable, FlatList, Alert, Modal } from "react-native";
import { patientType } from "./src/types";
import Form from "./src/components/Form";
import Patient from "./src/components/Patient";
import PatientDetails from "./src/components/PatientDetails";

const initialPatient: patientType = {
  id: '',
  patient: '',
  owner: '',
  email: '',
  phone: '',
  date: new Date(),
  symptoms: ''
}

const App = () => {
  const [visibleModal, setVisibleModal] = useState(false)
  const [patients, setPatients] = useState<patientType[]>([])
  const [patient, setPatient] = useState<patientType>(initialPatient)
  const [patientModal, setPatientModal] = useState(false)

  const patientToEdit = (id: patientType['id']) => {
    const patientToEdit = patients.filter(patient => patient.id === id)
    setPatient(patientToEdit[0])
  }

  const patientToDelete = (id: patientType['id']) => {
    Alert.alert(
      "Are you sure you want to delete this patient?",
      "This action is irreversible and the patient will be permanently removed.",
      [
        { text: 'Cancel' },
        {
          text: 'Delete', onPress: () => {
            const updatedPatients = patients.filter(patientsState => patientsState.id !== id)
            setPatients(updatedPatients)
          }
        }
      ]
    )
    return
  }

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

      {patients.length === 0 ?
        <Text style={styles.noPatients}>No patients registered yet</Text> :
        <FlatList
          style={styles.list}
          data={patients}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <Patient
                item={item}
                setVisibleModal={setVisibleModal}
                setPatient={setPatient}
                patientToEdit={patientToEdit}
                patientToDelete={patientToDelete}
                setPatientModal={setPatientModal}
              />
            )
          }}
        />
      }

      <Form
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        patients={patients}
        setPatients={setPatients}
        patient={patient}
      />

      <Modal
        visible={patientModal}
        animationType="fade"
      >
        <PatientDetails
          patient={patient}
          setPatient={setPatient}
          initialPatient={initialPatient}
          setPatientModal={setPatientModal}
        />
      </Modal>
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
  },
  noPatients: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '900'
  },
  list: {
    marginTop: 50,
    marginHorizontal: 30
  }
})

export default App;
