// import React, { useState, useEffect } from 'react';
//
// function useFetching(friendID) {
//   const [isOnline, setIsOnline] = useState(null);
//
//   useEffect(() => {
//     function handleStatusChange(status) {
//       setIsOnline(status.isOnline);
//     }
//
//     ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
//     return () => {
//       ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
//     };
//   });
//
//   return isOnline;
// }
