import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewItemPage() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState(1);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("http://localhost:8000/items/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, user_id: userId }),
    });
    nav("/items"); 
  }

  return (
    <div style={{ maxWidth: 480, margin: "24px auto" }}>
      <h2>New Item</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
        </label>
        <label>
          User ID
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
