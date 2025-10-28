import { useChatStore } from "../store/useChatStore";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser, setSelectedUser } = useChatStore();

  // On mobile, if a user is selected, the list view should be hidden, and vice-versa.

  return (
    // FIX 1: Use h-screen/h-[90vh] instead of fixed height. Center the container horizontally.
    <div className="relative w-full max-w-6xl h-screen md:h-[90vh] mx-auto p-1 sm:p-4">
      <BorderAnimatedContainer>
        {/* FIX 2: Apply the main layout logic here: flex-col on mobile, flex-row on desktop */}
        <div className="flex flex-col md:flex-row w-full h-full overflow-hidden rounded-xl shadow-2xl">
          
          {/* LEFT SIDE: List Container (Contacts/Chats) */}
          {/* FIX 3: Hide the list side completely on mobile when a user is selected.
             The 'w-full' ensures it takes up the full width when visible on mobile.
          */}
          <div className={`
              ${selectedUser ? 'hidden md:flex' : 'flex'} 
              w-full md:w-80 
              bg-slate-800/50 backdrop-blur-sm 
              flex-col overflow-hidden
          `}>
            {/* Added a back button for mobile view when a user is selected */}
            {selectedUser && (
              <button 
                className="md:hidden p-3 text-white bg-slate-700 hover:bg-slate-600 border-b border-slate-700"
                onClick={() => setSelectedUser(null)}
              >
                &larr; Back to Chats
              </button>
            )}

            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>

          {/* RIGHT SIDE: Chat Container */}
          {/* FIX 4: Hide the chat side when NO user is selected on mobile. 
             Use 'flex-1' to make it take up remaining space on desktop.
          */}
          <div className={`
              ${selectedUser ? 'flex-1 flex' : 'hidden md:flex-1 md:flex'}
              flex-col 
              bg-slate-900/50 backdrop-blur-sm
          `}>
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}
export default ChatPage;