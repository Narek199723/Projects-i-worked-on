const STATES_AND_CITIES = {
  AL: {
    label: "Alabama",
    cities: [
      {
        code: "Birmingham",
        label: "Birmingham"
      },
      {
        code: "Montgomery",
        label: "Montgomery"
      },
      {
        code: "Mobile",
        label: "Mobile"
      },
      {
        code: "Huntsville",
        label: "Huntsville"
      },
      {
        code: "Tuscaloosa",
        label: "Tuscaloosa"
      },
      {
        code: "Hoover",
        label: "Hoover"
      },
      {
        code: "Dothan",
        label: "Dothan"
      },
      {
        code: "Auburn",
        label: "Auburn"
      },
      {
        code: "Decatur",
        label: "Decatur"
      },
      {
        code: "Madison",
        label: "Madison"
      },
      {
        code: "Florence",
        label: "Florence"
      },
      {
        code: "Gadsden",
        label: "Gadsden"
      }
    ]
  },
  AK: {
    label: "Alaska",
    cities: [
      {
        code: "Anchorage",
        label: "Anchorage"
      }
    ]
  },
  AS: {
    label: "American Samoa",
    cities: []
  },
  AZ: {
    label: "Arizona",
    cities: [
      {
        code: "Phoenix",
        label: "Phoenix"
      },
      {
        code: "Tucson",
        label: "Tucson"
      },
      {
        code: "Mesa",
        label: "Mesa"
      },
      {
        code: "Chandler",
        label: "Chandler"
      },
      {
        code: "Glendale",
        label: "Glendale"
      },
      {
        code: "Scottsdale",
        label: "Scottsdale"
      },
      {
        code: "Gilbert",
        label: "Gilbert"
      },
      {
        code: "Tempe",
        label: "Tempe"
      },
      {
        code: "Peoria",
        label: "Peoria"
      },
      {
        code: "Surprise",
        label: "Surprise"
      },
      {
        code: "Yuma",
        label: "Yuma"
      },
      {
        code: "Avondale",
        label: "Avondale"
      },
      {
        code: "Goodyear",
        label: "Goodyear"
      },
      {
        code: "Flagstaff",
        label: "Flagstaff"
      },
      {
        code: "Buckeye",
        label: "Buckeye"
      },
      {
        code: "Lake Havasu City",
        label: "Lake Havasu City"
      },
      {
        code: "Casa Grande",
        label: "Casa Grande"
      },
      {
        code: "Sierra Vista",
        label: "Sierra Vista"
      },
      {
        code: "Maricopa",
        label: "Maricopa"
      },
      {
        code: "Oro Valley",
        label: "Oro Valley"
      },
      {
        code: "Prescott",
        label: "Prescott"
      },
      {
        code: "Bullhead City",
        label: "Bullhead City"
      },
      {
        code: "Prescott Valley",
        label: "Prescott Valley"
      },
      {
        code: "Marana",
        label: "Marana"
      },
      {
        code: "Apache Junction",
        label: "Apache Junction"
      }
    ]
  },
  AR: {
    label: "Arkansas",
    cities: [
      {
        code: "Little Rock",
        label: "Little Rock"
      },
      {
        code: "Fort Smith",
        label: "Fort Smith"
      },
      {
        code: "Fayetteville",
        label: "Fayetteville"
      },
      {
        code: "Springdale",
        label: "Springdale"
      },
      {
        code: "Jonesboro",
        label: "Jonesboro"
      },
      {
        code: "North Little Rock",
        label: "North Little Rock"
      },
      {
        code: "Conway",
        label: "Conway"
      },
      {
        code: "Rogers",
        label: "Rogers"
      },
      {
        code: "Pine Bluff",
        label: "Pine Bluff"
      },
      {
        code: "Bentonville",
        label: "Bentonville"
      }
    ]
  },
  CA: {
    label: "California",
    cities: [
      {
        code: "Los Angeles",
        label: "Los Angeles"
      },
      {
        code: "San Diego",
        label: "San Diego"
      },
      {
        code: "San Jose",
        label: "San Jose"
      },
      {
        code: "San Francisco",
        label: "San Francisco"
      },
      {
        code: "Fresno",
        label: "Fresno"
      },
      {
        code: "Sacramento",
        label: "Sacramento"
      },
      {
        code: "Long Beach",
        label: "Long Beach"
      },
      {
        code: "Oakland",
        label: "Oakland"
      },
      {
        code: "Bakersfield",
        label: "Bakersfield"
      },
      {
        code: "Anaheim",
        label: "Anaheim"
      },
      {
        code: "Santa Ana",
        label: "Santa Ana"
      },
      {
        code: "Riverside",
        label: "Riverside"
      },
      {
        code: "Stockton",
        label: "Stockton"
      },
      {
        code: "Chula Vista",
        label: "Chula Vista"
      },
      {
        code: "Irvine",
        label: "Irvine"
      },
      {
        code: "Fremont",
        label: "Fremont"
      },
      {
        code: "San Bernardino",
        label: "San Bernardino"
      },
      {
        code: "Modesto",
        label: "Modesto"
      },
      {
        code: "Fontana",
        label: "Fontana"
      },
      {
        code: "Oxnard",
        label: "Oxnard"
      },
      {
        code: "Moreno Valley",
        label: "Moreno Valley"
      },
      {
        code: "Huntington Beach",
        label: "Huntington Beach"
      },
      {
        code: "Glendale",
        label: "Glendale"
      },
      {
        code: "Santa Clarita",
        label: "Santa Clarita"
      },
      {
        code: "Garden Grove",
        label: "Garden Grove"
      },
      {
        code: "Oceanside",
        label: "Oceanside"
      },
      {
        code: "Rancho Cucamonga",
        label: "Rancho Cucamonga"
      },
      {
        code: "Santa Rosa",
        label: "Santa Rosa"
      },
      {
        code: "Ontario",
        label: "Ontario"
      },
      {
        code: "Lancaster",
        label: "Lancaster"
      },
      {
        code: "Elk Grove",
        label: "Elk Grove"
      },
      {
        code: "Corona",
        label: "Corona"
      },
      {
        code: "Palmdale",
        label: "Palmdale"
      },
      {
        code: "Salinas",
        label: "Salinas"
      },
      {
        code: "Pomona",
        label: "Pomona"
      },
      {
        code: "Hayward",
        label: "Hayward"
      },
      {
        code: "Escondido",
        label: "Escondido"
      },
      {
        code: "Torrance",
        label: "Torrance"
      },
      {
        code: "Sunnyvale",
        label: "Sunnyvale"
      },
      {
        code: "Orange",
        label: "Orange"
      },
      {
        code: "Fullerton",
        label: "Fullerton"
      },
      {
        code: "Pasadena",
        label: "Pasadena"
      },
      {
        code: "Thousand Oaks",
        label: "Thousand Oaks"
      },
      {
        code: "Visalia",
        label: "Visalia"
      },
      {
        code: "Simi Valley",
        label: "Simi Valley"
      },
      {
        code: "Concord",
        label: "Concord"
      },
      {
        code: "Roseville",
        label: "Roseville"
      },
      {
        code: "Victorville",
        label: "Victorville"
      },
      {
        code: "Santa Clara",
        label: "Santa Clara"
      },
      {
        code: "Vallejo",
        label: "Vallejo"
      },
      {
        code: "Berkeley",
        label: "Berkeley"
      },
      {
        code: "El Monte",
        label: "El Monte"
      },
      {
        code: "Downey",
        label: "Downey"
      },
      {
        code: "Costa Mesa",
        label: "Costa Mesa"
      },
      {
        code: "Inglewood",
        label: "Inglewood"
      },
      {
        code: "Carlsbad",
        label: "Carlsbad"
      },
      {
        code: "San Buenaventura (Ventura)",
        label: "San Buenaventura (Ventura)"
      },
      {
        code: "Fairfield",
        label: "Fairfield"
      },
      {
        code: "West Covina",
        label: "West Covina"
      },
      {
        code: "Murrieta",
        label: "Murrieta"
      },
      {
        code: "Richmond",
        label: "Richmond"
      },
      {
        code: "Norwalk",
        label: "Norwalk"
      },
      {
        code: "Antioch",
        label: "Antioch"
      },
      {
        code: "Temecula",
        label: "Temecula"
      },
      {
        code: "Burbank",
        label: "Burbank"
      },
      {
        code: "Daly City",
        label: "Daly City"
      },
      {
        code: "Rialto",
        label: "Rialto"
      },
      {
        code: "Santa Maria",
        label: "Santa Maria"
      },
      {
        code: "El Cajon",
        label: "El Cajon"
      },
      {
        code: "San Mateo",
        label: "San Mateo"
      },
      {
        code: "Clovis",
        label: "Clovis"
      },
      {
        code: "Compton",
        label: "Compton"
      },
      {
        code: "Jurupa Valley",
        label: "Jurupa Valley"
      },
      {
        code: "Vista",
        label: "Vista"
      },
      {
        code: "South Gate",
        label: "South Gate"
      },
      {
        code: "Mission Viejo",
        label: "Mission Viejo"
      },
      {
        code: "Vacaville",
        label: "Vacaville"
      },
      {
        code: "Carson",
        label: "Carson"
      },
      {
        code: "Hesperia",
        label: "Hesperia"
      },
      {
        code: "Santa Monica",
        label: "Santa Monica"
      },
      {
        code: "Westminster",
        label: "Westminster"
      },
      {
        code: "Redding",
        label: "Redding"
      },
      {
        code: "Santa Barbara",
        label: "Santa Barbara"
      },
      {
        code: "Chico",
        label: "Chico"
      },
      {
        code: "Newport Beach",
        label: "Newport Beach"
      },
      {
        code: "San Leandro",
        label: "San Leandro"
      },
      {
        code: "San Marcos",
        label: "San Marcos"
      },
      {
        code: "Whittier",
        label: "Whittier"
      },
      {
        code: "Hawthorne",
        label: "Hawthorne"
      },
      {
        code: "Citrus Heights",
        label: "Citrus Heights"
      },
      {
        code: "Tracy",
        label: "Tracy"
      },
      {
        code: "Alhambra",
        label: "Alhambra"
      },
      {
        code: "Livermore",
        label: "Livermore"
      },
      {
        code: "Buena Park",
        label: "Buena Park"
      },
      {
        code: "Menifee",
        label: "Menifee"
      },
      {
        code: "Hemet",
        label: "Hemet"
      },
      {
        code: "Lakewood",
        label: "Lakewood"
      },
      {
        code: "Merced",
        label: "Merced"
      },
      {
        code: "Chino",
        label: "Chino"
      },
      {
        code: "Indio",
        label: "Indio"
      },
      {
        code: "Redwood City",
        label: "Redwood City"
      },
      {
        code: "Lake Forest",
        label: "Lake Forest"
      },
      {
        code: "Napa",
        label: "Napa"
      },
      {
        code: "Tustin",
        label: "Tustin"
      },
      {
        code: "Bellflower",
        label: "Bellflower"
      },
      {
        code: "Mountain View",
        label: "Mountain View"
      },
      {
        code: "Chino Hills",
        label: "Chino Hills"
      },
      {
        code: "Baldwin Park",
        label: "Baldwin Park"
      },
      {
        code: "Alameda",
        label: "Alameda"
      },
      {
        code: "Upland",
        label: "Upland"
      },
      {
        code: "San Ramon",
        label: "San Ramon"
      },
      {
        code: "Folsom",
        label: "Folsom"
      },
      {
        code: "Pleasanton",
        label: "Pleasanton"
      },
      {
        code: "Union City",
        label: "Union City"
      },
      {
        code: "Perris",
        label: "Perris"
      },
      {
        code: "Manteca",
        label: "Manteca"
      },
      {
        code: "Lynwood",
        label: "Lynwood"
      },
      {
        code: "Apple Valley",
        label: "Apple Valley"
      },
      {
        code: "Redlands",
        label: "Redlands"
      },
      {
        code: "Turlock",
        label: "Turlock"
      },
      {
        code: "Milpitas",
        label: "Milpitas"
      },
      {
        code: "Redondo Beach",
        label: "Redondo Beach"
      },
      {
        code: "Rancho Cordova",
        label: "Rancho Cordova"
      },
      {
        code: "Yorba Linda",
        label: "Yorba Linda"
      },
      {
        code: "Palo Alto",
        label: "Palo Alto"
      },
      {
        code: "Davis",
        label: "Davis"
      },
      {
        code: "Camarillo",
        label: "Camarillo"
      },
      {
        code: "Walnut Creek",
        label: "Walnut Creek"
      },
      {
        code: "Pittsburg",
        label: "Pittsburg"
      },
      {
        code: "South San Francisco",
        label: "South San Francisco"
      },
      {
        code: "Yuba City",
        label: "Yuba City"
      },
      {
        code: "San Clemente",
        label: "San Clemente"
      },
      {
        code: "Laguna Niguel",
        label: "Laguna Niguel"
      },
      {
        code: "Pico Rivera",
        label: "Pico Rivera"
      },
      {
        code: "Montebello",
        label: "Montebello"
      },
      {
        code: "Lodi",
        label: "Lodi"
      },
      {
        code: "Madera",
        label: "Madera"
      },
      {
        code: "Santa Cruz",
        label: "Santa Cruz"
      },
      {
        code: "La Habra",
        label: "La Habra"
      },
      {
        code: "Encinitas",
        label: "Encinitas"
      },
      {
        code: "Monterey Park",
        label: "Monterey Park"
      },
      {
        code: "Tulare",
        label: "Tulare"
      },
      {
        code: "Cupertino",
        label: "Cupertino"
      },
      {
        code: "Gardena",
        label: "Gardena"
      },
      {
        code: "National City",
        label: "National City"
      },
      {
        code: "Rocklin",
        label: "Rocklin"
      },
      {
        code: "Petaluma",
        label: "Petaluma"
      },
      {
        code: "Huntington Park",
        label: "Huntington Park"
      },
      {
        code: "San Rafael",
        label: "San Rafael"
      },
      {
        code: "La Mesa",
        label: "La Mesa"
      },
      {
        code: "Arcadia",
        label: "Arcadia"
      },
      {
        code: "Fountain Valley",
        label: "Fountain Valley"
      },
      {
        code: "Diamond Bar",
        label: "Diamond Bar"
      },
      {
        code: "Woodland",
        label: "Woodland"
      },
      {
        code: "Santee",
        label: "Santee"
      },
      {
        code: "Lake Elsinore",
        label: "Lake Elsinore"
      },
      {
        code: "Porterville",
        label: "Porterville"
      },
      {
        code: "Paramount",
        label: "Paramount"
      },
      {
        code: "Eastvale",
        label: "Eastvale"
      },
      {
        code: "Rosemead",
        label: "Rosemead"
      },
      {
        code: "Hanford",
        label: "Hanford"
      },
      {
        code: "Highland",
        label: "Highland"
      },
      {
        code: "Brentwood",
        label: "Brentwood"
      },
      {
        code: "Novato",
        label: "Novato"
      },
      {
        code: "Colton",
        label: "Colton"
      },
      {
        code: "Cathedral City",
        label: "Cathedral City"
      },
      {
        code: "Delano",
        label: "Delano"
      },
      {
        code: "Yucaipa",
        label: "Yucaipa"
      },
      {
        code: "Watsonville",
        label: "Watsonville"
      },
      {
        code: "Placentia",
        label: "Placentia"
      },
      {
        code: "Glendora",
        label: "Glendora"
      },
      {
        code: "Gilroy",
        label: "Gilroy"
      },
      {
        code: "Palm Desert",
        label: "Palm Desert"
      },
      {
        code: "Cerritos",
        label: "Cerritos"
      },
      {
        code: "West Sacramento",
        label: "West Sacramento"
      },
      {
        code: "Aliso Viejo",
        label: "Aliso Viejo"
      },
      {
        code: "Poway",
        label: "Poway"
      },
      {
        code: "La Mirada",
        label: "La Mirada"
      },
      {
        code: "Rancho Santa Margarita",
        label: "Rancho Santa Margarita"
      },
      {
        code: "Cypress",
        label: "Cypress"
      },
      {
        code: "Dublin",
        label: "Dublin"
      },
      {
        code: "Covina",
        label: "Covina"
      },
      {
        code: "Azusa",
        label: "Azusa"
      },
      {
        code: "Palm Springs",
        label: "Palm Springs"
      },
      {
        code: "San Luis Obispo",
        label: "San Luis Obispo"
      },
      {
        code: "Ceres",
        label: "Ceres"
      },
      {
        code: "San Jacinto",
        label: "San Jacinto"
      },
      {
        code: "Lincoln",
        label: "Lincoln"
      },
      {
        code: "Newark",
        label: "Newark"
      },
      {
        code: "Lompoc",
        label: "Lompoc"
      },
      {
        code: "El Centro",
        label: "El Centro"
      },
      {
        code: "Danville",
        label: "Danville"
      },
      {
        code: "Bell Gardens",
        label: "Bell Gardens"
      },
      {
        code: "Coachella",
        label: "Coachella"
      },
      {
        code: "Rancho Palos Verdes",
        label: "Rancho Palos Verdes"
      },
      {
        code: "San Bruno",
        label: "San Bruno"
      },
      {
        code: "Rohnert Park",
        label: "Rohnert Park"
      },
      {
        code: "Brea",
        label: "Brea"
      },
      {
        code: "La Puente",
        label: "La Puente"
      },
      {
        code: "Campbell",
        label: "Campbell"
      },
      {
        code: "San Gabriel",
        label: "San Gabriel"
      },
      {
        code: "Beaumont",
        label: "Beaumont"
      },
      {
        code: "Morgan Hill",
        label: "Morgan Hill"
      },
      {
        code: "Culver City",
        label: "Culver City"
      },
      {
        code: "Calexico",
        label: "Calexico"
      },
      {
        code: "Stanton",
        label: "Stanton"
      },
      {
        code: "La Quinta",
        label: "La Quinta"
      },
      {
        code: "Pacifica",
        label: "Pacifica"
      },
      {
        code: "Montclair",
        label: "Montclair"
      },
      {
        code: "Oakley",
        label: "Oakley"
      },
      {
        code: "Monrovia",
        label: "Monrovia"
      },
      {
        code: "Los Banos",
        label: "Los Banos"
      },
      {
        code: "Martinez",
        label: "Martinez"
      }
    ]
  },
  CO: {
    label: "Colorado",
    cities: [
      {
        code: "Denver",
        label: "Denver"
      },
      {
        code: "Colorado Springs",
        label: "Colorado Springs"
      },
      {
        code: "Aurora",
        label: "Aurora"
      },
      {
        code: "Fort Collins",
        label: "Fort Collins"
      },
      {
        code: "Lakewood",
        label: "Lakewood"
      },
      {
        code: "Thornton",
        label: "Thornton"
      },
      {
        code: "Arvada",
        label: "Arvada"
      },
      {
        code: "Westminster",
        label: "Westminster"
      },
      {
        code: "Pueblo",
        label: "Pueblo"
      },
      {
        code: "Centennial",
        label: "Centennial"
      },
      {
        code: "Boulder",
        label: "Boulder"
      },
      {
        code: "Greeley",
        label: "Greeley"
      },
      {
        code: "Longmont",
        label: "Longmont"
      },
      {
        code: "Loveland",
        label: "Loveland"
      },
      {
        code: "Grand Junction",
        label: "Grand Junction"
      },
      {
        code: "Broomfield",
        label: "Broomfield"
      },
      {
        code: "Castle Rock",
        label: "Castle Rock"
      },
      {
        code: "Commerce City",
        label: "Commerce City"
      },
      {
        code: "Parker",
        label: "Parker"
      },
      {
        code: "Littleton",
        label: "Littleton"
      },
      {
        code: "Northglenn",
        label: "Northglenn"
      }
    ]
  },
  CT: {
    label: "Connecticut",
    cities: [
      {
        code: "Bridgeport",
        label: "Bridgeport"
      },
      {
        code: "New Haven",
        label: "New Haven"
      },
      {
        code: "Stamford",
        label: "Stamford"
      },
      {
        code: "Hartford",
        label: "Hartford"
      },
      {
        code: "Waterbury",
        label: "Waterbury"
      },
      {
        code: "Norwalk",
        label: "Norwalk"
      },
      {
        code: "Danbury",
        label: "Danbury"
      },
      {
        code: "New Britain",
        label: "New Britain"
      },
      {
        code: "Meriden",
        label: "Meriden"
      },
      {
        code: "Bristol",
        label: "Bristol"
      },
      {
        code: "West Haven",
        label: "West Haven"
      },
      {
        code: "Milford",
        label: "Milford"
      },
      {
        code: "Middletown",
        label: "Middletown"
      },
      {
        code: "Norwich",
        label: "Norwich"
      },
      {
        code: "Shelton",
        label: "Shelton"
      }
    ]
  },
  DE: {
    label: "Delaware",
    cities: [
      {
        code: "Wilmington",
        label: "Wilmington"
      },
      {
        code: "Dover",
        label: "Dover"
      }
    ]
  },
  DC: {
    label: "District Of Columbia",
    cities: []
  },
  FM: {
    label: "Federated States Of Micronesia",
    cities: []
  },
  FL: {
    label: "Florida",
    cities: [
      {
        code: "Jacksonville",
        label: "Jacksonville"
      },
      {
        code: "Miami",
        label: "Miami"
      },
      {
        code: "Tampa",
        label: "Tampa"
      },
      {
        code: "Orlando",
        label: "Orlando"
      },
      {
        code: "St. Petersburg",
        label: "St. Petersburg"
      },
      {
        code: "Hialeah",
        label: "Hialeah"
      },
      {
        code: "Tallahassee",
        label: "Tallahassee"
      },
      {
        code: "Fort Lauderdale",
        label: "Fort Lauderdale"
      },
      {
        code: "Port St. Lucie",
        label: "Port St. Lucie"
      },
      {
        code: "Cape Coral",
        label: "Cape Coral"
      },
      {
        code: "Pembroke Pines",
        label: "Pembroke Pines"
      },
      {
        code: "Hollywood",
        label: "Hollywood"
      },
      {
        code: "Miramar",
        label: "Miramar"
      },
      {
        code: "Gainesville",
        label: "Gainesville"
      },
      {
        code: "Coral Springs",
        label: "Coral Springs"
      },
      {
        code: "Miami Gardens",
        label: "Miami Gardens"
      },
      {
        code: "Clearwater",
        label: "Clearwater"
      },
      {
        code: "Palm Bay",
        label: "Palm Bay"
      },
      {
        code: "Pompano Beach",
        label: "Pompano Beach"
      },
      {
        code: "West Palm Beach",
        label: "West Palm Beach"
      },
      {
        code: "Lakeland",
        label: "Lakeland"
      },
      {
        code: "Davie",
        label: "Davie"
      },
      {
        code: "Miami Beach",
        label: "Miami Beach"
      },
      {
        code: "Sunrise",
        label: "Sunrise"
      },
      {
        code: "Plantation",
        label: "Plantation"
      },
      {
        code: "Boca Raton",
        label: "Boca Raton"
      },
      {
        code: "Deltona",
        label: "Deltona"
      },
      {
        code: "Largo",
        label: "Largo"
      },
      {
        code: "Deerfield Beach",
        label: "Deerfield Beach"
      },
      {
        code: "Palm Coast",
        label: "Palm Coast"
      },
      {
        code: "Melbourne",
        label: "Melbourne"
      },
      {
        code: "Boynton Beach",
        label: "Boynton Beach"
      },
      {
        code: "Lauderhill",
        label: "Lauderhill"
      },
      {
        code: "Weston",
        label: "Weston"
      },
      {
        code: "Fort Myers",
        label: "Fort Myers"
      },
      {
        code: "Kissimmee",
        label: "Kissimmee"
      },
      {
        code: "Homestead",
        label: "Homestead"
      },
      {
        code: "Tamarac",
        label: "Tamarac"
      },
      {
        code: "Delray Beach",
        label: "Delray Beach"
      },
      {
        code: "Daytona Beach",
        label: "Daytona Beach"
      },
      {
        code: "North Miami",
        label: "North Miami"
      },
      {
        code: "Wellington",
        label: "Wellington"
      },
      {
        code: "North Port",
        label: "North Port"
      },
      {
        code: "Jupiter",
        label: "Jupiter"
      },
      {
        code: "Ocala",
        label: "Ocala"
      },
      {
        code: "Port Orange",
        label: "Port Orange"
      },
      {
        code: "Margate",
        label: "Margate"
      },
      {
        code: "Coconut Creek",
        label: "Coconut Creek"
      },
      {
        code: "Sanford",
        label: "Sanford"
      },
      {
        code: "Sarasota",
        label: "Sarasota"
      },
      {
        code: "Pensacola",
        label: "Pensacola"
      },
      {
        code: "Bradenton",
        label: "Bradenton"
      },
      {
        code: "Palm Beach Gardens",
        label: "Palm Beach Gardens"
      },
      {
        code: "Pinellas Park",
        label: "Pinellas Park"
      },
      {
        code: "Coral Gables",
        label: "Coral Gables"
      },
      {
        code: "Doral",
        label: "Doral"
      },
      {
        code: "Bonita Springs",
        label: "Bonita Springs"
      },
      {
        code: "Apopka",
        label: "Apopka"
      },
      {
        code: "Titusville",
        label: "Titusville"
      },
      {
        code: "North Miami Beach",
        label: "North Miami Beach"
      },
      {
        code: "Oakland Park",
        label: "Oakland Park"
      },
      {
        code: "Fort Pierce",
        label: "Fort Pierce"
      },
      {
        code: "North Lauderdale",
        label: "North Lauderdale"
      },
      {
        code: "Cutler Bay",
        label: "Cutler Bay"
      },
      {
        code: "Altamonte Springs",
        label: "Altamonte Springs"
      },
      {
        code: "St. Cloud",
        label: "St. Cloud"
      },
      {
        code: "Greenacres",
        label: "Greenacres"
      },
      {
        code: "Ormond Beach",
        label: "Ormond Beach"
      },
      {
        code: "Ocoee",
        label: "Ocoee"
      },
      {
        code: "Hallandale Beach",
        label: "Hallandale Beach"
      },
      {
        code: "Winter Garden",
        label: "Winter Garden"
      },
      {
        code: "Aventura",
        label: "Aventura"
      }
    ]
  },
  GA: {
    label: "Georgia",
    cities: [
      {
        code: "Atlanta",
        label: "Atlanta"
      },
      {
        code: "Columbus",
        label: "Columbus"
      },
      {
        code: "Augusta-Richmond County",
        label: "Augusta-Richmond County"
      },
      {
        code: "Savannah",
        label: "Savannah"
      },
      {
        code: "Athens-Clarke County",
        label: "Athens-Clarke County"
      },
      {
        code: "Sandy Springs",
        label: "Sandy Springs"
      },
      {
        code: "Roswell",
        label: "Roswell"
      },
      {
        code: "Macon",
        label: "Macon"
      },
      {
        code: "Johns Creek",
        label: "Johns Creek"
      },
      {
        code: "Albany",
        label: "Albany"
      },
      {
        code: "Warner Robins",
        label: "Warner Robins"
      },
      {
        code: "Alpharetta",
        label: "Alpharetta"
      },
      {
        code: "Marietta",
        label: "Marietta"
      },
      {
        code: "Valdosta",
        label: "Valdosta"
      },
      {
        code: "Smyrna",
        label: "Smyrna"
      },
      {
        code: "Dunwoody",
        label: "Dunwoody"
      }
    ]
  },
  GU: {
    label: "Guam",
    cities: []
  },
  HI: {
    label: "Hawaii",
    cities: [
      {
        code: "Honolulu",
        label: "Honolulu"
      }
    ]
  },
  ID: {
    label: "Idaho",
    cities: [
      {
        code: "Boise City",
        label: "Boise City"
      },
      {
        code: "Nampa",
        label: "Nampa"
      },
      {
        code: "Meridian",
        label: "Meridian"
      },
      {
        code: "Idaho Falls",
        label: "Idaho Falls"
      },
      {
        code: "Pocatello",
        label: "Pocatello"
      },
      {
        code: "Caldwell",
        label: "Caldwell"
      },
      {
        code: "Coeur d'Alene",
        label: "Coeur d'Alene"
      },
      {
        code: "Twin Falls",
        label: "Twin Falls"
      }
    ]
  },
  IL: {
    label: "Illinois",
    cities: [
      {
        code: "Chicago",
        label: "Chicago"
      },
      {
        code: "Aurora",
        label: "Aurora"
      },
      {
        code: "Rockford",
        label: "Rockford"
      },
      {
        code: "Joliet",
        label: "Joliet"
      },
      {
        code: "Naperville",
        label: "Naperville"
      },
      {
        code: "Springfield",
        label: "Springfield"
      },
      {
        code: "Peoria",
        label: "Peoria"
      },
      {
        code: "Elgin",
        label: "Elgin"
      },
      {
        code: "Waukegan",
        label: "Waukegan"
      },
      {
        code: "Cicero",
        label: "Cicero"
      },
      {
        code: "Champaign",
        label: "Champaign"
      },
      {
        code: "Bloomington",
        label: "Bloomington"
      },
      {
        code: "Arlington Heights",
        label: "Arlington Heights"
      },
      {
        code: "Evanston",
        label: "Evanston"
      },
      {
        code: "Decatur",
        label: "Decatur"
      },
      {
        code: "Schaumburg",
        label: "Schaumburg"
      },
      {
        code: "Bolingbrook",
        label: "Bolingbrook"
      },
      {
        code: "Palatine",
        label: "Palatine"
      },
      {
        code: "Skokie",
        label: "Skokie"
      },
      {
        code: "Des Plaines",
        label: "Des Plaines"
      },
      {
        code: "Orland Park",
        label: "Orland Park"
      },
      {
        code: "Tinley Park",
        label: "Tinley Park"
      },
      {
        code: "Oak Lawn",
        label: "Oak Lawn"
      },
      {
        code: "Berwyn",
        label: "Berwyn"
      },
      {
        code: "Mount Prospect",
        label: "Mount Prospect"
      },
      {
        code: "Normal",
        label: "Normal"
      },
      {
        code: "Wheaton",
        label: "Wheaton"
      },
      {
        code: "Hoffman Estates",
        label: "Hoffman Estates"
      },
      {
        code: "Oak Park",
        label: "Oak Park"
      },
      {
        code: "Downers Grove",
        label: "Downers Grove"
      },
      {
        code: "Elmhurst",
        label: "Elmhurst"
      },
      {
        code: "Glenview",
        label: "Glenview"
      },
      {
        code: "DeKalb",
        label: "DeKalb"
      },
      {
        code: "Lombard",
        label: "Lombard"
      },
      {
        code: "Belleville",
        label: "Belleville"
      },
      {
        code: "Moline",
        label: "Moline"
      },
      {
        code: "Buffalo Grove",
        label: "Buffalo Grove"
      },
      {
        code: "Bartlett",
        label: "Bartlett"
      },
      {
        code: "Urbana",
        label: "Urbana"
      },
      {
        code: "Quincy",
        label: "Quincy"
      },
      {
        code: "Crystal Lake",
        label: "Crystal Lake"
      },
      {
        code: "Plainfield",
        label: "Plainfield"
      },
      {
        code: "Streamwood",
        label: "Streamwood"
      },
      {
        code: "Carol Stream",
        label: "Carol Stream"
      },
      {
        code: "Romeoville",
        label: "Romeoville"
      },
      {
        code: "Rock Island",
        label: "Rock Island"
      },
      {
        code: "Hanover Park",
        label: "Hanover Park"
      },
      {
        code: "Carpentersville",
        label: "Carpentersville"
      },
      {
        code: "Wheeling",
        label: "Wheeling"
      },
      {
        code: "Park Ridge",
        label: "Park Ridge"
      },
      {
        code: "Addison",
        label: "Addison"
      },
      {
        code: "Calumet City",
        label: "Calumet City"
      }
    ]
  },
  IN: {
    label: "Indiana",
    cities: [
      {
        code: "Indianapolis",
        label: "Indianapolis"
      },
      {
        code: "Fort Wayne",
        label: "Fort Wayne"
      },
      {
        code: "Evansville",
        label: "Evansville"
      },
      {
        code: "South Bend",
        label: "South Bend"
      },
      {
        code: "Carmel",
        label: "Carmel"
      },
      {
        code: "Bloomington",
        label: "Bloomington"
      },
      {
        code: "Fishers",
        label: "Fishers"
      },
      {
        code: "Hammond",
        label: "Hammond"
      },
      {
        code: "Gary",
        label: "Gary"
      },
      {
        code: "Muncie",
        label: "Muncie"
      },
      {
        code: "Lafayette",
        label: "Lafayette"
      },
      {
        code: "Terre Haute",
        label: "Terre Haute"
      },
      {
        code: "Kokomo",
        label: "Kokomo"
      },
      {
        code: "Anderson",
        label: "Anderson"
      },
      {
        code: "Noblesville",
        label: "Noblesville"
      },
      {
        code: "Greenwood",
        label: "Greenwood"
      },
      {
        code: "Elkhart",
        label: "Elkhart"
      },
      {
        code: "Mishawaka",
        label: "Mishawaka"
      },
      {
        code: "Lawrence",
        label: "Lawrence"
      },
      {
        code: "Jeffersonville",
        label: "Jeffersonville"
      },
      {
        code: "Columbus",
        label: "Columbus"
      },
      {
        code: "Portage",
        label: "Portage"
      }
    ]
  },
  IA: {
    label: "Iowa",
    cities: [
      {
        code: "Des Moines",
        label: "Des Moines"
      },
      {
        code: "Cedar Rapids",
        label: "Cedar Rapids"
      },
      {
        code: "Davenport",
        label: "Davenport"
      },
      {
        code: "Sioux City",
        label: "Sioux City"
      },
      {
        code: "Iowa City",
        label: "Iowa City"
      },
      {
        code: "Waterloo",
        label: "Waterloo"
      },
      {
        code: "Council Bluffs",
        label: "Council Bluffs"
      },
      {
        code: "Ames",
        label: "Ames"
      },
      {
        code: "West Des Moines",
        label: "West Des Moines"
      },
      {
        code: "Dubuque",
        label: "Dubuque"
      },
      {
        code: "Ankeny",
        label: "Ankeny"
      },
      {
        code: "Urbandale",
        label: "Urbandale"
      },
      {
        code: "Cedar Falls",
        label: "Cedar Falls"
      }
    ]
  },
  KS: {
    label: "Kansas",
    cities: [
      {
        code: "Wichita",
        label: "Wichita"
      },
      {
        code: "Overland Park",
        label: "Overland Park"
      },
      {
        code: "Kansas City",
        label: "Kansas City"
      },
      {
        code: "Olathe",
        label: "Olathe"
      },
      {
        code: "Topeka",
        label: "Topeka"
      },
      {
        code: "Lawrence",
        label: "Lawrence"
      },
      {
        code: "Shawnee",
        label: "Shawnee"
      },
      {
        code: "Manhattan",
        label: "Manhattan"
      },
      {
        code: "Lenexa",
        label: "Lenexa"
      },
      {
        code: "Salina",
        label: "Salina"
      },
      {
        code: "Hutchinson",
        label: "Hutchinson"
      }
    ]
  },
  KY: {
    label: "Kentucky",
    cities: [
      {
        code: "Louisville/Jefferson County",
        label: "Louisville/Jefferson County"
      },
      {
        code: "Lexington-Fayette",
        label: "Lexington-Fayette"
      },
      {
        code: "Bowling Green",
        label: "Bowling Green"
      },
      {
        code: "Owensboro",
        label: "Owensboro"
      },
      {
        code: "Covington",
        label: "Covington"
      }
    ]
  },
  LA: {
    label: "Louisiana",
    cities: [
      {
        code: "New Orleans",
        label: "New Orleans"
      },
      {
        code: "Baton Rouge",
        label: "Baton Rouge"
      },
      {
        code: "Shreveport",
        label: "Shreveport"
      },
      {
        code: "Lafayette",
        label: "Lafayette"
      },
      {
        code: "Lake Charles",
        label: "Lake Charles"
      },
      {
        code: "Kenner",
        label: "Kenner"
      },
      {
        code: "Bossier City",
        label: "Bossier City"
      },
      {
        code: "Monroe",
        label: "Monroe"
      },
      {
        code: "Alexandria",
        label: "Alexandria"
      }
    ]
  },
  ME: {
    label: "Maine",
    cities: [
      {
        code: "Portland",
        label: "Portland"
      }
    ]
  },
  MH: {
    label: "Marshall Islands",
    cities: []
  },
  MD: {
    label: "Maryland",
    cities: [
      {
        code: "Baltimore",
        label: "Baltimore"
      },
      {
        code: "Frederick",
        label: "Frederick"
      },
      {
        code: "Rockville",
        label: "Rockville"
      },
      {
        code: "Gaithersburg",
        label: "Gaithersburg"
      },
      {
        code: "Bowie",
        label: "Bowie"
      },
      {
        code: "Hagerstown",
        label: "Hagerstown"
      },
      {
        code: "Annapolis",
        label: "Annapolis"
      }
    ]
  },
  MA: {
    label: "Massachusetts",
    cities: [
      {
        code: "Boston",
        label: "Boston"
      },
      {
        code: "Worcester",
        label: "Worcester"
      },
      {
        code: "Springfield",
        label: "Springfield"
      },
      {
        code: "Lowell",
        label: "Lowell"
      },
      {
        code: "Cambridge",
        label: "Cambridge"
      },
      {
        code: "New Bedford",
        label: "New Bedford"
      },
      {
        code: "Brockton",
        label: "Brockton"
      },
      {
        code: "Quincy",
        label: "Quincy"
      },
      {
        code: "Lynn",
        label: "Lynn"
      },
      {
        code: "Fall River",
        label: "Fall River"
      },
      {
        code: "Newton",
        label: "Newton"
      },
      {
        code: "Lawrence",
        label: "Lawrence"
      },
      {
        code: "Somerville",
        label: "Somerville"
      },
      {
        code: "Waltham",
        label: "Waltham"
      },
      {
        code: "Haverhill",
        label: "Haverhill"
      },
      {
        code: "Malden",
        label: "Malden"
      },
      {
        code: "Medford",
        label: "Medford"
      },
      {
        code: "Taunton",
        label: "Taunton"
      },
      {
        code: "Chicopee",
        label: "Chicopee"
      },
      {
        code: "Weymouth Town",
        label: "Weymouth Town"
      },
      {
        code: "Revere",
        label: "Revere"
      },
      {
        code: "Peabody",
        label: "Peabody"
      },
      {
        code: "Methuen",
        label: "Methuen"
      },
      {
        code: "Barnstable Town",
        label: "Barnstable Town"
      },
      {
        code: "Pittsfield",
        label: "Pittsfield"
      },
      {
        code: "Attleboro",
        label: "Attleboro"
      },
      {
        code: "Everett",
        label: "Everett"
      },
      {
        code: "Salem",
        label: "Salem"
      },
      {
        code: "Westfield",
        label: "Westfield"
      },
      {
        code: "Leominster",
        label: "Leominster"
      },
      {
        code: "Fitchburg",
        label: "Fitchburg"
      },
      {
        code: "Beverly",
        label: "Beverly"
      },
      {
        code: "Holyoke",
        label: "Holyoke"
      },
      {
        code: "Marlborough",
        label: "Marlborough"
      },
      {
        code: "Woburn",
        label: "Woburn"
      },
      {
        code: "Chelsea",
        label: "Chelsea"
      }
    ]
  },
  MI: {
    label: "Michigan",
    cities: [
      {
        code: "Detroit",
        label: "Detroit"
      },
      {
        code: "Grand Rapids",
        label: "Grand Rapids"
      },
      {
        code: "Warren",
        label: "Warren"
      },
      {
        code: "Sterling Heights",
        label: "Sterling Heights"
      },
      {
        code: "Ann Arbor",
        label: "Ann Arbor"
      },
      {
        code: "Lansing",
        label: "Lansing"
      },
      {
        code: "Flint",
        label: "Flint"
      },
      {
        code: "Dearborn",
        label: "Dearborn"
      },
      {
        code: "Livonia",
        label: "Livonia"
      },
      {
        code: "Westland",
        label: "Westland"
      },
      {
        code: "Troy",
        label: "Troy"
      },
      {
        code: "Farmington Hills",
        label: "Farmington Hills"
      },
      {
        code: "Kalamazoo",
        label: "Kalamazoo"
      },
      {
        code: "Wyoming",
        label: "Wyoming"
      },
      {
        code: "Southfield",
        label: "Southfield"
      },
      {
        code: "Rochester Hills",
        label: "Rochester Hills"
      },
      {
        code: "Taylor",
        label: "Taylor"
      },
      {
        code: "Pontiac",
        label: "Pontiac"
      },
      {
        code: "St. Clair Shores",
        label: "St. Clair Shores"
      },
      {
        code: "Royal Oak",
        label: "Royal Oak"
      },
      {
        code: "Novi",
        label: "Novi"
      },
      {
        code: "Dearborn Heights",
        label: "Dearborn Heights"
      },
      {
        code: "Battle Creek",
        label: "Battle Creek"
      },
      {
        code: "Saginaw",
        label: "Saginaw"
      },
      {
        code: "Kentwood",
        label: "Kentwood"
      },
      {
        code: "East Lansing",
        label: "East Lansing"
      },
      {
        code: "Roseville",
        label: "Roseville"
      },
      {
        code: "Portage",
        label: "Portage"
      },
      {
        code: "Midland",
        label: "Midland"
      },
      {
        code: "Lincoln Park",
        label: "Lincoln Park"
      },
      {
        code: "Muskegon",
        label: "Muskegon"
      }
    ]
  },
  MN: {
    label: "Minnesota",
    cities: [
      {
        code: "Minneapolis",
        label: "Minneapolis"
      },
      {
        code: "St. Paul",
        label: "St. Paul"
      },
      {
        code: "Rochester",
        label: "Rochester"
      },
      {
        code: "Duluth",
        label: "Duluth"
      },
      {
        code: "Bloomington",
        label: "Bloomington"
      },
      {
        code: "Brooklyn Park",
        label: "Brooklyn Park"
      },
      {
        code: "Plymouth",
        label: "Plymouth"
      },
      {
        code: "St. Cloud",
        label: "St. Cloud"
      },
      {
        code: "Eagan",
        label: "Eagan"
      },
      {
        code: "Woodbury",
        label: "Woodbury"
      },
      {
        code: "Maple Grove",
        label: "Maple Grove"
      },
      {
        code: "Eden Prairie",
        label: "Eden Prairie"
      },
      {
        code: "Coon Rapids",
        label: "Coon Rapids"
      },
      {
        code: "Burnsville",
        label: "Burnsville"
      },
      {
        code: "Blaine",
        label: "Blaine"
      },
      {
        code: "Lakeville",
        label: "Lakeville"
      },
      {
        code: "Minnetonka",
        label: "Minnetonka"
      },
      {
        code: "Apple Valley",
        label: "Apple Valley"
      },
      {
        code: "Edina",
        label: "Edina"
      },
      {
        code: "St. Louis Park",
        label: "St. Louis Park"
      },
      {
        code: "Mankato",
        label: "Mankato"
      },
      {
        code: "Maplewood",
        label: "Maplewood"
      },
      {
        code: "Moorhead",
        label: "Moorhead"
      },
      {
        code: "Shakopee",
        label: "Shakopee"
      }
    ]
  },
  MS: {
    label: "Mississippi",
    cities: [
      {
        code: "Jackson",
        label: "Jackson"
      },
      {
        code: "Gulfport",
        label: "Gulfport"
      },
      {
        code: "Southaven",
        label: "Southaven"
      },
      {
        code: "Hattiesburg",
        label: "Hattiesburg"
      },
      {
        code: "Biloxi",
        label: "Biloxi"
      },
      {
        code: "Meridian",
        label: "Meridian"
      }
    ]
  },
  MO: {
    label: "Missouri",
    cities: [
      {
        code: "Kansas City",
        label: "Kansas City"
      },
      {
        code: "St. Louis",
        label: "St. Louis"
      },
      {
        code: "Springfield",
        label: "Springfield"
      },
      {
        code: "Independence",
        label: "Independence"
      },
      {
        code: "Columbia",
        label: "Columbia"
      },
      {
        code: "Lee's Summit",
        label: "Lee's Summit"
      },
      {
        code: "O'Fallon",
        label: "O'Fallon"
      },
      {
        code: "St. Joseph",
        label: "St. Joseph"
      },
      {
        code: "St. Charles",
        label: "St. Charles"
      },
      {
        code: "St. Peters",
        label: "St. Peters"
      },
      {
        code: "Blue Springs",
        label: "Blue Springs"
      },
      {
        code: "Florissant",
        label: "Florissant"
      },
      {
        code: "Joplin",
        label: "Joplin"
      },
      {
        code: "Chesterfield",
        label: "Chesterfield"
      },
      {
        code: "Jefferson City",
        label: "Jefferson City"
      },
      {
        code: "Cape Girardeau",
        label: "Cape Girardeau"
      }
    ]
  },
  MT: {
    label: "Montana",
    cities: [
      {
        code: "Billings",
        label: "Billings"
      },
      {
        code: "Missoula",
        label: "Missoula"
      },
      {
        code: "Great Falls",
        label: "Great Falls"
      },
      {
        code: "Bozeman",
        label: "Bozeman"
      }
    ]
  },
  NE: {
    label: "Nebraska",
    cities: [
      {
        code: "Omaha",
        label: "Omaha"
      },
      {
        code: "Lincoln",
        label: "Lincoln"
      },
      {
        code: "Bellevue",
        label: "Bellevue"
      },
      {
        code: "Grand Island",
        label: "Grand Island"
      }
    ]
  },
  NV: {
    label: "Nevada",
    cities: [
      {
        code: "Las Vegas",
        label: "Las Vegas"
      },
      {
        code: "Henderson",
        label: "Henderson"
      },
      {
        code: "Reno",
        label: "Reno"
      },
      {
        code: "North Las Vegas",
        label: "North Las Vegas"
      },
      {
        code: "Sparks",
        label: "Sparks"
      },
      {
        code: "Carson City",
        label: "Carson City"
      }
    ]
  },
  NH: {
    label: "New Hampshire",
    cities: [
      {
        code: "Manchester",
        label: "Manchester"
      },
      {
        code: "Nashua",
        label: "Nashua"
      },
      {
        code: "Concord",
        label: "Concord"
      }
    ]
  },
  NJ: {
    label: "New Jersey",
    cities: [
      {
        code: "Newark",
        label: "Newark"
      },
      {
        code: "Jersey City",
        label: "Jersey City"
      },
      {
        code: "Paterson",
        label: "Paterson"
      },
      {
        code: "Elizabeth",
        label: "Elizabeth"
      },
      {
        code: "Clifton",
        label: "Clifton"
      },
      {
        code: "Trenton",
        label: "Trenton"
      },
      {
        code: "Camden",
        label: "Camden"
      },
      {
        code: "Passaic",
        label: "Passaic"
      },
      {
        code: "Union City",
        label: "Union City"
      },
      {
        code: "Bayonne",
        label: "Bayonne"
      },
      {
        code: "East Orange",
        label: "East Orange"
      },
      {
        code: "Vineland",
        label: "Vineland"
      },
      {
        code: "New Brunswick",
        label: "New Brunswick"
      },
      {
        code: "Hoboken",
        label: "Hoboken"
      },
      {
        code: "Perth Amboy",
        label: "Perth Amboy"
      },
      {
        code: "West New York",
        label: "West New York"
      },
      {
        code: "Plainfield",
        label: "Plainfield"
      },
      {
        code: "Hackensack",
        label: "Hackensack"
      },
      {
        code: "Sayreville",
        label: "Sayreville"
      },
      {
        code: "Kearny",
        label: "Kearny"
      },
      {
        code: "Linden",
        label: "Linden"
      },
      {
        code: "Atlantic City",
        label: "Atlantic City"
      }
    ]
  },
  NM: {
    label: "New Mexico",
    cities: [
      {
        code: "Albuquerque",
        label: "Albuquerque"
      },
      {
        code: "Las Cruces",
        label: "Las Cruces"
      },
      {
        code: "Rio Rancho",
        label: "Rio Rancho"
      },
      {
        code: "Santa Fe",
        label: "Santa Fe"
      },
      {
        code: "Roswell",
        label: "Roswell"
      },
      {
        code: "Farmington",
        label: "Farmington"
      },
      {
        code: "Clovis",
        label: "Clovis"
      }
    ]
  },
  NY: {
    label: "New York",
    cities: [
      {
        code: "New York",
        label: "New York"
      },
      {
        code: "Buffalo",
        label: "Buffalo"
      },
      {
        code: "Rochester",
        label: "Rochester"
      },
      {
        code: "Yonkers",
        label: "Yonkers"
      },
      {
        code: "Syracuse",
        label: "Syracuse"
      },
      {
        code: "Albany",
        label: "Albany"
      },
      {
        code: "New Rochelle",
        label: "New Rochelle"
      },
      {
        code: "Mount Vernon",
        label: "Mount Vernon"
      },
      {
        code: "Schenectady",
        label: "Schenectady"
      },
      {
        code: "Utica",
        label: "Utica"
      },
      {
        code: "White Plains",
        label: "White Plains"
      },
      {
        code: "Hempstead",
        label: "Hempstead"
      },
      {
        code: "Troy",
        label: "Troy"
      },
      {
        code: "Niagara Falls",
        label: "Niagara Falls"
      },
      {
        code: "Binghamton",
        label: "Binghamton"
      },
      {
        code: "Freeport",
        label: "Freeport"
      },
      {
        code: "Valley Stream",
        label: "Valley Stream"
      }
    ]
  },
  NC: {
    label: "North Carolina",
    cities: [
      {
        code: "Charlotte",
        label: "Charlotte"
      },
      {
        code: "Raleigh",
        label: "Raleigh"
      },
      {
        code: "Greensboro",
        label: "Greensboro"
      },
      {
        code: "Durham",
        label: "Durham"
      },
      {
        code: "Winston-Salem",
        label: "Winston-Salem"
      },
      {
        code: "Fayetteville",
        label: "Fayetteville"
      },
      {
        code: "Cary",
        label: "Cary"
      },
      {
        code: "Wilmington",
        label: "Wilmington"
      },
      {
        code: "High Point",
        label: "High Point"
      },
      {
        code: "Greenville",
        label: "Greenville"
      },
      {
        code: "Asheville",
        label: "Asheville"
      },
      {
        code: "Concord",
        label: "Concord"
      },
      {
        code: "Gastonia",
        label: "Gastonia"
      },
      {
        code: "Jacksonville",
        label: "Jacksonville"
      },
      {
        code: "Chapel Hill",
        label: "Chapel Hill"
      },
      {
        code: "Rocky Mount",
        label: "Rocky Mount"
      },
      {
        code: "Burlington",
        label: "Burlington"
      },
      {
        code: "Wilson",
        label: "Wilson"
      },
      {
        code: "Huntersville",
        label: "Huntersville"
      },
      {
        code: "Kannapolis",
        label: "Kannapolis"
      },
      {
        code: "Apex",
        label: "Apex"
      },
      {
        code: "Hickory",
        label: "Hickory"
      },
      {
        code: "Goldsboro",
        label: "Goldsboro"
      }
    ]
  },
  ND: {
    label: "North Dakota",
    cities: [
      {
        code: "Fargo",
        label: "Fargo"
      },
      {
        code: "Bismarck",
        label: "Bismarck"
      },
      {
        code: "Grand Forks",
        label: "Grand Forks"
      },
      {
        code: "Minot",
        label: "Minot"
      }
    ]
  },
  MP: {
    label: "Northern Mariana Islands",
    cities: []
  },
  OH: {
    label: "Ohio",
    cities: [
      {
        code: "Columbus",
        label: "Columbus"
      },
      {
        code: "Cleveland",
        label: "Cleveland"
      },
      {
        code: "Cincinnati",
        label: "Cincinnati"
      },
      {
        code: "Toledo",
        label: "Toledo"
      },
      {
        code: "Akron",
        label: "Akron"
      },
      {
        code: "Dayton",
        label: "Dayton"
      },
      {
        code: "Parma",
        label: "Parma"
      },
      {
        code: "Canton",
        label: "Canton"
      },
      {
        code: "Youngstown",
        label: "Youngstown"
      },
      {
        code: "Lorain",
        label: "Lorain"
      },
      {
        code: "Hamilton",
        label: "Hamilton"
      },
      {
        code: "Springfield",
        label: "Springfield"
      },
      {
        code: "Kettering",
        label: "Kettering"
      },
      {
        code: "Elyria",
        label: "Elyria"
      },
      {
        code: "Lakewood",
        label: "Lakewood"
      },
      {
        code: "Cuyahoga Falls",
        label: "Cuyahoga Falls"
      },
      {
        code: "Middletown",
        label: "Middletown"
      },
      {
        code: "Euclid",
        label: "Euclid"
      },
      {
        code: "Newark",
        label: "Newark"
      },
      {
        code: "Mansfield",
        label: "Mansfield"
      },
      {
        code: "Mentor",
        label: "Mentor"
      },
      {
        code: "Beavercreek",
        label: "Beavercreek"
      },
      {
        code: "Cleveland Heights",
        label: "Cleveland Heights"
      },
      {
        code: "Strongsville",
        label: "Strongsville"
      },
      {
        code: "Dublin",
        label: "Dublin"
      },
      {
        code: "Fairfield",
        label: "Fairfield"
      },
      {
        code: "Findlay",
        label: "Findlay"
      },
      {
        code: "Warren",
        label: "Warren"
      },
      {
        code: "Lancaster",
        label: "Lancaster"
      },
      {
        code: "Lima",
        label: "Lima"
      },
      {
        code: "Huber Heights",
        label: "Huber Heights"
      },
      {
        code: "Westerville",
        label: "Westerville"
      },
      {
        code: "Marion",
        label: "Marion"
      },
      {
        code: "Grove City",
        label: "Grove City"
      }
    ]
  },
  OK: {
    label: "Oklahoma",
    cities: [
      {
        code: "Oklahoma City",
        label: "Oklahoma City"
      },
      {
        code: "Tulsa",
        label: "Tulsa"
      },
      {
        code: "Norman",
        label: "Norman"
      },
      {
        code: "Broken Arrow",
        label: "Broken Arrow"
      },
      {
        code: "Lawton",
        label: "Lawton"
      },
      {
        code: "Edmond",
        label: "Edmond"
      },
      {
        code: "Moore",
        label: "Moore"
      },
      {
        code: "Midwest City",
        label: "Midwest City"
      },
      {
        code: "Enid",
        label: "Enid"
      },
      {
        code: "Stillwater",
        label: "Stillwater"
      },
      {
        code: "Muskogee",
        label: "Muskogee"
      }
    ]
  },
  OR: {
    label: "Oregon",
    cities: [
      {
        code: "Portland",
        label: "Portland"
      },
      {
        code: "Eugene",
        label: "Eugene"
      },
      {
        code: "Salem",
        label: "Salem"
      },
      {
        code: "Gresham",
        label: "Gresham"
      },
      {
        code: "Hillsboro",
        label: "Hillsboro"
      },
      {
        code: "Beaverton",
        label: "Beaverton"
      },
      {
        code: "Bend",
        label: "Bend"
      },
      {
        code: "Medford",
        label: "Medford"
      },
      {
        code: "Springfield",
        label: "Springfield"
      },
      {
        code: "Corvallis",
        label: "Corvallis"
      },
      {
        code: "Albany",
        label: "Albany"
      },
      {
        code: "Tigard",
        label: "Tigard"
      },
      {
        code: "Lake Oswego",
        label: "Lake Oswego"
      },
      {
        code: "Keizer",
        label: "Keizer"
      }
    ]
  },
  PW: {
    label: "Palau",
    cities: []
  },
  PA: {
    label: "Pennsylvania",
    cities: [
      {
        code: "Philadelphia",
        label: "Philadelphia"
      },
      {
        code: "Pittsburgh",
        label: "Pittsburgh"
      },
      {
        code: "Allentown",
        label: "Allentown"
      },
      {
        code: "Erie",
        label: "Erie"
      },
      {
        code: "Reading",
        label: "Reading"
      },
      {
        code: "Scranton",
        label: "Scranton"
      },
      {
        code: "Bethlehem",
        label: "Bethlehem"
      },
      {
        code: "Lancaster",
        label: "Lancaster"
      },
      {
        code: "Harrisburg",
        label: "Harrisburg"
      },
      {
        code: "Altoona",
        label: "Altoona"
      },
      {
        code: "York",
        label: "York"
      },
      {
        code: "State College",
        label: "State College"
      },
      {
        code: "Wilkes-Barre",
        label: "Wilkes-Barre"
      }
    ]
  },
  PR: {
    label: "Puerto Rico",
    cities: []
  },
  RI: {
    label: "Rhode Island",
    cities: [
      {
        code: "Providence",
        label: "Providence"
      },
      {
        code: "Warwick",
        label: "Warwick"
      },
      {
        code: "Cranston",
        label: "Cranston"
      },
      {
        code: "Pawtucket",
        label: "Pawtucket"
      },
      {
        code: "East Providence",
        label: "East Providence"
      },
      {
        code: "Woonsocket",
        label: "Woonsocket"
      }
    ]
  },
  SC: {
    label: "South Carolina",
    cities: [
      {
        code: "Columbia",
        label: "Columbia"
      },
      {
        code: "Charleston",
        label: "Charleston"
      },
      {
        code: "North Charleston",
        label: "North Charleston"
      },
      {
        code: "Mount Pleasant",
        label: "Mount Pleasant"
      },
      {
        code: "Rock Hill",
        label: "Rock Hill"
      },
      {
        code: "Greenville",
        label: "Greenville"
      },
      {
        code: "Summerville",
        label: "Summerville"
      },
      {
        code: "Sumter",
        label: "Sumter"
      },
      {
        code: "Goose Creek",
        label: "Goose Creek"
      },
      {
        code: "Hilton Head Island",
        label: "Hilton Head Island"
      },
      {
        code: "Florence",
        label: "Florence"
      },
      {
        code: "Spartanburg",
        label: "Spartanburg"
      }
    ]
  },
  SD: {
    label: "South Dakota",
    cities: [
      {
        code: "Sioux Falls",
        label: "Sioux Falls"
      },
      {
        code: "Rapid City",
        label: "Rapid City"
      }
    ]
  },
  TN: {
    label: "Tennessee",
    cities: [
      {
        code: "Memphis",
        label: "Memphis"
      },
      {
        code: "Nashville-Davidson",
        label: "Nashville-Davidson"
      },
      {
        code: "Knoxville",
        label: "Knoxville"
      },
      {
        code: "Chattanooga",
        label: "Chattanooga"
      },
      {
        code: "Clarksville",
        label: "Clarksville"
      },
      {
        code: "Murfreesboro",
        label: "Murfreesboro"
      },
      {
        code: "Jackson",
        label: "Jackson"
      },
      {
        code: "Franklin",
        label: "Franklin"
      },
      {
        code: "Johnson City",
        label: "Johnson City"
      },
      {
        code: "Bartlett",
        label: "Bartlett"
      },
      {
        code: "Hendersonville",
        label: "Hendersonville"
      },
      {
        code: "Kingsport",
        label: "Kingsport"
      },
      {
        code: "Collierville",
        label: "Collierville"
      },
      {
        code: "Cleveland",
        label: "Cleveland"
      },
      {
        code: "Smyrna",
        label: "Smyrna"
      },
      {
        code: "Germantown",
        label: "Germantown"
      },
      {
        code: "Brentwood",
        label: "Brentwood"
      }
    ]
  },
  TX: {
    label: "Texas",
    cities: [
      {
        code: "Houston",
        label: "Houston"
      },
      {
        code: "San Antonio",
        label: "San Antonio"
      },
      {
        code: "Dallas",
        label: "Dallas"
      },
      {
        code: "Austin",
        label: "Austin"
      },
      {
        code: "Fort Worth",
        label: "Fort Worth"
      },
      {
        code: "El Paso",
        label: "El Paso"
      },
      {
        code: "Arlington",
        label: "Arlington"
      },
      {
        code: "Corpus Christi",
        label: "Corpus Christi"
      },
      {
        code: "Plano",
        label: "Plano"
      },
      {
        code: "Laredo",
        label: "Laredo"
      },
      {
        code: "Lubbock",
        label: "Lubbock"
      },
      {
        code: "Garland",
        label: "Garland"
      },
      {
        code: "Irving",
        label: "Irving"
      },
      {
        code: "Amarillo",
        label: "Amarillo"
      },
      {
        code: "Grand Prairie",
        label: "Grand Prairie"
      },
      {
        code: "Brownsville",
        label: "Brownsville"
      },
      {
        code: "Pasadena",
        label: "Pasadena"
      },
      {
        code: "McKinney",
        label: "McKinney"
      },
      {
        code: "Mesquite",
        label: "Mesquite"
      },
      {
        code: "McAllen",
        label: "McAllen"
      },
      {
        code: "Killeen",
        label: "Killeen"
      },
      {
        code: "Frisco",
        label: "Frisco"
      },
      {
        code: "Waco",
        label: "Waco"
      },
      {
        code: "Carrollton",
        label: "Carrollton"
      },
      {
        code: "Denton",
        label: "Denton"
      },
      {
        code: "Midland",
        label: "Midland"
      },
      {
        code: "Abilene",
        label: "Abilene"
      },
      {
        code: "Beaumont",
        label: "Beaumont"
      },
      {
        code: "Round Rock",
        label: "Round Rock"
      },
      {
        code: "Odessa",
        label: "Odessa"
      },
      {
        code: "Wichita Falls",
        label: "Wichita Falls"
      },
      {
        code: "Richardson",
        label: "Richardson"
      },
      {
        code: "Lewisville",
        label: "Lewisville"
      },
      {
        code: "Tyler",
        label: "Tyler"
      },
      {
        code: "College Station",
        label: "College Station"
      },
      {
        code: "Pearland",
        label: "Pearland"
      },
      {
        code: "San Angelo",
        label: "San Angelo"
      },
      {
        code: "Allen",
        label: "Allen"
      },
      {
        code: "League City",
        label: "League City"
      },
      {
        code: "Sugar Land",
        label: "Sugar Land"
      },
      {
        code: "Longview",
        label: "Longview"
      },
      {
        code: "Edinburg",
        label: "Edinburg"
      },
      {
        code: "Mission",
        label: "Mission"
      },
      {
        code: "Bryan",
        label: "Bryan"
      },
      {
        code: "Baytown",
        label: "Baytown"
      },
      {
        code: "Pharr",
        label: "Pharr"
      },
      {
        code: "Temple",
        label: "Temple"
      },
      {
        code: "Missouri City",
        label: "Missouri City"
      },
      {
        code: "Flower Mound",
        label: "Flower Mound"
      },
      {
        code: "Harlingen",
        label: "Harlingen"
      },
      {
        code: "North Richland Hills",
        label: "North Richland Hills"
      },
      {
        code: "Victoria",
        label: "Victoria"
      },
      {
        code: "Conroe",
        label: "Conroe"
      },
      {
        code: "New Braunfels",
        label: "New Braunfels"
      },
      {
        code: "Mansfield",
        label: "Mansfield"
      },
      {
        code: "Cedar Park",
        label: "Cedar Park"
      },
      {
        code: "Rowlett",
        label: "Rowlett"
      },
      {
        code: "Port Arthur",
        label: "Port Arthur"
      },
      {
        code: "Euless",
        label: "Euless"
      },
      {
        code: "Georgetown",
        label: "Georgetown"
      },
      {
        code: "Pflugerville",
        label: "Pflugerville"
      },
      {
        code: "DeSoto",
        label: "DeSoto"
      },
      {
        code: "San Marcos",
        label: "San Marcos"
      },
      {
        code: "Grapevine",
        label: "Grapevine"
      },
      {
        code: "Bedford",
        label: "Bedford"
      },
      {
        code: "Galveston",
        label: "Galveston"
      },
      {
        code: "Cedar Hill",
        label: "Cedar Hill"
      },
      {
        code: "Texas City",
        label: "Texas City"
      },
      {
        code: "Wylie",
        label: "Wylie"
      },
      {
        code: "Haltom City",
        label: "Haltom City"
      },
      {
        code: "Keller",
        label: "Keller"
      },
      {
        code: "Coppell",
        label: "Coppell"
      },
      {
        code: "Rockwall",
        label: "Rockwall"
      },
      {
        code: "Huntsville",
        label: "Huntsville"
      },
      {
        code: "Duncanville",
        label: "Duncanville"
      },
      {
        code: "Sherman",
        label: "Sherman"
      },
      {
        code: "The Colony",
        label: "The Colony"
      },
      {
        code: "Burleson",
        label: "Burleson"
      },
      {
        code: "Hurst",
        label: "Hurst"
      },
      {
        code: "Lancaster",
        label: "Lancaster"
      },
      {
        code: "Texarkana",
        label: "Texarkana"
      },
      {
        code: "Friendswood",
        label: "Friendswood"
      },
      {
        code: "Weslaco",
        label: "Weslaco"
      }
    ]
  },
  UT: {
    label: "Utah",
    cities: [
      {
        code: "Salt Lake City",
        label: "Salt Lake City"
      },
      {
        code: "West Valley City",
        label: "West Valley City"
      },
      {
        code: "Provo",
        label: "Provo"
      },
      {
        code: "West Jordan",
        label: "West Jordan"
      },
      {
        code: "Orem",
        label: "Orem"
      },
      {
        code: "Sandy",
        label: "Sandy"
      },
      {
        code: "Ogden",
        label: "Ogden"
      },
      {
        code: "St. George",
        label: "St. George"
      },
      {
        code: "Layton",
        label: "Layton"
      },
      {
        code: "Taylorsville",
        label: "Taylorsville"
      },
      {
        code: "South Jordan",
        label: "South Jordan"
      },
      {
        code: "Lehi",
        label: "Lehi"
      },
      {
        code: "Logan",
        label: "Logan"
      },
      {
        code: "Murray",
        label: "Murray"
      },
      {
        code: "Draper",
        label: "Draper"
      },
      {
        code: "Bountiful",
        label: "Bountiful"
      },
      {
        code: "Riverton",
        label: "Riverton"
      },
      {
        code: "Roy",
        label: "Roy"
      }
    ]
  },
  VT: {
    label: "Vermont",
    cities: [
      {
        code: "Burlington",
        label: "Burlington"
      }
    ]
  },
  VI: {
    label: "Virgin Islands",
    cities: []
  },
  VA: {
    label: "Virginia",
    cities: [
      {
        code: "Virginia Beach",
        label: "Virginia Beach"
      },
      {
        code: "Norfolk",
        label: "Norfolk"
      },
      {
        code: "Chesapeake",
        label: "Chesapeake"
      },
      {
        code: "Richmond",
        label: "Richmond"
      },
      {
        code: "Newport News",
        label: "Newport News"
      },
      {
        code: "Alexandria",
        label: "Alexandria"
      },
      {
        code: "Hampton",
        label: "Hampton"
      },
      {
        code: "Roanoke",
        label: "Roanoke"
      },
      {
        code: "Portsmouth",
        label: "Portsmouth"
      },
      {
        code: "Suffolk",
        label: "Suffolk"
      },
      {
        code: "Lynchburg",
        label: "Lynchburg"
      },
      {
        code: "Harrisonburg",
        label: "Harrisonburg"
      },
      {
        code: "Leesburg",
        label: "Leesburg"
      },
      {
        code: "Charlottesville",
        label: "Charlottesville"
      },
      {
        code: "Danville",
        label: "Danville"
      },
      {
        code: "Blacksburg",
        label: "Blacksburg"
      },
      {
        code: "Manassas",
        label: "Manassas"
      }
    ]
  },
  WA: {
    label: "Washington",
    cities: [
      {
        code: "Seattle",
        label: "Seattle"
      },
      {
        code: "Spokane",
        label: "Spokane"
      },
      {
        code: "Tacoma",
        label: "Tacoma"
      },
      {
        code: "Vancouver",
        label: "Vancouver"
      },
      {
        code: "Bellevue",
        label: "Bellevue"
      },
      {
        code: "Kent",
        label: "Kent"
      },
      {
        code: "Everett",
        label: "Everett"
      },
      {
        code: "Renton",
        label: "Renton"
      },
      {
        code: "Yakima",
        label: "Yakima"
      },
      {
        code: "Federal Way",
        label: "Federal Way"
      },
      {
        code: "Spokane Valley",
        label: "Spokane Valley"
      },
      {
        code: "Bellingham",
        label: "Bellingham"
      },
      {
        code: "Kennewick",
        label: "Kennewick"
      },
      {
        code: "Auburn",
        label: "Auburn"
      },
      {
        code: "Pasco",
        label: "Pasco"
      },
      {
        code: "Marysville",
        label: "Marysville"
      },
      {
        code: "Lakewood",
        label: "Lakewood"
      },
      {
        code: "Redmond",
        label: "Redmond"
      },
      {
        code: "Shoreline",
        label: "Shoreline"
      },
      {
        code: "Richland",
        label: "Richland"
      },
      {
        code: "Kirkland",
        label: "Kirkland"
      },
      {
        code: "Burien",
        label: "Burien"
      },
      {
        code: "Sammamish",
        label: "Sammamish"
      },
      {
        code: "Olympia",
        label: "Olympia"
      },
      {
        code: "Lacey",
        label: "Lacey"
      },
      {
        code: "Edmonds",
        label: "Edmonds"
      },
      {
        code: "Bremerton",
        label: "Bremerton"
      },
      {
        code: "Puyallup",
        label: "Puyallup"
      }
    ]
  },
  WV: {
    label: "West Virginia",
    cities: [
      {
        code: "Charleston",
        label: "Charleston"
      },
      {
        code: "Huntington",
        label: "Huntington"
      }
    ]
  },
  WI: {
    label: "Wisconsin",
    cities: [
      {
        code: "Milwaukee",
        label: "Milwaukee"
      },
      {
        code: "Madison",
        label: "Madison"
      },
      {
        code: "Green Bay",
        label: "Green Bay"
      },
      {
        code: "Kenosha",
        label: "Kenosha"
      },
      {
        code: "Racine",
        label: "Racine"
      },
      {
        code: "Appleton",
        label: "Appleton"
      },
      {
        code: "Waukesha",
        label: "Waukesha"
      },
      {
        code: "Eau Claire",
        label: "Eau Claire"
      },
      {
        code: "Oshkosh",
        label: "Oshkosh"
      },
      {
        code: "Janesville",
        label: "Janesville"
      },
      {
        code: "West Allis",
        label: "West Allis"
      },
      {
        code: "La Crosse",
        label: "La Crosse"
      },
      {
        code: "Sheboygan",
        label: "Sheboygan"
      },
      {
        code: "Wauwatosa",
        label: "Wauwatosa"
      },
      {
        code: "Fond du Lac",
        label: "Fond du Lac"
      },
      {
        code: "New Berlin",
        label: "New Berlin"
      },
      {
        code: "Wausau",
        label: "Wausau"
      },
      {
        code: "Brookfield",
        label: "Brookfield"
      },
      {
        code: "Greenfield",
        label: "Greenfield"
      },
      {
        code: "Beloit",
        label: "Beloit"
      }
    ]
  },
  WY: {
    label: "Wyoming",
    cities: [
      {
        code: "Cheyenne",
        label: "Cheyenne"
      },
      {
        code: "Casper",
        label: "Casper"
      }
    ]
  }
};
export default STATES_AND_CITIES;
