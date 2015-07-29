angular.module("umbraco")
    .directive("gridCodeEditor", function ($timeout) {
        return {
            restrict: 'E',
            replace: 'true',
            template: "<textarea></textarea>",
            scope: {
                value: '=',
                language: '='
            },
            link: function (scope, elem) {

                scope.isLoading = true;

                function init(language) {
                    if (!scope.editor) {
                        scope.editor = CodeMirror.fromTextArea(elem[0], {
                            mode: language,
                            lineNumbers: true,
                            matchBrackets: true,
                            onChange: function() {
                                // update the model constantly
                                var newValue = scope.editor.getValue();
                                if (scope.value !== newValue) {
                                    $timeout(function() {
                                        scope.value = newValue;
                                    });
                                }
                            }
                        });

                        if (scope.value)
                            scope.editor.setValue(scope.value);

                        scope.isLoading = false;
                    } else {
                        scope.editor.setOption("mode", language);
                    }
                }

                scope.$watch('language', function(language) {
                    if (language) {
                        init(language);
                    }
                });


                // This is a hack to omit a bug in codemirror, when the codemirror control is not visible, the plugin
                // will not load correctly.
                $(document).find('a[href=#' + $(elem[0]).parents('.umb-tab-pane').attr('id') + ']').click(function (e) {
                    $timeout(function () {
                        if(scope.editor)
                            scope.editor.refresh();
                    }, 500, false);
                });
            }
        };
    });