import React, { useState } from "react";
import axios from "axios";
import axiosJsonpAdapter from "axios-jsonp";

import "./styles.css";

export default function App() {
  const [zipcodeText, setZipcodeText] = useState("");

  const onChangeZipcodeText = (event) => setZipcodeText(event.target.value);

  const onClickSearch = () => {
    const url = "https://zipcloud.ibsnet.co.jp/api/search";

    if (zipcodeText === "") return;
    if (!validationZipcode(zipcodeText))
      return alert("郵便番号は7桁の数字で入力してください。");

    axios
      .get(url, {
        adapter: axiosJsonpAdapter,
        params: {
          zipcode: zipcodeText
        }
      })
      .then((res) => {
        console.log(res);
      });
  };

  const validationZipcode = (text) => {
    const pattern = /^[0-9]{7}$/;
    return pattern.test(text);
  };

  return (
    <div className="input-area">
      <input
        placeholder="郵便番号を入力"
        value={zipcodeText}
        onChange={onChangeZipcodeText}
      />
      <button onClick={onClickSearch}>検索</button>
    </div>
  );
}
