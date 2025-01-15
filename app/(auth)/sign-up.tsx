import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');

  // Check if email is a student email
  const isStudentEmail = (email: string) => {
    return email.toLowerCase().endsWith('.edu.tr');
  };

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (!isStudentEmail(emailAddress)) {
      Alert.alert(
        "Hata",
        "Lütfen geçerli bir öğrenci mail adresi giriniz (.edu.tr uzantılı)",
        [{ text: "Tamam" }]
      );
      return;
    }

    if (password !== passwordConfirmation) {
      Alert.alert(
        "Hata",
        "Şifreler eşleşmiyor",
        [{ text: "Tamam" }]
      );
      return;
    }

    console.log(emailAddress, password);

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.title}>E-postanızı doğrulayın</Text>
        </View>
        <View style={styles.form}>
        <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={24} color="#393E52" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Doğrulama kodunuzu girin"
          onChangeText={(code) => setCode(code)}
        />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={onVerifyPress}>
          <Text style={styles.loginText}>Doğrula</Text>
        </TouchableOpacity>
        </View>
        </View>
    );
  }

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Kayıt Ol</Text>
    </View>
    
    <View style={styles.form}>
      <View style={styles.centeredContainer}>
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="#393E52" style={styles.icon} />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Öğrenci mail adresi"
            placeholderTextColor="#393E52"
            keyboardType="email-address"
            onChangeText={(email) => setEmailAddress(email)}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={24} color="#393E52" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Şifre"
            placeholderTextColor="#393E52"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={24} color="#393E52" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={passwordConfirmation}
            placeholder="Şifre Tekrar"
            placeholderTextColor="#393E52"
            secureTextEntry={true}
            onChangeText={(passwordConfirmation) => setPasswordConfirmation(passwordConfirmation)}
          />
        </View>
      </View>
    </View>
    
    <TouchableOpacity style={styles.loginButton} onPress={onSignUpPress}>
      <Text style={styles.loginText}>Devam Et</Text>
    </TouchableOpacity>
    
    <View style={styles.signup}>
      <Text style={styles.signupText}>Hesabın var mı?</Text>
      <TouchableOpacity onPress={() => router.push('/sign-in')}>
        <Text style={styles.signupLink}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
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
  color: '#393E52',
  fontSize: 14, 

},
loginButton: {
  backgroundColor: '#FFD42D',
  paddingVertical: 15,
  borderRadius: 30,
  alignItems: 'center',
  justifyContent: 'center',
  width: '90%',
  marginTop: '10%',
},
loginText: {
  fontSize: 18, 
  color: '#393E52',
  fontWeight: 'bold',
  fontFamily: 'Poppins-Bold',
},
signup: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: '10%',
},
signupText: {
  color: '#393E52',
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

});
