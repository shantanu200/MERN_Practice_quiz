function getUsername(){
  const LogUser = window.localStorage.getItem("LoggedUser");

  const fUser = JSON.parse(LogUser);

  return fUser.username;
}

export default getUsername;