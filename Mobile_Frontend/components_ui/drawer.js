// components_ui/drawer.js
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  ScrollView,
  Platform
} from 'react-native';
import { Select } from './select';
import { Feather } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export const Drawer = ({ children, isOpen, onClose, title, description }) => {
  const [animation] = useState(new Animated.Value(0));
  
  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  if (!isOpen) return null;

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  return (
    <Modal
      transparent
      visible={isOpen}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        
        <Animated.View 
          style={[
            styles.drawer,
            { transform: [{ translateY }] }
          ]}
        >
          {title && (
            <View style={styles.header}>
              <View style={styles.handle} />
              <Text style={styles.title}>{title}</Text>
              {description && <Text style={styles.description}>{description}</Text>}
            </View>
          )}
          
          <ScrollView style={styles.content}>
            {children}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export const DrawerContent = ({ 
  heir_types = [], 
  selectedValue = '', 
  setSelectedValue, 
  children, 
  style 
}) => {
  return (
    <View style={[styles.drawerContent, style]}>
      <View style={styles.drawerHeader}>
        <View style={styles.handle} />
        
        {heir_types.length > 0 && setSelectedValue && (
          <View style={styles.selectContainer}>
            <Select
              value={selectedValue}
              onValueChange={setSelectedValue}
              placeholder="Heir Type"
              items={heir_types.map(type => ({ label: type, value: type }))}
            />
          </View>
        )}
        
        <TouchableOpacity style={styles.closeButton} onPress={() => {}}>
          <Feather name="x-circle" size={24} color="#FF0000" />
        </TouchableOpacity>
      </View>
      
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: '50%',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  header: {
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#555555',
    borderRadius: 2,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  selectContainer: {
    position: 'absolute',
    left: 8,
    top: 8,
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
});