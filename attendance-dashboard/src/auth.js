export const getSavedUsers = () => {
  const raw = localStorage.getItem("attendance_users");
  return raw ? JSON.parse(raw) : [];
};

export const saveUsers = (users) => {
  localStorage.setItem("attendance_users", JSON.stringify(users));
};

export const registerUser = ({ email, password, name }) => {
  const users = getSavedUsers();
  if (users.some((u) => u.email === email)) {
    throw new Error("User already exists");
  }
  const newUser = { email, password, name };
  users.push(newUser);
  saveUsers(users);
  localStorage.setItem("attendance_auth_user", JSON.stringify({ email, name }));
  return { email, name };
};

export const loginUser = ({ email, password }) => {
  const users = getSavedUsers();
  const found = users.find((u) => u.email === email && u.password === password);
  if (!found) {
    throw new Error("Invalid credentials");
  }
  localStorage.setItem("attendance_auth_user", JSON.stringify({ email: found.email, name: found.name }));
  return { email: found.email, name: found.name };
};

export const getCurrentUser = () => {
  const raw = localStorage.getItem("attendance_auth_user");
  return raw ? JSON.parse(raw) : null;
};

export const logout = () => {
  localStorage.removeItem("attendance_auth_user");
};

export const isAuthenticated = () => !!getCurrentUser();


