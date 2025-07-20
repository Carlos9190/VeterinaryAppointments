import { Pressable, StyleSheet, Text, View } from "react-native";
import { patientType } from "../types";
import { formatDate } from "../utils";

interface PatientDetailsProps {
    patient: patientType
    setPatient: React.Dispatch<React.SetStateAction<patientType>>
    initialPatient: patientType
    setPatientModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PatientDetails({ patient, setPatient, initialPatient, setPatientModal }: PatientDetailsProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Patient {''}
                <Text style={styles.boldtitle}>details</Text>
            </Text>

            <View>
                <Pressable
                    style={styles.btnReturn}
                    onLongPress={() => {
                        setPatientModal(false)
                        setPatient(initialPatient)
                    }}
                >
                    <Text style={styles.btnReturnText}>Back to appointments</Text>
                </Pressable>
            </View>

            <View style={styles.content}>
                <View style={styles.field}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{patient.patient}</Text>
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Owner:</Text>
                    <Text style={styles.value}>{patient.owner}</Text>
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{patient.email}</Text>
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Phone:</Text>
                    <Text style={styles.value}>{patient.phone}</Text>
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Admission date:</Text>
                    <Text style={styles.value}>{formatDate(patient.date)}</Text>
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Symptoms:</Text>
                    <Text style={styles.value}>{patient.symptoms}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F59E0B',
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
        backgroundColor: "#E06900",
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
    content: {
        backgroundColor: '#FFF',
        marginHorizontal: 30,
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    field: {
        marginBottom: 10
    },
    label: {
        textTransform: "uppercase",
        color: "#374151",
        fontWeight: "600",
        fontSize: 12
    },
    value: {
        fontWeight: "700",
        fontSize: 20,
        color: "#334155"
    }
})