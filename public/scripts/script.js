window.register = () => {
  try {
    navigator.registerProtocolHandler(
      "web+auth",
      "http://localhost:2002/login?%s",
      "Auth Sinpapeles"
    );

    alert("Installed!");
  } catch (e) {
    alert(`Failed to install: ${e.message}`);
  }
};
