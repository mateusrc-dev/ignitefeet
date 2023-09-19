import MapView, {
  PROVIDER_GOOGLE,
  MapViewProps,
  LatLng,
  Marker,
  Polyline,
} from "react-native-maps";
import { IconBox } from "../IconBox";
import { Car, FlagCheckered } from "phosphor-react-native";
import { useRef } from "react";
import { useTheme } from "styled-components/native";

type Props = MapViewProps & {
  coordinates: LatLng[];
};

export function Map({ coordinates, ...rest }: Props) {
  const { COLORS } = useTheme();
  const mapRef = useRef<MapView>(null);
  const lastCoordinate = coordinates[coordinates.length - 1];

  async function onMapLoaded() {
    if (coordinates.length > 1) {
      mapRef.current?.fitToSuppliedMarkers(["departure", "arrival"], {
        edgePadding: { top: 50, right: 50, left: 50, bottom: 50 },
      });
    }
  }

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={{ width: "100%", height: 200 }}
      region={{
        latitude: lastCoordinate.latitude,
        longitude: lastCoordinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      onMapLoaded={onMapLoaded}
      {...rest}
    >
      <Marker
        identifier="departure"
        coordinate={{
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
        }}
      >
        <IconBox size="SMALL" icon={Car} />
      </Marker>

      {coordinates.length > 1 && (
        <>
          <Marker
            identifier="arrival"
            coordinate={{
              latitude: lastCoordinate.latitude,
              longitude: lastCoordinate.longitude,
            }}
          >
            <IconBox size="SMALL" icon={FlagCheckered} />
          </Marker>

          <Polyline
            coordinates={[
              ...coordinates.map((coordinate) => ({
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
              })),
            ]}
            strokeColor={COLORS.GRAY_700}
            strokeWidth={7}
          />
        </>
      )}
    </MapView>
  );
}
