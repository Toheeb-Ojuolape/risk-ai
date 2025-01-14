function AiAssistant() {
  return (
    <iframe
      className="iframe"
      src={`${
        import.meta.env.VITE_API_URL
      }/assistant?token=${sessionStorage.getItem("authToken")}`}
    />
  );
}

export default AiAssistant;
