import { useEffect, useState } from "react";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { patientType } from "../types";

interface FormProps {
    visibleModal: boolean
    setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>
    patients: patientType[]
    setPatients: React.Dispatch<React.SetStateAction<patientType[]>>
    patient: patientType
}

export default function Form({ visibleModal, setVisibleModal, patients, setPatients, patient: patientObj }: FormProps) {
    const [id, setId] = useState('')
    const [patient, setPatient] = useState('')
    const [owner, setOwner] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [date, setDate] = useState(new Date())
    const [symptoms, setSymptoms] = useState('')

    useEffect(() => {
        if (Object.keys(patientObj).length > 0) {
            setId(patientObj.id)
            setPatient(patientObj.patient)
            setOwner(patientObj.owner)
            setEmail(patientObj.email)
            setPhone(patientObj.phone)
            setDate(new Date(patientObj.date))
            setSymptoms(patientObj.symptoms)
        } else {
            resetForm()
        }
    }, [patientObj])

    const resetForm = () => {
        setId('')
        setPatient('')
        setOwner('')
        setEmail('')
        setPhone('')
        setDate(new Date())
        setSymptoms('')
    }

    const handleAppointment = () => {
        if ([patient, owner, email, phone, symptoms].some(field => field.trim() === '')) {
            Alert.alert(
                "Error",
                "All fields are required"
            )
            return
        }

        const newPatient: patientType = {
            id: id || Date.now().toString(),
            patient,
            owner,
            email,
            phone,
            date,
            symptoms
        }

        if (id) {
            // Edit register
            const updatedPatient = patients.map(patientState =>
                patientState.id === id ? newPatient : patientState
            )
            setPatients(updatedPatient)
        } else {
            // New register
            setPatients([...patients, newPatient])
        }

        setVisibleModal(false)
        resetForm()
    }

    return (
        <Modal animationType="slide" visible={visibleModal}>
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>
                        {id ? "Edit" : "New"} {''}
                        <Text style={styles.boldtitle}>Appointment</Text>
                    </Text>

                    <Pressable
                        style={styles.btnReturn}
                        onLongPress={() => {
                            setVisibleModal(false)
                            resetForm()
                        }}
                    >
                        <Text style={styles.btnReturnText}>Back to appointments</Text>
                    </Pressable>

                    <View style={styles.field}>
                        <Text style={styles.label}>Patient name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Patient name"
                            placeholderTextColor="#666"
                            value={patient}
                            onChangeText={setPatient}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Owner name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Owner name"
                            placeholderTextColor="#666"
                            value={owner}
                            onChangeText={setOwner}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Owner email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Owner email"
                            placeholderTextColor="#666"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Owner phone</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Owner phone"
                            placeholderTextColor="#666"
                            keyboardType="number-pad"
                            value={phone}
                            onChangeText={setPhone}
                            maxLength={10}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Admission date</Text>
                        <View style={styles.dateContainer}>
                            <DatePicker
                                date={date}
                                mode="date"
                                onDateChange={setDate}
                            />
                        </View>
                    </View>

                    <View style={[styles.field, styles.symptomsInput]}>
                        <Text style={styles.label}>Symptoms</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Patient symptoms"
                            placeholderTextColor="#666"
                            value={symptoms}
                            onChangeText={setSymptoms}
                            multiline
                            numberOfLines={4}
                        />
                    </View>

                    <Pressable
                        style={styles.btnNewAppointment}
                        onPress={() => {
                            handleAppointment()
                            resetForm()
                        }}
                    >
                        <Text style={styles.btnNewAppointmentText}>
                            {id ? "Edit" : "Register"} patient
                        </Text>
                    </Pressable>
                </ScrollView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#6D28D9",
        flex: 1
    },
    title: {
        fontSize: 30,
        fontWeight: "600",
        textAlign: "center",
        marginTop: 30,
        color: "#FFF"
    },
    boldtitle: {
        fontWeight: "900"
    },
    btnReturn: {
        marginVertical: 30,
        backgroundColor: "#5827A4",
        marginHorizontal: 30,
        padding: 15,
        borderRadius: 10
    },
    btnReturnText: {
        color: "#FFF",
        textAlign: "center",
        fontWeight: "900",
        fontSize: 16,
        textTransform: "uppercase"
    },
    field: {
        marginTop: 10,
        marginHorizontal: 30
    },
    label: {
        color: "#FFF",
        marginBottom: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: "600"
    },
    input: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10
    },
    symptomsInput: {
        height: 100,
        marginBottom: 10
    },
    dateContainer: {
        backgroundColor: "#FFF",
        borderRadius: 10
    },
    btnNewAppointment: {
        marginVertical: 50,
        backgroundColor: "#F59E0B",
        paddingVertical: 15,
        marginHorizontal: 30,
        borderRadius: 10
    },
    btnNewAppointmentText: {
        color: "#5827A4",
        textAlign: "center",
        fontWeight: "900",
        fontSize: 16,
        textTransform: "uppercase"
    }
})