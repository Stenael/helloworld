import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [imageError, setImageError] = useState(null);

  const handleSave = () => {
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Photo URL:', photoUrl);
  };

  const handleImageError = () => {
    setImageError('Invalid Image URL');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {photoUrl ? (
          <Image
            source={{ uri: photoUrl }}
            style={styles.profileImage}
            onError={handleImageError}
          />
        ) : (
          <View style={styles.defaultImageContainer}>
            <Text style={styles.defaultImageText}>No Image</Text>
          </View>
        )}
        {imageError && <Text style={styles.errorText}>{imageError}</Text>}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Photo URL"
        value={photoUrl}
        onChangeText={(text) => setPhotoUrl(text)}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  defaultImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultImageText: {
    color: 'white',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default Profile;