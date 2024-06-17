import { error} from "../network/response.js";
import ctrl from '../modules/auth/index.js';

export default async function authRequired(req, res, next) {
  try {
      // ID number of user (not person)
      const result = await ctrl.specificDataToken(req.body.id);
      // TESTING
      console.log(result);
      if (!result) {
          error(req, res, 'Authorization denied', 401);
      } else {
          // succes(req, res, 'Authentication succesfully', 200);
          req.user = result[0];
          // TEStINg
          next();
      }
  } catch (err) {
      error(req, res, 'catch error - authRequired', 404);
      console.log(err);
  }
}

