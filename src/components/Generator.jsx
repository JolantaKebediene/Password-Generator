import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const numbers = "0123456789";
const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const symbols = "!'^+%&/()=?_#$½§{[]}|;:>÷`<.*-@é";

const Generator = () => {
  // -- states
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(5);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const generatePassword = (e) => {
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify("Turite pasirinkti bent vieną punktą", true);
    }
    let characterList = "";

    if (includeUppercase) {
      characterList = characterList + upperCaseLetters;
    }

    if (includeLowercase) {
      characterList = characterList + lowerCaseLetters;
    }

    if (includeNumbers) {
      characterList = characterList + numbers;
    }

    if (includeSymbols) {
      characterList = characterList + symbols;
    }

    setPassword(createPassword(characterList));
  };

  const createPassword = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };

  const copyToClipboard = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();
  };

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 4500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success(message, {
        position: "top-center",
        autoClose: 4500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const copyPassword = (e) => {
    if (password === "") {
      notify("Nėra ką kopijuoti", true);
    } else {
      copyToClipboard();
      notify("Slaptažodis sėkmingai nukopijuotas");
    }
  };

  return (
    <div className="container">
      <h1>Slaptažodžių generatorius</h1>
      <div className="generated-password">
        <h3 id="password">Slaptažodis: {password} </h3>
        <button onClick={copyPassword} className="copy_btn">
          <i className="far fa-clipboard" />
        </button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={4500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="form-group">
        <div>
          <label htmlFor="password-length">Slaptažodžio ilgis</label>
          <input
            defaultValue={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
            type="number"
            id="password-length"
            name="password-length"
            min="3"
          ></input>
        </div>
        <div>
          <label htmlFor="uppercase-letters">Didžiosios raidės</label>
          <input
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
            type="checkbox"
            id="uppercase-letters"
            name="uppercase-letters"
          />
        </div>
        <div>
          <label htmlFor="lowercase-letters">Mažosios raidės</label>
          <input
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
            type="checkbox"
            id="lowercase-letters"
            name="lowercase-letters"
          />
        </div>
        <div>
          <label htmlFor="numbers">Skaičiai</label>
          <input
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            type="checkbox"
            id="numbers"
            name="numbers"
          />
        </div>
        <div>
          <label htmlFor="symbols">Simboliai</label>
          <input
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
            type="checkbox"
            id="symbols"
            name="symbols"
          />
        </div>
        <button onClick={generatePassword} className="generator_btn">
          Sukurti slaptažodį
        </button>
      </div>
    </div>
  );
};

export default Generator;
