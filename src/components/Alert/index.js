import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {Inline} from '../../components';

export default function Alert({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  processing,
  processingTitle,
  processingMessage,
  error,
  errorTitle,
  errorMessage,
  success,
  successTitle,
  successMessage,
  onOk,
}) {
  const OK = () => (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.btn} onPress={onOk}>
        <Text style={styles.btnTxt}>OK</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal isVisible={open}>
      <View style={styles.modal}>
        {!processing && !success && !error && (
          <>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            <View style={styles.actions}>
              <Inline
                components={[
                  {
                    id: 1,
                    component: (
                      <TouchableOpacity
                        style={styles.confirmBtn}
                        onPress={onConfirm}>
                        <Text style={styles.confirmTxt}>SIM</Text>
                      </TouchableOpacity>
                    ),
                  },
                  {
                    id: 2,
                    component: (
                      <TouchableOpacity
                        style={styles.cancelBtn}
                        onPress={onCancel}>
                        <Text style={styles.cancelTxt}>NÃO</Text>
                      </TouchableOpacity>
                    ),
                  },
                ]}
              />
            </View>
          </>
        )}

        {processing ? (
          <View>
            <ActivityIndicator />
            <Text style={styles.titleAwait}>{processingTitle}</Text>
            <Text style={styles.message}>{processingMessage}</Text>
          </View>
        ) : (
          <View>
            {success && (
              <>
                <Text style={styles.titleSuccess}>{successTitle}</Text>
                <Text style={styles.message}>{successMessage}</Text>
                <OK />
              </>
            )}
            {error && (
              <>
                <Text style={styles.titleError}>{errorTitle}</Text>
                <Text style={styles.message}>{errorMessage}</Text>
                <OK />
              </>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#ffffff',
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444444',
  },
  message: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  actions: {marginTop: 20},
  confirmBtn: {
    backgroundColor: '#09354B',
    padding: 10,
    borderRadius: 10,
    width: 60,
  },
  confirmTxt: {
    color: '#ffffff',
    textAlign: 'center',
  },
  cancelBtn: {
    backgroundColor: '#999999',
    padding: 10,
    borderRadius: 10,
    width: 60,
  },
  cancelTxt: {
    color: '#ffffff',
    textAlign: 'center',
  },
  titleAwait: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 10,
  },
  titleSuccess: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#09354B',
    marginTop: 10,
  },
  titleError: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff4d4d',
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#09354B',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    marginTop: 10,
  },
  btnTxt: {
    color: '#ffffff',
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
