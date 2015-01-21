jindo.$Router.Route = jindo.$Class(/** @lends jindo.$Router.Route.prototype */{

    $static : {

        /**
         * 사용할 수 있는 키 값으로 프래그먼트를 정제하여 반환한다.
         * @param {string} sFragment
         * @returns {string}
         * @memberOf jindo.$Router.Route
         */
        createKey : function(sFragment){
            var oFirstSlash = /^[\/]?/i,
                oLastSlash = /(\/)$/i;

            // 문자열 앞에 슬래시(/)가 없으면 붙여준다.
            // my/friends => /my/friends
            sFragment = sFragment.replace(oFirstSlash, '/');

            // 문자열 뒤에 슬래시(/)가 있으면 제거한다.
            // /my/friends/ => /my/friends
            sFragment = sFragment.replace(oLastSlash, '');

            return sFragment;
        },

        /**
         * 프래그먼트의 패턴을 분석해 RegExp 객체를 생성하고 반환한다.
         * @param {string} sFragment
         * @returns {RegExp}
         * @memberOf jindo.$Router.Route
         */
        createPattern : function(sFragment){
            sFragment = this.createKey(sFragment);

            var waSegments = jindo.$A(sFragment.substr(1).split('/')),
                sPattern = '';

            waSegments.forEach(function(segment){
                if(segment.indexOf(':') === -1){
                    sPattern = sPattern + '\\/' + segment;
                }else{
                    sPattern = sPattern + '\\/(\\d+)';
                }
            });

            return new RegExp('^\\/?#?' + sPattern + '\\/?$', 'i');
        }
    },

    /**
     * 라우트 객체
     * @constructs
     * @param {string} sKey
     * @param {RegExp} oPattern
     */
    $init : function(sKey, oPattern){
        this._sKey = sKey;
        this._oPattern = oPattern;
        this._waListeners = jindo.$A([]);
    },

    /**
     * 키 값을 반환한다.
     * @returns {string}
     */
    key : function(){
        return this._sKey;
    },

    /**
     * RegExp 패턴 객체를 반환한다.
     * @returns {RegExp}
     */
    pattern : function(){
        return this._oPattern;
    },

    /**
     * 객체에 등록된 리스너를 모두 반환한다.
     * @returns {jindo.$A}
     */
    listeners : function(){
        return this._waListeners;
    },

    /**
     * 리스너를 등록한다.
     * @param {function} fnCallback
     */
    addListener : function(fnCallback){
        if(jindo.$Jindo.isFunction(fnCallback)){
            this._waListeners.push(fnCallback);
        }
    },

    /**
     * 리스너를 해제한다.
     * @param {function} fnCallback
     */
    removeListener : function(fnCallback){
        if(jindo.$Jindo.isFunction(fnCallback)){
            this._waListeners = this._waListeners.refuse(fnCallback);
        }
    },

    /**
     * 특정 프래그먼트가 자신의 패턴과 같은지 판단한다.
     * @param {string} sFragment
     * @returns {boolean}
     */
    match : function(sFragment){
        if(jindo.$Jindo.isString(sFragment)){
            return this._oPattern.test(sFragment);
        }
    }
});
