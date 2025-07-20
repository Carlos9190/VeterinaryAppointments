import { Pressable, StyleSheet, Text, View } from "react-native";
import { patientType } from "../types";
import { formatDate } from "../utils";

interface PatientProps {
    item: patientType
    setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>
    setPatient: React.Dispatch<React.SetStateAction<patientType>>
    patientToEdit: (id: patientType["id"]) => void
    patientToDelete: (id: patientType["id"]) => void
    setPatientModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Patient({ item, setVisibleModal, setPatient, patientToEdit, patientToDelete, setPatientModal }: PatientProps) {
    const { patient, date, id } = item

    return (
        <Pressable
            onLongPress={() => {
                setPatientModal(true)
                setPatient(item)
            }}
        >
            <View style={styles.content}>
                <Text style={styles.label}>Patient:</Text>
                <Text style={styles.text}>{patient}</Text>
                <Text style={styles.date}>{formatDate(date)}</Text>

                <View style={styles.btnContainer}>
                    <Pressable
                        style={[styles.btn, styles.btnEdit]}
                        onLongPress={() => {
                            setVisibleModal(true)
                            patientToEdit(id)
                        }}
                    >
                        <Text style={styles.btnText}>Edit</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.btn, styles.btnDelete]}
                        onLongPress={() => patientToDelete(id)}
                    >
                        <Text style={styles.btnText}>Delete</Text>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        marginBottom: 5
    },
    label: {
        color: '#374151',
        textTransform: 'uppercase',
        fontWeight: '700',
        marginBottom: 10
    },
    text: {
        color: '#6D28D9',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10
    },
    date: {
        color: '#374151'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    btn: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    btnEdit: {
        backgroundColor: '#F59E0B'
    },
    btnDelete: {
        backgroundColor: '#EF4444'
    },
    btnText: {
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: 12,
        color: '#FFF'
    }
})