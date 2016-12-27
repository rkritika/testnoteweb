(function() {
  var app = angular.module('myApp')
  app.controller('homeCtrl', function($scope, $location, $anchorScroll, $document, $timeout,
    AppManager, $window, auth, $http, $state, $mdDialog, md5) {
    var token = auth.getToken()
    $scope.isLoggedIn = (token != undefined)

    if ($scope.isLoggedIn) {
      $scope.user_id = auth.getToken().user_id
      $scope.access_token = auth.getToken().access_token
    }
    // $scope.events = { "nearby": [{ "id": "11464947", "enable_location": "1", "latitude": "43.6092", "longitude": "7.1265", "location_infos_uni": "CASINO JOA La Siesta, Antibes", "location_infos": "0", "user_id": "22323", "created_time": "1481073595", "time": "1481135400", "has_end": "0", "time_end": "0", "name": "RE ENTRY RANKING SUR  3 MOIS", "category": "Poker", "description": "Texas Hold'em No Limit\nPrix entrée : 100 €\n60 max. entrants\n\nPlus d'informations : http://en.clubpoker.net/poker-tournament/re-entry-ranking-3-mois/casino-joa-siesta/antibes/texas-hold-em/no-limit/100-%80/2016-12-07/18786", "comments": "0", "likes": "0", "photos_count": "0", "share_type": "1", "allow_add_photo": "0", "import_from": "0", "visible": "1", "link": "images/casinojoalasiesta/2016/Dec/Sat/d902d88b1b9b32320330178c5af84ec8.jpg", "width": "800", "height": "531", "avatar": "images/casinojoalasiesta/profile_picture/fb9305d535a969b331b774efe78ec851.jpg", "username": "casinojoalasiesta", "certified": "0", "fullname": "CASINO JOA La Siesta", "distance": "14.165366848208485", "tri_time": "30323", "tri_time_end": "-1481105077" }, { "id": "11253529", "enable_location": "1", "latitude": "43.70471200000001", "longitude": "7.280807000000001", "location_infos_uni": "NICE ACROPOLIS", "location_infos": "0", "user_id": "17414", "created_time": "1481100128", "time": "1481223600", "has_end": "0", "time_end": "0", "name": "BALLET & ORCH. OPERA NAT. DE RUSSIE", "category": "evenement", "description": "#spectacle\nHommage à Maurice Ravel, le ballet et l’orchestre de l’Opéra National de Russie présenteront en tournée le Boléro, l'un des plus grands succès du répertoire classique ! Ce ballet a depuis toujours conquis le grand public, et se classe parmi les œuvres les plus interprétées dans le monde entier. C’est notamment Maurice Béjart qui en 1961 monte avec la danseuse Duska Sifnios le Boléro de Maurice Ravel en ballet, qui devient une de ses chorégraphies les plus emblématiques. Le Boléro figure parmi les œuvres orchestrales les plus populaires, c’est Ida Rubinstein, amie et mécène du musicien, qui commande au compositeur déjà célèbre, un ballet à caractère espagnol. Ravel, toujours séduit par la danse, opte pour le boléro, une danse traditionnelle andalouse. L’oeuvre fait depuis l'objet de multiples versions chorégraphiques où la perfection et la virtuosité des danseurs donnent le ton. Pièce phare de l'histoire de la musique et de la danse, phénomène musical encore aujourd’hui, Boléro reste une des œuvres musicales françaises les plus reconnues au monde. Réservations pour les Personnes à Mobilité Réduite : 01 55 12 00 00", "comments": "0", "likes": "0", "photos_count": "0", "share_type": "1", "allow_add_photo": "0", "import_from": "0", "visible": "1", "link": "images/balletorchoperanationald/2016/Nov/Tue/01d98d541ef7dec4991c94f9703c1d77.jpg?1451455599000", "width": "800", "height": "911", "avatar": "images/balletorchoperanationald/profile_picture/6de02b6d0cbb943fe31c8d226735188a.jpg", "username": "balletorchoperanationald", "certified": "0", "fullname": "Ballet & Orch. Opéra national de Russie", "distance": "2.5313053823683744", "tri_time": "118523", "tri_time_end": "-1481105077" }, { "id": "11372795", "enable_location": "1", "latitude": "43.7050594", "longitude": "7.192585", "location_infos_uni": "Allianz Riviera", "location_infos": "0", "user_id": "17226", "created_time": "1480639797", "time": "1481227500", "has_end": "1", "time_end": "1481234700", "name": "Nice - FC Krasnodar", "category": "Football", "description": "@ogcnicecotedazur - @fkkrasnodar\nLigue Europa - Groupe I,  de 2016-2017", "comments": "0", "likes": "0", "photos_count": "0", "share_type": "1", "allow_add_photo": "0", "import_from": "0", "visible": "1", "link": "images/ligueeuropa/2016/Nov/Thu/af0f87c24b0b9be915a2ad0290bd3287.jpg", "width": "800", "height": "430", "avatar": "images/ligueeuropa/profile_picture/a57bdb6b88056fcb4bac53a6e57d9259.jpg", "username": "ligueeuropa", "certified": "0", "fullname": "Ligue Europa", "distance": "4.649573429723118", "tri_time": "122423", "tri_time_end": "129623" }, { "id": "11251325", "enable_location": "1", "latitude": "43.6951", "longitude": "7.2659", "location_infos_uni": "Casino Barrière de Nice - Le Ruhl, Nice", "location_infos": "0", "user_id": "20865", "created_time": "1481074111", "time": "1481229000", "has_end": "0", "time_end": "0", "name": "HEBDOMADAIRE DU JEUDI 65+15", "category": "Poker", "description": "Texas Hold'em No Limit\nPrix entrée : 80 €\nRebuy 2 h \n90 max. entrants\n\nPlus d'informations : http://en.clubpoker.net/poker-tournament/hebdomadaire-jeudi-65-15/casino-barriere-nice-ruhl/nice/texas-hold-em/no-limit/80-%80/2016-12-08/9227", "comments": "0", "likes": "0", "photos_count": "0", "share_type": "1", "allow_add_photo": "0", "import_from": "0", "visible": "1", "link": "images/casinobarrieredeniceleru/2016/Nov/Tue/11c521f6c89ca398a30e9c1d65e2aa1c.jpg", "width": "570", "height": "320", "avatar": "images/casinobarrieredeniceleru/profile_picture/d082d7faee7e611e91a06cf09f2f0285.jpg", "username": "casinobarrieredeniceleru", "certified": "0", "fullname": "Casino Barrière de Nice - Le Ruhl", "distance": "1.3895358044616837", "tri_time": "123923", "tri_time_end": "-1481105077" }, { "id": "11367685", "enable_location": "1", "latitude": "43.662796", "longitude": "7.131817", "location_infos_uni": "CAP CINEMA", "location_infos": "0", "user_id": "22308", "created_time": "1481010987", "time": "1481310000", "has_end": "0", "time_end": "0", "name": "CONFERENCE DU MEDIUM TROY WHISPER", "category": "evenement", "description": "#exposition #art\nCAP'CINEMA CAGNES SUR MER \nUn parcours bien atypique que celui de Troy, qui dès l'enfance est confronté à une réalité parallèle. Il est en présence de situations qu'il ne comprend pas, il Capte. Cette conférence raconte son parcours et ses combats. Totalement indépendant et farouchement solitaire, il refuse de dépendre de quelques groupe que ce soit. Se...\nPlus d'informations : http://www.fnacspectacles.com/place-spectacle/manifestation/Conference-CONFERENCE-DU-MEDIUM-TROY-WHISPER-QK4B1.htm", "comments": "0", "likes": "0", "photos_count": "0", "share_type": "1", "allow_add_photo": "0", "import_from": "0", "visible": "1", "link": "images/capcinemacagnessurmer/2016/Nov/Thu/8860aae8076437c1f139a14926780fea.jpg", "width": "800", "height": "466", "avatar": "images/capcinemacagnessurmer/profile_picture/38631f4901c4f9c738ab63f84a92acad.jpg", "username": "capcinemacagnessurmer", "certified": "0", "fullname": "Cap Cinema Cagnes Sur Mer", "distance": "10.36505735854485", "tri_time": "204923", "tri_time_end": "-1481105077" }, { "id": "11471316", "enable_location": "1", "latitude": "43.738418", "longitude": "7.424616", "location_infos_uni": "Krush Club", "location_infos": "0", "user_id": "6684", "created_time": "1481084813", "time": "1481410800", "has_end": "1", "time_end": "1481436000", "name": "Tech Node Luxe", "category": "nightlife", "description": "#concert #dj\nPrice : ? |                         \nMore information : https://www.residentadvisor.net/event.aspx?909406", "comments": "0", "likes": "0", "photos_count": "0", "share_type": "1", "allow_add_photo": "0", "import_from": "0", "visible": "1", "link": "images/bartskils/2016/Dec/Sun/68de116048a94f4224f8b9c18873f541.jpg", "width": "800", "height": "296", "avatar": "images/bartskils/profile_picture/da28f4959f1678c35ec5b4a4f7f747d8.jpg", "username": "bartskils", "certified": "0", "fullname": "Bart Skils", "distance": "14.668744392917239", "tri_time": "305723", "tri_time_end": "330923" }, { "id": "11263850", "enable_location": "1", "latitude": "43.7020467", "longitude": "7.274579600000001", "location_infos_uni": "THEATRE L'ALPHABET", "location_infos": "0", "user_id": "16196", "created_time": "1479212476", "time": "1481448600", "has_end": "0", "time_end": "0", "name": "AU PAYS DE LA MUSIQUE", "category": "spectacle", "description": "\nL'ALPHABET PRESENTE  Princesse Courgette est une jolie princesse  qui vit au pays de la musique avec ses meilleurs amis, Sam le Tam-tam, José le Ukulélé et Ruth la Flûte. Leur voisin, Mr Grognon, qui déteste le bruit, va kidnapper Sam, José et Ruth. Princesse Courgette à besoin de l’aide des enfants pour retrouver ses meilleurs amis… et tout ça… en musique !\navec : Mélody CHOIR", "comments": "0", "likes": "0", "photos_count": "0", "share_type": "1", "allow_add_photo": "0", "import_from": "0", "visible": "1", "link": "images/melodiechoir/2016/Nov/Tue/a077ffb652413828ddb09f4143e7357f.jpg?1474694712000", "width": "800", "height": "911", "avatar": "images/melodiechoir/profile_picture/584cdf19fe3f022ce8e83d8ee97df43c.jpg", "username": "melodiechoir", "certified": "0", "fullname": "Mélodie Choir", "distance": "1.9889901947559938", "tri_time": "343523", "tri_time_end": "-1481105077" }, { "id": "11259880", "enable_location": "1", "latitude": "43.678501", "longitude": "7.198956700000002", "location_infos_uni": "PALAIS NIKAIA", "location_infos": "0", "user_id": "1365", "created_time": "1481097141", "time": "1481742000", "has_end": "0", "time_end": "0", "name": "PHENIX TOUR", "category": "evenement", "description": "#spectacle\nBackline/VMA (L.752425) présentent ce concert. \nAprès 10 ans d’attente, Renaud fait son grand retour ! Le chanteur populaire et contestataire renaît de ses cendres tel un phénix, comme il aime se surnommer dorénavant. Porté par un nouvel album personnel et émouvant marqué par l’actualité et le besoin de reprendre la parole, Renaud présente son PHENIX TOUR ! Annoncé comme l’événement musical de l’année, cette tournée le portera dans toutes les régions de France, Belgique et Suisse. L'icône intergénérationnelle invite ses “aminches” à le rejoindre pour ce rendez-vous exceptionnel pour partager des titres inédits mais aussi ses plus grands tubes : Mistral Gagnant, Morgane de toi, Dans mon HLM, Laisse béton, Dès que le vent soufflera, Manu et tant d’autres… Personnes à Mobilité Réduite : 0494226677", "comments": "0", "likes": "0", "photos_count": "0", "share_type": "1", "allow_add_photo": "0", "import_from": "0", "visible": "1", "link": "images/renaud/2016/Nov/Tue/6ed37851557d5969dc582ea72d2a6422.jpg?1457941970000", "width": "800", "height": "911", "avatar": "images/renaud/profile_picture/2564551ba8de7d9e7e32f9ca0ba11eb8.jpg", "username": "renaud", "certified": "1", "fullname": "Renaud", "distance": "4.749597575461145", "tri_time": "636923", "tri_time_end": "-1481105077" }, { "id": "11252721", "enable_location": "1", "latitude": "43.70471200000001", "longitude": "7.280807000000001", "location_infos_uni": "NICE ACROPOLIS", "location_infos": "0", "user_id": "15763", "created_time": "1481070402", "time": "1481830200", "has_end": "0", "time_end": "0", "name": "VOUS FAIT PLAISIR", "category": "evenement", "description": "#spectacle\nEN ACCORD AVEC LITTLE BROS. DIRECTO PRODUCTIONS (2-1054032/33) présentent ce spectacle \nArnaud Ducret dans \"Vous fait plaisir\" Sa galerie de personnages va vous épater, vous ébahir, vous interloquer et vous réjouir. Où est-il allé chercher ces énergumènes tous plus pittoresques et hauts en couleurs les uns que les autres ? A y regarder de plus près, il n'incarne pas plus de cinq personnages. Mais quels personnages ! : John Breakdown, prof de danse précieux et caractériel; Jean-Jacques Pitou, alias Maître Li, prof de karaté tout en muscles sauf dans la tête ; Luc, le fumeur opéré du larynx qui veut se lancer dans la chanson pour faire un tabac ; Sylvie, l'allumeuse allumée et son Jack Rabbit de compagnie ; et lui. Arnaud Ducret himself, à qui il arrive toutes sortes de péripéties et qui croise une poignée d'individus plutôt gratinés. Grand, beau et fort, doté d'un charisme insupportable et d'un sourire à faire se pâmer toute la gent féminine, Arnaud Ducret a ceci de paradoxal qu'il n'aime rien tant que de se ridiculiser.Il a élevé l'autodérision au rang d'art. Quand les fées se sont penchées sur le berceau de cette petite armoire normande pour lui distribuer quelques dons, elles l'ont gâté au-delà du raisonnable. Il sait tout faire : il chante, il danse, il joue ô combien la comédie, il fait du mime, du bruitage, de la beatbox, il prend des accents...Et comme c'est un garçon sociable et généreux, ces dons, il tient à les partager avec vous, à vous en faire profiter ", "comments": "0", "likes": "0", "photos_count": "0", "share_type": "1", "allow_add_photo": "0", "import_from": "0", "visible": "1", "link": "images/arnaudducret/2016/Nov/Tue/2eccb46e31d8bf7c2c64d66062d185f1.jpg?1414503602000", "width": "800", "height": "911", "avatar": "images/arnaudducret/profile_picture/0638974c21d34b35ac9a4b2a03b67178.jpg", "username": "arnaudducret", "certified": "0", "fullname": "Arnaud Ducret", "distance": "2.5313053823683744", "tri_time": "725123", "tri_time_end": "-1481105077" }], "offset": 20, "more": true }
    // $scope.data = $scope.events.nearby
    $scope.posts = {
      data: []
    };
    $scope.pos = {}
    $scope.show = function() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            $scope.pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + $scope.pos.lat + "," + $scope.pos.lng + "&sensor=true";
            $http.get(url)
              .then(function(result) {
                var address = result.data.results[2].formatted_address;
                $scope.address = address;
                console.log($scope.address)
              });
          })
        }
      }
      // $scope.myCalendar = function() {
    $scope.search = function(lat, long, offset) {
      $scope.slickConfig1Loaded = false;
      AppManager.getEventsByLocation(lat, long, offset)
        .then(function(result) {
          $scope.data = result.data.nearby
          console.log($scope.data)
          if ($scope.data !== undefined && $scope.data !== null && $scope.data.length != 0) {
            $scope.getEvents(result.data.nearby)

          } else {
            console.log('no data')
          }
          var someElement = angular.element(document.getElementById('demo'));
          console.log(someElement)
          $document.scrollToElement(someElement, 30, 2000);
        })
    }
    $scope.goToUser = function(user_id) {
      // console.log(event)
      // event.user_id = $scope.user_id
      $location.path('/calendar/' + user_id)

      // $state.go('calendar', { user_id: user_id });
    }

    //   // console.log(auth.getToken())
    // }
    $scope.pos.lat = undefined;
    $scope.pos.lng = undefined;

    $scope.$on('gmPlacesAutocomplete::placeChanged', function() {
      // console.log( $scope.address.getPlace())
      var location = $scope.address.getPlace().geometry.location;
      $scope.pos.lat = location.lat();
      $scope.pos.lng = location.lng();
      // $scope.address = $scope.autocomplete;
      $scope.$apply();
    });
    $scope.baseurl = 'http://api.gotimenote.com/'

    $scope.getEvents = function(data) {
      $scope.slickConfig1Loaded = true;

      var l = data.length
      for (i = 0; i < l; i++) {
        console.log(data[i])
        var temp = data[i].link
        temp = temp.split('.')
        data[i].link = $scope.baseurl + temp[0] + '_medium.jpg'
        $scope.posts.data.push(data[i])
      }
      // $scope.updateEvents()
    }


    $scope.updateEvents = function() {
      $scope.slickConfig1Loaded = false;
      var count = $scope.data.length
      var off = $scope.posts.data.length;
      var n = count;
      var data = [];
      for (i = off; i < off + count, n > 0; ++i, n--) {
        data.push($scope.data[count - n]);
      }
      $scope.posts.data = $scope.posts.data.concat(data)
      console.log($scope.posts.data.length)
      $timeout(function() {
        $scope.slickConfig1Loaded = true;
      }, 5);
    }
    $scope.currentIndex = 0;
    $scope.slickConfig2 = {
      centerMode: true,
      centerPadding: '60px',
      speed: 100,
      lazyLoad: 'ondemand',
      infinite: true,
      slidesToShow: 3,
      responsive: [{
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          speed: 100,
          centerPadding: '30px',
          slidesToShow: 3
        }
      }, {
        breakpoint: 480,
        settings: {
          arrows: true,
          speed: 100,

          centerMode: false,
          slidesToShow: 1
        }
      }],
      event: {
        afterChange: function(event, slick, currentSlide, nextSlide) {
          $scope.currentIndex = currentSlide; // save current index each time
          console.log($scope.currentIndex)
        },
        init: function(event, slick) {
          // console.log(event)
          return slick.slickGoTo($scope.currentIndex, false); // slide to correct index when init
        }

      }
    };

    // $scope.$watch('currentIndex', function(newValue, oldValue) {
    //   var a = newValue + 3
    //   if (a % 9 == 0) {
    //     $scope.updateEvents()
    //   }
    // })

    $scope.logout = function() {
      auth.logout()
      $window.location.reload()
    }
    $scope.showAdvanced = function(ev) {
      $mdDialog.show({
          controller: DialogController,
          templateUrl: 'dialog1.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
          $window.location.reload()
          $scope.status = 'You said the information was \n"' + answer;
          console.log($scope.status)
        }, function() {
          $scope.status = 'You cancelled the dialog.';
          console.log($scope.status)
          console.log($scope.status)

        });
    };

    function DialogController($scope, $mdDialog, auth) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      console.log(auth.isLoggedIn())

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };

      $scope.login = function(user, password) {
        var pass = md5.createHash(password)
        AppManager.login(user, pass)
          .then(function(result) {
            console.log(result)
            var result = result
            if (result.success === "true") {
              var access_token = result.data.access_token
              var user_id = result.data.user_id
              var token = {
                access_token: access_token,
                user_id: user_id
              }
              auth.setToken(token)
            } else {
              console.log('Invalid username/password')
            }
            return result
          })
          .then(function(result) {
            $scope.answer(JSON.stringify(result))
          })
      }


    }

  });

})()
