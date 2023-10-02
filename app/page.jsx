"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", phone: "", email: "" });

  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== "" && newItem.phone !== "" && newItem.email !== "") {
      await addDoc(collection(db, "item"), {
        name: newItem.name.trim(),
        phone: newItem.phone,
        email: newItem.email,
      });
      setNewItem({ name: "", phone: "", email: "" });
    }
  };

  useEffect(() => {
    const q = query(collection(db, "item"));
    const GetData = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      console.log(itemsArr);
      setItems(itemsArr);
    });
  }, []);

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "item", id));
  };

  const editItem = async (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      setNewItem({
        name: itemToEdit.name || "",
        phone: itemToEdit.phone || "",
        email: itemToEdit.email || "",
      });
    }
    await deleteDoc(doc(db, "item", id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm ">
        <h1 className="text-4xl p-4 text-center"> CRUD app<br/> </h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="col-span-2 p-3 border mx-3"
              type="text"
              placeholder="Enter Name"
            />
            <input
              value={newItem.email}
              onChange={(e) =>
                setNewItem({ ...newItem, email: e.target.value })
              }
              className="col-span-2 p-3 border mx-3"
              type="email"
              placeholder="Enter Email"
            />
            <input
              value={newItem.phone}
              onChange={(e) =>
                setNewItem({ ...newItem, phone: e.target.value })
              }
              className="col-span-1 p-3 border mx-3"
              type="number"
              placeholder="Enter Phone"
            />
            <button
              onClick={addItem}
              className="col-span-1 text-white bg-slate-950 hover:bg-slate-900 p-3 text-3xl"
              type="submit"
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className="my-4 w-full flex justify-between bg-slate-950"
              >
                <div className="p-4 w-full flex justify-between">
                  <span>{item.name}</span>
                  <span>{item.email}</span>
                  <span>{item.phone}</span>
                </div>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16"
                >
                  DEL
                </button>
                <button
                  onClick={() => editItem(item.id)}
                  className="p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16"
                >
                  EDIT
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
