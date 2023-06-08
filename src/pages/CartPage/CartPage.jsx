import "./CartPage.css";
import { useState } from "react";
import { sizes, borders, modifications } from "../../mock/optionsMock.js";

function Cart() {
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [orders, setOrders] = useState([]);

  const getOrdersByPhoneNumber = () => {
    {
      /*const storedOrders = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const order = JSON.parse(localStorage.getItem(key));
      if (order && order.phoneNumber === phoneNumber) {
        storedOrders.push({ id: key, ...order });
      }
    }
  setOrders(storedOrders);*/
    }
    fetchData(phoneNumber);
  };

  const getTextFromId = (id, array) => {
    const item = array.find((item) => item.id === id);
    return item ? item.optionText : "";
  };

  function formatModifications(modificationsString) {
    if (!modificationsString) {
      return "";
    }

    return Object.entries(modificationsString).reduce(
      (acc, [key, value]) =>
        acc +
        `${modifications.find((m) => m.id === key).optionText}: ${value}; `,
      ""
    );
  }

  async function fetchData(phoneNumber) {
    fetch("http://localhost:8080/orders/" + phoneNumber, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch(() => setOrders([]));
  }

  return (
    <div className="cart-container">
      <div className="search-container">
        <h2>Ваші замовлення</h2>
        <div className="search-row">
          <input
            type="tel"
            id="phone"
            name="phone"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
            placeholder="(097)123-45-67"
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></input>
          <button className="show-orders" onClick={getOrdersByPhoneNumber}>
            Показати
          </button>
        </div>
      </div>
      <div className="orders-container">
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id}>
              <h4>
                Замовлення від{" "}
                {new Date(parseInt(order.id)).toLocaleDateString()}
              </h4>
              <ul>
                <li>Назва піци: {order.pizzaName}</li>
                <li>Кількість: {order.pizzaCount}</li>
                <li>Загальна вартість: {order.totalPrice} UAH</li>
                <li>
                  Розмір: {getTextFromId(order.selectedSizeOption, sizes)}
                </li>
                <li>
                  Бортик: {getTextFromId(order.selectedBorderOption, borders)}
                </li>
                <li>
                  Модифікації: {formatModifications(order.modificationsMap)}
                </li>
                <li>Статус: {order.status}</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Cart;
