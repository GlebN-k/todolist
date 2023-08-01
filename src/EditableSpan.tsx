import { type } from '@testing-library/user-event/dist/type'
import React, { ChangeEvent, useState } from 'react'

type PropsType = {
    oldTitle: string
    callback: (title: string) => void
}

export const EditableSpan: React.FC<PropsType> = ({oldTitle, callback}) => {
  const [edit, setEdit] = useState<boolean>(false)
 const [newTitle, setNewTitle] = useState(oldTitle)
 console.log(newTitle);
  
     const editHandler = () => {
        setEdit(!edit) 
        if(edit) {
          updateTitle()  
        }
        
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)
    setNewTitle(e.currentTarget.value)
  }

  const updateTitle = () => {
    callback(newTitle)
  }
  
    return (
        edit ? <input value={newTitle} onBlur={editHandler} onChange={onChangeHandler} autoFocus/> : <span onDoubleClick={editHandler}>{oldTitle}</span>
    // <span onDoubleClick={foo}>{oldTitle}</span>
  )
}
 