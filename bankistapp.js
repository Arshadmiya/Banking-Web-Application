"use strict";

let account1 = {
  owner: "Arshad Mulani",
  movements: [100, 200, 500, -200, -100, 200, -450, 600],
  intrestRate: 1.2,
  pin: 1111,
};
let account2 = {
  owner: "Rahul Bharade",
  movements: [200, 500, -100, 400, 500],
  intrestRate: 1.2,
  pin: 2222,
};
let account3 = {
  owner: "Jayesh Gade",
  movements: [55, -200, 100, -300, 600, 200, -300, -400],
  intrestRate: 1.5,
  pin: 3333,
};
let accounts = [account1, account2, account3];
let getmovementcontainer = document.querySelector(".display_movements");
function displaytransactions(movements) {
  movements.forEach(function (movement) {
    let test = movement > 0 ? "Deposit" : "Withdraw";
    let html = `<div class="movements_rows">
                <div class="row_container">
                <div class="${test}">${test}</div>
                <div class="Amount">${movement}</div>
                </div>
                </div>`;
    getmovementcontainer.insertAdjacentHTML("afterbegin", html);
  });
}

//Generating  username***************************
function creatusername(account) {
  account.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(function (name) {
        return name[0];
      })
      .join("");
  });
}
creatusername(accounts);
//Selecting displaybalance element***************
let displaybal = document.querySelector(".baldisplay");

// Calculating balance ********************
function caldisplaybalance(curacc) {
  // let balance = acc.movements.reduce(function (acc, mov) {
  //   return acc + mov;
  // }, 0);
  curacc.balance = curacc.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);

  displaybal.textContent = `${curacc.balance} RS`;
}

//selecting label to display loggedin user's name
let displayname = document.querySelector(".login_header");
//Selecting movements ui to display
let displayui = document.querySelector(".demo");
//Selecting label for displaying name of the logged in person
let displayuser = document.querySelector(".login_header");
let loginbutton = document.querySelector(".arrow_img");
let userloginid;
let userloginpin;
let currentaccount;
loginbutton.addEventListener("click", function (e) {
  e.preventDefault();
  userloginid = document.querySelector(".username").value;
  userloginpin = Number(document.querySelector(".pin").value);
  currentaccount = accounts.find(function (acc) {
    return acc.username === userloginid;
  });
  if (currentaccount.pin === userloginpin) {
    displaytransactions(currentaccount.movements);
    displayui.style.opacity = 1;
    displayname.textContent = `Welcome back ${
      currentaccount.owner.split(" ")[0]
    }!`;
    caldisplaybalance(currentaccount);
    document.querySelector(".username").value = "";
    document.querySelector(".pin").value = "";
  } else {
    alert("login Failed!");
  }
});

//Implementing Transfer************************

let transfer_button = document.querySelector(".Money_transfer_btn");
transfer_button.addEventListener("click", function (e) {
  e.preventDefault();
  let transfer_amount = Number(
    document.querySelector(".transfer_Amount").value
  );
  let getreceiveraccount = document.querySelector(".receiver").value;
  console.log(getreceiveraccount);

  let receiver_account = accounts.find(function (acc) {
    return acc.username === getreceiveraccount;
  });

  if (transfer_amount > 0 && currentaccount.balance > 0 && receiver_account) {
    currentaccount.movements.push(-transfer_amount);
    receiver_account.movements.push(transfer_amount);
    displaytransactions(currentaccount.movements);
    caldisplaybalance(currentaccount);
  } else {
    console.log("failed");
  }
});

// Implementing Account closing********
let closeaccountbutton = document.querySelector(".closeacc_btn");
closeaccountbutton.addEventListener("click", function () {
  let closeaccountusername = document.querySelector(".cloaseaccount").value;
  let closeaccountpin = Number(document.querySelector(".closepin").value);
  if (
    currentaccount.username === closeaccountusername &&
    currentaccount.pin === closeaccountpin
  ) {
    let indexofcloseaccount = accounts.findIndex(function (accc) {
      return accc.username === currentaccount.username;
    });
    accounts.splice(indexofcloseaccount, 1);
    displayui.style.opacity = 0;
  } else {
    alert("Plzz check your Credentials");
  }
});

// Implimenting Loan request

let loanreqbutton = document.querySelector(".Loanbtn");
loanreqbutton.addEventListener("click", function () {
  let loanreqamount = Number(document.querySelector(".Loanrequestfield").value);
  if (
    loanreqamount > 0 &&
    currentaccount.movements.some(function (move) {
      return move >= loanreqamount * 0.1;
    })
  ) {
    setTimeout(function () {
      currentaccount.movements.push(loanreqamount);
      displaytransactions(currentaccount.movements);
      caldisplaybalance(currentaccount);
    }, 5000);
  }
});
