// import { create } from 'zustand';
// import { Community, Post, Comment, communitiesMockData } from '../data/communities';

// interface CommunityStore {
//   // État
//   communities: Community[];
//   currentCommunity: Community | null;
  
//   // Actions
//   setCommunities: (communities: Community[]) => void;
//   setCurrentCommunity: (communityId: string | null) => void;
//   joinCommunity: (communityId: string) => void;
//   leaveCommunity: (communityId: string) => void;
//   addCommunity: (community: Omit<Community, 'id' | 'posts' | 'members' | 'joined'>) => string;
//   addPost: (communityId: string, content: string) => void;
//   addComment: (communityId: string, postId: string, content: string) => void;
//   likePost: (communityId: string, postId: string) => void;
// }

// export const useCommunityStore = create<CommunityStore>((set, get) => ({
//   // État initial
//   communities: communitiesMockData,
//   currentCommunity: null,

//   // Actions
//   setCommunities: (communities) => set({ communities }),
  
//   setCurrentCommunity: (communityId) => {
//     if (!communityId) {
//       set({ currentCommunity: null });
//       return;
//     }
    
//     const { communities } = get();
//     const community = communities.find(c => c.id === communityId) || null;
//     set({ currentCommunity: community });
//   },
  
//   joinCommunity: (communityId) => {
//     const { communities, currentCommunity } = get();
//     const updatedCommunities = communities.map(community => {
//       if (community.id === communityId) {
//         return {
//           ...community,
//           joined: true,
//           members: community.members + 1
//         };
//       }
//       return community;
//     });
    
//     let updatedCurrentCommunity = currentCommunity;
//     if (currentCommunity && currentCommunity.id === communityId) {
//       updatedCurrentCommunity = {
//         ...currentCommunity,
//         joined: true,
//         members: currentCommunity.members + 1
//       };
//     }
    
//     set({ 
//       communities: updatedCommunities,
//       currentCommunity: updatedCurrentCommunity
//     });
//   },
  
//   leaveCommunity: (communityId) => {
//     const { communities, currentCommunity } = get();
//     const updatedCommunities = communities.map(community => {
//       if (community.id === communityId && community.joined) {
//         return {
//           ...community,
//           joined: false,
//           members: community.members - 1
//         };
//       }
//       return community;
//     });
    
//     let updatedCurrentCommunity = currentCommunity;
//     if (currentCommunity && currentCommunity.id === communityId) {
//       updatedCurrentCommunity = {
//         ...currentCommunity,
//         joined: false,
//         members: Math.max(0, currentCommunity.members - 1)
//       };
//     }
    
//     set({ 
//       communities: updatedCommunities,
//       currentCommunity: updatedCurrentCommunity
//     });
//   },
  
//   addCommunity: (communityData) => {
//     const { communities } = get();
    
//     // Générer un nouvel ID unique
//     const newId = (parseInt(communities[communities.length - 1]?.id || '0') + 1).toString();
    
//     const newCommunity: Community = {
//       id: newId,
//       name: communityData.name,
//       description: communityData.description,
//       cover: communityData.cover,
//       category: communityData.category,
//       members: 1,  // L'utilisateur qui crée la communauté en devient automatiquement membre
//       joined: true,
//       posts: []
//     };
    
//     set({ communities: [...communities, newCommunity] });
//     return newId;
//   },
  
//   addPost: (communityId, content) => {
//     if (!content.trim()) return;
    
//     const { communities, currentCommunity } = get();
    
//     // Créer un nouveau post
//     const newPost: Post = {
//       id: Date.now().toString(),
//       author: 'CurrentUser', // Dans une app réelle, ce serait l'utilisateur connecté
//       authorAvatar: 'https://i.pravatar.cc/150?img=1', // Même chose ici
//       content,
//       timestamp: new Date().toISOString(),
//       likes: 0,
//       comments: []
//     };
    
//     const updatedCommunities = communities.map(community => {
//       if (community.id === communityId) {
//         return {
//           ...community,
//           posts: [newPost, ...community.posts]
//         };
//       }
//       return community;
//     });
    
//     let updatedCurrentCommunity = currentCommunity;
//     if (currentCommunity && currentCommunity.id === communityId) {
//       updatedCurrentCommunity = {
//         ...currentCommunity,
//         posts: [newPost, ...currentCommunity.posts]
//       };
//     }
    
//     set({ 
//       communities: updatedCommunities,
//       currentCommunity: updatedCurrentCommunity
//     });
//   },
  
//   addComment: (communityId, postId, content) => {
//     if (!content.trim()) return;
    
//     const { communities, currentCommunity } = get();
    
//     // Créer un nouveau commentaire
//     const newComment: Comment = {
//       id: Date.now().toString(),
//       author: 'CurrentUser', // Dans une app réelle, ce serait l'utilisateur connecté
//       content,
//       timestamp: new Date().toISOString()
//     };
    
//     const updatedCommunities = communities.map(community => {
//       if (community.id === communityId) {
//         return {
//           ...community,
//           posts: community.posts.map(post => {
//             if (post.id === postId) {
//               return {
//                 ...post,
//                 comments: [...post.comments, newComment]
//               };
//             }
//             return post;
//           })
//         };
//       }
//       return community;
//     });
    
//     let updatedCurrentCommunity = currentCommunity;
//     if (currentCommunity && currentCommunity.id === communityId) {
//       updatedCurrentCommunity = {
//         ...currentCommunity,
//         posts: currentCommunity.posts.map(post => {
//           if (post.id === postId) {
//             return {
//               ...post,
//               comments: [...post.comments, newComment]
//             };
//           }
//           return post;
//         })
//       };
//     }
    
//     set({ 
//       communities: updatedCommunities,
//       currentCommunity: updatedCurrentCommunity
//     });
//   },
  
//   likePost: (communityId, postId) => {
//     const { communities, currentCommunity } = get();
    
//     const updatedCommunities = communities.map(community => {
//       if (community.id === communityId) {
//         return {
//           ...community,
//           posts: community.posts.map(post => {
//             if (post.id === postId) {
//               return {
//                 ...post,
//                 likes: post.likes + 1
//               };
//             }
//             return post;
//           })
//         };
//       }
//       return community;
//     });
    
//     let updatedCurrentCommunity = currentCommunity;
//     if (currentCommunity && currentCommunity.id === communityId) {
//       updatedCurrentCommunity = {
//         ...currentCommunity,
//         posts: currentCommunity.posts.map(post => {
//           if (post.id === postId) {
//             return {
//               ...post,
//               likes: post.likes + 1
//             };
//           }
//           return post;
//         })
//       };
//     }
    
//     set({ 
//       communities: updatedCommunities,
//       currentCommunity: updatedCurrentCommunity
//     });
//   }
// }));

// Hook temporairement désactivé pour le MVP
export const useCommunityStore = () => ({
  communities: [],
  currentCommunity: null,
  setCommunities: () => {},
  setCurrentCommunity: () => {},
  joinCommunity: () => {},
  leaveCommunity: () => {},
  addCommunity: () => '',
  addPost: () => {},
  addComment: () => {},
  likePost: () => {}
});
