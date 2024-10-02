import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar as RNStatusBar,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Tạo Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignInScreen">
        <Stack.Screen 
          name="SignInScreen" 
          component={SignInScreen} 
          options={{ headerShown: false }} // Ẩn header để màn hình gọn hơn
        />
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ title: 'Trang chủ' }} // Tiêu đề cho màn hình Home
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Màn hình đăng nhập
function SignInScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const validatePhoneNumber = (number) => {
    const regex = /^[0-9]{10}$/; // Kiểm tra định dạng số điện thoại 10 chữ số
    return regex.test(number);
  };

  const handleChangeText = (text) => {
    const formattedText = text.replace(/[^0-9]/g, "");
    setPhoneNumber(formattedText);

    if (!validatePhoneNumber(formattedText)) {
      setError("Số điện thoại không đúng định dạng. Vui lòng nhập lại.");
    } else {
      setError("");
    }
  };

  const handleContinue = () => {
    if (validatePhoneNumber(phoneNumber)) {
      navigation.navigate('HomeScreen'); // Điều hướng tới HomeScreen khi số hợp lệ
    } else {
      alert("Số điện thoại không đúng định dạng. Vui lòng nhập lại.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <View style={styles.shadowBox}>
          <Text style={styles.title}>Đăng nhập</Text>
        </View>
        <Text style={styles.subtitle}>Nhập số điện thoại</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="numeric"
          maxLength={10}
          value={phoneNumber}
          onChangeText={handleChangeText}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity
          style={[styles.button, !phoneNumber && styles.buttonDisabled]} 
          onPress={handleContinue}
          disabled={!phoneNumber} // Disable button when input is empty
        >
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

// Màn hình Home
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.homeTitle}>Chào mừng đến HomeScreen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Align content in the center vertically
    backgroundColor: "#f7f7f7", // Light background for contrast
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 40,
  },
  content: {
    alignItems: "center", // Center content horizontally
  },
  shadowBox: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 20,
    borderRadius: 10, // Rounded corners
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, // Shadow on Android
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333", // Darker color for title text
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "#555", // Softer color for subtitles
    textAlign: "center",
    fontWeight: "500",
  },
  input: {
    width: "100%", // Full width input
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#fff", // White background for input
  },
  button: {
    width: "100%", // Full width button
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "#0a84ff", // Blue color for button
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Button shadow
  },
  buttonDisabled: {
    backgroundColor: "#c2d4f0", // Lightened button when disabled
  },
  buttonText: {
    fontSize: 16,
    color: "#fff", // White text for button
    fontWeight: "600",
  },
  errorText: {
    fontSize: 14,
    color: "red", // Red error text
    marginBottom: 20,
  },
  homeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});

