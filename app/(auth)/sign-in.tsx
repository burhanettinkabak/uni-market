import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Giriş Yap</Text>
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
              onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
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
        </View>
        <TouchableOpacity onPress={() => router.push('/forgot-password')} style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>Şifremi Unuttum</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.loginButton} onPress={onSignInPress}>
        <Text style={styles.loginText}>Giriş Yap</Text>
      </TouchableOpacity>
      
      <View style={styles.signup}>
        <Text style={styles.signupText}>Hesabın yok mu?</Text>
        <TouchableOpacity onPress={() => router.push('/sign-up')}>
          <Text style={styles.signupLink}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center', // İçeriği yatayda ortalar
    justifyContent: 'center', // İçeriği dikeyde ortalar
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
    borderBottomWidth: 40,
    borderBottomColor: '#FFD42D',
  },
  title: {
    fontSize: 40, // Başlık için büyük ve mobil uyumlu
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
    fontSize: 16, // Alt başlıklar için uygun bir boyut
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
    fontSize: 16, // Giriş alanları için orta büyüklükte
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
    fontSize: 14, // Küçük boyutlu metin

  },
  loginButton: {
    backgroundColor: '#6747E9',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: '10%',
  },
  loginText: {
    fontSize: 18, // Düğme metni için belirgin boyut
    fontWeight: 'bold',
    color: 'white',
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
    fontSize: 16, // Link metni için biraz daha büyük
    fontWeight: 'bold',
    marginLeft: 5,
  },
  centeredContainer: {
    alignItems: 'center',
    width: '100%',
  },
  
});
