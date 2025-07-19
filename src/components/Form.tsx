import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import DatePicker from "react-native-date-picker";

interface FormProps {
    visibleModal: boolean
    setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Form({ visibleModal, setVisibleModal }: FormProps) {

    const [patient, setPatient] = useState('')
    const [owner, setOwner] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [date, setDate] = useState(new Date())
    const [symptoms, setSymptoms] = useState('')

    return (
        <Modal
            animationType='slide'
            visible={visibleModal}
        >
            <View style={styles.content}>
                <ScrollView>
                    <Text style={styles.title}>New {''}
                        <Text style={styles.boldtitle}>appointment</Text>
                    </Text>

                    <Pressable
                        style={styles.btnReturn}
                        onLongPress={() => setVisibleModal(!visibleModal)}
                    >
                        <Text style={styles.btnReturnText}>Back to appointments</Text>
                    </Pressable>

                    <View style={styles.field}>
                        <Text style={styles.label}>Patient name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Patient name"
                            placeholderTextColor={'#666'}
                            value={patient}
                            onChangeText={setPatient}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Owner name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Owner name"
                            placeholderTextColor={'#666'}
                            value={owner}
                            onChangeText={setOwner}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Owner email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Owner email"
                            placeholderTextColor={'#666'}
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
                            placeholderTextColor={'#666'}
                            keyboardType="number-pad"
                            value={phone}
                            onChangeText={setPhone}
                            maxLength={10}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Admission Date</Text>

                        <View style={styles.dateContainer}>
                            <DatePicker
                                date={date}
                                mode="date"
                                onDateChange={date => setDate(date)}
                            />
                        </View>
                    </View>

                    <View style={[styles.field, styles.symptomsInput]}>
                        <Text style={styles.label}>Symptoms</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Patient symptoms"
                            placeholderTextColor={'#666'}
                            value={symptoms}
                            onChangeText={setSymptoms}
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>

                    <Pressable
                        style={styles.btnNewAppointment}
                    >
                        <Text style={styles.btnNewAppointmentText}>Register patient</Text>
                    </Pressable>
                </ScrollView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#6D28D9',
        flex: 1
    },
    title: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 30,
        color: '#FFF'
    },
    boldtitle: {
        fontWeight: '900'
    },
    btnReturn: {
        marginVertical: 30,
        backgroundColor: '#5827A4',
        marginHorizontal: 30,
        padding: 15,
        borderRadius: 10
    },
    btnReturnText: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase'
    },
    field: {
        marginTop: 10,
        marginHorizontal: 30
    },
    label: {
        color: '#FFF',
        marginBottom: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600'
    },
    input: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10
    },
    symptomsInput: {
        height: 100,
        marginBottom: 10
    },
    dateContainer: {
        backgroundColor: '#FFF',
        borderRadius: 10
    },
    btnNewAppointment: {
        marginVertical: 50,
        backgroundColor: '#F59E0B',
        paddingVertical: 15,
        marginHorizontal: 30,
        borderRadius: 10
    },
    btnNewAppointmentText: {
        color: '#5827A4',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase'
    }
})