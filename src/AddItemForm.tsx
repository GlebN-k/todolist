import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {Button, TextField} from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';

type PropsType = {
    callback: (newTitle: string) => void

}

const AddItemForm: React.FC<PropsType> = (props) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callback(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }


    return (


        <div>

            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <Button onClick={addTask} >
                <AddTaskIcon fontSize={'small'}/>
            </Button>
            {error && <div className="error-message">{error}</div>}
        </div>

    );
};

export default AddItemForm;
