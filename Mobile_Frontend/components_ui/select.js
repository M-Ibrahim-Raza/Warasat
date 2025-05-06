// components_ui/select.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  FlatList, 
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export const Select = ({ 
  value, 
  onValueChange, 
  placeholder = 'Select an option', 
  items = [],
  style
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  const selectedItem = items.find(item => item.value === value);
  const displayText = selectedItem ? selectedItem.label : placeholder;
  
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  
  const handleSelect = (item) => {
    onValueChange(item.value);
    closeModal();
  };
  
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity 
        style={styles.trigger}
        onPress={openModal}
      >
        <Text 
          style={[
            styles.triggerText, 
            !selectedItem && styles.placeholder
          ]}
          numberOfLines={1}
        >
          {displayText}
        </Text>
        <Feather name="chevron-down" size={16} color="#666666" />
      </TouchableOpacity>
      
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <FlatList
                  data={items}
                  keyExtractor={(item) => item.value.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.item,
                        value === item.value && styles.selectedItem
                      ]}
                      onPress={() => handleSelect(item)}
                    >
                      <Text style={styles.itemText}>{item.label}</Text>
                      {value === item.value && (
                        <Feather name="check" size={16} color="#000000" />
                      )}
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
  },
  trigger: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(85, 85, 85, 0.5)',
    borderRadius: 6,
    backgroundColor: 'rgba(245, 245, 245, 0.4)',
  },
  triggerText: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
  },
  placeholder: {
    color: 'rgba(85, 85, 85, 0.7)',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '70%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedItem: {
    backgroundColor: '#F5F5F5',
  },
  itemText: {
    fontSize: 14,
    color: '#333333',
  },
});