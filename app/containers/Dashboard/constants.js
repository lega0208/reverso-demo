/*
 * DashboardConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_DATA = 'reverso/Dashboard/GET_DATA';
export const GET_DATA_ERROR = 'reverso/Dashboard/GET_DATA_ERROR';
export const GET_DATA_SUCCESS = 'reverso/Dashboard/GET_DATA_SUCCESS';
export const SET_DATA = 'reverso/Dashboard/SET_DATA';

export const SET_SELECTION = 'reverso/Dashboard/SET_SELECTION';
