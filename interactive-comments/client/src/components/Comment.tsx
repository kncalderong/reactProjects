import IconReply from '../assets/icon-reply.svg'
import IconPlus from '../assets/icon-plus.svg'
import IconMinus from '../assets/icon-minus.svg'
import { useState, useEffect } from 'react';

type CommentProps = {
  isFromUser: boolean
  isReply: boolean
}

const Comment = (props: CommentProps) => {
  
  const {
    isFromUser,
    isReply
  } = props

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });
  
  console.log("windowSize: ", windowWidth)
  console.log(isFromUser);
  console.log(isReply);
  
  
  return (
    <div className='w-[90%] p-4 bg-white rounded-lg'>

      <div>
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-[2rem]'>
            <img src="https://user-images.githubusercontent.com/80135017/218482952-66003814-ad3e-4482-b76e-694cf41368a5.png" alt="userImage" className='w-full block ' />
          </div>
          <p className='font-bold text-dark-blue '>
            amyrobson
          </p>
          <p className='flex rounded-sm bg-moderate-blue text-white  px-1 py-1 text-xs justify-center items-center h-[1.2rem] tracking-[0.03rem] ' >
            you
          </p>
          <p className='text-grayish-blue '>
            1 month ago
          </p>
        </div>
        <div className='text-grayish-blue mb-4' >Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.</div>
      </div>
      <div className='flex justify-between' >
        <div className="flex p-2 bg-very-light-gray justify-between w-[100px] rounded-xl">          <div className='flex w-4 justify-center items-center'>
            <img src={IconPlus} alt="plusIcon" />
          </div>
          <div className='flex w-4 justify-center items-center text-grayish-blue font-bold '>12</div>
          <div className='flex w-4 justify-center items-center'>
            <img src={IconMinus} alt="minusIcon" />
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <img src={IconReply} alt="replyIcon" /> <span className='text-moderate-blue font-semibold' >Reply</span>
        </div>
      </div>
      
    </div>
  )
}

export default Comment
