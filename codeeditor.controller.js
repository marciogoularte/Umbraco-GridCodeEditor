angular.module("umbraco")
	.controller("GridCodeEditorController",
	function ($scope, assetsService) {

	    if (!$scope.control.config) {
	        $scope.control.config = {};
	        $scope.mode = 'javascript';
	    } else {
	        $scope.mode = $scope.control.config.language;
	    }


	    $scope.$watch('mode', function(mode) {
	        setMode(mode);
	    });

	    function setMode(mode) {
	        assetsService
                .load([
                    "/umbraco_client/CodeMirror/Js/Mode/" + mode + "/" + mode + ".js"
                ]).then(function () {
	                $scope.control.config.language = mode;
                    $scope.language = mode;
                });
	    }
	});