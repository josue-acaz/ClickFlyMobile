import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Screen from '../../../components/Screen';
import ArrowBack from '../../../components/ArrowBack';
import SubsectionTitle from '../../../components/SubsectionTitle';
import FloatingButton from '../../../components/FloatingButton';
import Friend from '../../../components/Friend';
import Loader from '../../../components/Loader';
import Inline from '../../../components/Inline';
import Alert from '../../../components/Alert';

import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import api from '../../../services/api';

const PlusIcon = () => <Entypo name="plus" size={24} color="#ffffff" />;
const TrashIcon = () => <Feather name="trash-2" size={24} color="#ff8080" />;

export default function Friends({navigation, route}) {
  const [loading, setLoading] = useState(route.params.loading || true);
  const [friends, setFriends] = useState([]);
  const {customer, returnRoute} = route.params;

  const [alert, setAlert] = useState({
    open: false,
    processing: false,
    error: false,
    success: false,
  });

  function handleAlert(e) {
    const {name, value} = e;
    setAlert((alert) => ({...alert, [name]: value}));
  }

  // seleção
  const [activeSelection, setActiveSelection] = useState(false);
  const [checked, setChecked] = useState({});
  function handleChecked(friend_id) {
    setChecked({
      ...checked,
      [`checked_${friend_id}`]: !checked[`checked_${friend_id}`],
    });
  }

  function checkActiveSelections() {
    const activeSelections = Object.keys(checked).filter((el) => checked[el]);
    if (activeSelections.length > 0) {
      setActiveSelection(true);
    } else {
      setActiveSelection(false);
    }
  }

  function createCheckedStates(arr = []) {
    arr.forEach((el) => {
      setChecked({...checked, [`checked_${el.id}`]: false});
    });
  }

  function handleConfirmDelete() {
    handleAlert({name: "open", value: true});
  }

  function getSelecteds() {
    return Object.keys(checked).filter((el) => checked[el]);
  }

  async function handleDeleteSelections() {
    handleAlert({name: "processing", value: true});

    const selections = getSelecteds();

    try {
      await Promise.all(
        selections.map((selection) => {
          const friend_id = selection.split('_')[1];
          return api.delete(`/customers/friends/${friend_id}/delete`);
        }),
      );
      handleAlert({name: "processing", value: false});
      handleAlert({name: "success", value: true});
    } catch (err) {
      // handle error
      handleAlert({name: "processing", value: false});
      handleAlert({name: "error", value: true});
    }
  }

  useEffect(() => {
    async function index() {
      try {
        const response = await api.get(`/customer-friends`, {
          params: {
            text: "",
            limit: 10,
            offset: 0,
            order: "DESC",
            order_by: "created_at"
          }
        });

        const {count, rows} = response.data;
        createCheckedStates(rows);
        setFriends(rows);
        setLoading(false);
      } catch (error) {
        // handle error
        setLoading(false);
      }
    }

    index();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  // Monitora a seleção dos elementos
  useEffect(() => {
    if (friends.length > 0) {
      checkActiveSelections();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  function handleFinish() {
    handleAlert({name: "open", value: false});
    navigation.navigate(returnRoute, {loading: true});
  }

  function handleAddFriend() {
    navigation.navigate('AddFriend', {customer, returnRoute: 'Friends'});
  }

  return (
    <Screen>
      <Alert
        open={alert.open}
        title="Você deseja mesmo excluir os passageiros selecionados?"
        message="Todos os dados salvos serão apagados do aplicativo."
        onConfirm={handleDeleteSelections}
        colorConfirmBtn="#ff1a40"
        colorCancelTxt="#ff1a40"
        onCancel={() => {
          handleAlert({name: "open", value: false});
        }}
        processing={alert.processing}
        processingTitle="Excluindo selecionados..."
        processingMessage="Por favor, aguarde!"
        error={alert.error}
        errorTitle="Erro"
        errorMessage="Desculpe, não foi possível finalizar a operação!"
        success={alert.success}
        successTitle="Sucesso"
        successMessage="Os passageiros selecionados foram excluidos!"
        onOk={handleFinish}
      />
      {loading ? (
        <Loader title="Obtendo passageiros..." subtitle="Por favor, aguarde!" />
      ) : (
        <>
          <ArrowBack
            onPress={() => {
              navigation.goBack();
            }}
          />

          <SubsectionTitle text="Passageiros recorrentes" />
          {!activeSelection && (
            <FloatingButton
              onPress={handleAddFriend}
              color="#09354B"
              icon={<PlusIcon />}
            />
          )}

          <View style={styles.friends}>
            <View style={styles.toolbar}>
              {activeSelection ? (
                <Inline
                  justify="space-between"
                  components={[
                    {
                      id: 1,
                      component: (
                        <Text style={styles.selectedTxt}>
                          {getSelecteds().length} selecionados
                        </Text>
                      ),
                    },
                    {
                      id: 2,
                      component: (
                        <TouchableOpacity onPress={handleConfirmDelete}>
                          <TrashIcon />
                        </TouchableOpacity>
                      ),
                    },
                  ]}
                />
              ) : (
                <Text style={styles.aditionalTxt}>
                  Gerencie informações para pessoas que você provavelmente irá
                  comprar uma passagem!
                </Text>
              )}
            </View>
            {friends.map((friend, index) => (
              <Friend
                key={index}
                friend={friend}
                checked={checked[`checked_${friend.id}`]}
                handleChecked={handleChecked}
                activeSelection={activeSelection}
              />
            ))}
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  friends: {
    marginTop: 15,
  },
  toolbar: {
    marginBottom: 15,
    height: 50,
  },
  selectedTxt: {
    color: '#666666',
    fontSize: 16,
  },
  aditionalTxt: {
    fontSize: 14,
    color: '#666',
  },
});
