
import cookieParser from "cookie-parser";

// export const authRequired = (req, res, next) => {
//   const cookies = req.headers.cookie;
//   console.log(cookies);
//   // console.log(req.headers);
//   next();
// };

export const authRequired = (req, res, next) => {
  // Utiliza cookieParser para analizar el encabezado de la cookie
  cookieParser()(req, res, () => {
    const tokenCookie = req.cookies.token;
    console.log(tokenCookie);
    next();
  });
};