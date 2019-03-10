import { hide } from 'redux-modal'
import { MODAL } from "../../constant";

export const hideModal = () => dispatch => dispatch(hide(MODAL))