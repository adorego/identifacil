export function testWebSocketConnection(url:string):Promise<boolean>{
  const socket = new WebSocket(url);
  return new Promise((resolve, reject) =>{
    socket.onopen = () =>{
        socket.close();
        resolve(true);
    };

    socket.onerror = () =>{
      reject(false);
    };
    
  });
} 