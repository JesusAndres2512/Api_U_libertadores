function generateTimestampBasedId(): number {
    const timestamp = Math.floor(Date.now() / 1000); 
    const random = Math.floor(Math.random() * 10); 
    return parseInt(`${timestamp}${random}`, 10);
  }
  
  export { generateTimestampBasedId };
  