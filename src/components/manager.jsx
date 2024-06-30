import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function Manager() {
  const [form, setForm] = useState({ site: "", username: "", password: "" });

  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const ref = useRef();
  const passRef = useRef();
  const showPassword = () => {
    passRef.current.type = "text";
    if (ref.current.src.includes("image/download.png")) {
      ref.current.src = "image/show.png";
      passRef.current.type = "text";
    } else {
      ref.current.src = "image/download.png";
      passRef.current.type = "password";
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = () => {
    if(form.site.length>3 && form.username.length!==0 && form.password.length>=4){
        setPasswordArray([...passwordArray, {...form, id:uuidv4()}]);
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form , id:uuidv4()}]));
        setForm({ site: "", username: "", password: "" });
    }
  };

  const deletePassword = (id)=>{
    console.log(id);
    setPasswordArray(passwordArray.filter(i=>i.id!==id));
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(i=>i.id!==id)));
  };

  const editPassword = (id) => {
    setForm(passwordArray.filter(i=>i.id===id)[0]);
    deletePassword(id);
  };

  const copyText = (text)=>{
    navigator.clipboard.writeText(text);
    alert("text copied");
  }
  return (
    <>
      <div className="bg-slate-50 pt-4 p-2 md:p-0 md:mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>
          PassOP/
          <span className="text-green-700">&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own Password Manager
        </p>
        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-1/2 p-4 py-1"
            type="text"
            name="site"
            id="site"
            value={form.site}
          />
          <div className="flex flex-col md:flex-row justify-center gap-8 w-full">
            <input
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-1/3 p-4 py-1"
              type="text"
              name="username"
              id="username"
              value={form.username}
            />
            <div className="relative">
              <input
                ref={passRef}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500  p-4 py-1"
                type="password"
                name="password"
                id="password"
                value={form.password}
              />
              <span
                className="absolute right-[6px] top-[5px] cursor-pointer "
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  src="image/show.png"
                  width={25}
                />
              </span>
            </div>
          </div>
          <button
            className="flex justify-center items-center bg-green-500 rounded-full px-8 py-2 w-fit hover:bg-green-300 border-2 border-green-700"
            onClick={savePassword}
          >
            Save Password
          </button>
          <h2 className="font-bold text-green-500">Your Passwords</h2>
        </div>
        <div className="passwords font-bold text-md py-4">
          
          {passwordArray.length === 0 && <div className="ml-20">No password to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100 text-lg">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-1 border border-white text-center">
                        <div className="flex justify-center items-center">
                            <a href={item.site} target="_blank">{item.site}</a>
                            <div className="size-7 mb-5" onClick={()=>{copyText(item.site)}}>
                            <img
                                className="cursor-pointer m-4"
                                src="image/copy.png"
                                width={20}
                            />
                            </div>
                        </div>
                      </td>
                      <td className="py-1 border border-white text-center">
                      <div className="flex justify-center items-center">
                            <span>{item.username}</span>
                            <div className="size-7 mb-5" onClick={()=>{copyText(item.site)}}>
                            <img
                                className="cursor-pointer m-4"
                                src="image/copy.png"
                                width={20}
                            />
                            </div>
                        </div>   
                      </td>
                      <td className="py-1 border border-white text-center">
                      <div className="flex justify-center items-center">
                            <span>{item.password}</span>
                            <div className="size-7 mb-5" onClick={()=>{copyText(item.site)}}>
                            <img
                                className="cursor-pointer m-4"
                                src="image/copy.png"
                                width={20}
                            />
                            </div>
                        </div>   
                      </td>
                      <td>
                        <div className="flex justify-center items-center gap-3">
                            <button onClick={()=>{editPassword(item.id)}}><img
                                className="cursor-pointer m-4"
                                src="image/content.png"
                                width={20}
                            />
                            </button>
                             <button onClick={()=>{deletePassword(item.id)}}>
                                <img
                                className="cursor-pointer m-4"
                                src="image/delete.png"
                                width={20}/> 
                            </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Manager;    