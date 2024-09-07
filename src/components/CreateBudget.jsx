//React Import
import React from 'react';
import { useState } from 'react'

//Headless UI Component Import
import { CloseButton, Description, Dialog, DialogPanel, DialogTitle, Input } from '@headlessui/react'

//Emoji Picker Library Import
import EmojiPicker from 'emoji-picker-react';

//React Pop-Up i.e. Taostify Import
import { toast, ToastContainer } from 'react-toastify';

//Database Imports
import { db } from '../utils/dbConfig';
import { Budgets } from '../utils/schema';

//Autohrization Import i.e. Clerk
import { useUser } from '@clerk/clerk-react';

function CreateBudget() {
  let [isOpen, setIsOpen] = useState(false);

  //State for Toggling Emoji Icons
  const [emojiIcon, setEmojiIcon] = useState('😊');
  const [emojiPicker, setEmojiPicker] = useState(false);

  //For Storing the Value on Budget Name and Budget Amount
  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  //Inserting the values in SQL Database
  const {user} = useUser();
  const onCreateBudget = async() => {
    const result = await db.insert(Budgets).values({
      name: name,
      amount: amount,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      icon: emojiIcon
    }).returning({insertedId: Budgets.id});
    if(result)
    {
      toast.success('Budget Created Successfully');
    }
  }
  return (
    <div>
        <button onClick={() => setIsOpen(true)}>
          <div className='bg-slate-100 p-10 rounded-md flex flex-col items-center border-2 border-dashed cursor-pointer hover:shadow-md'>
              <h2 className='text-3xl'>+</h2>
              <h2>Create New Budget</h2>
          </div>
        </button>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-5">
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-80">
            <DialogPanel className="max-w-lg w-full space-y-4 border bg-white p-5 rounded-md">
              <DialogTitle className="font-bold text-lg">Create New Budget</DialogTitle>
              <Description>
                <button className='h-11 rounded-md px-4 border-2 hover:bg-opacity-10 text-lg hover:bg-black' onClick={()=>{setEmojiPicker(!emojiPicker)}}>{emojiIcon}</button>
                <div className='absolute'>
                  <EmojiPicker open={emojiPicker} onEmojiClick={(e)=>{
                    setEmojiIcon(e.emoji);
                    setEmojiPicker(false);
                    }} />
                </div>
                <div className='mt-2'>
                  <h2 className='text-sm font-medium my-1'>Budget Name</h2>
                  <Input name="full_name" type="text" placeholder='E.g. Grocery' className="border-2 w-full p-2 text-sm rounded-lg px-4" onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className='mt-2'>
                  <h2 className='text-sm font-medium my-1'>Budget Amount</h2>
                  <Input name="amount" type="number" placeholder='E.g. ₹5000' className="border-2 w-full p-2 text-sm rounded-lg px-4" onChange={(e)=>setAmount(e.target.value)} />
                </div>
                
              </Description>
              <CloseButton>
              <button disabled={!(name && amount)}  className='mt-5 inline-block rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-sm font-medium text-white focus:outline-none focus:ring active:text-indigo-500 w-full' onClick={()=>onCreateBudget()} >Create Budget</button>
              </CloseButton>
              {/* <div className="flex gap-4">
                <button onClick={() => setIsOpen(false)}>Cancel</button>
                <button onClick={() => setIsOpen(false)}>Deactivate</button>
              </div> */}
            </DialogPanel>
          </div>
        </Dialog>
        <ToastContainer />
    </div>
  )
}

export default CreateBudget;