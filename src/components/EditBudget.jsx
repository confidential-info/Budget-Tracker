//React Import
import React, { useEffect, useState } from 'react';

//Edit Icon Import i.e. HeroIcon
import { PencilSquareIcon } from '@heroicons/react/24/outline';

//Headless UI Component Import
import { CloseButton, Description, Dialog, DialogPanel, DialogTitle, Input } from '@headlessui/react';

//Emoji Picker Import
import EmojiPicker from 'emoji-picker-react';

//Database Import i.e. PostgreSQL
import { db } from '../utils/dbConfig';
import { Budgets } from '../utils/schema';
import { eq } from 'drizzle-orm';

//Pop-Up Import
import { toast } from 'react-toastify';

function EditBudget({budgetInfo, refreshData}) {
    //State for Create Budget Dialog 
    let [isOpen, setIsOpen] = useState(false);

   //State for Toggling Emoji Icons
   const [emojiIcon, setEmojiIcon] = useState();
   const [emojiPicker, setEmojiPicker] = useState(false);
 
   //For Storing the Value on Budget Name and Budget Amount
   const [name, setName] = useState();
   const [amount, setAmount] = useState();

   useEffect(() => {
    if(budgetInfo)
    {
        setName(budgetInfo.name);
        setAmount(budgetInfo.amount);
        setEmojiIcon(budgetInfo.icon);
    }
   }, [budgetInfo])

   const onUpdateBudget = async() => {
    const result = await db.update(Budgets).set({
        name: name,
        amount: amount,
        icon: emojiIcon,
    }).where(eq(Budgets.id, budgetInfo.id))
    .returning();

    if(result)
    {
        refreshData();
        toast.success("Budget Updated !!");
    }
   }

  return (
    <div>
        <button onClick={() => setIsOpen(true)} className='w-full'>
          <div className='flex gap-2 rounded border border-indigo-600 bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500'>
              <PencilSquareIcon className='size-6' /> Edit
          </div>
        </button>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-5">
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-80">
            <DialogPanel className="max-w-lg w-full space-y-4 border bg-white p-5 rounded-md">
              <DialogTitle className="font-bold text-lg">Update Budget</DialogTitle>
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
                  <Input name="full_name" type="text" placeholder='E.g. Grocery' className="border-2 w-full p-2 text-sm rounded-lg px-4" defaultValue={budgetInfo.name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className='mt-2'>
                  <h2 className='text-sm font-medium my-1'>Budget Amount</h2>
                  <Input name="amount" type="number" placeholder='E.g. ₹5000' className="border-2 w-full p-2 text-sm rounded-lg px-4" defaultValue={budgetInfo.amount} onChange={(e)=>setAmount(e.target.value)} />
                </div>
              </Description>
              <CloseButton>
                <button disabled={!(name && amount)}  className='mt-5 inline-block rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-sm font-medium text-white focus:outline-none focus:ring active:text-indigo-500 w-full' onClick={()=>onUpdateBudget()} >Update Budget</button>
              </CloseButton>
            </DialogPanel>
          </div>
        </Dialog>
    </div>
  )
}

export default EditBudget;