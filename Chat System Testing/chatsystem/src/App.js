import UserChatbox from "./User";
import AdminReply from "./Admin";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Simple Messaging Test</h1>
      <UserChatbox />
      <hr />
      <AdminReply />
    </div>
  );
}

export default App;