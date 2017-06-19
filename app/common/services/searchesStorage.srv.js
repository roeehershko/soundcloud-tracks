/**
 * Created by roee on 6/5/2017.
 */
angular.module('app.common.services')
    .service('searchesStorage', function (localStorageService) {

        var searches = localStorageService.get('searches');

        searches = JSON.parse(searches) || [];

        return {
            getSearches: function () {
                return searches;
            },
            addSearch: function (search) {
                var idx = searches.indexOf(search);

                if (idx !== -1) {
                    searches.splice(idx, 1);
                }

                searches.push(search);

                if (searches.length > 5) {
                    searches = searches.slice(searches.length - 5, searches.length);
                }

                localStorageService.set('searches', JSON.stringify(searches));
            }
        }
    });