/**
 * Created by dhy on 17/3/20.
 */
angular.module("labelModel", []).directive('labelModel', ["$http", function () {
    return {
        restrict: 'AE',
        scope: {
            historyLabel: "=",
            selectedLabel : "="
        },
        templateUrl: 'tpls/historyLabel.html',
        controller: function ($scope, $element, $http) {
            $http({
                url: "data.json",
                method: "GET"
            }).success(function (data) {
                var $expandibleTree = $('#tree1').treeview({
                    data: data.result,
                    levels: 1,
                    showTags: true,
                    multiSelect: true
                });
                var findExpandibleNodess = function () {
                    return $expandibleTree.treeview('search', [$('#input-expand-node1').val(), {
                        ignoreCase: false,
                        exactMatch: false
                    }]);
                };
                var expandibleNodes = findExpandibleNodess();
                $('#input-expand-node1').on('keyup', function () {
                    expandibleNodes = findExpandibleNodess();
                });

            })
            $scope.completeSelect = function () {
                var tempList = $('#tree1').treeview('getSelected');
                for (var i = 0, len = tempList.length; i < len; i++) {
                    var labelID = tempList[i].id;
                    $scope.selectedLabel[labelID] = tempList[i];
                }
                if ($scope.tempLabel) {
                    Object.assign($scope.selectedLabel, $scope.tempLabel)
                }
                $scope.$emit('selectLabel', $scope.selectedLabel);
                $scope.treeFlag     = false;
                $scope.tempLabel    = {};
                for (var i in tempList) {
                    $('#tree1').treeview('toggleNodeSelected', [ tempList[i].nodeId, { silent: false } ]);
                }

            };
            $scope.tempLabel        = {};
            $scope.selectLabel = function (ele, $index) {
                $scope.historyLabel[$index].selected = !$scope.historyLabel[$index].selected;
                if ($scope.tempLabel[ele.id]) {
                    delete $scope.tempLabel[ele.id]
                } else {
                    $scope.tempLabel[ele.id] = ele;
                }
            };
            $scope.deleteLabel = function (ele) {
                delete $scope.selectedLabel[ele.id]
            }

        }
    }
}]);