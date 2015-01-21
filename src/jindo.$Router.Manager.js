jindo.$Router.Manager = jindo.$Class(/** @lends jindo.$Router.Manager.prototype */{

    /**
     * Route 객체를 관리 객체
     * @constructs
     */
    $init : function(){
        this._waRoutes = jindo.$A([]);
    },

    /**
     * 프래그먼트에 해당하는 라우트 객체를 반환한다.
     * @param {string} sFragment
     * @returns {jindo.$Router.Route|null}
     */
    findBy : function(sFragment){
        var sKey = jindo.$Router.Route.createKey(sFragment),
            oPattern = jindo.$Router.Route.createPattern(sFragment),
            oResult = null;

        this._waRoutes.some(function(oRoute){
            if(oRoute.key() === sKey || oRoute.pattern().source === oPattern.source){
                oResult = oRoute;
                return true;
            }
        });

        return oResult;
    },

    /**
     * 프래그먼트를 분석해 라우트 객체를 생성하거나 리스너를 등록한다.
     * @param {string} sFragment
     * @param {function?} fnCallback
     * @returns {jindo.$Router.Route}
     */
    create : function(sFragment, fnCallback){
        var oRoute = this.findBy(sFragment);

        if(jindo.$Jindo.isNull(oRoute)){
            oRoute = new jindo.$Router.Route(
                jindo.$Router.Route.createKey(sFragment),
                jindo.$Router.Route.createPattern(sFragment)
            );

            this._waRoutes.push(oRoute);
        }

        oRoute.addListener(fnCallback);

        return oRoute;
    },

    /**
     * 프래그먼트에 해당하는 라우트 객체를 제거하거나 리스너를 해제한다.
     * @param {string} sFragment
     * @param {function} fnCallback
     */
    remove : function(sFragment, fnCallback){
        var oRoute = this.findBy(sFragment);

        if(fnCallback){
            oRoute.removeListener(fnCallback);
        }else{
            this._waRoutes = this._waRoutes.refuse(oRoute);
        }
    },

    /**
     * 현재 관리하고 있는 라우트 객체 갯수를 반환한다.
     * @returns {number}
     */
    count : function(){
        return this._waRoutes.length();
    },

    /**
     * 관리하고 있는 라우트 객체를 모두 제거한다.
     */
    clear : function(){
        this._waRoutes.empty();
    }
});
