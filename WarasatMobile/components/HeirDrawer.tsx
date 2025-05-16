"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Pressable,
  FlatList,
} from "react-native"
import { X, ChevronDown } from "lucide-react-native"

interface HeirDrawerProps {
  visible: boolean
  onClose: () => void
  heirTypes: string[]
  selectedType: string
  onSelectType: (type: string) => void
  children: React.ReactNode
}

const HeirDrawer = ({ visible, onClose, heirTypes, selectedType, onSelectType, children }: HeirDrawerProps) => {
  const [typeDropdownVisible, setTypeDropdownVisible] = useState(false)
  const slideAnim = useRef(new Animated.Value(0)).current
  const { height } = Dimensions.get("window")

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [visible])

  if (!visible) return null

  return (
    <Modal transparent animationType="none" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.header}>
            <View style={styles.handle} />

            <TouchableOpacity style={styles.typeSelector} onPress={() => setTypeDropdownVisible(!typeDropdownVisible)}>
              <Text style={styles.typeSelectorText}>{selectedType || "Heir Type"}</Text>
              <ChevronDown size={20} color="#003049" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color="#003049" />
            </TouchableOpacity>
          </View>

          {typeDropdownVisible && (
            <View style={styles.dropdown}>
              <FlatList
                data={heirTypes}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      onSelectType(item)
                      setTypeDropdownVisible(false)
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          <ScrollView style={styles.content}>{children}</ScrollView>
        </Animated.View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawer: {
    backgroundColor: "#d8f3dc",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "60%",
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#003049",
    borderRadius: 3,
    alignSelf: "center",
    position: "absolute",
    top: 8,
    left: "50%",
    marginLeft: -20,
  },
  typeSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
    marginLeft: 10,
  },
  typeSelectorText: {
    fontSize: 16,
    color: "#003049",
    marginRight: 5,
  },
  closeButton: {
    marginTop: 10,
    marginRight: 10,
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 8,
    maxHeight: 200,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#003049",
  },
  content: {
    flex: 1,
    padding: 16,
  },
})

export default HeirDrawer
