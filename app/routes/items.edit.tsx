import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditItemPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:8000/items/${id}`);
      const data = await res.json();
      setName(data.name ?? "");
      setDescription(data.description ?? "");
      setUserId(data.user_id ?? 1);
    })();
  }, [id]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`http://localhost:8000/items/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, user_id: userId }),
    });
    nav("/items"); 
  }

  return (
    <div style={{ maxWidth: 480, margin: "24px auto" }}>
      <h2>Edit Item #{id}</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </label>
        <label>
          User ID
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
