import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import Screen from '../../../components/Screen';
import ArrowBack from '../../../components/ArrowBack';
import Inline from '../../../components/Inline';
import Center from '../../../components/Center';
import Loader from '../../../components/Loader';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import api from '../../../services/api';
import {useScreen} from '../../../contexts/screen';
import {getExtFile} from '../../../utils';
import user from '../../../assets/user.png';

const EditIcon = () => <MaterialIcons name="edit" size={24} color="#ffffff" />;

const {height, width} = Dimensions.get('screen');

export default function Photo({navigation, route}) {
  const {customer} = route.params;
  const {handleRefresh} = useScreen();
  const [processing, setProcessing] = useState(false);
  const [image, setImage] = useState(customer.thumbnail ? customer.thumbnail.url : user);

  function pickImage() {
    ImagePicker.showImagePicker(
      {
        title: "Selecione uma imagem",
        cancelButtonTitle: "cancelar",
        chooseFromLibraryButtonTitle: "Escolher da galeria",
        takePhotoButtonTitle: "Tirar uma foto",
        storageOptions: {
          skipBackup: true,
          path: "images",
        },
      },
      handleSubmit,
    );
  }

  function handleSubmit(result) {
    if (result.didCancel) {
      // Cancelado pelo usuário
    } else if (result.error) {
      // Erro ao selecionar imagem
    } else {
      // Sucesso
      uploadImageAsync({
        uri: result.uri,
        name: `thumbnail.${getExtFile(result.uri)}`,
        type: result.type,
      });
    }
  }

  async function uploadImageAsync(buffer) {
    setProcessing(true);
    const data = new FormData();
    data.append('thumbnail', buffer);

    try {
      await api.put(`/customers/${customer.id}/thumbnail`, data);
      setImage(buffer.uri);
      setProcessing(false);
      handleRefresh('Menu');
    } catch (error) {
      console.error(error.response.data);
      UploadError();
      setProcessing(false);
    }
  }

  const UploadError = () => {
    Alert.alert(
      'Erro no upload',
      'Não foi possível carregar a imagem selecionada!',
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <Screen backgroundColor="#000000">
      <Inline
        justify="space-between"
        components={[
          {
            id: 1,
            component: (
              <ArrowBack
                color="#ffffff"
                onPress={() => {
                  navigation.goBack();
                }}
              />
            ),
          },
          {
            id: 2,
            component: <Text style={styles.title}>Foto de perfil</Text>,
          },
          {
            id: 3,
            component: (
              <TouchableOpacity onPress={pickImage}>
                <EditIcon />
              </TouchableOpacity>
            ),
          },
        ]}
      />
      <Center>
        <View style={styles.thumbnail}>
          {processing ? (
            <Loader indicatorColor="#FFFFFF" />
          ) : (
            <Image source={image} style={styles.img} />
          )}
        </View>
      </Center>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#ffffff',
    fontSize: 20,
  },
  thumbnail: {
    marginBottom: height * 0.1,
  },
  img: {
    height: height * 0.4,
    width: width,
    resizeMode: 'cover',
  },
});
