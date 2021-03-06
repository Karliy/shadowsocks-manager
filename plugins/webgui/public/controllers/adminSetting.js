const app = angular.module('app');

app.controller('AdminSettingsController', ['$scope', '$http', '$timeout', '$state',
  ($scope, $http, $timeout, $state) => {
    $scope.setTitle('设置');
    $scope.toNotice = () => {
      $state.go('admin.notice');
    };
    $scope.toPayment = () => {
      $state.go('admin.paymentSetting');
    };
    $scope.toAccount = () => {
      $state.go('admin.accountSetting');
    };
    $scope.toBase = () => {
      $state.go('admin.baseSetting');
    };
    $scope.empty = () => {};
  }
]).controller('AdminPaymentSettingController', ['$scope', '$http', '$timeout', '$state',
  ($scope, $http, $timeout, $state) => {
    $scope.setTitle('支付设置');
    $scope.setMenuButton('arrow_back', 'admin.settings');
    $scope.time = [{
      id: 'hour',
      name: '小时',
    }, {
      id: 'day',
      name: '天',
    }, {
      id: 'week',
      name: '周',
    }, {
      id: 'month',
      name: '月',
    }, {
      id: 'season',
      name: '季',
    }, {
      id: 'year',
      name: '年',
    }];
    let lastSave = 0;
    let lastSavePromise = null;
    const saveTime = 3500;
    $scope.saveSetting = () => {
      if(Date.now() - lastSave <= saveTime) {
        lastSavePromise && $timeout.cancel(lastSavePromise);
      }
      const timeout = Date.now() - lastSave >= saveTime ? 0 : saveTime - Date.now() + lastSave;
      lastSave = Date.now();
      lastSavePromise = $timeout(() => {
        $http.put('/api/admin/setting/payment', {
          data: $scope.paymentData,
        });
      }, timeout);
    };
    $http.get('/api/admin/setting/payment').then(success => {
      $scope.paymentData = success.data;
      $scope.$watch('paymentData', () => {
        $scope.saveSetting();
      }, true);
    });
    
  }
]).controller('AdminAccountSettingController', ['$scope', '$http', '$timeout', '$state',
  ($scope, $http, $timeout, $state) => {
    $scope.setTitle('账号设置');
    $scope.setMenuButton('arrow_back', 'admin.settings');
    let lastSave = 0;
    let lastSavePromise = null;
    const saveTime = 3500;
    $scope.saveSetting = () => {
      if(Date.now() - lastSave <= saveTime) {
        lastSavePromise && $timeout.cancel(lastSavePromise);
      }
      const timeout = Date.now() - lastSave >= saveTime ? 0 : saveTime - Date.now() + lastSave;
      lastSave = Date.now();
      lastSavePromise = $timeout(() => {
        $http.put('/api/admin/setting/account', {
          data: $scope.accountData,
        });
      }, timeout);
    };
    $http.get('/api/admin/setting/account').then(success => {
      $scope.accountData = success.data;
      $scope.$watch('accountData', () => {
        $scope.saveSetting();
      }, true);
    });
  }
]).controller('AdminBaseSettingController', ['$scope', '$http', '$timeout', '$state',
  ($scope, $http, $timeout, $state) => {
    $scope.setTitle('基本设置');
    $scope.setMenuButton('arrow_back', 'admin.settings');
    let lastSave = 0;
    let lastSavePromise = null;
    const saveTime = 3500;
    $scope.saveSetting = () => {
      if(Date.now() - lastSave <= saveTime) {
        lastSavePromise && $timeout.cancel(lastSavePromise);
      }
      const timeout = Date.now() - lastSave >= saveTime ? 0 : saveTime - Date.now() + lastSave;
      lastSave = Date.now();
      lastSavePromise = $timeout(() => {
        $http.put('/api/admin/setting/base', {
          data: $scope.baseData,
        });
      }, timeout);
    };
    $http.get('/api/admin/setting/base').then(success => {
      $scope.baseData = success.data;
      $scope.$watch('baseData', () => {
        $scope.saveSetting();
      }, true);
    });
    $scope.colors = [
      { value: 'red', color: '#F44336' },
      { value: 'pink', color: '#E91E63' },
      { value: 'purple', color: '#9C27B0' },
      { value: 'deep-purple', color: '#673AB7' },
      { value: 'indigo', color: '#3F51B5' },
      { value: 'blue', color: '#2196F3' },
      { value: 'light-blue', color: '#03A9F4' },
      { value: 'cyan', color: '#00BCD4' },
      { value: 'teal', color: '#009688' },
      { value: 'green', color: '#4CAF50' },
      { value: 'light-green', color: '#8BC34A' },
      { value: 'lime', color: '#CDDC39' },
      { value: 'yellow', color: '#FFEB3B' },
      { value: 'amber', color: '#FFC107' },
      { value: 'orange', color: '#FF9800' },
      { value: 'deep-orange', color: '#FF5722' },
      { value: 'brown', color: '#795548' },
      { value: 'blue-grey', color: '#607D8B' },
      { value: 'grey', color: '#9E9E9E' },
    ];
    $scope.setPrimaryColor = color => {
      $scope.baseData.themePrimary = color;
    };
    $scope.setAccentColor = color => {
      $scope.baseData.themeAccent = color;
    };
  }
]);