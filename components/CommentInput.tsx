// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { Send } from 'lucide-react-native';
// import { useCommunityStore } from '../hooks/useCommunityStore';

// interface CommentInputProps {
//   communityId: string;
//   postId: string;
// }

// const CommentInput: React.FC<CommentInputProps> = ({ communityId, postId }) => {
//   const [comment, setComment] = useState('');
//   const { addComment } = useCommunityStore();
  
//   const handleSend = () => {
//     if (comment.trim()) {
//       addComment(communityId, postId, comment);
//       setComment('');
//     }
//   };
  
//   return (
//     <View className="flex-row items-center mt-2 bg-[#252525] rounded-xl px-3 py-1">
//       <TextInput 
//         value={comment}
//         onChangeText={setComment}
//         placeholder="Ajouter un commentaire..."
//         placeholderTextColor="#888"
//         className="flex-1 text-white py-2 px-1"
//         multiline={false}
//       />
      
//       <TouchableOpacity 
//         onPress={handleSend}
//         className={`p-2 ${!comment.trim() ? 'opacity-50' : ''}`}
//         disabled={!comment.trim()}
//       >
//   <Send size={18} color="#CC0000" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default CommentInput;

import React from 'react';
import { View, Text } from 'react-native';

export default function CommentInput() {
  return (
    <View>
      <Text>CommentInput - En développement</Text>
    </View>
  );
}
