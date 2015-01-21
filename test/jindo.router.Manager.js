QUnit.module('Router Manager Test', {
    beforeEach : function(){
        jindo.router = new jindo.$Router();
    },
    afterEach : function(){
        jindo.router.destroy();
        jindo.router = null;
    }
});

QUnit.test('사용자는 라우터를 생성할 수 있다.', function(assert){
    var oRoute = jindo.router.register('/my/friends/');

    assert.equal(oRoute.key(), '/my/friends');
    assert.equal(oRoute.match('/#/my/friends/'), true);
    assert.equal(oRoute.match('#/my/friends/'), true);
    assert.equal(oRoute.match('/my/friends/'), true);
    assert.equal(oRoute.match('/my/friends'), true);
});

QUnit.test('사용자는 숫자 형식의 세그먼트를 지원하는 라우터를 생성할 수 있다.', function(assert){
    var oRoute1 = jindo.router.register('/my/friends/:friend'),
        oRoute2 = jindo.router.register('/my/friends/:friend/jobs/:job'),
        oRoute3 = jindo.router.register('/sections/:section/:article');

    assert.equal(oRoute1.match('/my/friends/1111'), true);
    assert.equal(oRoute2.match('/my/friends/1111/jobs/1111'), true);
    assert.equal(oRoute3.match('/sections/1111/1111'), true);
});

QUnit.test('사용자가 동일한 형식의 라우터를 선언하면 이미 존재하는 라우터를 반환한다.', function(assert){
    var oRoute1 = jindo.router.register('/my/friends'),
        oRoute2 = jindo.router.register('/my/friends');

    assert.equal(jindo.router.count(), 1);
    assert.equal(oRoute1, oRoute2);
});

QUnit.test('사용자는 라우터와 리스너를 생성하고 등록할 수 있다.', function(assert){
    var fnListener = function(){},
        oRoute = jindo.router.register('/my/friends', fnListener);

    assert.equal(oRoute.listeners().length(), 1);
    assert.equal(oRoute.listeners().get(0), fnListener);
});

QUnit.test('사용자는 이미 생성된 라우터에 리스너를 등록할 수 있다.', function(assert){
    var fnListener1 = function(){},
        fnListener2 = function(){},
        oRoute1 = jindo.router.register('/my/friends'),
        oRoute2 = jindo.router.register('/my/friends', fnListener1);

    oRoute1.addListener(fnListener2);

    assert.equal(oRoute1, oRoute2);
    assert.equal(oRoute1.listeners().length(), 2);
    assert.equal(oRoute1.listeners().get(1), fnListener2);
});

QUnit.test('사용자는 라우터를 제거할 수 있다.', function(assert){
    jindo.router.register('/my/friends');
    jindo.router.register('/my/friends/:friend');

    jindo.router.unregister('/my/friends');
    jindo.router.unregister('/my/friends/:friend');

    assert.equal(jindo.router.count(), 0);
});

QUnit.test('사용자는 특정 라우터의 리스너를 해제할 수 있다.', function(assert){
    var fnListener1 = function(){},
        fnListener2 = function(){},
        oRoute = jindo.router.register('/my/friends');

    oRoute.addListener(fnListener1);
    oRoute.addListener(fnListener2);
    oRoute.removeListener(fnListener1);
    jindo.router.unregister('/my/friends', fnListener2);

    assert.equal(oRoute.listeners().length(), 0);
});
