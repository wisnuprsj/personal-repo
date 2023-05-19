import application from "./src/server";

const PORT = process.env.LM_BE_PORT || 3000;

application.listen(PORT, () => {
  console.log(`Running on port ${PORT} - ${new Date().toISOString()}`);
});
