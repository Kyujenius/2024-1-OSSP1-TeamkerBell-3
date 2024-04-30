// src/Login.js
import React, { useState } from "react";
import styles from "./login.module.css";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [registerId, setRegisterId] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleLoginButton = (e) => {
    e.preventDefault();
    if (!registerId || !registerPassword) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    console.log("로그인 중....");
    console.log("아이디: ", registerId);
    console.log("비밀번호: ", registerPassword);
  };

  const handleRegisterButton = (e) => {
    e.preventDefault();
    console.log("회원가입 페이지로 이동");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>TeamkerBell</h2>
      <h3 className={styles.quotes}>
        You still have enough time to make your dream come true.
      </h3>
      <h3 className={styles.subtitle}>로그인</h3>
      <form className={styles.form}>
        <input
          type="email"
          className={styles.input}
          placeholder="이메일"
          onChange={(e) => {
            setRegisterId(e.target.value);
          }}
          required
        />
        <br />
        <input
          type="password"
          className={styles.input}
          placeholder="비밀번호"
          onChange={(e) => {
            setRegisterPassword(e.target.value);
          }}
          required
        />
        <br />
        <button
          type="submit"
          className={styles.button}
          onClick={handleLoginButton}
        >
          로그인
        </button>
        <br />
        <Link to={`/register`}>
          <button type="submit" className={styles.button}>
            회원가입 창으로 이동
          </button>
        </Link>
      </form>
    </div>
  );
};

export default MainPage;
