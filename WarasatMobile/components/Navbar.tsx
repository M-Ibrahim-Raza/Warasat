import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { router } from "expo-router"
import { logout } from "../store/authSlice"
import type { RootState } from "../store/store"

const Navbar = () => {
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    router.replace("/login" as any)
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.push("/about" as any)}>
        <Text style={styles.headerText}>About</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/contact" as any)}>
        <Text style={styles.headerText}>Contact Us</Text>
      </TouchableOpacity>

      {isAuthenticated && (
        <View style={styles.userContainer}>
          {user?.userType === "ulema" && (
            <TouchableOpacity onPress={() => router.push("/ulema-chats" as any)}>
              <Text style={styles.headerText}>My Chats</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.headerText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.globeIcon}>
        <Image source={require("../assets/globe.png")} style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "#003049", // Dark blue
    padding: 16,
    paddingTop: 20,
  },
  headerText: {
    color: "white",
    fontSize: 16,
    marginRight: 20,
  },
  userContainer: {
    flexDirection: "row",
    position: "absolute",
    right: 50,
    top: 20,
  },
  globeIcon: {
    position: "absolute",
    right: 16,
    top: 20,
  },
})

export default Navbar
