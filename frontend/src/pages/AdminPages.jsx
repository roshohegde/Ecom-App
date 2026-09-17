import { useEffect, useState } from "react";
import { catalogApi } from "../api/catalogApi";
import { Loading, ErrorMessage } from "../components/State";
import "./adminStyles.css";
const blank = { sku: "", name: "", description: "", price: "", categoryId: "", availableQuantity: 0 };
export function AdminCatalog() {
  const [products, setProducts] = useState(null),
    [categories, setCategories] = useState([]),
    [form, setForm] = useState(blank),
    [category, setCategory] = useState({ name: "", description: "" }),
    [editing, setEditing] = useState(null),
    [error, setError] = useState(""),
    [notice, setNotice] = useState("");
  const load = () => {
    catalogApi
      .products({ page: 0, size: 50, sort: "createdAt,desc" })
      .then(setProducts)
      .catch((e) => setError(e.message));
    catalogApi
      .categories()
      .then(setCategories)
      .catch((e) => setError(e.message));
  };
  useEffect(load, []);
  const saveProduct = async (event) => {
    event.preventDefault();
    try {
      const data = {
        ...form,
        price: Number(form.price),
        categoryId: Number(form.categoryId),
        availableQuantity: Number(form.availableQuantity),
      };
      if (editing) await catalogApi.updateProduct(editing, data);
      else await catalogApi.createProduct(data);
      setForm(blank);
      setEditing(null);
      setNotice("Catalogue saved.");
      load();
    } catch (e) {
      setError(e.message);
    }
  };
  const saveCategory = async (event) => {
    event.preventDefault();
    try {
      await catalogApi.createCategory({ ...category, status: "ACTIVE" });
      setCategory({ name: "", description: "" });
      setNotice("Category created.");
      load();
    } catch (e) {
      setError(e.message);
    }
  };
  const edit = (p) => {
    setEditing(p.id);
    setForm({
      sku: p.sku,
      name: p.name,
      description: p.description || "",
      price: p.price,
      categoryId: categories.find((c) => c.name === p.category)?.id || "",
      availableQuantity: p.availableQuantity,
    });
  };
  const cancelEdit = () => {
    setEditing(null);
    setForm(blank);
    setError("");
  };
  if (!products) return <Loading />;
  return (
    <section className="admin">
      <p className="eyebrow">ADMIN</p>
      <h1>Catalogue management</h1>
      <ErrorMessage error={error} />
      {notice && <p className="notice">{notice}</p>}
      <div className="admin-grid">
        <form className="panel" onSubmit={saveProduct}>
          <h2>{editing ? "Edit product" : "Create product"}</h2>
          <label>
            SKU
            <input
              required
              value={form.sku}
              onChange={(e) => setForm({ ...form, sku: e.target.value })}
            />
          </label>
          <label>
            Name
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label>
            Description
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </label>
          <label>
            Price
            <input
              type="number"
              min="0.01"
              step="0.01"
              required
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </label>
          <label>
            Category
            <select
              required
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Available stock
            <input type="number" min="0" step="1" required value={form.availableQuantity} onChange={(e) => setForm({ ...form, availableQuantity: e.target.value })} />
          </label>
          <div className="form-actions">
            <button className="button">
              {editing ? "Update product" : "Create product"}
            </button>
            {editing && <button type="button" className="text-button" onClick={cancelEdit}>Cancel edit</button>}
          </div>
        </form>
        <form className="panel" onSubmit={saveCategory}>
          <h2>Create category</h2>
          <label>
            Name
            <input
              required
              value={category.name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
            />
          </label>
          <label>
            Description
            <textarea
              value={category.description}
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
            />
          </label>
          <div className="form-actions">
            <button className="button">Create category</button>
          </div>
        </form>
      </div>
      <div className="table">
        {products.content.map((p) => (
          <div key={p.id}>
            <b>{p.name}</b>
            <span>{p.sku}</span>
            <span>{p.status}</span>
            <button onClick={() => edit(p)}>Edit</button>
            <button
              className="danger"
              onClick={async () => {
                if (!confirm(`Delete ${p.name}?`)) return;
                try {
                  await catalogApi.deleteProduct(p.id);
                  setProducts((current) => current && { ...current, content: current.content.filter((item) => item.id !== p.id), totalElements: Math.max(0, current.totalElements - 1) });
                  setNotice("Product deleted.");
                  load();
                } catch (e) {
                  setError(e.message);
                }
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
