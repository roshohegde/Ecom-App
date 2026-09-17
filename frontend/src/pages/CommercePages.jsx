import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { commerceApi } from "../api/commerceApi";
import { Loading, Empty, ErrorMessage } from "../components/State";
import "./orderStyles.css";
const money = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    n,
  );
export function CartPage() {
  const [cart, setCart] = useState(null),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [busy, setBusy] = useState(false),
    [loading, setLoading] = useState(true),
    [confirmingCheckout, setConfirmingCheckout] = useState(false),
    [successOrder, setSuccessOrder] = useState(null);
  const load = () => {
    setLoading(true);
    setError("");
    commerceApi
      .cart()
      .then(setCart)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);
  const update = async (i, q) => {
    try {
      if (q < 1) await commerceApi.removeItem(i.productId);
      else
        await commerceApi.updateItem(i.productId, {
          productId: i.productId,
          quantity: q,
        });
      load();
    } catch (e) {
      setError(e.message);
    }
  };
  const checkout = async () => {
    setConfirmingCheckout(false);
    setBusy(true);
    try {
      const order = await commerceApi.checkout(
        { paymentMethod: "UPI", shippingAddress: "Customer address" },
        crypto.randomUUID(),
      );
      setNotice(`Order ${order.orderNumber} has been confirmed.`);
      setSuccessOrder(order);
      load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };
  if (loading && !cart) return <Loading />;
  if (!cart)
    return (
      <section className="state">
        <ErrorMessage error={error || "Unable to load your cart."} />
        <Link to="/products">Back to shop</Link>
      </section>
    );
  return (
    <>
      <section className="narrow">
        <p className="eyebrow">YOUR BAG</p>
        <h1>Cart</h1>
        <ErrorMessage error={error} />
        {notice && <p className="notice">{notice}</p>}
        {!cart.items.length ? (
          <Empty>
            Your cart is empty. <Link to="/products">Browse products</Link>.
          </Empty>
        ) : (
          <>
            <div className="cart-list">
              {cart.items.map((i) => (
                <div className="cart-row" key={i.productId}>
                  <div className="thumb">{i.name[0]}</div>
                  <div>
                    <h3>{i.name}</h3>
                    <p>{money(i.unitPrice)}</p>
                    <div className="stepper">
                      <button onClick={() => update(i, i.quantity - 1)}>
                        −
                      </button>
                      <span>{i.quantity}</span>
                      <button onClick={() => update(i, i.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <b>{money(i.unitPrice * i.quantity)}</b>
                </div>
              ))}
            </div>
            <div className="total">
              <span>Subtotal</span>
              <b>{money(cart.subtotal)}</b>
            </div>
            <button
              className="button"
              disabled={busy}
              onClick={() => setConfirmingCheckout(true)}
            >
              {busy ? "Processing payment…" : "Checkout with UPI"}
            </button>
          </>
        )}
      </section>
      {confirmingCheckout && (
        <div className="modal-backdrop" role="presentation">
          <div
            className="checkout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
          >
            <p className="eyebrow">READY TO CHECK OUT?</p>
            <h2 id="checkout-title">Confirm your order</h2>
            <p>
              You are about to place order with {cart.items.length}{" "}
              {cart.items.length === 1 ? "item" : "items"} for{" "}
              <b>{money(cart.subtotal)}</b> using UPI.
            </p>
            <div className="modal-actions">
              <button
                className="text-button"
                onClick={() => setConfirmingCheckout(false)}
              >
                Review cart
              </button>
              <button className="button" onClick={checkout}>
                Confirm and pay
              </button>
            </div>
          </div>
        </div>
      )}
      {successOrder && (
        <div className="modal-backdrop" role="presentation">
          <div
            className="checkout-modal success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
          >
            <p className="eyebrow">PAYMENT COMPLETE</p>
            <h2 id="success-title">Order confirmed</h2>
            <p>Your order has been placed successfully.</p>
            <strong>{money(successOrder.total)}</strong>
            <div className="modal-actions">
              <button className="button" onClick={() => setSuccessOrder(null)}>
                Continue shopping
              </button>
              <Link
                className="text-button"
                to="/orders"
                onClick={() => setSuccessOrder(null)}
              >
                View my orders
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export function OrdersPage() {
  const [orders, setOrders] = useState(null),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    commerceApi
      .orders()
      .then(setOrders)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);
  if (loading && !orders) return <Loading />;
  if (!orders)
    return (
      <section className="state">
        <ErrorMessage error={error || "Unable to load your orders."} />
        <Link to="/products">Back to shop</Link>
      </section>
    );
  return (
    <section>
      <p className="eyebrow">ORDER HISTORY</p>
      <h1>My orders</h1>
      <ErrorMessage error={error} />
      {!orders.content?.length ? (
        <Empty>You have not placed an order yet.</Empty>
      ) : (
        <div className="order-list">
          {orders.content.map((o) => (
            <article className="order-card" key={o.id}>
              <div className="order-card-header">
                <div>
                  <p className="eyebrow">ORDER SUMMARY</p>
                  <h2>
                    {o.items?.map((item) => item.productName).join(", ") ||
                      "Your Nova Store order"}
                  </h2>
                  <small>Reference {o.orderNumber}</small>
                </div>
                <Link className="text-button" to={`/orders/${o.id}`}>
                  View details
                </Link>
              </div>
              <div className="order-items">
                {o.items?.map((item) => (
                  <div
                    className="order-item"
                    key={`${o.id}-${item.productName}`}
                  >
                    <span>
                      <b>{item.productName}</b>
                      <small>
                        {item.quantity} × {money(item.unitPrice)}
                      </small>
                    </span>
                    <b>{money(item.totalPrice)}</b>
                  </div>
                ))}
              </div>
              <div className="order-card-footer">
                <span className="badge">{o.status}</span>
                <span>Payment: {o.paymentStatus}</span>
                <strong>Total {money(o.total)}</strong>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
export function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null),
    [error, setError] = useState("");
  useEffect(() => {
    commerceApi
      .order(id)
      .then(setOrder)
      .catch((e) => setError(e.message));
  }, [id]);
  if (error)
    return (
      <section className="state">
        <ErrorMessage error={error} />
        <Link to="/orders">Back to orders</Link>
      </section>
    );
  if (!order) return <Loading />;
  return (
    <section className="narrow">
      <p className="eyebrow">ORDER DETAILS</p>
      {/* <h1>{order.orderNumber}</h1> */}
      <ErrorMessage error={error} />
      <div className="order-items">
        {order.items?.map((item) => (
          <div className="order-item" key={`${order.id}-${item.productName}`}>
            <span>
              <b>{item.productName}</b>
              <small>
                {item.quantity} × {money(item.unitPrice)}
              </small>
            </span>
            <b>{money(item.totalPrice)}</b>
          </div>
        ))}
      </div>
      <div className="state">
        <p>
          Status: <b>{order.status}</b>
        </p>
        <p>
          Payment: <b>{order.paymentStatus}</b>
        </p>
        <p>
          Total: <b>{money(order.total)}</b>
        </p>
      </div>
      <Link to="/orders">Back to orders</Link>
    </section>
  );
}
