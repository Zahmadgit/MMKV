import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, Alert, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { 
    fetchGoalsRequest, 
    createGoalRequest, 
    updateGoalRequest,
    deleteGoalRequest,
    logout 
} from "../store/userSlice";

const GoalScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const goals = useSelector(state => state.user.goals);
    const loading = useSelector(state => state.user.loading);
    const error = useSelector(state => state.user.error);
    const [goalTitle, setGoalTitle] = useState("");
    const [editingGoal, setEditingGoal] = useState(null);

    useEffect(() => {
        dispatch(fetchGoalsRequest());
    }, []);

    useEffect(() => {
        if (error) {
            Alert.alert('Error', error);
        }
    }, [error]);
    useEffect(() => {
        console.log('Goals updated:', goals);
    }, [goals]);

    const handleAddGoal = () => {
        if (goalTitle.trim()) {
            if (editingGoal) {
                dispatch(updateGoalRequest({
                    goalId: editingGoal._id,
                    title: goalTitle
                }));
                // Fetch goals after update
                setTimeout(() => {
                    dispatch(fetchGoalsRequest());
                }, 500);
                setEditingGoal(null);
            } else {
                dispatch(createGoalRequest({ title: goalTitle }));
            }
            setGoalTitle("");
        }
    };

    const handleEdit = (goal) => {
        setEditingGoal(goal);
        setGoalTitle(goal.title);
    };

    const handleCancelEdit = () => {
        setEditingGoal(null);
        setGoalTitle("");
    };

    const handleDelete = (goalId) => {
        Alert.alert(
            "Delete Goal",
            "Are you sure you want to delete this goal?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => dispatch(deleteGoalRequest(goalId)),
                    style: "destructive"
                }
            ]
        );
    };

    const handleLogout = () => {
        dispatch(logout());
        navigation.navigate("LoginScreen");
    };

    const renderGoalItem = ({ item }) => (
        <View style={styles.goalItem}>
            <Text style={styles.goalText}>{item.title}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, styles.editButton]} 
                    onPress={() => handleEdit(item)}
                >
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, styles.deleteButton]} 
                    onPress={() => handleDelete(item._id)}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button title="Logout" onPress={handleLogout} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Enter goal title"
                    value={goalTitle}
                    onChangeText={setGoalTitle}
                    style={styles.input}
                />
                <View style={styles.actionButtons}>
                    <Button 
                        title={editingGoal ? "Update Goal" : "Add Goal"} 
                        onPress={handleAddGoal} 
                    />
                    {editingGoal && (
                        <Button 
                            title="Cancel" 
                            onPress={handleCancelEdit}
                            color="gray" 
                        />
                    )}
                </View>
            </View>

            <Text style={styles.title}>Your Goals:</Text>
            <FlatList
                data={goals}
                keyExtractor={(item) => item._id.toString()}
                renderItem={renderGoalItem}
                style={styles.list}
                extraData={goals} 
                refreshing={loading}
                onRefresh={() => dispatch(fetchGoalsRequest())}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 8,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    list: {
        flex: 1,
    },
    goalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    goalText: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        padding: 8,
        marginLeft: 10,
        borderRadius: 5,
    },
    editButton: {
        backgroundColor: '#4CAF50',
    },
    deleteButton: {
        backgroundColor: '#f44336',
    },
    buttonText: {
        color: 'white',
    },
});

export default GoalScreen;