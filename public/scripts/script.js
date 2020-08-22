window.register = () => {
  try {
    navigator.registerProtocolHandler(
      "web+auth",
      "/login?%s",
      "Auth Sinpapeles"
    );

    alert("Installed!");
  } catch (e) {
    alert(`Failed to install: ${e.message}`);
  }
};
