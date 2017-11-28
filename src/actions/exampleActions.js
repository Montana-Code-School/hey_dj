export function increment() {
  return {
    type: "Increment"
  };
}

export function decrement() {
  return {
    type: "Decrement"
  };
}

export function login(username) {
  return {
    type: "Login",
    username
  };
}

export function logout() {
  return {
    type: "Logout"
  };
}

export function loadCounter(value) {
  return {
    type: "LoadCounter",
    value
  };
}
