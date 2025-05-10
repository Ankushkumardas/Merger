import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

function Input({ value, onChange, label, placeholder, type }) {
    const [showpassword,setshowpassword]=useState(false);
    const togglePassword=()=>{
        setshowpassword(!showpassword);
    }

    return (
        <div className=' w-full flex gap-2 items-center'>
            <label className=''  >{label}</label>
            <input placeholder={placeholder} type={type == "password" ? (showpassword ? "text" : "password") : type} className=' w-full border border-slate-200 px-2 py-1 rounded-md focus:border-slate-200/40'
                onChange={(e) => onChange(e)}
                value={value} />
            <p>{type=="password" &&(
                <>
                {showpassword?(
                    <FaRegEye onClick={togglePassword}
                    size={16}/>

                ):(<FaRegEyeSlash size={16} onClick={togglePassword} />
                )}
                </>
            )}</p>
        </div>
    )
}

export default Input
