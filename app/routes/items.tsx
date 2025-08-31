import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Item = {
  id: number;
  name: string;
  description?: string | null;
  user_id: number;
};

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);

  // 再生成されない安定した関数にする
  const fetchItems = useCallback(async () => {
    const res = await fetch("http://localhost:8000/items/");
    const data = await res.json();
    setItems(data);
  }, []);

  // 初回マウント時にだけ実行
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // 件数表示
  const count = useMemo(() => items.length, [items]);

  // 削除 → 再取得
  const onDelete = useCallback(
    async (id: number) => {
      await fetch(`http://localhost:8000/items/${id}`, { method: "DELETE" });
      fetchItems();
    },
    [fetchItems]
  );

  return (
    <div style={{ maxWidth: 720, margin: "24px auto" }}>
      <h2>Items</h2>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <Link to="/items/new">
          <button>+ New Item</button>
        </Link>
        <span> ({count} Items in DB)</span>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Description</th><th>User</th><th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>{it.id}</td>
              <td>{it.name}</td>
              <td>{it.description}</td>
              <td>{it.user_id}</td>
              <td>
                <Link to={`/items/${it.id}/edit`}>Edit</Link>{" "}
                <button onClick={() => onDelete(it.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan={5}>No items</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
