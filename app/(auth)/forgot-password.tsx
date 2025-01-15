import React, { useState } from 'react';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, Button, StyleSheet, GestureResponderEvent, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  // Send the password reset code to the user's email
  async function create(e: GestureResponderEvent) {
    if (!signIn) return;
    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });
      setSuccessfulCreation(true);
      setError('');
    } catch (err: any) {
      console.error('error', err.errors[0].longMessage);
      setError(err.errors[0].longMessage);
    }
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function reset(e: GestureResponderEvent) {
    if (!signIn) return;
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });

      if (!result) return;

      // Check if 2FA is required
      if (result.status === 'needs_second_factor') {
        setSecondFactor(true);
        setError('');
      } else if (result.status === 'complete') {
        // Set the active session to
        // the newly created session (user is now signed in)
        await setActive({ session: result.createdSessionId });
        setError('');
        router.replace('/');
      } else {
        console.log(result);
      }
    } catch (err: any) {
      console.error('error', err.errors[0].longMessage);
      setError(err.errors[0].longMessage);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Şifremi Unuttum</Text>
      </View>
    
      
      {!successfulCreation ? (
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={24} color="#393E52" style={styles.icon} />
            <TextInput
              style={styles.input}
            placeholder="Öğrenci mail adresi"
            placeholderTextColor="#393E52"
            value={email}
            onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          
          <TouchableOpacity style={styles.loginButton} onPress={create}>
            <Text style={styles.loginText}>Kod Gönder</Text>
          </TouchableOpacity>
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
      ) : (
        <View style={styles.form}>
          <Text style={styles.subtitle}>Yeni Şifrenizi Giriniz</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={24} color="#393E52" style={styles.icon} />
            <TextInput 
              style={styles.input}
              secureTextEntry
            value={password}
              onChangeText={setPassword}
            />
          </View>

          <Text style={styles.subtitle}>Kodu Giriniz</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={24} color="#393E52" style={styles.icon} />
            <TextInput 
              style={styles.input}
              value={code}
              onChangeText={setCode}
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={reset}>
            <Text style={styles.loginText}>Şifreyi Değiştir</Text>
          </TouchableOpacity>
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
      )}

      {secondFactor && (
        <Text style={styles.error}>2FA gereklidir, ancak bu arayüz bunu desteklemiyor</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '30%',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    backgroundColor: '#6747E9',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  title: {
    fontSize: 40, 
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: '10%',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    marginVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: '50%',
  },
  subtitle: {
    fontSize: 16, 
    color: '#393E52',
    marginBottom: 10,
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#393E52',
  },
  input: {
    flex: 1,
    height: 60,
    fontSize: 16, 
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
    opacity: 0.7,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  forgotPassword: {
    color: '#0B0406',
    fontSize: 14, 

  },
  loginButton: {
    backgroundColor: '#FFD42D',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: '20%',
  },
  loginText: {
    fontSize: 18, 
    color: '#0B0406',
    fontFamily: 'Poppins-Bold',
  },
  signup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10%',
  },
  signupText: {
    color: '#0B0406',
    fontSize: 14,
  },
  signupLink: {
    color: '#FFD42D',
    fontSize: 16, 
    fontWeight: 'bold',
    marginLeft: 5,
  },
  centeredContainer: {
    alignItems: 'center',
    width: '100%',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFD42D',
  },
});
