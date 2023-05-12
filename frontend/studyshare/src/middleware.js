import createSagaMiddleware from "redux-saga";

export const sagaMiddleware = createSagaMiddleware();

// eslint-disable-next-line import/no-anonymous-default-export
export default [sagaMiddleware];
