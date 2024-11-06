import { IMiddlewareFunction } from 'react-router-dom-middleware';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    /**  @type IMiddlewareFunction */
    isLogged: ({to, from}, next) => {
        return next();
    }
}