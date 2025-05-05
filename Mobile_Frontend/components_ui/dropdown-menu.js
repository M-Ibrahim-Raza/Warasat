// components_ui/dropdown-menu.js
import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  TouchableWithoutFeedback,
  FlatList,
  Animated
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export const DropdownMenu = ({ 
  trigger, 
  items = [], 
  onSelect,
  style
}) => {
  const [visible, setVisible] = useState(false);
  const [layout, setLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const triggerRef = useRef(null);
  const animation = useRef(new Animated.Value(0)).current;
  
  const openMenu = () => {
    if (triggerRef.current) {
      triggerRef.current.measure((x, y, width, height, pageX, pageY) => {
        setLayout({
          x: pageX,
          y: pageY + height,
          width,
          height
        });
        setVisible(true);
        Animated.timing(animation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }
  };
  
  const closeMenu = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };
  
  const handleSelect = (item) => {
    if (onSelect) {
      onSelect(item);
    }
    closeMenu();
  };
  
  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });
  
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity 
        ref={triggerRef}
        onPress={openMenu}
      >
        {trigger}
      </TouchableOpacity>
      
      <Modal
        transparent
        visible={visible}
        animationType="none"
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.overlay}>
            <Animated.View 
              style={[
                styles.menu,
                {
                  top: layout.y,
                  left: layout.x,
                  minWidth: layout.width,
                  opacity,
                  transform: [{ scale }]
                }
              ]}
            >
              <FlatList
                data={items}
                keyExtractor={(item, index) => `dropdown-item-${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => handleSelect(item)}
                  >
                    {item.icon && (
                      <View style={styles.iconContainer}>
                        <Feather name={item.icon} size={16} color="#555555" />
                      </View>
                    )}
                    <Text style={styles.itemText}>{item.label}</Text>
                    {item.shortcut && (
                      <Text style={styles.shortcut}>{item.shortcut}</Text>
                    )}
                  </TouchableOpacity>
                )}
              />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export const DropdownMenuTrigger = ({ children, style }) => {
  return (
    <View style={style}>
      {children}
    </View>
  );
};

export const DropdownMenuItem = ({ 
  label, 
  icon, 
  shortcut, 
  onPress,
  style
}) => {
  return (
    <TouchableOpacity 
      style={[styles.item, style]}
      onPress={onPress}
    >
      {icon && (
        <View style={styles.iconContainer}>
          <Feather name={icon} size={16} color="#555555" />
        </View>
      )}
      <Text style={styles.itemText}>{label}</Text>
      {shortcut && (
        <Text style={styles.shortcut}>{shortcut}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  menu: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    maxHeight: 300,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconContainer: {
    marginRight: 8,
  },
  itemText: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
  },
  shortcut: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 8,
  },
});