import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import {COLORS, FONTS, icons, SIZES} from '../constants';

const OderDelivery = ({route, navigation}) => {

  const [restaurant, setRestaurant] = React.useState(null);
  const [streetName, setStreetName] = React.useState("");
  const [fromLocation, setFromLocation] = React.useState(null);
  const [toLocation, setToLocation] = React.useState(null);
  const [region, setRegion] = React.useState(null);

  const [duration, setDuration] = React.useState(0);
  const [isReady, setIsReady] = React.useState(false);
  const [angle, setAngle] = React.useState(0);

  React.useEffect(()=> {
    let {restaurant, currentLocation} = route.params;

    let fromLoc = currentLocation.gps
    let toLoc = restaurant.location
    let street = currentLocation.streetName
    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude)/2,
      longitude: (fromLoc.longitude + toLoc.longitude)/2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude)*2,
      longitudeDetal: Math.abs(fromLoc.longitude - toLoc.longitude)
    }

    setRestaurant(restaurant)
    setStreetName(street)
    setFromLocation(fromLoc)
    setToLocation(toLoc)
    setRegion(mapRegion)
  },[])

  function renderMarp(){
    const destinationMarker = () => (
      <View
        style={{
          marginTop: 200,
          marginLeft: 200,
          height:40,
          width: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.white,
        }}
      >
        <View
          style={{
            height: 30,
            width: 30,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.primary

          }}
        >
          <Image
            source={icons.pin}
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.white
            }}
          />

        </View>
      </View>
    )

    const carIcon = () => (
      <View>
        <Image
          source={icons.car}
          style={{
            marginTop: 100,
            marginLeft: 20,
            width: 40,
            height: 40,
          }}
        />
      </View>
    )

    return(
      <View style={{flex:1}}>
        <View style={{flex:1}}>
          {destinationMarker()}
          {carIcon()}
        </View>
      </View>
    )
    }

    function renderDestinationHeader() {
      return (
        <View
          style={{
            position: 'absolute',
            top: 50,
            left: 0,
            right: 0,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: SIZES.width*0.9,
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.padding*2,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white
            }}
          >
            <Image
              source={icons.red_pin}
              style={{
                width: 30,
                height: 30,
                marginRight: SIZES.padding
              }}
            />

            <View style={{flex:1}}>
              <Text style={{...FONTS.body3}}>{streetName}</Text>
            </View>
              <Text style={{...FONTS.body3}}>10 mins</Text>
          </View>

        </View>
      )
    }

    function renderDeliveryInfo() {
      return (
        <View
          style={{
            position: 'absolute',
            bottom: 50,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View
            style={{
              width: SIZES.width*0.9,
              paddingVertical: SIZES.padding*3,
              paddingHorizontal: SIZES.padding*2,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white
            }}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={restaurant?.courier.avatar}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25
                }}
              />

              <View style={{flex:1, marginLeft: SIZES.padding}}>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                  <Text style={{...FONTS.h4}}>{restaurant?.courier.name}</Text>
                  <View style={{flexDirection:'row'}}>
                      <Image
                        source={icons.star}
                        style={{width:18, height: 18, tintColor:COLORS.primary, marginRight:SIZES.padding}}
                      />
                      <Text style={{...FONTS.body3}}>{restaurant?.rating}</Text>
                  </View>
                </View>

                <Text style={{color:COLORS.darkgray, ...FONTS.body4}}>{restaurant?.name}</Text>
              </View>
            </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: SIZES.padding *2,
                    justifyContent: 'space-between'
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex:1,
                      height: 50,
                      marginRight: 10,
                      backgroundColor: COLORS.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10
                    }}
                    onPress={()=> navigation.navigate("Home")}
                  >
                    <Text style={{...FONTS.h4, color: COLORS.white}}>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex:1,
                      height: 50,
                      backgroundColor: COLORS.secondary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10
                    }}
                    onPress={()=> navigation.goBack()}
                  >
                    <Text style={{...FONTS.h4, color: COLORS.white}}>Cancel</Text>
                  </TouchableOpacity>
                </View>
          </View>
        </View>
      )
    }

    function renderButtons(){
      return (
        <View
          style={{
            position: 'absolute',
            bottom: SIZES.height * 0.35,
            right: SIZES.padding*2,
            width: 50,
            height: 130,
            justifyContent: 'space-between'
          }}
        >
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{...FONTS.body1}}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{...FONTS.body1}}>-</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={{flex: 1}}>
        {renderMarp()}
        {renderDestinationHeader()}
        {renderDeliveryInfo()}
        {renderButtons()}
      </View>
    )

}

export default OderDelivery;
