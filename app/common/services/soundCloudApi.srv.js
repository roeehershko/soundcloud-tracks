/**
 * Created by roee on 6/5/2017.
 */
angular.module('app.common.services')
    .service('soundCloudApi', function () {
        var client_id = 'ggX0UomnLs0VmW7qZnCzw';

        SC.initialize({
            client_id: client_id
        });

        return {
            searchTracks: function (data, cb) {

                var apiData = {
                    limit: 6,
                    offset: (data.page - 1) * 6,
                    q: data.query,
                    linked_partitioning: 1

                };

                SC.get('/tracks', apiData).then(function (tracks) {
                    cb(tracks.collection, !! tracks.next_href);
                });
            },

            getPlayer: function (trackId, cb) {
                SC.stream('/tracks/' + trackId).then(function(player){
                    cb(player);
                });
            }
        }
    });