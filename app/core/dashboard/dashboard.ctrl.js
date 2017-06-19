'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yeomanApp
 */
angular.module('app.core.dashboard')
	.controller('app.core.dashboardCtrl',
	function ($scope, searchesStorage, soundCloudApi) {

		$scope.currentSearch = {
			query: null,
			currentPage: 1,
			hasNext: false,
			selectedTrack: false
		};

		$scope.listStyle = {
			type: 'list'
		};

		$scope.searches = searchesStorage.getSearches();

		$scope.tracks = null;
        $scope.trackSearch = {};
		$scope.searches = searchesStorage.getSearches();

		$scope.searchTracks = function (query, page) {

            $scope.trackSearch.query = query;
            $scope.currentSearch.currentPage = page;
            $scope.currentSearch.query = query;

			soundCloudApi.searchTracks({ query: query, page: page }, function (tracks, hasNext) {
				$scope.$apply(function () {
                    $scope.tracks = tracks;
                    $scope.currentSearch.hasNext = hasNext;
                });
            });

            searchesStorage.addSearch(query);
            $scope.searches = searchesStorage.getSearches();

        };

        $scope.next = function () {
            $scope.searchTracks($scope.currentSearch.query, $scope.currentSearch.currentPage + 1)
        };

        $scope.back = function () {
            $scope.searchTracks($scope.currentSearch.query, $scope.currentSearch.currentPage - 1)
        };

        $scope.selectTrack = function (trackIdx) {
			$scope.currentSearch.selectedTrack = angular.copy($scope.tracks[trackIdx]);

            if ($scope.currentSearch.player) {
                $scope.currentSearch.player.pause();
			}

			$scope.currentSearch.player = null;
        };

        $scope.selectedTrackPlayer = function (action) {
            if ($scope.currentSearch.player) {

            	if (action === 'play') {
                    $scope.currentSearch.player.play();
				}
				else if (action === 'pause') {
                    $scope.currentSearch.player.pause();
                }
			}
			else {
                soundCloudApi.getPlayer($scope.currentSearch.selectedTrack.id, function (player) {
                    $scope.currentSearch.player = player;
                    player.play();
                });
			}
        };



	});
