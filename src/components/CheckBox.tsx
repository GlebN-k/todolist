import React, { ChangeEvent } from 'react'

type CheckBoxType= {
    checked: boolean
    id: string
    changeCheckBoxHandler: (taskId: string, e: ChangeEvent<HTMLInputElement>)=> void
}

export const CheckBox = (props: CheckBoxType) => {
  return (
    <input
                type="checkbox"
                onChange={(e) => props.changeCheckBoxHandler(props.id, e)}
                checked={props.checked}
                
              />
  )
}
