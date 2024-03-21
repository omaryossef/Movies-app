let url;
if (process.env.NODE_ENV === "production") {
  url = "https://movies-land-api.onrender.com";
} else {
  url = "http://localhost:3000";
}
export default url;
