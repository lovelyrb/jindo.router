/**
 * @namespace
 */
var jindo = jindo || {};

jindo.$Router = jindo.$Class(/** @lends jindo.$Router.prototype */{

    /**
     * jindo.$Router FACADE.
     * @constructs
     * @memberOf jindo
     */
    $init : function(){
        this._oManager = new jindo.$Router.Manager();
    },

    /**
     * 라우터를 생성하거나 리스너를 등록한다.
     * @param {string} sFragment
     * @param {function?} fnCallback
     * @returns {jindo.$Router.Route}
     * @example
     * var oRouter = new jindo.$Router(),
     *     fnListener = function(){};
     *
     * // 라우터 생성
     * var oRoute = oRouter.register('/my/friends');
     *
     * // 리스너 등록
     * oRouter.register('/my/friends', fnListener);
     * // 또는
     * oRoute.addListener(fnListener);
     */
    register : function(sFragment, fnCallback){
        return this._oManager.create(sFragment, fnCallback);
    },

    /**
     * 라우터를 제거하거나 리스너를 해제한다.
     * @param {string} sFragment
     * @param {function?} fnCallback
     * @example
     * var oRouter = new jindo.$Router(),
     *     fnListener = function(){};
     *
     * // 라우터 제거
     * var oRoute = oRouter.register('/my/friends');
     * oRouter.unregister('/my/friends');
     *
     * // 리스너 해제
     * oRouter.register('/my/friends', fnListener);
     * oRouter.unregister('/my/friends', fnListener);
     * // 또는
     * oRoute.removeListener(fnListener);
     */
    unregister : function(sFragment, fnCallback){
        this._oManager.remove(sFragment, fnCallback);
    },

    /**
     * 현재 생성된 라우터의 갯수를 반환한다.
     * @returns {number}
     * @example
     * var oRouter = new jindo.$Router();
     * oRouter.register('/my/friends');
     * oRouter.register('/my/friends/:friend');
     *
     * oRouter.count(); // 2
     */
    count : function(){
        return this._oManager.count();
    },

    /**
     * 모든 라우터를 제거하고 객체를 초기화한다.
     * @example
     * var oRouter = new jindo.$Router();
     * oRouter.destory();
     * oRouter = null;
     */
    destroy : function(){
        this._oManager.clear();
        this._oManager = null;
    }
});
