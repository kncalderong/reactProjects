import { useEffect } from "react";
import Comment from './components/Comment'

function App() {
  
  const ininitalFetch = async () => {
    const res = await fetch('/api/v1/comments')
    const json = await res.json()
    console.log(json)  
  }
  
  useEffect(() => {
    ininitalFetch()
  }, [])
  
  return (
    <div className="flex justify-start bg-very-light-gray flex-col items-center gap-4 py-8">
      <Comment isFromUser={false} isReply={false} />
      <Comment isFromUser={true} isReply={false} />
      <Comment isFromUser={false} isReply={true} />
      <Comment isFromUser={true} isReply={true} />
    </div>
  );
}

export default App;
