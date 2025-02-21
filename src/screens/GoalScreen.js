import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoalsRequest, createGoalRequest, logout } from "../store/userSlice";


const GoalScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const goals = useSelector(state => state.user.goals);
    const [goalTitle, setGoalTitle] = useState("");

    useEffect(() => {
        if (goals) {
            dispatch(fetchGoalsRequest());
        }
    }, [goals]);

    const handleAddGoal = () => {
        if (goalTitle.trim()) {
            dispatch(createGoalRequest({ title: goalTitle }));
            setGoalTitle("");
            console.log('GoalScreen inside handleAddGoal');
        }
    };
    const handleLogout = () => {
        dispatch(logout());
        navigation.navigate("LoginScreen");
    }

    return (
        <View style={{ padding: 20 }}>
             <View style={{ padding: 20 }}>
                <Button title="Logout" onPress={handleLogout} />
            </View>
            <TextInput
                placeholder="Enter goal title"
                value={goalTitle}
                onChangeText={setGoalTitle}
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <Button title="Add Goal" onPress={handleAddGoal} />

            <Text style={{ marginTop: 20, fontSize: 18, fontWeight: "bold" }}>Your Goals:</Text>
            <FlatList
                data={goals}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <Text>{item.title}</Text>}
            />

        </View>
    );
};

export default GoalScreen;
