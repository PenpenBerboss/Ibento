// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import SmartImage from './SmartImage';
// import { Heart, MessageCircle } from 'lucide-react-native';
// import { Post } from '../data/communities';
// import { useCommunityStore } from '../hooks/useCommunityStore';
// // Importation absolue plutôt que relative pour éviter les problèmes de chemin
// import CommentInput from '../components/CommentInput';

// interface PostCardProps {
//   communityId: string;
//   post: Post;
//   showComments?: boolean;
// }

// const PostCard: React.FC<PostCardProps> = ({ communityId, post, showComments = false }) => {
//   const [expanded, setExpanded] = useState(showComments);
//   const { likePost } = useCommunityStore();
  
//   const formatTimestamp = (timestamp: string) => {
//     const date = new Date(timestamp);
//     return date.toLocaleDateString('fr-FR', { 
//       day: 'numeric', 
//       month: 'short', 
//       hour: '2-digit', 
//       minute: '2-digit' 
//     });
//   };
  
//   const handleLike = () => {
//     likePost(communityId, post.id);
//   };
  
//   return (
//     <View className="bg-[#1a1a1a] rounded-2xl mb-4 p-4">
//       <View className="flex-row mb-3">
//         <SmartImage
//           source={post.authorAvatar}
//           style={{ width: 40, height: 40, borderRadius: 20 }}
//         />
        
//         <View className="ml-3 flex-1">
//           <Text className="text-white font-bold">{post.author}</Text>
//           <Text className="text-gray-400 text-xs">
//             {formatTimestamp(post.timestamp)}
//           </Text>
//         </View>
//       </View>
      
//       <Text className="text-white mb-4">
//         {post.content}
//       </Text>
      
//       <View className="flex-row justify-between items-center border-t border-gray-800 pt-3">
//         <TouchableOpacity 
//           onPress={handleLike}
//           className="flex-row items-center" 
//         >
//           <Heart 
//             size={18} 
//             color={post.likes > 0 ? "#CC0000" : "#888"} 
//             fill={post.likes > 0 ? "#CC0000" : "transparent"} 
//           />
//           <Text className="text-gray-400 text-sm ml-1">
//             {post.likes}
//           </Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           onPress={() => setExpanded(!expanded)}
//           className="flex-row items-center" 
//         >
//           <MessageCircle size={18} color="#888" />
//           <Text className="text-gray-400 text-sm ml-1">
//             {post.comments.length}
//           </Text>
//         </TouchableOpacity>
//       </View>
      
//       {expanded && (
//         <View className="mt-4 border-t border-gray-800 pt-3">
//           {post.comments.map(comment => (
//             <View key={comment.id} className="mb-3 pb-3 border-b border-gray-800">
//               <View className="flex-row justify-between">
//                 <Text className="text-white font-medium">
//                   {comment.author}
//                 </Text>
//                 <Text className="text-gray-500 text-xs">
//                   {formatTimestamp(comment.timestamp)}
//                 </Text>
//               </View>
//               <Text className="text-gray-300 mt-1">
//                 {comment.content}
//               </Text>
//             </View>
//           ))}
          
//           <CommentInput 
//             communityId={communityId}
//             postId={post.id}
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// export default PostCard;

import React from 'react';
import { View, Text } from 'react-native';

export default function PostCard() {
  return (
    <View>
      <Text>PostCard - En développement</Text>
    </View>
  );
}
