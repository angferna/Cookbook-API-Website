/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var userCtrlStub = {
    index: 'userCtrl.index',
    destroy: 'userCtrl.destroy',
    me: 'userCtrl.me',
    changePassword: 'userCtrl.changePassword',
    show: 'userCtrl.show',
    create: 'userCtrl.create'
};

var authServiceStub = {
    isAuthenticated() {
        return 'authService.isAuthenticated';
    },
    hasRole(role) {
        return `authService.hasRole.${role}`;
    }
};

var routerStub = {
    get: sinon.spy(),
    put: sinon.spy(),
    post: sinon.spy(),
    delete: sinon.spy()
};

// require the index with our stubbed out modules
var userIndex = proxyquire('./index', {
    express: {
        Router() {
            return routerStub;
        }
    },
    './users.controller': userCtrlStub,
    '../../auth/auth.service': authServiceStub
});

describe('User API Router:', function() {
    it('should return an express router instance', function() {
        expect(userIndex).to.equal(routerStub);
    });

    describe('GET /api/users', function() {
        it('should verify admin role and route to users.controller.index', function() {
            expect(routerStub.get
                .withArgs('/', 'authService.hasRole.admin', 'userCtrl.index')
                ).to.have.been.calledOnce;
        });
    });

    describe('DELETE /api/users/:id', function() {
        it('should verify admin role and route to users.controller.destroy', function() {
            expect(routerStub.delete
                .withArgs('/:id', 'authService.hasRole.admin', 'userCtrl.destroy')
                ).to.have.been.calledOnce;
        });
    });

    describe('GET /api/users/me', function() {
        it('should be authenticated and route to users.controller.me', function() {
            expect(routerStub.get
                .withArgs('/me', 'authService.isAuthenticated', 'userCtrl.me')
                ).to.have.been.calledOnce;
        });
    });

    describe('PUT /api/users/:id/password', function() {
        it('should be authenticated and route to users.controller.changePassword', function() {
            expect(routerStub.put
                .withArgs('/:id/password', 'authService.isAuthenticated', 'userCtrl.changePassword')
                ).to.have.been.calledOnce;
        });
    });

    describe('GET /api/users/:id', function() {
        it('should be authenticated and route to users.controller.show', function() {
            expect(routerStub.get
                .withArgs('/:id', 'authService.isAuthenticated', 'userCtrl.show')
                ).to.have.been.calledOnce;
        });
    });

    describe('POST /api/users', function() {
        it('should route to users.controller.create', function() {
            expect(routerStub.post
                .withArgs('/', 'userCtrl.create')
                ).to.have.been.calledOnce;
        });
    });
});
