＃angular-bootstrap-treeview
==========================
项目中用到了个基于bootstrap-treeview的小插件 简单的封装了下，顺便贡献出来；<br>
大概样子如图所示：
![image](http://on20i35c9.bkt.clouddn.com/github/20170319164618.png)
## 使用方式
引入这4个js文件，1个css文件

		<link rel="stylesheet" href="css/bootstrap.min.css">
	   <link rel="stylesheet" href="css/angular-treeview.css">
		<script src="js/angular.min.js"></script>
		<script src="js/jquery.min.js"></script>
		<script src="js/bootstrap-treeview.min.js"></script>
		<script src="js/angular%20treeview.js"></script>

模块注入

		    var myApp = angular.module('myApp', ["labelModel"]);


## HTML
		    
		    <label-model history-label="historyLabelList" selected-label="selectedLabel"></label-model>

historyLabelList是最近使用的标签，储存在localStorage；

selectedLabel 已选择的标签；显示在输入框；

## controller：
取出localStorage中最近使用的标签；
		
		var productLabel = window.localStorage.getItem('productLabel');  
        if (productLabel) {
            $scope.historyLabelList = JSON.parse(productLabel);
        } else {
            $scope.historyLabelList = [];
        }
        
        
## 已选择的标签，储存到localStorage；
        $scope.selectedLabel = {};
        $scope.$on("selectLabel", function (event, data) {
            for (var i = 0 in data) {
                $scope.historyLabelList.unshift(data[i])
            }
            $scope.historyLabelList = $scope.historyLabelList.slice(0, 5);
            window.localStorage.setItem('productLabel', JSON.stringify($scope.historyLabelList))
        })
        
## 数据格式
示例在data.json中
可以修改angular_treeview.js中的http请求获取服务端数据；