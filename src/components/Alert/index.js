import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {Bootstrap} from '../../components';

export default function Alert({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  processing,
  colorConfirmBtn = '#09354B',
  colorCancelTxt = '#444444',
  processingTitle,
  processingMessage,
  confirmTxt = 'Confimar',
  error,
  errorTitle,
  errorMessage,
  success,
  successTitle,
  successMessage,
  onOk,
}) {
  const {Row, Col} = Bootstrap;
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
              <Row>
                <Col style={styles.colLeft} size="5">
                  <TouchableOpacity
                    style={{
                      ...styles.confirmBtn,
                      backgroundColor: colorConfirmBtn,
                    }}
                    onPress={onConfirm}>
                    <Text style={styles.confirmTxt}>{confirmTxt}</Text>
                  </TouchableOpacity>
                </Col>
                <Col style={styles.colRight} size="5">
                  <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                    <Text style={{...styles.cancelTxt, color: colorCancelTxt}}>
                      Agora não
                    </Text>
                  </TouchableOpacity>
                </Col>
              </Row>
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
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  actions: {marginTop: 20},
  confirmBtn: {
    padding: 10,
    borderRadius: 5,
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
  },
  confirmTxt: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelBtn: {
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  cancelTxt: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  titleAwait: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 10,
    textAlign: 'center',
  },
  titleSuccess: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#09354B',
    marginTop: 10,
    textAlign: 'center',
  },
  titleError: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff4d4d',
    marginTop: 10,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#09354B',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  btnTxt: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  colLeft: {
    paddingRight: 5,
  },
  colRight: {
    paddingLeft: 5,
  },
});
