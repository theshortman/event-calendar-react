import { AuthActionCreators } from "./auth/actionCreators";
import { EventActionCreators } from "./event/actionCreators";
import { GuestActionCreators } from "./guest/actionCreators";

export const allActionCreators = {
  ...AuthActionCreators,
  ...EventActionCreators,
  ...GuestActionCreators,
};
